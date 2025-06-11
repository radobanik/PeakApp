import { RefObject } from '../../model/common/refObject'

type Connector = {
  connect: {
    id: string
  }
}

type Disconnector = {
  disconnect: boolean
}

const toConnectorNullable = (ref: RefObject | null): Connector | undefined => {
  if (ref == null) return undefined
  return { connect: { id: ref.id } }
}

const toConnector = (ref: RefObject): Connector => {
  return { connect: { id: ref.id } }
}

const toConnectorId = (id: string): Connector => {
  return toConnector({ id: id })
}

const toDisconnector = (): Disconnector => ({ disconnect: true })

const toConnectorDisconnector = (ref: RefObject | null): Connector | Disconnector =>
  ref == null ? toDisconnector() : toConnector(ref)

const xToManyCreator = <C>(ref: RefObject[], entityMapper: (entity: RefObject) => C) => {
  return ref.length > 0 ? { create: ref.map((entity) => entityMapper(entity)) } : undefined
}

const xToManyUpdater = <C>(ref: RefObject[], entityMapper: (entity: RefObject) => C) => {
  return {
    deleteMany: {},
    create: ref.length > 0 ? ref.map((entity) => entityMapper(entity)) : undefined,
  }
}

export {
  toConnector,
  toConnectorNullable,
  toConnectorDisconnector,
  xToManyCreator,
  xToManyUpdater,
  toConnectorId,
}
