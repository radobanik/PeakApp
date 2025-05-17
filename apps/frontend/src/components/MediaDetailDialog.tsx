import { FC } from 'react'
import { Dialog, DialogContent, DialogOverlay, DialogTitle } from '@/components/ui/dialog'
import noBoulderPhoto from '@/assets/NoBoulderPhoto.jpg'
import { PeakFile } from '@/types/fileTypes'

type MediaDetailDialogProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  media: PeakFile | null
}

const MediaDetailDialog: FC<MediaDetailDialogProps> = ({ isOpen, onOpenChange, media }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogOverlay />
      <DialogContent className="overflow-hidden flex items-center justify-center flex-col">
        <DialogTitle>Detail</DialogTitle>
        <div className="flex items-center justify-center p-4">
          {media?.contentType.startsWith('image/') ? (
            <img src={media.url} className="object-contain max-h-[80vh]" />
          ) : media?.contentType.startsWith('video/') ? (
            <video src={media.url} controls className="object-contain max-h-[80vh]">
              Your browser does not support the video tag.
            </video>
          ) : (
            <img src={noBoulderPhoto} className="object-contain max-h-[80vh]" />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default MediaDetailDialog
