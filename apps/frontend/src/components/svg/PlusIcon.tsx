import { DEFAULT_SVG_ICON_PROPS, SvgIconProps } from '@/constants/svgConstants'
import { memo } from 'react'

const PlusIcon = (props: SvgIconProps) => {
  const { size, stroke, strokeWidth } = { ...DEFAULT_SVG_ICON_PROPS, ...props }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 4v16m8-8H4"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default memo(PlusIcon)
