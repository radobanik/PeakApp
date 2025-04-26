import { DEFAULT_SVG_ICON_PROPS, SvgIconProps } from '@/constants/svgConstants'
import { memo } from 'react'

const AddPoiIcon = (props: SvgIconProps) => {
  const { size, stroke, strokeWidth } = { ...DEFAULT_SVG_ICON_PROPS, ...props }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M9.25 11H14.75"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        ></path>
        <path
          d="M12 13.75V8.25"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        ></path>
        <path
          d="M3.62001 8.49C5.59001 -0.169998 18.42 -0.159997 20.38 8.5C21.53 13.58 18.37 17.88 15.6 20.54C13.59 22.48 10.41 22.48 8.39001 20.54C5.63001 17.88 2.47001 13.57 3.62001 8.49Z"
          stroke={stroke}
          strokeWidth={strokeWidth}
        ></path>
      </g>
    </svg>
  )
}

export default memo(AddPoiIcon)
