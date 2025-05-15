import { InfiniteData, useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { list } from '@/services/communityService'
import { FC } from 'react'
import { CommunitySessionList } from 'backend/src/model/community'
import CommunitySession from './CommunitySession'
import { CommunityVariant } from '@/types/utilsTypes'
import { ListCursorResponse } from '@/types'
import { Button } from './ui/button'

type CommunityPostsProps = {
  variant: CommunityVariant
}
const CommunityPosts: FC<CommunityPostsProps> = (props: CommunityPostsProps) => {
  const pageSize = 2
  const queryClient = useQueryClient()
  const postsQuery = useInfiniteQuery<
    ListCursorResponse<CommunitySessionList>, // Data type of each page
    Error, // Error type
    InfiniteData<ListCursorResponse<CommunitySessionList>>, // Returned data (optional but safer)
    [string, CommunityVariant], // Query key type
    string | null
  >({
    queryKey: ['communityPosts', props.variant],
    queryFn: ({ pageParam = null }) => list(pageParam, pageSize, props.variant),
    getNextPageParam: (lastPage: ListCursorResponse<CommunitySessionList>) =>
      lastPage.hasNextPage ? lastPage.cursorId : null,
    initialPageParam: null,
  })

  const reloadPosts = () => {
    queryClient.removeQueries({ queryKey: ['communityPosts', props.variant] })
    postsQuery.refetch()
  }

  const pages = postsQuery.data?.pages ?? []
  return (
    <div className="flex flex-col items-center w-full space-y-4 mb-5">
      {pages.map((page: ListCursorResponse<CommunitySessionList>) =>
        page.items.map((s: CommunitySessionList) => (
          <CommunitySession
            key={s.id}
            session={s.session}
            likes={s.likes}
            comments={s.comments}
            hasLiked={s.hasLiked}
          />
        ))
      )}
      {postsQuery.isFetching && <p>Loading sessions...</p>}
      {postsQuery.hasNextPage && !postsQuery.isFetching && (
        <Button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={() => postsQuery.fetchNextPage()}
        >
          Load more
        </Button>
      )}
      {postsQuery.isError && (
        <div className="flex flex-col items-center">
          <p>Error loading posts</p>
          <Button
            className="bg-red-500 text-white p-2 rounded"
            onClick={() => postsQuery.fetchNextPage()}
          >
            Retry
          </Button>
        </div>
      )}
    </div>
  )
}

export default CommunityPosts
