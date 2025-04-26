import arrowBack from '@/assets/ArrowBack.png'
import { FC } from 'react'
import { Link } from 'react-router-dom'

export type BackButtonProps = {
  backRoute: string
}
const BackButon: FC<BackButtonProps> = ({ backRoute }: BackButtonProps) => {
  return (
    <Link to={backRoute}>
      <img src={arrowBack} />
    </Link>
  )
}

export default BackButon
