// ClusterIcon.tsx
import React from 'react'
import chroma from 'chroma-js'
import numeral from 'numeral'

type ClusterIconProps = {
  count: number
  totalRoutes: number
}

const scale = chroma.scale(['green', 'yellow', 'red']).domain([0, 1000])

export const ClusterIcon: React.FC<ClusterIconProps> = ({ count, totalRoutes }) => {
  const bgColor = scale(count).hex()
  const bgColorOpaque = `${bgColor}b3` // ~70% opacity

  const whiteContrast = chroma.contrast(bgColor, 'white')
  const blackContrast = chroma.contrast(bgColor, 'black')
  const textColor = whiteContrast > blackContrast ? 'white' : 'black'

  return (
    <div
      style={{ backgroundColor: bgColorOpaque }}
      className={`w-[50px] h-[50px] flex flex-col justify-center items-center rounded-full transition-transform duration-200 hover:scale-110 text-${textColor} text-sm`}
    >
      <p className="leading-none text-xl">{numeral(count).format('0.[0]a')}</p>
      <p className="leading-none">{numeral(totalRoutes).format('0.[0]a')}</p>
    </div>
  )
}
