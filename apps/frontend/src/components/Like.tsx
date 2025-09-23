import { like, unlike } from '@/services/communityService'
import { useMutation } from '@tanstack/react-query'
import { FC, useState } from 'react'
import { toast } from 'sonner'
import LikeIcon from '@/components/svg/LikeIcon'
import { cn } from '@/lib/utils'

export type LikeProps = {
  likes: number
  hasLiked: boolean
  sessionId: string
  onLikeChange?: () => void
  className?: string
}

const Like: FC<LikeProps> = (props: LikeProps) => {
  const [likeStatus, setLikeStatus] = useState(props.hasLiked)
  const [likes, setLikes] = useState(props.likes)

  const likeMutation = useMutation({
    mutationFn: () => (likeStatus ? unlike(props.sessionId) : like(props.sessionId)),
    onSuccess: () => {
      if (likeStatus) {
        if (props.onLikeChange) {
          props.onLikeChange()
        }
        setLikes((prev) => prev - 1)
      } else {
        if (props.onLikeChange) {
          props.onLikeChange()
        }
        setLikes((prev) => prev + 1)
      }
      setLikeStatus((prev) => !prev)
    },
    onError: () => {
      toast.error('Error liking session')
    },
  })
  return (
    <div className={cn('flex flex-row items-center space-x-2 flex-wrap', props.className)}>
      <div
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          likeMutation.mutate()
        }}
      >
        <LikeIcon liked={likeStatus} size="25px" />
      </div>
      <p>{likes}</p>
    </div>
  )
}

export default Like
