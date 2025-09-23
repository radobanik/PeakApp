import { DEFAULT_SVG_ICON_PROPS, SvgIconProps } from '@/constants/svgConstants'
import { memo } from 'react'

const VideoIcon = (props: SvgIconProps) => {
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
        d="M18 3H6C3.79086 3 2 4.79086 2 7V17C2 19.2091 3.79086 21 6 21H18C20.2091 21 22 19.2091 22 17V7C22 4.79086 20.2091 3 18 3Z"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.28 8.03994C9.19003 8.42994 9 10.5199 9 12.0399C9 13.5599 9.19003 15.5999 10.28 16.0399C11.37 16.4799 16 13.7499 16 12.0399C16 10.3299 11.44 7.61994 10.28 8.03994Z"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default memo(VideoIcon)
