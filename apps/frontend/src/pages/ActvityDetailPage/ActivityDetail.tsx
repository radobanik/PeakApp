import { AlertDialogDelete } from '@/components/ui/custom/alert-dialog-delete'
import { useContext } from 'react'
import { ActivityDetailContext } from '../ActivityDetailPage'
import EntityDetailHeader from '@/components/EntityDetailHeader'
import ActivityMeta from './ActivityMeta'
import { ActivityInputs } from './ActivityInputs'

export default function ActivityDetail() {
  const { isDeleteDialogOpen, setIsDeleteDialogOpen, setIsDelete } =
    useContext(ActivityDetailContext)

  return (
    <div className="flex flex-col gap-4">
      <AlertDialogDelete
        isOpen={isDeleteDialogOpen}
        setOpen={setIsDeleteDialogOpen}
        setDelete={setIsDelete}
      />
      <EntityDetailHeader />
      <ActivityMeta />
      <ActivityInputs />
    </div>
  )
}
