import prisma from '../core/prisma/client'
import { Role } from '@prisma/client'
import bcrypt from 'bcrypt'

const saltRounds = 10

export const USER_JOHN_DOE_ID = '6e32c2b2-6cd0-4b3b-8adf-cf707d8cb0d9'
export const USER_JANE_DOE_ID = '9bc29d7d-4c79-4b9f-8e5a-8e33e7f9c971'
export const USER_MICHAEL_SMITH_ID = 'd2d2f7cd-e18b-4935-b075-0a764d0e07c5'
export const USER_EMILY_JOHNSON_ID = 'b8e8ccf7-b9a9-49b6-9144-0b0a82a6f7a5'
export const USER_CHRIS_BROWN_ID = 'a7a120d2-facf-4975-8d16-40509ffb86cd'
export const TOP_LOGGER_USER_ID = '2d25e08e-aa6f-4f37-a8e1-1e3b8a364760'

const sampleUsers = [
  {
    id: USER_JOHN_DOE_ID,
    userName: 'johndoe',
    password: bcrypt.hashSync('password123', saltRounds),
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@password123.com',
    roles: [Role.USER],
  },
  {
    id: USER_JANE_DOE_ID,
    userName: 'janedoe',
    password: bcrypt.hashSync('password123', saltRounds),
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@password123.com',
    roles: [Role.USER],
  },
  {
    id: USER_MICHAEL_SMITH_ID,
    userName: 'michaelsmith',
    password: bcrypt.hashSync('password123', saltRounds),
    firstName: 'Michael',
    lastName: 'Smith',
    email: 'michael.smith@password123.com',
    roles: [Role.MAINTANER],
  },
  {
    id: USER_EMILY_JOHNSON_ID,
    userName: 'emilyjohnson',
    password: bcrypt.hashSync('password123', saltRounds),
    firstName: 'Emily',
    lastName: 'Johnson',
    email: 'emily.johnson@password123.com',
    roles: [Role.ADMIN],
  },
  {
    id: USER_CHRIS_BROWN_ID,
    userName: 'chrisbrown',
    password: bcrypt.hashSync('password123', saltRounds),
    firstName: 'Chris',
    lastName: 'Brown',
    email: 'chris.brown@password123.com',
    roles: [Role.USER],
  },
  {
    id: TOP_LOGGER_USER_ID,
    userName: 'toplogger',
    password: bcrypt.hashSync('password123', saltRounds),
    firstName: 'Top',
    lastName: 'Logger',
    email: 'top.logger@password123.com',
    roles: [Role.USER, Role.MAINTANER],
  },
]

async function initUsers() {
  for (const user of sampleUsers) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: user,
      create: user,
    })
  }
  for (const user of sampleUsers) {
    await prisma.userNotificationSettings.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        enableApp: true,
        enableEmail: false,
        allowedTypes: ['LIKE', 'COMMENT', 'FOLLOW', 'ACHIEVEMENT'],
      },
    })
  }
}

export default initUsers
