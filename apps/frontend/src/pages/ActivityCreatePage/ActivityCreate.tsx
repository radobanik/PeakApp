import ActivityMeta from './ActivityMeta'
import { ActivityInputs } from './ActivityInputs'
import BackButon from '@/components/BackButton'
import { ROUTE } from '@/constants/routes'
import { NewActivityContext } from '../ActivityCreatePage'
import { useContext } from 'react'
import { AlertDialogCancel_ } from '@/components/ui/custom/alert-dialog-cancel'

export default function ActivityCreate() {
  const { isOpen, setIsOpen } = useContext(NewActivityContext)

  return (
    <div className="flex flex-col gap-4">
      <AlertDialogCancel_ isOpen={isOpen} setIsOpen={setIsOpen} backRoute={ROUTE.ACTIVITIES} />
      <div className="flex flex-row justify-left p-4 gap-4">
        <BackButon backRoute={ROUTE.DIARY} operation={() => setIsOpen(true)} />
        <h1 className="text-2xl">Create Activity</h1>
      </div>
      <ActivityMeta />
      <ActivityInputs />
    </div>
  )
}
