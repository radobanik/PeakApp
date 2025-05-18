import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreVertical } from 'lucide-react'

export function ApproveDropDown() {
  const [position, setPosition] = React.useState('none')

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Approval status</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            <DropdownMenuRadioItem value="none">
              <p>Pending</p>
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="true">
              <p>Approved</p>
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="false">
              <p>Rejected</p>
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
