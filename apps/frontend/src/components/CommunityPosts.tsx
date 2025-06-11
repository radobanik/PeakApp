import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query'
import { list } from '@/services/communityService'
import { FC } from 'react'
import CommunitySession from './CommunitySession'
import { CommunityVariant } from '@/types/utilsTypes'
import { ListCursorResponse } from '@/types'
import { Button } from './ui/button'
import { SessionCommunityList } from '@/types/sessionTypes'
import { RecommenderCategory } from '@/pages/CommunityPageLayout'
import { createContext, useContext } from 'react'

type CommunityPostsContextType = {
  updateList: (postId: string) => void
  tick: number
}

export const CommunityPostsContext = createContext<CommunityPostsContextType | null>(null)

export const useCommunityPostsContext = () => {
  const ctx = useContext(CommunityPostsContext)
  if (!ctx) throw new Error('useCommunityPostsContext must be used within provider')
  return ctx
}

type CommunityPostsProps = {
  variant: CommunityVariant
  selectedCategories: RecommenderCategory[]
}

const CommunityPosts: FC<CommunityPostsProps> = ({
  variant,
  selectedCategories,
}: CommunityPostsProps) => {
  const pageSize = 2
  const postsQuery = useInfiniteQuery<
    ListCursorResponse<SessionCommunityList>, // Data type of each page
    Error, // Error type
    InfiniteData<ListCursorResponse<SessionCommunityList>>, // Returned data (optional but safer)
    [string, CommunityVariant, RecommenderCategory[]], // Query key type
    string | null
  >({
    queryKey: ['communityPosts', variant, selectedCategories],
    queryFn: ({ pageParam = null }) => list(pageParam, pageSize, variant, selectedCategories),
    getNextPageParam: (lastPage: ListCursorResponse<SessionCommunityList>) =>
      lastPage.hasNextPage ? lastPage.cursorId : null,
    initialPageParam: null,
  })

  const pages = postsQuery.data?.pages ?? []
  return (
    <div className="flex flex-col items-center w-full space-y-4 mb-5">
      {postsQuery.isSuccess &&
        pages.map((page: ListCursorResponse<SessionCommunityList>) =>
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
