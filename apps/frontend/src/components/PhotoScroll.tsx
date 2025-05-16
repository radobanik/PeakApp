import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { Button } from './ui/button'
import TrashIcon from './svg/TrashIcon'
import EyeDetailIcon from './svg/EyeDetailIcon'
import PhotoDetailDialog, { PhotoDetailDialogMedia } from './PhotoDetailDialog'
import noBoulderPhoto from '@/assets/NoBoulderPhoto.jpg'
import VideoIcon from './svg/VideoIcon'
import { PeakFile } from '@/types/fileTypes'
import { createFile } from '@/services/fileService'
import PlusIcon from './svg/PlusIcon'

type PhotoScrollProps = {
  media: PeakFile[]
  setMedia: (files: PeakFile[]) => void
  editable: boolean
}

const PhotoScroll: FC<PhotoScrollProps> = ({ media, setMedia, editable }: PhotoScrollProps) => {
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const defaultMedia = { url: noBoulderPhoto, contentType: 'image/jpg' }
  const [selectedMedia, setSelectedMedia] = useState<PhotoDetailDialogMedia>(defaultMedia)
  const [selectedMediaId, setSelectedMediaId] = useState<string | null>('')
  const [rootHeight, setRootHeight] = useState<number>(0)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const rootRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    console.log('rootRef.current?.offsetHeight', rootRef.current?.offsetHeight)
    setRootHeight(rootRef.current?.offsetHeight || 0)
  }, [rootRef.current?.offsetHeight])

  const handleOpenDetailDialog = (media: PhotoDetailDialogMedia) => {
    setSelectedMedia(media)
    setIsDetailDialogOpen(true)
  }

  const handleCloseDetailDialog = (open: boolean) => {
    setIsDetailDialogOpen(open)
    if (!open) setSelectedMedia(defaultMedia)
  }

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      handleMediaCreation(files[0])
      const peakFile: PeakFile = await createFile(files[0])
      setMedia([...media, peakFile])
      event.target.value = ''
    }
  }

  const handleMediaCreation = async (file: File) => {
    const peakFile: PeakFile = await createFile(file)
    setMedia([peakFile, ...media])
    // TODO hanging file when changes are not saved
  }

  const handleMediaDeletion = async (fileToDelete: PeakFile) => {
    setMedia(media.filter((file) => file.id !== fileToDelete.id))
    // TODO hanging file when changes are saved
  }

  const handleMediaClick = (fileId: string) => {
    setSelectedMediaId(selectedMediaId === fileId ? null : fileId)
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="w-full h-full">
      {/* --- Render the scrollable area with media items --- */}
      <ScrollArea className="w-full h-full rounded-lg m-4" ref={rootRef}>
        {/* Scrollable area */}
        <div className="flex w-full h-full space-x-4  items-center">
          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*,video/*"
          />

          {/* Add new media square */}
          {editable && (
            <div
              className="bg-gray-200 rounded-lg flex items-center justify-center cursor-pointer active:bg-gray-300 transition-colors duration-300"
              onClick={triggerFileInput}
              style={{ height: rootHeight, width: rootHeight }}
            >
              <PlusIcon size="50%" />
            </div>
          )}

          {/* MEDIA */}
          {media.map((file) => (
            /* Media container */
            <div
              key={file.id}
              className="group relative overflow-hidden flex-shrink-0 rounded-lg cursor-pointer"
              onClick={(e) => {
                e.stopPropagation()
                handleMediaClick(file.id)
              }}
              style={{ height: rootHeight, width: rootHeight }}
            >
              {file.contentType.startsWith('image/') ? (
                /* Image */
                <img
                  src={file.url}
                  className={`h-full w-full object-cover transition-transform duration-200 ${selectedMediaId === file.id ? 'scale-110' : ''}`}
                />
              ) : (
                /* Video with icon */
                <div className="relative h-full w-full flex items-center justify-center">
                  <video
                    src={file.url}
                    className={`h-full w-full object-cover transition-transform duration-200 ${selectedMediaId === file.id ? 'scale-110' : ''}`}
                  />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2 w-1/2">
                    <VideoIcon />
                  </div>
                </div>
              )}

              {/* Overlay with Detail + Edit */}
              <div
                className={`absolute inset-0 transition-opacity duration-200 ${selectedMediaId === file.id ? 'opacity-100' : 'opacity-0'}`}
              >
                {/* Button container */}
                <div
                  className={`h-full w-full flex items-center justify-center gap-4 z-50 relative ${selectedMediaId === file.id ? '' : 'hidden'}`}
                >
                  <Button type="button" onClick={() => handleOpenDetailDialog(file)}>
                    <EyeDetailIcon />
                  </Button>
                  {editable && (
                    <Button
                      type="button"
                      variant={'destructive'}
                      onClick={() => {
                        handleMediaDeletion(file)
                      }}
                    >
                      <TrashIcon />
                    </Button>
                  )}
                </div>
                {/* div for changing bg color when hovered on */}
                <div className="absolute inset-0  bg-gray-700 opacity-50 z-10" />
              </div>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {/* --- Render the PhotoDetailDialog component --- */}
      <PhotoDetailDialog
        isOpen={isDetailDialogOpen}
        onOpenChange={handleCloseDetailDialog}
        media={selectedMedia}
      />
    </div>
  )
}

export default PhotoScroll
