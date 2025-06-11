import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import CommunityPosts, { CommunityPostsContext } from '@/components/CommunityPosts'
import { CommunityVariant } from '@/types/utilsTypes'
import { Outlet, useMatch, useNavigate } from 'react-router-dom'
import { ROUTE } from '@/constants/routes'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { InfiniteData, useQueryClient } from '@tanstack/react-query'
import { ListCursorResponse } from '@/types'
import { SessionCommunityList } from '@/types/sessionTypes'
import { getSession } from '@/services/communityService'

export enum RecommenderCategory {
  TRENDING = 'trending',
  FOLLOWING = 'following',
  MY_PROFILE = 'my-profile',
  MY_STATE = 'my-state',
}

export interface MultiSelectOption {
  value: RecommenderCategory
  label: string
}

// Update your array to use the enum members
export const categoriesOptions: MultiSelectOption[] = [
  { value: RecommenderCategory.TRENDING, label: 'Trending' },
  { value: RecommenderCategory.FOLLOWING, label: 'Following' },
  { value: RecommenderCategory.MY_PROFILE, label: 'My Profile' },
  { value: RecommenderCategory.MY_STATE, label: 'My State' },
]

export default function CommunityPageLayout() {
  const isDetail = useMatch(ROUTE.COMMUNITY_DETAIL(':id'))
  const navigate = useNavigate()
  const [wasOpened, setWasOpened] = useState<Record<CommunityVariant, boolean>>({
    [CommunityVariant.RECOMMENDED]: true, // default tab
    [CommunityVariant.FRIENDS]: false,
  })
  const [selectedCategories, setSelectedCategories] = useState<RecommenderCategory[]>([])
  const [tabValue, setTabValue] = useState<CommunityVariant>(CommunityVariant.RECOMMENDED)
  const [tick, setTick] = useState<number>(new Date().getTime())

  const handleTabChange = (value: CommunityVariant) => {
    const newWasOpenedState = Object.fromEntries(
      (Object.keys(setWasOpened) as CommunityVariant[]).map((key) => [key, false])
    ) as Record<CommunityVariant, boolean>
    newWasOpenedState[value] = true
    setWasOpened(newWasOpenedState)
    setTabValue(value)
    setSelectedCategories([])
  }

  const handleSelectionChange = (newSelectedValues: RecommenderCategory[]) => {
    setSelectedCategories(newSelectedValues)
  }

  const queryClient = useQueryClient()

  const updateList = async (postId: string) => {
    const post = await getSession(postId)
    queryClient.setQueryData<InfiniteData<ListCursorResponse<SessionCommunityList>>>(
      ['communityPosts', tabValue, selectedCategories],
      (old) => {
        if (!old) return old
        const newData = {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            items: page.items.map((item) => {
              if (item.id === postId) {
                return {
                  ...item,
                  likes: post.likes,
                  hasLiked: post.hasLiked,
                  comments: post.comments,
                }
              }
              return item
            }),
          })),
        }
        return newData
      }
    )
    setTick(new Date().getTime())
  }
  return (
    <CommunityPostsContext.Provider value={{ updateList, tick: tick }}>
      <div className="w-full h-full flex flex-col items-center">
        <Tabs
          defaultValue={CommunityVariant.RECOMMENDED}
          onValueChange={(s) => handleTabChange(s as CommunityVariant)}
          className="w-full h-full flex flex-col items-center"
        >
          <TabsList className="mt-2 max-w-100 w-full">
            <TabsTrigger value={CommunityVariant.RECOMMENDED}>Recommended</TabsTrigger>
            <TabsTrigger value={CommunityVariant.FRIENDS}>Friends</TabsTrigger>
          </TabsList>
          {wasOpened[CommunityVariant.RECOMMENDED] && (
            <ToggleGroup
              variant="outline"
              type="multiple"
              value={selectedCategories}
              onValueChange={handleSelectionChange}
              className="flex flex-wrap gap-2"
            >
              {categoriesOptions.map((option) => (
                <ToggleGroupItem
                  key={option.value}
                  value={option.value}
                  aria-label={option.label}
                  className="px-4"
                  variant={'outline'}
                >
                  {option.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          )}
          <div className="flex-1 overflow-auto w-full flex flex-col items-center">
            <TabsContent value={CommunityVariant.RECOMMENDED}>
              {wasOpened[CommunityVariant.RECOMMENDED] && (
                <CommunityPosts
                  variant={CommunityVariant.RECOMMENDED}
                  selectedCategories={selectedCategories}
                />
              )}
            </TabsContent>

            <TabsContent value={CommunityVariant.FRIENDS}>
              {wasOpened[CommunityVariant.FRIENDS] && (
                <CommunityPosts
                  variant={CommunityVariant.FRIENDS}
                  selectedCategories={selectedCategories}
                />
              )}
            </TabsContent>
          </div>
        </Tabs>
        {isDetail && (
          <Dialog
            open={true}
            onOpenChange={(open) => {
              if (!open) {
                navigate(ROUTE.COMMUNITY)
              }
            }}
          >
            <DialogContent className="h-[90vh] w-[90vw] min-w-[300px] min-h-[360px]">
              <DialogHeader>
                <DialogTitle></DialogTitle>
              </DialogHeader>
              <Outlet />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </CommunityPostsContext.Provider>
  )
}
