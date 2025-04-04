import { ClimbingStructureType, PrismaClient } from '@prisma/client'
import * as UserInit from './user.init'
import * as GradeInit from './grade.init'
import * as ClimbingObjectInit from './climbingObject.init'

const routeClient = new PrismaClient().route

export const ROUTE_1_ID = '3f6c2d90-5a4e-4c2d-92c7-51e1cba12a77'
export const ROUTE_2_ID = 'e59f9c13-4f7b-4c82-8c3e-7a44efc40a9d'
export const ROUTE_3_ID = 'b2a7e8f5-3d90-4624-91c1-f4c6e5e2a4f2'
export const ROUTE_4_ID = '7d20a48b-44a3-4d9c-9295-fc5d98411a6d'
export const ROUTE_5_ID = 'f3ab279c-5691-4c0b-b1cb-07e2d4a44627'
export const ROUTE_6_ID = '1a9dcfbb-50d3-4c0f-b2a1-bc6520eb5e6e'
export const ROUTE_7_ID = 'c94f7b85-2b94-4a1e-b3f4-839b542a6a3c'
export const ROUTE_8_ID = 'a3b60cb3-8fda-4ebd-8fc2-8d2876f7e4f6'
export const ROUTE_9_ID = 'dfeb9c50-bd56-4c6f-858a-bd49a6e52a48'
export const ROUTE_10_ID = '49f680d5-2f87-4e2a-b4c4-0a3e5e8c3a75'
export const ROUTE_11_ID = '2d8b47fc-8131-47b2-9f71-5d3f2c3e9b4c'
export const ROUTE_12_ID = '8f1eb72c-9731-441a-8f7a-4d6e28f6e9a3'
export const ROUTE_13_ID = '07e8b6cf-4e3a-44fc-92f7-6a4d9f5e2c8b'
export const ROUTE_14_ID = 'f4c5a9b3-57d2-48b9-b1e8-3d90c72e4f6a'
export const ROUTE_15_ID = 'b3f72a8c-9d50-4c1f-81eb-47fc3d9f6e2a'
export const ROUTE_16_ID = '1e8b4f6a-92c7-43d2-b3a7-f52d90e4f6c5'
export const ROUTE_17_ID = 'c8d27f4b-1a3e-4b6a-9d5f-0e2c47fc92b8'
export const ROUTE_18_ID = '3f2c90b5-7d9a-4e4f-b2a8-6d50c7e91fc3'
export const ROUTE_19_ID = '49e3f7a8-2d4c-41b2-9f90-5c7e1a6d0b4f'
export const ROUTE_20_ID = 'a3b6e7f2-9d50-41fc-92b8-4d2c57f90e1a'
export const ROUTE_21_ID = 'b3f2a8d7-91c4-4e5f-92b0-6d50e7c9f1a3'
export const ROUTE_22_ID = 'c5f7b1a9-4d2e-4f50-92b8-7d3c6e90a1f2'
export const ROUTE_23_ID = '7d9a1c5f-4b2e-4f50-92b8-3f6e90a7d2c1'
export const ROUTE_24_ID = 'b2c8f7a1-9d50-4e5f-92b8-3d6e90a7d2c4'
export const ROUTE_25_ID = '3d9a1c5f-7b2e-4f50-92b8-6e90a7d2c4f1'
export const ROUTE_26_ID = '4276ac59-5585-4e69-ba12-a667f1474853'
export const ROUTE_27_ID = '43c4ec30-5285-4936-81cc-bfaf2829bd01'
export const ROUTE_28_ID = '766d1b3d-cdce-4689-b876-80ab909ad72e'
export const ROUTE_29_ID = '571fa7c0-2825-4e40-ae29-88f2e62cb16d'
export const ROUTE_30_ID = '38184bc0-6dcb-4134-8f88-2784eab99fc9'

