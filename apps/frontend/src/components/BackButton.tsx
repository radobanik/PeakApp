import { useNavigate } from 'react-router-dom'
import arrowBack from '@/assets/ArrowBack.png'
import { FC } from 'react'

export type BackButtonProps = {
  backRoute: string
}
const BackButon: FC<BackButtonProps> = ({ backRoute }: BackButtonProps) => {
  const navigate = useNavigate()
  const navigateBack = () => {
    navigate(backRoute)
  }

  return (
    <div onClick={navigateBack}>
      <img src={arrowBack} />
    </div>
  )
}

export default BackButon
