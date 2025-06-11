type FeatureFlag = {
  id: string
  name: string
  enabled: boolean
  updatedAt: Date
}

const selector = {
  id: true,
  name: true,
  enabled: true,
  updatedAt: true,
}

export type { FeatureFlag }
export { selector }
