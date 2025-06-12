import prisma from '../core/prisma/client'
import { Role } from '@prisma/client'
import bcrypt from 'bcrypt'
import geoRepository from '../repositories/geo.repository'

const saltRounds = 10

export const USER_JOHN_DOE_ID = '6e32c2b2-6cd0-4b3b-8adf-cf707d8cb0d9'
export const USER_JANE_DOE_ID = '9bc29d7d-4c79-4b9f-8e5a-8e33e7f9c971'
export const USER_MICHAEL_SMITH_ID = 'd2d2f7cd-e18b-4935-b075-0a764d0e07c5'
export const USER_EMILY_JOHNSON_ID = 'b8e8ccf7-b9a9-49b6-9144-0b0a82a6f7a5'
export const USER_CHRIS_BROWN_ID = 'a7a120d2-facf-4975-8d16-40509ffb86cd'
export const TOP_LOGGER_USER_ID = '2d25e08e-aa6f-4f37-a8e1-1e3b8a364760'
export const USER_SARAH_WILSON_ID = 'f4c12e8d-3b5a-4f67-b123-9876543210ab'
export const USER_DAVID_LEE_ID = 'c8b91a3e-2d4f-4e5c-a678-1234567890cd'
export const USER_LISA_TAYLOR_ID = 'b7a6c5d4-e3f2-1g9h-i8j7-456789012345'
export const USER_JAMES_MILLER_ID = 'a1b2c3d4-e5f6-7g8h-i9j0-567890123456'
export const USER_EMMA_DAVIS_ID = 'd4e5f6g7-h8i9-j0k1-l2m3-678901234567'

const getSampleUsers = async () => [
  {
    id: USER_JOHN_DOE_ID,
    userName: 'johndoe',
    password: bcrypt.hashSync('password123', saltRounds),
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@password123.com',
    roles: [Role.USER],
    cityId: await geoRepository.getCityIdByName('Praha'),
    birthday: new Date('1990-01-01'),
  },
  {
    id: USER_JANE_DOE_ID,
    userName: 'janedoe',
    password: bcrypt.hashSync('password123', saltRounds),
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@password123.com',
    roles: [Role.USER],
    cityId: await geoRepository.getCityIdByName('Praha'),
    birthday: new Date('1992-02-02'),
  },
  {
    id: USER_MICHAEL_SMITH_ID,
    userName: 'michaelsmith',
    password: bcrypt.hashSync('password123', saltRounds),
    firstName: 'Michael',
    lastName: 'Smith',
    email: 'michael.smith@password123.com',
    roles: [Role.MAINTANER],
    cityId: await geoRepository.getCityIdByName('Vienna'),
    birthday: new Date('1988-03-03'),
  },
  {
    id: USER_EMILY_JOHNSON_ID,
    userName: 'emilyjohnson',
    password: bcrypt.hashSync('password123', saltRounds),
    firstName: 'Emily',
    lastName: 'Johnson',
    email: 'emily.johnson@password123.com',
    roles: [Role.ADMIN],
    cityId: await geoRepository.getCityIdByName('Vienna'),
    birthday: new Date('1995-04-04'),
  },
  {
    id: USER_CHRIS_BROWN_ID,
    userName: 'chrisbrown',
    password: bcrypt.hashSync('password123', saltRounds),
    firstName: 'Chris',
    lastName: 'Brown',
    email: 'chris.brown@password123.com',
    roles: [Role.USER],
    cityId: await geoRepository.getCityIdByName('Praha'),
    birthday: new Date('1993-05-05'),
  },
  {
    id: TOP_LOGGER_USER_ID,
    userName: 'toplogger',
    password: bcrypt.hashSync('password123', saltRounds),
    firstName: 'Top',
    lastName: 'Logger',
    email: 'top.logger@password123.com',
    roles: [Role.USER, Role.MAINTANER],
    cityId: await geoRepository.getCityIdByName('Vienna'),
    birthday: new Date('1985-06-06'),
  },
  {
    id: USER_SARAH_WILSON_ID,
    userName: 'sarahwilson',
    password: bcrypt.hashSync('password123', saltRounds),
    firstName: 'Sarah',
    lastName: 'Wilson',
    email: 'sarah.wilson@password123.com',
    roles: [Role.USER],
    cityId: await geoRepository.getCityIdByName('Praha'),
    birthday: new Date('1991-07-07'),
  },
  {
    id: USER_DAVID_LEE_ID,
    userName: 'davidlee',
    password: bcrypt.hashSync('password123', saltRounds),
    firstName: 'David',
    lastName: 'Lee',
    email: 'david.lee@password123.com',
    roles: [Role.MAINTANER],
    cityId: await geoRepository.getCityIdByName('Vienna'),
    birthday: new Date('1987-08-08'),
  },
  {
    id: USER_LISA_TAYLOR_ID,
    userName: 'lisataylor',
    password: bcrypt.hashSync('password123', saltRounds),
    firstName: 'Lisa',
    lastName: 'Taylor',
    email: 'lisa.taylor@password123.com',
    roles: [Role.USER],
    cityId: await geoRepository.getCityIdByName('Praha'),
    birthday: new Date('1994-09-09'),
  },
  {
    id: USER_JAMES_MILLER_ID,
    userName: 'jamesmiller',
    password: bcrypt.hashSync('password123', saltRounds),
    firstName: 'James',
    lastName: 'Miller',
    email: 'james.miller@password123.com',
    roles: [Role.USER],
    cityId: await geoRepository.getCityIdByName('Vienna'),
    birthday: new Date('1989-10-10'),
  },
  {
    id: USER_EMMA_DAVIS_ID,
    userName: 'emmadavis',
    password: bcrypt.hashSync('password123', saltRounds),
    firstName: 'Emma',
    lastName: 'Davis',
    email: 'emma.davis@password123.com',
    roles: [Role.ADMIN],
    cityId: await geoRepository.getCityIdByName('Praha'),
    birthday: new Date('1992-11-11'),
  },
]

async function initUsers() {
  const sampleUsers = await getSampleUsers()
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
