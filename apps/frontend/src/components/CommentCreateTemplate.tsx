import { FC, useState } from 'react'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { toast } from 'sonner'

export type CommentProps = {
  onCreate: (text: string) => void
  onCancel: () => void
}

const Comment: FC<CommentProps> = (props: CommentProps) => {
  const [text, setText] = useState('')

  return (
    <div className="flex flex-col bg-secondary-background p-2 rounded-md">
      <div className="flex flex-row w-full items-center"></div>
      <div className="flex flex-col mt-2">
        <Textarea
          className="w-full h-30 p-2 rounded-md border border-gray-300"
          value={text}
          maxLength={500}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="flex flex-row justify-end">
          <Button
            className="bg-red-500 text-white p-2 rounded-md mt-2 mr-2"
            onClick={() => {
              props.onCancel()
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
              props.onCreate(text)
            }}
          >
            Create
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Comment
