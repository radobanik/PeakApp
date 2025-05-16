import arrowBack from '@/assets/ArrowBack.png'
import { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'

export type BackButtonProps = {
  backRoute: string
  operation?: () => void
}
const BackButon: FC<BackButtonProps> = ({ backRoute, operation }: BackButtonProps) => {
  const location = useLocation()
  if (operation == undefined) {
    return (
      <Link to={location.state?.from || backRoute}>
        <img src={arrowBack} />
      </Link>
    )
  }

  return <img src={arrowBack} onClick={operation} />
}

export default BackButon
