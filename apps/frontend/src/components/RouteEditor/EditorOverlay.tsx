import { useState, useRef, useEffect } from 'react'
import { createFile } from '@/services/fileService'
import { toast } from 'sonner'

type Point = { x: number; y: number; type?: 'start' | 'end' | 'path' }
type HistoryState = {
  dataUrl: string
  points: Point[]
  start: Point | null
  end: Point | null
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

type EditorOverlayProps = {
  onClose: () => void
  onSave: (fileId: string) => void
  initialImage?: string
}

export function EditorOverlay({ onClose, onSave, initialImage }: EditorOverlayProps) {
  const [selectedColor, setSelectedColor] = useState(COLOR.RED)
  const [drawingMode, setDrawingMode] = useState<DRAWING_MODE>(DRAWING_MODE.FREEHAND)
  const [isDrawing, setIsDrawing] = useState(false)
  const [points, setPoints] = useState<Point[]>([])
  const [selectedImage, setSelectedImage] = useState<string | null>(initialImage || null)
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 })
  const [history, setHistory] = useState<HistoryState[]>([])
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1)
  const [placingStart, setPlacingStart] = useState(false)
  const [placingEnd, setPlacingEnd] = useState(false)
  const [startPoint, setStartPoint] = useState<Point | null>(null)
  const [endPoint, setEndPoint] = useState<Point | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)

  const loadImage = (imageSrc: string, width: number, height: number) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'

    img.onload = () => {
      if (!canvasRef.current || !contextRef.current) return

      contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
      contextRef.current.drawImage(img, 0, 0, width, height)
    }

    img.src = imageSrc
  }

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const container = canvas.parentElement!

      const updateCanvasSize = () => {
        const { width, height } = container.getBoundingClientRect()
        setCanvasSize({ width, height })
        canvas.width = width
        canvas.height = height

        const context = canvas.getContext('2d')
        if (context) {
          context.lineWidth = DEFAULT_STROKE_WIDTH
          context.lineCap = 'round'
          contextRef.current = context

          // Redraw image if exists
          if (selectedImage) {
            loadImage(selectedImage, width, height)
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
        const dataUrl = e.target?.result as string
        setSelectedImage(dataUrl)
        if (contextRef.current && canvasRef.current) {
          loadImage(dataUrl, canvasSize.width, canvasSize.height)
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
      start: startPoint,
      end: endPoint,
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

    if (selectedImage) {
      loadImage(selectedImage, canvasSize.width, canvasSize.height)
    }

    setStartPoint(null)
    setEndPoint(null)
    setPoints([])
    if (isHistoryUpdated) saveToHistory()
  }

  const drawPoint = (x: number, y: number, type: 'start' | 'end' | 'path') => {
    if (!contextRef.current) return

    const ctx = contextRef.current
    const radius = 15

    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 2 * Math.PI)
    ctx.fillStyle = 'white'
    ctx.fill()
    ctx.strokeStyle = selectedColor
    ctx.lineWidth = 3
    ctx.stroke()

    ctx.fillStyle = selectedColor
    ctx.font = '16px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    if (type === 'start') {
      ctx.fillText('S', x, y)
    } else if (type === 'end') {
      ctx.fillText('⚑', x, y)
    }

    ctx.lineWidth = DEFAULT_STROKE_WIDTH
  }

  const handleCanvasClick = ({ nativeEvent }: React.MouseEvent) => {
    const { offsetX, offsetY } = nativeEvent

    if (placingStart) {
      const newPoint = { x: offsetX, y: offsetY, type: 'start' as const }
      setStartPoint(newPoint)
      drawPoint(offsetX, offsetY, 'start')
      setPlacingStart(false)
      saveToHistory()
      return
    }

    if (placingEnd) {
      const newPoint = { x: offsetX, y: offsetY, type: 'end' as const }
      setEndPoint(newPoint)
      drawPoint(offsetX, offsetY, 'end')
      setPlacingEnd(false)
      saveToHistory()
      return
    }
  }

  const handleUndo = () => {
    if (currentHistoryIndex < 0) return

    const newIndex = currentHistoryIndex - 1
    if (newIndex < 0) {
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
      if (previousState.start) {
        setStartPoint(previousState.start)
        drawPoint(previousState.start.x, previousState.start.y, 'start')
      }
      if (previousState.end) {
        setEndPoint(previousState.end)
        drawPoint(previousState.end.x, previousState.end.y, 'end')
      }
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
    if (placingStart || placingEnd) return
    const { offsetX, offsetY } = nativeEvent

    if (drawingMode === DRAWING_MODE.FREEHAND) {
      setIsDrawing(true)
      if (contextRef.current) {
        contextRef.current.beginPath()
        contextRef.current.moveTo(offsetX, offsetY)
      }
    } else {
      setPoints([...points, { x: offsetX, y: offsetY, type: 'path' }])
      if (contextRef.current) {
        contextRef.current.beginPath()
        contextRef.current.arc(offsetX, offsetY, 3, 0, 2 * Math.PI)
        contextRef.current.fill()

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

      const uploadedFile = await createFile(file)
      toast.success('Route drawing saved successfully')
      onSave(uploadedFile.id)
    } catch {
      toast.error('Failed to save route drawing')
    }
  }

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-auto p-4">
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
              onChange={(e) => setSelectedColor(e.target.value as COLOR)}
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
                onClick={() => setPlacingStart(true)}
                disabled={placingEnd || startPoint !== null}
                className={`px-3 py-1 ${
                  placingStart ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                } rounded`}
                title="Place start point"
              >
                Start Point
              </button>
              <button
                onClick={() => setPlacingEnd(true)}
                disabled={placingStart || endPoint !== null}
                className={`px-3 py-1 ${
                  placingEnd ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                } rounded`}
                title="Place end point"
              >
                End Point
              </button>
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
            onClick={handleCanvasClick}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            className="absolute top-0 left-0 w-full h-full"
            style={{
              touchAction: 'none',
              cursor: placingStart || placingEnd ? 'crosshair' : 'default',
            }}
          />
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">
            Cancel
          </button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
