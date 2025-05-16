import { AlertDialogDelete } from '@/components/ui/custom/alert-dialog-delete'
import { useContext } from 'react'
import EntityDetailHeader from '@/components/EntityDetailHeader'
import { SessionDetailContext } from '../SessionDetailPage'
import { SessionInputs } from './SessionInputs'

export default function ActivityDetail() {
  const { isDeleteDialogOpen, setIsDeleteDialogOpen, setIsDelete } =
    useContext(SessionDetailContext)

  return (
    <div className="flex flex-col gap-4">
      <AlertDialogDelete
        isOpen={isDeleteDialogOpen}
        setOpen={setIsDeleteDialogOpen}
        setDelete={setIsDelete}
      />
      <EntityDetailHeader />
      <SessionInputs />
    </div>
  )
}
