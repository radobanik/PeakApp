import React, { useEffect, useRef, useState } from 'react'
import { SearchSuggestions } from '@/types/searchTypes'
import { GradeBadge } from '../GradyBadge'
import { RouteStructureTypeBadge } from '../RouteStructureTypeBadge'

interface SearchBarProps {
  placeholder?: string
  value: string
  onChange: (value: string) => void
  suggestions?: SearchSuggestions
  onSelectClimbingObject?: (id: string) => void
  onSelectRoute?: (id: string) => void
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search...',
  value,
  onChange,
  suggestions,
  onSelectClimbingObject,
  onSelectRoute,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const suggestionBoxRef = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(false)

  const hasSuggestions =
    value &&
    suggestions &&
    (suggestions.climbingObjects.length > 0 || suggestions.routes.length > 0)

  useEffect(() => {
    if (!isActive) return

    const el = suggestionBoxRef.current
    if (!el) return

    const stopScroll = (e: Event) => {
      if (el.scrollHeight > el.clientHeight) {
        return
      }
      e.stopPropagation()
      e.preventDefault()
    }

    el.addEventListener('wheel', stopScroll, { passive: false })
    el.addEventListener('touchmove', stopScroll, { passive: false })

    return () => {
      el.removeEventListener('wheel', stopScroll)
      el.removeEventListener('touchmove', stopScroll)
    }
  }, [isActive])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsActive(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div ref={wrapperRef} className="relative z-[1000] max-w-[30rem]">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onFocus={() => setIsActive(true)}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full h-9 px-4 py-2 mt-3 font-bold 
          bg-gray-200 bg-opacity-5 backdrop-blur-sm
          placeholder-gray-800 text-gray-800
          border border-gray-200 border-opacity-50
          rounded-md shadow-md
          focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
        "
      />

      {isActive && hasSuggestions && (
        <div
          ref={suggestionBoxRef}
          className="absolute mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-[1001] max-h-120 overflow-y-auto text-gray-800"
        >
          {suggestions!.climbingObjects.length > 0 && (
            <div>
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 border-b">
                Climbing Objects
              </div>
              {suggestions!.climbingObjects.map((obj) => (
                <div
                  key={obj.id}
                  onClick={() => {
                    onSelectClimbingObject?.(obj.id)
                    setIsActive(false)
                  }}
                  className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                >
                  <div className="font-semibold">{obj.name}</div>
                  <div className="text-sm text-gray-600">
                    {obj.routeCount} routes | ({obj.latitude.toFixed(4)}, {obj.longitude.toFixed(4)}
                    )
                  </div>
                </div>
              ))}
            </div>
          )}
          {suggestions!.routes.length > 0 && (
            <div>
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 border-b mt-2">
                Routes
              </div>
              {suggestions!.routes.map((route) => (
                <div
                  key={route.id}
                  onClick={() => {
                    onSelectRoute?.(route.id)
                    setIsActive(false)
                  }}
                  className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                >
                  <div className="font-semibold">{route.name}</div>
                  <div className="mt-1 flex items-center space-x-2">
                    <GradeBadge grade={route.grade} />
                    <RouteStructureTypeBadge type={route.climbingStructureType} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
