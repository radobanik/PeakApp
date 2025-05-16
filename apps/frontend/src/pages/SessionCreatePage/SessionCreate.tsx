import { AlertDialogCancel_ } from '@/components/ui/custom/alert-dialog-cancel'
import { NewSessionContext } from '../SessionCreate'
import { useContext } from 'react'
import { ROUTE } from '@/constants/routes'
import BackButon from '@/components/BackButton'
import SessionCreateActivities from './SessionCreateActivities'
import SessionCreateInputs from './SessionCreateInputs'

export default function SessionCreatePage() {
  const { isOpen, setIsOpen, currentView } = useContext(NewSessionContext)
  return (
    <div className="flex flex-col gap-4l">
      <AlertDialogCancel_ isOpen={isOpen} setIsOpen={setIsOpen} backRoute={ROUTE.SESSIONS} />
      <div className="flex flex-row justify-left p-4 gap-4">
        <BackButon backRoute={ROUTE.DIARY} operation={() => setIsOpen(true)} />
        <h1 className="text-2xl">New Session</h1>
      </div>
      {currentView === 'activites' && <SessionCreateActivities />}
      {currentView === 'inputs' && <SessionCreateInputs />}
    </div>
  )
}
