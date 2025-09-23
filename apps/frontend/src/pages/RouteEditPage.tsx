import { useNavigate } from 'react-router-dom'
import RouteDetailPage from './RouteDetailPage'

export default function RouteEditPage() {
  const navigate = useNavigate()

  return (
    <div>
      <div className="p-4">
        <button onClick={() => navigate(-1)} className="px-4 py-2 bg-secondary-background rounded">
          ← Back
        </button>
      </div>
      <RouteDetailPage allowEdit={true} />
    </div>
  )
}
