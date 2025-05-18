import { Separator } from '@/components/ui/separator'
import { ROUTE } from '@/constants/routes'
import { Link } from 'react-router-dom'

export default function BackfofficePage() {
  return (
    <div className="flex flex-col">
      <div className="h-20 text-4xl">
        <h1>Back office</h1>
      </div>
      <ul className="list-none text-2xl space-y-5">
        <li>
          <Link to={ROUTE.NEW_CLIMBING_OBJECTS}>Review new objects</Link>
        </li>
        <li>
          <Link to={ROUTE.NEW_ROUTES}>Review new routes</Link>
        </li>
        <li>
          <Link to={ROUTE.NEW_ROUTES}>Review reports</Link>
        </li>
        <Separator orientation="horizontal" />
        <li>
          <Link to={ROUTE.NEW_ROUTES}>View all objects</Link>
        </li>
        <li>
          <Link to={ROUTE.NEW_ROUTES}>View all routes</Link>
        </li>
        <li>
          <Link to={ROUTE.NEW_ROUTES}>View all users</Link>
        </li>
        <Separator orientation="horizontal" />
        <li>
          <Link to={ROUTE.NEW_ROUTES}>Analytics</Link>
        </li>
      </ul>
    </div>
  )
}
