import { getSession, listComments } from '@/services/communityService'
import { ListCursorResponse } from '@/types'
import { InfiniteData, useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { CommentList } from 'backend/src/model/comment'
import { get } from 'http'
import { useParams } from 'react-router-dom'

export default function CommunitySessionDetailPage() {
  const params = useParams()
  const commentPageSize = 5
  const sessionQuery = useQuery({
    queryKey: ['community_session-detail', params.id],
    queryFn: () => getSession(params.id!),
    enabled: !!params.id,
  })

  const commentsQuery = useInfiniteQuery<
    ListCursorResponse<CommentList>,
    Error,
    InfiniteData<ListCursorResponse<CommentList>>,
    [string, string],
    string | null
  >({
    queryKey: ['comments', params.id!],
    queryFn: ({ pageParam = null }) => listComments(params.id!, pageParam, commentPageSize),
    getNextPageParam: (lastPage: ListCursorResponse<CommentList>) =>
      lastPage.hasNextPage ? lastPage.cursorId : null,
    initialPageParam: null,
  })

  return
}
