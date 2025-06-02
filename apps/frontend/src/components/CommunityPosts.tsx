import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query'
import { list } from '@/services/communityService'
import { FC } from 'react'
import CommunitySession from './CommunitySession'
import { CommunityVariant } from '@/types/utilsTypes'
import { ListCursorResponse } from '@/types'
import { Button } from './ui/button'
import { SessionCommunityList } from '@/types/sessionTypes'

type CommunityPostsProps = {
  variant: CommunityVariant
}
const CommunityPosts: FC<CommunityPostsProps> = (props: CommunityPostsProps) => {
  const pageSize = 2
  const postsQuery = useInfiniteQuery<
    ListCursorResponse<SessionCommunityList>, // Data type of each page
    Error, // Error type
    InfiniteData<ListCursorResponse<SessionCommunityList>>, // Returned data (optional but safer)
    [string, CommunityVariant], // Query key type
    string | null
  >({
    queryKey: ['communityPosts', props.variant],
    queryFn: ({ pageParam = null }) => list(pageParam, pageSize, props.variant),
    getNextPageParam: (lastPage: ListCursorResponse<SessionCommunityList>) =>
      lastPage.hasNextPage ? lastPage.cursorId : null,
    initialPageParam: null,
  })

  const pages = postsQuery.data?.pages ?? []
  return (
    <div className="flex flex-col items-center w-full space-y-4 mb-5">
      {pages.map((page: ListCursorResponse<SessionCommunityList>) =>
        page.items.map((session: SessionCommunityList) => (
          <CommunitySession key={session.id} session={session} />
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
