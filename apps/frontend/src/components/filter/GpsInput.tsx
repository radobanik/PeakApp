import * as React from 'react'
import { Input } from '@/components/ui/input'

const gpsRegex = /^-?\d*\.?\d*$/

export function GpsInput(props: React.ComponentProps<typeof Input>) {
  const [value, setValue] = React.useState(props.value)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    // Only set value if it matches our GPS number regex
    if (val === '' || gpsRegex.test(val)) {
      setValue(val)
      // Optionally, call props.onChange with the event if needed
      if (props.onChange) props.onChange(e)
    }
  }

  return (
    <Input
      {...props}
      value={value}
      onChange={handleChange}
      inputMode="decimal" // Mobile keyboard hint
      autoComplete="off"
    />
  )
}
