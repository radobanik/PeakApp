import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import CommunityPosts from '@/components/CommunityPosts'
import { CommunityVariant } from '@/types/utilsTypes'
import { Outlet, useMatch, useNavigate } from 'react-router-dom'
import { ROUTE } from '@/constants/routes'
import { Dialog, DialogContent } from '@/components/ui/dialog'

export default function CommunityPageLayout() {
  const isDetail = useMatch(ROUTE.COMMUNITY_DETAIL(':id'))
  const navigate = useNavigate()
  console.log('isDetail', isDetail ? 'true' : 'false')
  const [wasOpened, setWasOpened] = useState<Record<CommunityVariant, boolean>>({
    [CommunityVariant.RECENT]: true, // default tab
    [CommunityVariant.FRIENDS]: false,
  })

  const handleTabChange = (value: CommunityVariant) => {
    setWasOpened((prev) => ({
      ...prev,
      [value]: true,
    }))
  }

  return (
    <div className="w-full h-full flex flex-col items-center">
      <Tabs
        defaultValue={CommunityVariant.RECENT}
        onValueChange={(s) => handleTabChange(s as CommunityVariant)}
        className="w-full h-full flex flex-col items-center"
      >
        <TabsList className="mt-2 max-w-100 w-full">
          <TabsTrigger value={CommunityVariant.RECENT}>Most recent</TabsTrigger>
          <TabsTrigger value={CommunityVariant.FRIENDS}>From friends</TabsTrigger>
        </TabsList>
        <div className="flex-1 overflow-auto w-full flex flex-col items-center">
          <TabsContent value={CommunityVariant.RECENT}>
            {wasOpened[CommunityVariant.RECENT] && (
              <CommunityPosts variant={CommunityVariant.RECENT} />
            )}
          </TabsContent>

          <TabsContent value={CommunityVariant.FRIENDS}>
            {wasOpened[CommunityVariant.FRIENDS] && (
              <CommunityPosts variant={CommunityVariant.FRIENDS} />
            )}
          </TabsContent>
        </div>
      </Tabs>
      {isDetail && (
        <Dialog
          open={isDetail ? true : false}
          onOpenChange={(open) => {
            if (!open) {
              navigate(ROUTE.COMMUNITY)
            }
          }}
        >
          <DialogContent className="h-[90vh] w-[90vw] min-w-[300px] min-h-[360px]">
            <Outlet />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
