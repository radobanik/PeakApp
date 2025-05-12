import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import threeDots from '@/assets/ThreeDots.png'

interface EntityOptionsDropdownProps {
  setDelete: (value: boolean) => void
  setIsEdit: (value: boolean) => void
}

export function EntityOptionsDropdown(props: EntityOptionsDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <img src={threeDots} alt="Options" className="w-6 h-6 cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              props.setIsEdit(true)
            }}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => props.setDelete(true)} className="text-red-500">
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
