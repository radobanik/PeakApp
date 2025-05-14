import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { useState } from 'react'
import { Label } from '../ui/label'
import { resolveReport } from '@/services/reportService'
import { toast } from 'sonner'
import { Textarea } from '../ui/textarea'

type FormData = {
  resolution: string
}

type ReportResolveDialogProps = {
  open: boolean
  setOpen: (open: boolean) => void
  reportId: string
  onResolve: () => void
}
const ReportResolveDialog = (props: ReportResolveDialogProps) => {
  const { register, handleSubmit } = useForm<FormData>()
  const [wasResolved, setWasResolved] = useState(false)

  const onSubmit = (data: FormData) => {
    resolveReport(props.reportId, data.resolution)
      .then(() => {
        setWasResolved(true)
        props.onResolve()
      })
      .catch((error) => {
        toast.error(error.message)
      })
  }

  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Report resolution</DialogTitle>
        </DialogHeader>
        {wasResolved && (
          <div className="text-green-500">
            Report was resolved successfully. You can close this dialog.
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          {!wasResolved && (
            <div className="flex flex-col space-y-2">
              <Label htmlFor="name">Resolution</Label>
              <Textarea
                className="h-30"
                id="resolution"
                {...register('resolution', { required: true })}
              />
            </div>
          )}
          <DialogFooter className="mt-5">
            <Button type="button" onClick={() => props.setOpen(false)} variant="outline">
              Cancel
            </Button>
            {!wasResolved && <Button type="submit">Confirm</Button>}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
export default ReportResolveDialog
