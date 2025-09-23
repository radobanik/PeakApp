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
import { useNavigate } from 'react-router-dom'

interface AlertDialogProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  backRoute: string
}

export function AlertDialogCancel_(props: AlertDialogProps) {
  const navigate = useNavigate()
  return (
    <AlertDialog open={props.isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to exit?</AlertDialogTitle>
          <AlertDialogDescription>You will lose all entered data.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => props.setIsOpen(false)}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
            onClick={() => {
              props.setIsOpen(false)
              navigate(props.backRoute)
            }}
          >
            Proceed
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
