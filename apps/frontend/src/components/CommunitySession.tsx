import NoBoulderPhoto from '@/assets/NoBoulderPhoto.jpg'
import { SessionList } from 'backend/src/model/session'
import { FC, useState } from 'react'
import { Avatar } from '@radix-ui/react-avatar'
import { AvatarImage } from './ui/avatar'
import diddyPfp from '@/assets/diddy.webp'
import { Separator } from './ui/separator'
import { Link } from 'react-router-dom'
import { ROUTE } from '@/constants/routes'
import Like from './Like'

export type CommunitySessionProps = {
  session: SessionList
  likes: number
  comments: number
  hasLiked: boolean
}

const CommunitySession: FC<CommunitySessionProps> = (props: CommunitySessionProps) => {
  return (
    <Link to={ROUTE.COMMUNITY_DETAIL(props.session.id)}>
      <div className="min-w-[200px] max-w-[400px] flex flex-col">
        <img src={NoBoulderPhoto}></img>
        <div className="flex flex-col bg-gray-100 p-2">
          <p className="text-md font-bold">{props.session.id}</p>
          <div className="flex flex-row items-center">
            <div className="flex-1 flex flex-row items-center">
              <Avatar className="h-12 flex justify-center items-center ">
                <AvatarImage src={diddyPfp} className="h-full rounded-full" />
              </Avatar>
              <p className="text-sm font-bold ml-2">{props.session.createdBy.userName}</p>
            </div>
            <p className="text-sm font-bold">
              {new Date(props.session.createdAt).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>
          <Separator className="my-2" />
          <div className="flex flex-row">
            <Like
              likes={props.likes}
              hasLiked={props.hasLiked}
              sessionId={props.session.id}
              className="flex-1"
            />
            <p>
              {props.comments} comment{props.comments !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CommunitySession
