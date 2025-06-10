import { create, list, remove, update } from '@/services/commentService'
import { InfiniteData, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { CommentList } from 'backend/src/model/comment'
import { ListCursorResponse } from 'backend/src/model/common/listCursorResponse'
import Comment from '@/components/Comment'
import { FC, useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import CommentCreateTemplate from '@/components/CommentCreateTemplate'

type CommentListProps = {
  sessionId: string
  className?: string
}

const CommentListing: FC<CommentListProps> = ({ sessionId, className }: CommentListProps) => {
  const [isCreateActive, setIsCreateActive] = useState(false)

  const commentsQuery = useInfiniteQuery<
    ListCursorResponse<CommentList>,
    Error,
    InfiniteData<ListCursorResponse<CommentList>>,
    [string, string],
    string | null
  >({
    queryKey: ['comments', sessionId],
    queryFn: async ({ pageParam = null }) => list(sessionId, pageParam, 2),
    getNextPageParam: (lastPage) => lastPage.cursorId,
    initialPageParam: null,
  })

  const queryClient = useQueryClient()

  const editMutation = useMutation({
    mutationFn: ({ id, text }: { id: string; text: string }) => update(id, text),
    onSuccess: (d: CommentList) => {
      queryClient.setQueryData(
        ['comments', sessionId],
        (oldData: InfiniteData<ListCursorResponse<CommentList>>) => {
          if (!oldData) return oldData
          const newPages = oldData.pages.map((page: ListCursorResponse<CommentList>) => {
            const newItems = page.items.map((item) => {
              if (item.id === d.id) {
                return { ...item, text: d.text }
              }
              return item
            })
            return { ...page, items: newItems }
          })
          return { ...oldData, pages: newPages }
        }
      )
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (commentId: string) => remove(commentId),
    onSuccess: (_, commentId) => {
      queryClient.setQueryData(
        ['comments', sessionId],
        (oldData: InfiniteData<ListCursorResponse<CommentList>>) => {
          if (!oldData) return oldData
          const newPages = oldData.pages.map((page: ListCursorResponse<CommentList>) => {
            const newItems = page.items.filter((item) => item.id !== commentId)
            return { ...page, items: newItems }
          })
          return { ...oldData, pages: newPages }
        }
      )
    },
  })

  const createMutation = useMutation({
    mutationFn: (text: string) => create(sessionId, text),
    onSuccess: (d: CommentList) => {
      queryClient.setQueryData(
        ['comments', sessionId],
        (oldData: InfiniteData<ListCursorResponse<CommentList>>) => {
          const newData = {
            pages: [
              { items: [d], cursorId: d.id, hasNextPage: oldData && oldData.pages.length > 0 },
              ...oldData.pages,
            ],
            pageParams: [null, ...oldData.pageParams],
          }
          return newData
        }
      )
    },
  })

  const data = commentsQuery.data ?? { pages: [] }

  return (
    <div className={cn('p-2 flex flex-col h-full', className)}>
      <div className="flex flex-row justify-center mb-2">
        <Button variant="outline" onClick={() => setIsCreateActive(true)}>
          Add new comment
        </Button>
      </div>
      <div className="flex flex-col space-y-2 flex-1 overflow-y-auto px-2">
        {isCreateActive && (
          <CommentCreateTemplate
            onCreate={(text) => {
              createMutation.mutate(text)
              setIsCreateActive(false)
            }}
            onCancel={() => {
              setIsCreateActive(false)
            }}
          />
        )}
        {data.pages.map((page: ListCursorResponse<CommentList>) =>
          page.items.map((comment) => (
            <Comment
              key={comment.id}
              {...comment}
              onEdit={(text) => editMutation.mutate({ id: comment.id, text })}
              onDelete={() => deleteMutation.mutate(comment.id)}
            />
          ))
        )}
        {commentsQuery.isFetching && (
          <div className="flex justify-center items-center">Loading...</div>
        )}
        {commentsQuery.isError && (
          <div className="flex flex-col justify-center items-center">
            <p>Error loading comments.</p>
            <Button variant="outline" onClick={() => commentsQuery.fetchNextPage()}>
              Try again
            </Button>
          </div>
        )}
        {commentsQuery.isSuccess && commentsQuery.hasNextPage && (
          <div className="flex justify-center items-center">
            <Button
              className="bg-blue-500 text-white p-2 rounded"
              onClick={() => commentsQuery.fetchNextPage()}
            >
              Load more
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CommentListing
