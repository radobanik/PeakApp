import { Role } from '@prisma/client'
import checkRoles from './checkRoles'

const checkAuthenticated = () => {
  return checkRoles(Object.values(Role))
}

export default checkAuthenticated
