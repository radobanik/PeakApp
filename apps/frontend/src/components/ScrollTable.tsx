type ScrollTableProps<T> = {
  entries: T[]
  Component: React.ComponentType<{ entry: T; backRoute: string }>
  backRoute: string
}

const ScrollTable = <T extends { id: string }>({
  entries,
  Component,
  backRoute,
}: ScrollTableProps<T>) => {
  if (entries.length === 0) {
    return <div className="flex justify-center p-4 mx-auto">No entries available</div>
  }
  return (
    <div className="w-full">
      {entries.map((entry) => (
        <Component key={entry.id} entry={entry} backRoute={backRoute} />
      ))}
    </div>
  )
}

export default ScrollTable
