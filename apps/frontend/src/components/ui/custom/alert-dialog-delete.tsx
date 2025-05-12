import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface AlertDialogProps {
  isOpen: boolean
  setOpen: (value: boolean) => void
  setDelete: (value: boolean) => void
}

export function AlertDialogDelete(props: AlertDialogProps) {
  return (
    <AlertDialog open={props.isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => props.setOpen(false)}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => props.setDelete(true)}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
