import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createFile } from '@/services/fileService'
import { toast } from 'sonner'

type Point = { x: number; y: number; type?: 'start' | 'end' | 'path' }
type HistoryState = {
  dataUrl: string
  points: Point[]
}

enum COLOR {
  RED = '#FF0000',
  GREEN = '#00FF00',
  BLUE = '#0000FF',
  YELLOW = '#FFFF00',
  MAGENTA = '#FF00FF',
}
enum DRAWING_MODE {
  FREEHAND = 'freehand',
  POINTS = 'points',
}
const DEFAULT_ROUTE_COLORS = [COLOR.RED, COLOR.GREEN, COLOR.BLUE, COLOR.YELLOW, COLOR.MAGENTA]
const DEFAULT_STROKE_WIDTH = 6

export default function RouteEditorPage() {
  const [selectedColor, setSelectedColor] = useState('#FF0000')
  const [drawingMode, setDrawingMode] = useState<DRAWING_MODE>(DRAWING_MODE.FREEHAND)
  const [isDrawing, setIsDrawing] = useState(false)
  const [points, setPoints] = useState<Point[]>([])
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 })
  const [history, setHistory] = useState<HistoryState[]>([])
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const container = canvas.parentElement!

      const updateCanvasSize = () => {
        const { width, height } = container.getBoundingClientRect()
        setCanvasSize({ width, height })
        canvas.width = width
        canvas.height = height

        // Initialize context once
        const context = canvas.getContext('2d')
        if (context) {
          context.lineWidth = DEFAULT_STROKE_WIDTH
          context.lineCap = 'round'
          contextRef.current = context

          // Redraw image if exists
          if (selectedImage) {
            const img = new Image()
            img.onload = () => {
              context.drawImage(img, 0, 0, width, height)
            }
            img.src = selectedImage
          }
        }
      }

      updateCanvasSize()
      window.addEventListener('resize', updateCanvasSize)
      return () => window.removeEventListener('resize', updateCanvasSize)
    }
  }, [selectedImage])

  // Update context color separately
  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = selectedColor
      contextRef.current.fillStyle = selectedColor
    }
  }, [selectedImage, selectedColor])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
        if (contextRef.current && canvasRef.current) {
          const img = new Image()
          img.onload = () => {
            contextRef.current!.clearRect(0, 0, canvasSize.width, canvasSize.height)
            contextRef.current!.drawImage(img, 0, 0, canvasSize.width, canvasSize.height)
          }
          img.src = e.target?.result as string
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const saveToHistory = () => {
    if (!canvasRef.current) return

    const newState: HistoryState = {
      dataUrl: canvasRef.current.toDataURL(),
      points: [...points],
    }

    const newHistory = history.slice(0, currentHistoryIndex + 1)
    newHistory.push(newState)

    setHistory(newHistory)
    setCurrentHistoryIndex(newHistory.length - 1)
  }

  const handleClear = (isHistoryUpdated = true) => {
    if (!canvasRef.current || !contextRef.current) return

    const ctx = contextRef.current
    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height)

    // Redraw background image if exists
    if (selectedImage) {
      const img = new Image()
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvasSize.width, canvasSize.height)
      }
      img.src = selectedImage
    }

    setPoints([])
    if (isHistoryUpdated) saveToHistory()
  }

  const handleUndo = () => {
    if (currentHistoryIndex < 0) return

    const newIndex = currentHistoryIndex - 1
    if (newIndex < 0) {
      // Clear to initial state
      handleClear(false)
      setCurrentHistoryIndex(newIndex)
      return
    }

    const previousState = history[newIndex]

    if (previousState && contextRef.current) {
      const img = new Image()
      img.onload = () => {
        contextRef.current!.clearRect(0, 0, canvasSize.width, canvasSize.height)
        contextRef.current!.drawImage(img, 0, 0, canvasSize.width, canvasSize.height)
      }
      img.src = previousState.dataUrl
      setPoints(previousState.points)
      setCurrentHistoryIndex(newIndex)
    }
  }

  const handleRedo = () => {
    if (currentHistoryIndex >= history.length - 1) return

    const newIndex = currentHistoryIndex + 1
    const nextState = history[newIndex]

    if (nextState && contextRef.current) {
      const img = new Image()
      img.onload = () => {
        contextRef.current!.clearRect(0, 0, canvasSize.width, canvasSize.height)
        contextRef.current!.drawImage(img, 0, 0, canvasSize.width, canvasSize.height)
      }
      img.src = nextState.dataUrl
      setPoints(nextState.points)
      setCurrentHistoryIndex(newIndex)
    }
  }

  const startDrawing = ({ nativeEvent }: React.MouseEvent) => {
    const { offsetX, offsetY } = nativeEvent
    if (drawingMode === DRAWING_MODE.FREEHAND) {
      setIsDrawing(true)
      if (contextRef.current) {
        contextRef.current.beginPath()
        contextRef.current.moveTo(offsetX, offsetY)
      }
    } else {
      setPoints([...points, { x: offsetX, y: offsetY, type: 'path' }])
      // Draw point
      if (contextRef.current) {
        contextRef.current.beginPath()
        contextRef.current.arc(offsetX, offsetY, 3, 0, 2 * Math.PI)
        contextRef.current.fill()

        // Draw lines between points
        if (points.length > 0) {
          const lastPoint = points[points.length - 1]
          contextRef.current.beginPath()
          contextRef.current.moveTo(lastPoint.x, lastPoint.y)
          contextRef.current.lineTo(offsetX, offsetY)
          contextRef.current.stroke()
        }
        saveToHistory()
      }
    }
  }

  const draw = ({ nativeEvent }: React.MouseEvent) => {
    if (!isDrawing || drawingMode === DRAWING_MODE.POINTS || !contextRef.current) return
    const { offsetX, offsetY } = nativeEvent
    contextRef.current.lineTo(offsetX, offsetY)
    contextRef.current.stroke()
  }

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false)
      saveToHistory()
    }
  }

  const handleSave = async () => {
    if (!canvasRef.current) return

    try {
      const dataUrl = canvasRef.current.toDataURL('image/png')
      const response = await fetch(dataUrl)
      const blob = await response.blob()
      const file = new File([blob], 'route-drawing.png', { type: 'image/png' })

      await createFile(file)
      toast.success('Route drawing saved successfully')
      navigate(-1)
    } catch {
      toast.error('Failed to save route drawing')
    }
  }

  return (
    <div className="p-4">
      <div className="mb-4 space-y-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="block w-full text-sm text-gray-500"
        />

        <div className="flex gap-4 items-center">
          <div className="flex gap-2">
            {DEFAULT_ROUTE_COLORS.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-8 h-8 rounded-full`}
                style={{
                  backgroundColor: color,
                  border: selectedColor === color ? '2px solid black' : 'none',
                }}
              />
            ))}
          </div>
          <input
            type="color"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="w-8 h-8"
          />
          <select
            value={drawingMode}
            onChange={(e) => setDrawingMode(e.target.value as DRAWING_MODE)}
            className="border rounded px-2 py-1"
          >
            <option value={DRAWING_MODE.FREEHAND}>Freehand</option>
            <option value={DRAWING_MODE.POINTS}>Points</option>
          </select>

          <div className="flex gap-2 ml-4">
            <button
              onClick={handleUndo}
              disabled={currentHistoryIndex < 0}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
              title="Undo"
            >
              ↩
            </button>
            <button
              onClick={handleRedo}
              disabled={currentHistoryIndex >= history.length - 1}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
              title="Redo"
            >
              ↪
            </button>
            <button
              onClick={() => handleClear()}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      <div className="relative border border-gray-300 rounded" style={{ height: '600px' }}>
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          className="absolute top-0 left-0 w-full h-full cursor-crosshair"
          style={{ touchAction: 'none' }}
        />
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <button onClick={() => navigate(-1)} className="px-4 py-2 bg-gray-500 text-white rounded">
          Cancel
        </button>
        <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">
          Save
        </button>
      </div>
    </div>
  )
}
