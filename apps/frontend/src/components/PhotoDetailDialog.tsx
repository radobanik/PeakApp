import { FC } from 'react'
import { Dialog, DialogContent, DialogOverlay } from '@/components/ui/dialog'

export type PhotoDetailDialogProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  media: PhotoDetailDialogMedia
}

export type PhotoDetailDialogMedia = {
  url: string
  contentType: string
}

const PhotoDetailDialog: FC<PhotoDetailDialogProps> = ({ isOpen, onOpenChange, media }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogOverlay />
      <DialogContent className="overflow-hidden">
        <div className="flex items-center justify-center p-4">
          {media.contentType.startsWith('image/') ? (
            <img src={media.url} className="object-contain" />
          ) : (
            <video src={media.url} controls className="object-contain">
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PhotoDetailDialog
