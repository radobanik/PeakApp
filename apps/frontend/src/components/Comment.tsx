import { Avatar, AvatarImage } from '@/components/ui/avatar'
import UserAvatar from '@/assets/diddy.webp'
import { CommentList } from 'backend/src/model/comment'
import { formatDistanceToNow } from 'date-fns'
import { FC, useEffect, useRef, useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DeleteIcon, EditIcon, MoreVertical } from 'lucide-react'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { toast } from 'sonner'

export type CommentProps = {
  onEdit: (text: string) => void
  onDelete: () => void
} & CommentList

const Comment: FC<CommentProps> = (props: CommentProps) => {
  const [isEdit, setIsEdit] = useState(false)
  const [text, setText] = useState(props.text)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [showToggle, setShowToggle] = useState(false)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = textRef.current
    if (el && el.scrollHeight > el.clientHeight) {
      setShowToggle(true)
    }
  })

  return (
    <div className="flex flex-col bg-gray-100 p-2 rounded-md">
      <div className="flex flex-row w-full items-center">
        <div className="flex-1 flex flex-row space-x-2 items-center">
          <Avatar className="h-12 w-12 flex justify-center items-center">
            <AvatarImage src={UserAvatar}></AvatarImage>
          </Avatar>
          <p className="text-md font-bold">{props.user.userName}</p>
          <p>•</p>
          <p className="text-sm">
            {formatDistanceToNow(new Date(props.createdAt), { addSuffix: true })}
          </p>
        </div>
        {props.canEdit && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <MoreVertical className="cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-30">
              <DropdownMenuItem className="font-semibold" onClick={() => setIsEdit(true)}>
                <EditIcon />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="font-semibold text-red-500"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <DeleteIcon />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      {isEdit ? (
        <div className="flex flex-col mt-2">
          <Textarea
            className="w-full h-50 p-2 rounded-md border border-gray-300"
            value={text}
            maxLength={500}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="flex flex-row justify-end">
            <Button
              className="bg-red-500 text-white p-2 rounded-md mt-2 mr-2"
              onClick={() => {
                setIsEdit(false)
                setText(props.text)
              }}
            >
              Cancel
            </Button>
            <Button
              className="bg-blue-500 text-white p-2 rounded-md mt-2"
              onClick={() => {
                if (text.length === 0 || text.length > 500) {
                  toast.warning('Comment must be between 1 and 500 characters')
                  return
                }
                setIsEdit(false)
                props.onEdit(text)
              }}
            >
              Save
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div
            ref={textRef}
            className={`text-sm mt-2 whitespace-pre-line transition-all ${
              expanded ? '' : 'line-clamp-3'
            }`}
          >
            {text}
          </div>
          {showToggle && (
            <Button
              variant="link"
              onClick={() => setExpanded((prev) => !prev)}
              className="text-xs mt-1 text-blue-500 hover:underline"
            >
              {expanded ? 'Show less' : 'Show more'}
            </Button>
          )}
        </>
      )}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="w-[400px] flex flex-col items-center justify-center">
          <DialogHeader>
            <DialogTitle>
              <p className="text-lg font-bold">Comment deletion</p>
            </DialogTitle>
          </DialogHeader>
          Are you sure you want to delete this comment?
          <DialogFooter className="flex flex-col w-full">
            <Button
              variant="outline"
              className="bg-gray-300 text-black p-2 rounded-md mt-2 min-w-20"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="outline"
              className="bg-red-500 text-white p-2 rounded-md mt-2 mr-2 min-w-20"
              onClick={() => {
                setIsDeleteDialogOpen(false)
                props.onDelete()
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Comment