const routes = [
  {
    id: ROUTE_1_ID,
    createdById: UserInit.USER_CHRIS_BROWN_ID,
    name: 'Dream Catcher',
    description: 'A beautiful route in the mountains',
    gradeId: GradeInit.GRADE_5B_ID,
    climbingStructureType: ClimbingStructureType.SLAB,
    longitude: 16.607885,
    latitude: 49.206331,
    climbingObjectId: ClimbingObjectInit.CLIMBING_OBJECT_1_ID,
  },
  {
    id: ROUTE_2_ID,
    createdById: UserInit.USER_JOHN_DOE_ID,
    name: 'Cloud Walker',
    description: 'A tricky slab with small holds',
    gradeId: GradeInit.GRADE_6A_PLUS_ID,
    climbingStructureType: ClimbingStructureType.SLAB,
    longitude: 16.607895,
    latitude: 49.20632,
    climbingObjectId: ClimbingObjectInit.CLIMBING_OBJECT_1_ID,
  },
  {
    id: ROUTE_3_ID,
    createdById: UserInit.USER_MICHAEL_SMITH_ID,
    name: 'The Edge',
    description: 'An overhanging test piece',
    gradeId: GradeInit.GRADE_7B_PLUS_ID,
    climbingStructureType: ClimbingStructureType.OVERHANG,
    longitude: 16.6079,
    latitude: 49.20631,
    climbingObjectId: ClimbingObjectInit.CLIMBING_OBJECT_1_ID,
  },
  {
    id: ROUTE_4_ID,
    createdById: UserInit.USER_JOHN_DOE_ID,
    name: 'Gravity Check',
    description: 'A fun traverse',
    gradeId: GradeInit.GRADE_6C_ID,
    climbingStructureType: ClimbingStructureType.TRAVERSE,
    longitude: 16.607875,
    latitude: 49.2063,
    climbingObjectId: ClimbingObjectInit.CLIMBING_OBJECT_1_ID,
  },
  {
    id: ROUTE_5_ID,
    createdById: UserInit.USER_JANE_DOE_ID,
    name: 'Rock Symphony',
    description: 'A long endurance wall',
    gradeId: GradeInit.GRADE_7A_ID,
    climbingStructureType: ClimbingStructureType.WALL,
    longitude: 16.60788,
    latitude: 49.20629,
    climbingObjectId: ClimbingObjectInit.CLIMBING_OBJECT_1_ID,
  },
  {
    id: ROUTE_6_ID,
    createdById: UserInit.USER_CHRIS_BROWN_ID,
    name: 'Silent Crux',
    description: 'A hard boulder-style slab',
    gradeId: GradeInit.GRADE_8A_PLUS_ID,
    climbingStructureType: ClimbingStructureType.SLAB,
    longitude: 16.607905,
    latitude: 49.206289,
    climbingObjectId: ClimbingObjectInit.CLIMBING_OBJECT_1_ID,
  },
  {
    id: ROUTE_7_ID,
    createdById: UserInit.USER_MICHAEL_SMITH_ID,
    name: 'Vertical Madness',
    description: 'A thin crack climb',
    gradeId: GradeInit.GRADE_7C_ID,
    climbingStructureType: ClimbingStructureType.WALL,
    longitude: 16.60789,
    latitude: 49.20631,
    climbingObjectId: ClimbingObjectInit.CLIMBING_OBJECT_1_ID,
  },

  {
    id: ROUTE_8_ID,
    createdById: UserInit.USER_CHRIS_BROWN_ID,
    name: 'Skyline',
    description: 'Amazing views and fun moves',
    gradeId: GradeInit.GRADE_6B_ID,
    climbingStructureType: ClimbingStructureType.SLAB,
    longitude: 16.600707,
    latitude: 49.239977,
    climbingObjectId: ClimbingObjectInit.CLIMBING_OBJECT_2_ID,
  },
  {
    id: ROUTE_9_ID,
    createdById: UserInit.USER_JANE_DOE_ID,
    name: 'Sunset Arête',
    description: 'Aesthetic climb up an arête',
    gradeId: GradeInit.GRADE_7A_PLUS_ID,
    climbingStructureType: ClimbingStructureType.WALL,
    longitude: 16.60072,
    latitude: 49.23999,
    climbingObjectId: ClimbingObjectInit.CLIMBING_OBJECT_2_ID,
  },
  {
    id: ROUTE_10_ID,
    createdById: UserInit.USER_JOHN_DOE_ID,
    name: 'Twilight Overhang',
    description: 'Steep and pumpy',
    gradeId: GradeInit.GRADE_7C_PLUS_ID,
    climbingStructureType: ClimbingStructureType.OVERHANG,
    longitude: 16.60071,
    latitude: 49.239985,
    climbingObjectId: ClimbingObjectInit.CLIMBING_OBJECT_2_ID,
  },
  {
    id: ROUTE_11_ID,
    createdById: UserInit.USER_MICHAEL_SMITH_ID,
    name: "Gravity's Grip",
    description: 'A hard, crimpy wall',
    gradeId: GradeInit.GRADE_8B_ID,
    climbingStructureType: ClimbingStructureType.WALL,
    longitude: 16.60073,
    latitude: 49.23997,
    climbingObjectId: ClimbingObjectInit.CLIMBING_OBJECT_2_ID,
  },
  {
    id: ROUTE_12_ID,
    createdById: UserInit.USER_JANE_DOE_ID,
    name: 'The Iron Way',
    description: 'A bold slab line',
    gradeId: GradeInit.GRADE_6C_ID,
    climbingStructureType: ClimbingStructureType.SLAB,
    longitude: 16.600735,
    latitude: 49.23996,
    climbingObjectId: ClimbingObjectInit.CLIMBING_OBJECT_2_ID,
  },

  {
    id: ROUTE_13_ID,
    createdById: UserInit.USER_CHRIS_BROWN_ID,
    name: 'Dark Horizon',
    description: 'Overhanging and powerful',
    gradeId: GradeInit.GRADE_8A_ID,
    climbingStructureType: ClimbingStructureType.OVERHANG,
    longitude: 16.5955,
    latitude: 49.2455,
    climbingObjectId: ClimbingObjectInit.CLIMBING_OBJECT_3_ID,
  },
  {
    id: ROUTE_14_ID,
    createdById: UserInit.USER_MICHAEL_SMITH_ID,
    name: 'The Last Stand',
    description: 'A test piece of balance',
    gradeId: GradeInit.GRADE_7B_ID,
    climbingStructureType: ClimbingStructureType.SLAB,
    longitude: 16.59549,
    latitude: 49.24552,
    climbingObjectId: ClimbingObjectInit.CLIMBING_OBJECT_3_ID,
  },
  {
    id: ROUTE_15_ID,
    createdById: UserInit.USER_JOHN_DOE_ID,
    name: 'Sharp Edge',
    description: 'A thin face climb',
    gradeId: GradeInit.GRADE_6B_PLUS_ID,
    climbingStructureType: ClimbingStructureType.WALL,
    longitude: 16.59548,
    latitude: 49.24553,
    climbingObjectId: ClimbingObjectInit.CLIMBING_OBJECT_3_ID,
  },
  {
    id: ROUTE_16_ID,
    createdById: UserInit.USER_JANE_DOE_ID,
    name: 'Crux of Fate',
    description: 'Tough boulder sequence in the middle',
    gradeId: GradeInit.GRADE_8C_PLUS_ID,
    climbingStructureType: ClimbingStructureType.OVERHANG,
    longitude: 16.59547,
    latitude: 49.24551,
    climbingObjectId: ClimbingObjectInit.CLIMBING_OBJECT_3_ID,
  },

  {
    id: ROUTE_17_ID,
    createdById: UserInit.USER_JANE_DOE_ID,
    name: 'Shadow Line',
    description: 'A powerful overhang with long moves',
    gradeId: GradeInit.GRADE_8A_ID,
    climbingStructureType: ClimbingStructureType.OVERHANG,
    longitude: 16.600725,
    latitude: 49.239975,
    climbingObjectId: ClimbingObjectInit.CLIMBING_OBJECT_4_ID,
  },
  {
    id: ROUTE_18_ID,
    createdById: UserInit.USER_CHRIS_BROWN_ID,
    name: 'Infinity Edge',
    description: 'A thin technical wall',
    gradeId: GradeInit.GRADE_7B_PLUS_ID,
    climbingStructureType: ClimbingStructureType.WALL,
    longitude: 16.60074,
    latitude: 49.23995,
    climbingObjectId: ClimbingObjectInit.CLIMBING_OBJECT_4_ID,
  },
  {
    id: ROUTE_19_ID,
    createdById: UserInit.USER_JOHN_DOE_ID,
    name: 'Silent Crux',
    description: 'Slabby and balancy',
    gradeId: GradeInit.GRADE_6C_PLUS_ID,
    climbingStructureType: ClimbingStructureType.SLAB,
    longitude: 16.600755,
    latitude: 49.239965,
    climbingObjectId: ClimbingObjectInit.CLIMBING_OBJECT_4_ID,
  },
  {
    id: ROUTE_20_ID,
    createdById: UserInit.USER_MICHAEL_SMITH_ID,
    name: 'Sunrise Traverse',
    description: 'A technical traverse with pockets',
    gradeId: GradeInit.GRADE_7A_ID,
    climbingStructureType: ClimbingStructureType.TRAVERSE,
    longitude: 16.600715,
    latitude: 49.239985,
    climbingObjectId: ClimbingObjectInit.CLIMBING_OBJECT_4_ID,
  },
  {
    id: ROUTE_21_ID,
    createdById: UserInit.USER_JANE_DOE_ID,
    name: 'Redemption',
    description: 'An endurance wall with a tough crux',
    gradeId: GradeInit.GRADE_8B_PLUS_ID,
    climbingStructureType: ClimbingStructureType.WALL,
    longitude: 16.600705,
    latitude: 49.239955,
    climbingObjectId: ClimbingObjectInit.CLIMBING_OBJECT_4_ID,
  },

  {
    id: ROUTE_22_ID,
    createdById: UserInit.USER_JOHN_DOE_ID,
    name: 'Vertical Chaos',
    description: 'A fun but pumpy wall',
    gradeId: GradeInit.GRADE_6B_PLUS_ID,
    climbingStructureType: ClimbingStructureType.WALL,
    longitude: 16.59552,
    latitude: 49.24548,
    climbingObjectId: ClimbingObjectInit.CLIMBING_OBJECT_5_ID,
  },
  {
    id: ROUTE_23_ID,
    createdById: UserInit.USER_MICHAEL_SMITH_ID,
    name: 'Endless Dream',
    description: 'A beautiful overhang',
    gradeId: GradeInit.GRADE_7C_PLUS_ID,
    climbingStructureType: ClimbingStructureType.OVERHANG,
    longitude: 16.59553,
    latitude: 49.24547,
    climbingObjectId: ClimbingObjectInit.CLIMBING_OBJECT_5_ID,
  },
  {
    id: ROUTE_24_ID,
    createdById: UserInit.USER_CHRIS_BROWN_ID,
    name: 'Lost Horizon',
    description: 'A very thin slab route',
    gradeId: GradeInit.GRADE_6A_ID,
    climbingStructureType: ClimbingStructureType.SLAB,
    longitude: 16.595515,
    latitude: 49.24549,
    climbingObjectId: ClimbingObjectInit.CLIMBING_OBJECT_5_ID,
  },
  {
    id: ROUTE_25_ID,
    createdById: UserInit.USER_JANE_DOE_ID,
    name: 'The Threshold',
    description: 'A tough traverse',
    gradeId: GradeInit.GRADE_7A_PLUS_ID,
    climbingStructureType: ClimbingStructureType.TRAVERSE,
    longitude: 16.595505,
    latitude: 49.2455,
    climbingObjectId: ClimbingObjectInit.CLIMBING_OBJECT_5_ID,
  },
  {
    id: ROUTE_26_ID,
    createdById: UserInit.USER_JOHN_DOE_ID,
    name: 'Skyfall',
    description: 'A stunning wall with long reaches',
    gradeId: GradeInit.GRADE_7B_ID,
    climbingStructureType: ClimbingStructureType.WALL,
    longitude: 16.59549,
    latitude: 49.24551,
    climbingObjectId: ClimbingObjectInit.CLIMBING_OBJECT_5_ID,
  },

  {
    id: ROUTE_27_ID,
    createdById: UserInit.USER_MICHAEL_SMITH_ID,
    name: 'Black Magic',
    description: 'Steep and powerful',
    gradeId: GradeInit.GRADE_8C_ID,
    climbingStructureType: ClimbingStructureType.OVERHANG,
    longitude: 16.5821,
    latitude: 49.21045,
    climbingObjectId: ClimbingObjectInit.CLIMBING_OBJECT_6_ID,
  },
  {
    id: ROUTE_28_ID,
    createdById: UserInit.USER_CHRIS_BROWN_ID,
    name: 'Moonlight Shadow',
    description: 'A delicate slab',
    gradeId: GradeInit.GRADE_7A_ID,
    climbingStructureType: ClimbingStructureType.SLAB,
    longitude: 16.58212,
    latitude: 49.21046,
    climbingObjectId: ClimbingObjectInit.CLIMBING_OBJECT_6_ID,
  },
  {
    id: ROUTE_29_ID,
    createdById: UserInit.USER_JANE_DOE_ID,
    name: 'The Gauntlet',
    description: 'A wall climb with a tough mid-crux',
    gradeId: GradeInit.GRADE_7B_PLUS_ID,
    climbingStructureType: ClimbingStructureType.WALL,
    longitude: 16.58211,
    latitude: 49.21047,
    climbingObjectId: ClimbingObjectInit.CLIMBING_OBJECT_6_ID,
  },
  {
    id: ROUTE_30_ID,
    createdById: UserInit.USER_JOHN_DOE_ID,
    name: 'Final Reckoning',
    description: 'A classic steep overhang',
    gradeId: GradeInit.GRADE_8A_PLUS_ID,
    climbingStructureType: ClimbingStructureType.OVERHANG,
    longitude: 16.58209,
    latitude: 49.210455,
    climbingObjectId: ClimbingObjectInit.CLIMBING_OBJECT_6_ID,
  },
]

async function initRoutes() {
  await Promise.all(
    routes.map((route) =>
      routeClient.upsert({
        where: { id: route.id },
        update: {
          ...route,
          deleted: false,
        },
        create: {
          ...route,
          deleted: false,
        },
      })
    )
  )
}

export default initRoutes
