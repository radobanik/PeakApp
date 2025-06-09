import prisma from '../core/prisma/client'
import { ApprovalState, ClimbingStructureType, PeakFileSource } from '@prisma/client'
import * as UserInit from './user.init'
import * as GradeInit from './grade.init'
import * as ClimbingObjectInit from './climbingObject.init'

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

export const ROUTE_IMG_1 = '7c479473-2e6f-4719-9225-9b5e3f8593cf'
export const ROUTE_IMG_2 = 'f177314a-ff64-4107-a0f8-371d2226d28a'
export const ROUTE_IMG_3 = '00f2b59d-c319-4504-91f4-641d583c1f5b'
export const ROUTE_IMG_4 = '167903db-b349-44ef-bfca-7b6ba6e43bb2'
export const ROUTE_IMG_5 = '47f8d33b-918d-4382-a6d2-6a3302c1efd5'
export const ROUTE_IMG_6 = '1d374770-4e92-47a3-a1cf-6f646dc4e34b'
export const ROUTE_IMG_7 = 'ab9333b3-74f6-48b6-892c-b2ec2dbf46e7'
export const ROUTE_IMG_8 = 'adc207c2-a7db-42a4-b96d-73b357dda2ce'
export const ROUTE_IMG_9 = 'f9be05d1-78c3-4827-ad4c-d92ae30cbf19'
export const ROUTE_IMG_10 = '67415a08-0bd2-4381-b705-b8f6dc375480'
export const ROUTE_IMG_11 = '9a0d250c-8051-4816-9350-f47d9a6a3cd4'
export const ROUTE_IMG_12 = '80044085-d35f-47d2-8e2d-ec665a7b09a0'
export const ROUTE_IMG_13 = 'ede28bbd-e1fb-44e0-8082-50579d500e45'
export const ROUTE_IMG_14 = 'ed02ef3e-65cf-4b49-9b31-a15088ac1f11'
export const ROUTE_IMG_15 = '36be2f55-abc5-4e3c-8ec7-b4f22df8aee5'
export const ROUTE_IMG_16 = 'af5f5940-b46e-4db7-8702-abc2a4965910'
export const ROUTE_IMG_17 = 'b0bfd99d-4495-4c2c-9354-9612e7f5af27'
export const ROUTE_IMG_18 = '83482523-24b9-4f5f-af1b-978391a2b2f5'
export const ROUTE_IMG_19 = '8958a865-ffde-4d94-8ffc-0f988302a0b5'
export const ROUTE_IMG_20 = '4eaef8bf-b11f-4bb0-9ff0-a00d0e90c221'
export const ROUTE_IMG_21 = '1a98082e-d783-4fbd-9972-c5e572a5eeef'
export const ROUTE_IMG_22 = '41f7eca2-1fb3-445c-a22e-671fa8101712'
export const ROUTE_IMG_23 = 'a4aa4285-581c-41b9-bdfd-8d180ad26640'
export const ROUTE_IMG_24 = '44609eb3-ec50-44e2-9bdf-a8f315e0e833'
export const ROUTE_IMG_25 = '73506c70-a125-4a7e-aae1-43444dc6f12c'
export const ROUTE_IMG_26 = 'b18f2a8e-0403-4dc2-8523-28488a3d0d65'
export const ROUTE_IMG_27 = 'ee3326d8-75ba-4ba6-9569-8ce6c2689c89'
export const ROUTE_IMG_28 = '0fe90a05-3c0a-48a5-8c54-cadfec472ce2'
export const ROUTE_IMG_29 = '323239b8-bb77-4576-8665-4ccc94cbf420'
export const ROUTE_IMG_30 = '4fed3a66-3680-49e6-b5e3-53c5d8f1a5b7'

const INIT_USER_ID = UserInit.USER_JANE_DOE_ID
const ROUTE_1_PHOTO = 'route1.png'
const ROUTE_2_PHOTO = 'route2.png'
const ROUTE_3_PHOTO = 'route3.png'
const ROUTE_4_PHOTO = 'route4.jpg'
const ROUTE_5_PHOTO = 'route5.png'
const ROUTE_6_PHOTO = 'route6.jpg'
const ROUTE_7_PHOTO = 'route7.jpg'
const ROUTE_8_PHOTO = 'route8.jpg'
const ROUTE_9_PHOTO = 'route9.jpg'
const ROUTE_10_PHOTO = 'route10.jpg'

const photos = [
  {
    id: ROUTE_IMG_1,
    createdAt: new Date(),
    name: 'route 1 photo',
    contentType: 'image/jpeg',
    identifier: ROUTE_1_PHOTO,
    source: PeakFileSource.S3_BUCKET,
    createdById: INIT_USER_ID,
  },
  {
    id: ROUTE_IMG_2,
    createdAt: new Date(),
    name: 'route 2 photo',
    contentType: 'image/jpeg',
    identifier: ROUTE_2_PHOTO,
    source: PeakFileSource.S3_BUCKET,
    createdById: INIT_USER_ID,
  },
  {
    id: ROUTE_IMG_3,
    createdAt: new Date(),
    name: 'route 3 photo',
    contentType: 'image/jpeg',
    identifier: ROUTE_3_PHOTO,
    source: PeakFileSource.S3_BUCKET,
    createdById: INIT_USER_ID,
  },
  {
    id: ROUTE_IMG_4,
    createdAt: new Date(),
    name: 'route 4 photo',
    contentType: 'image/jpeg',
    identifier: ROUTE_4_PHOTO,
    source: PeakFileSource.S3_BUCKET,
    createdById: INIT_USER_ID,
  },
  {
    id: ROUTE_IMG_5,
    createdAt: new Date(),
    name: 'route 5 photo',
    contentType: 'image/jpeg',
    identifier: ROUTE_5_PHOTO,
    source: PeakFileSource.S3_BUCKET,
    createdById: INIT_USER_ID,
  },
  {
    id: ROUTE_IMG_6,
    createdAt: new Date(),
    name: 'route 6 photo',
    contentType: 'image/jpeg',
    identifier: ROUTE_6_PHOTO,
    source: PeakFileSource.S3_BUCKET,
    createdById: INIT_USER_ID,
  },
  {
    id: ROUTE_IMG_7,
    createdAt: new Date(),
    name: 'route 7 photo',
    contentType: 'image/jpeg',
    identifier: ROUTE_7_PHOTO,
    source: PeakFileSource.S3_BUCKET,
    createdById: INIT_USER_ID,
  },
  {
    id: ROUTE_IMG_8,
    createdAt: new Date(),
    name: 'route 8 photo',
    contentType: 'image/jpeg',
    identifier: ROUTE_8_PHOTO,
    source: PeakFileSource.S3_BUCKET,
    createdById: INIT_USER_ID,
  },
  {
    id: ROUTE_IMG_9,
    createdAt: new Date(),
    name: 'route 9 photo',
    contentType: 'image/jpeg',
    identifier: ROUTE_9_PHOTO,
    source: PeakFileSource.S3_BUCKET,
    createdById: INIT_USER_ID,
  },
  {
    id: ROUTE_IMG_10,
    createdAt: new Date(),
    name: 'route 10 photo',
    contentType: 'image/jpeg',
    identifier: ROUTE_10_PHOTO,
    source: PeakFileSource.S3_BUCKET,
    createdById: INIT_USER_ID,
  },
  {
    id: ROUTE_IMG_11,
    createdAt: new Date(),
    name: 'route 11 photo',
    contentType: 'image/jpeg',
    identifier: ROUTE_1_PHOTO,
    source: PeakFileSource.S3_BUCKET,
    createdById: INIT_USER_ID,
  },
  {
    id: ROUTE_IMG_12,
    createdAt: new Date(),
    name: 'route 12 photo',
    contentType: 'image/jpeg',
    identifier: ROUTE_2_PHOTO,
    source: PeakFileSource.S3_BUCKET,
    createdById: INIT_USER_ID,
  },
  {
    id: ROUTE_IMG_13,
    createdAt: new Date(),
    name: 'route 13 photo',
    contentType: 'image/jpeg',
    identifier: ROUTE_3_PHOTO,
    source: PeakFileSource.S3_BUCKET,
    createdById: INIT_USER_ID,
  },
  {
    id: ROUTE_IMG_14,
    createdAt: new Date(),
    name: 'route 14 photo',
    contentType: 'image/jpeg',
    identifier: ROUTE_4_PHOTO,
    source: PeakFileSource.S3_BUCKET,
    createdById: INIT_USER_ID,
  },
  {
    id: ROUTE_IMG_15,
    createdAt: new Date(),
    name: 'route 15 photo',
    contentType: 'image/jpeg',
    identifier: ROUTE_5_PHOTO,
    source: PeakFileSource.S3_BUCKET,
    createdById: INIT_USER_ID,
  },
  {
    id: ROUTE_IMG_16,
    createdAt: new Date(),
    name: 'route 16 photo',
    contentType: 'image/jpeg',
    identifier: ROUTE_6_PHOTO,
    source: PeakFileSource.S3_BUCKET,
    createdById: INIT_USER_ID,
  },
  {
    id: ROUTE_IMG_17,
    createdAt: new Date(),
    name: 'route 17 photo',
    contentType: 'image/jpeg',
    identifier: ROUTE_7_PHOTO,
    source: PeakFileSource.S3_BUCKET,
    createdById: INIT_USER_ID,
  },
  {
    id: ROUTE_IMG_18,
    createdAt: new Date(),
    name: 'route 18 photo',
    contentType: 'image/jpeg',
    identifier: ROUTE_8_PHOTO,
    source: PeakFileSource.S3_BUCKET,
    createdById: INIT_USER_ID,
  },
  {
    id: ROUTE_IMG_19,
    createdAt: new Date(),
    name: 'route 19 photo',
    contentType: 'image/jpeg',
    identifier: ROUTE_9_PHOTO,
    source: PeakFileSource.S3_BUCKET,
    createdById: INIT_USER_ID,
  },
  {
    id: ROUTE_IMG_20,
    createdAt: new Date(),
    name: 'route 20 photo',
    contentType: 'image/jpeg',
    identifier: ROUTE_10_PHOTO,
    source: PeakFileSource.S3_BUCKET,
    createdById: INIT_USER_ID,
  },
  {
    id: ROUTE_IMG_21,
    createdAt: new Date(),
    name: 'route 21 photo',
    contentType: 'image/jpeg',
    identifier: ROUTE_1_PHOTO,
    source: PeakFileSource.S3_BUCKET,
    createdById: INIT_USER_ID,
  },
  {
    id: ROUTE_IMG_22,
    createdAt: new Date(),
    name: 'route 22 photo',
    contentType: 'image/jpeg',
    identifier: ROUTE_2_PHOTO,
    source: PeakFileSource.S3_BUCKET,
    createdById: INIT_USER_ID,
  },
  {
    id: ROUTE_IMG_23,
    createdAt: new Date(),
    name: 'route 23 photo',
    contentType: 'image/jpeg',
    identifier: ROUTE_3_PHOTO,
    source: PeakFileSource.S3_BUCKET,
    createdById: INIT_USER_ID,
  },
  {
    id: ROUTE_IMG_24,
    createdAt: new Date(),
    name: 'route 24 photo',
    contentType: 'image/jpeg',
    identifier: ROUTE_4_PHOTO,
    source: PeakFileSource.S3_BUCKET,
    createdById: INIT_USER_ID,
  },
  {
    id: ROUTE_IMG_25,
    createdAt: new Date(),
    name: 'route 25 photo',
    contentType: 'image/jpeg',
    identifier: ROUTE_5_PHOTO,
    source: PeakFileSource.S3_BUCKET,
    createdById: INIT_USER_ID,
  },
  {
    id: ROUTE_IMG_26,
    createdAt: new Date(),
    name: 'route 26 photo',
    contentType: 'image/jpeg',
    identifier: ROUTE_6_PHOTO,
    source: PeakFileSource.S3_BUCKET,
    createdById: INIT_USER_ID,
  },
  {
    id: ROUTE_IMG_27,
    createdAt: new Date(),
    name: 'route 27 photo',
    contentType: 'image/jpeg',
    identifier: ROUTE_7_PHOTO,
    source: PeakFileSource.S3_BUCKET,
    createdById: INIT_USER_ID,
  },
  {
    id: ROUTE_IMG_28,
    createdAt: new Date(),
    name: 'route 28 photo',
    contentType: 'image/jpeg',
    identifier: ROUTE_8_PHOTO,
    source: PeakFileSource.S3_BUCKET,
    createdById: INIT_USER_ID,
  },
  {
    id: ROUTE_IMG_29,
    createdAt: new Date(),
    name: 'route 29 photo',
    contentType: 'image/jpeg',
    identifier: ROUTE_9_PHOTO,
    source: PeakFileSource.S3_BUCKET,
    createdById: INIT_USER_ID,
  },
  {
    id: ROUTE_IMG_30,
    createdAt: new Date(),
    name: 'route 30 photo',
    contentType: 'image/jpeg',
    identifier: ROUTE_10_PHOTO,
    source: PeakFileSource.S3_BUCKET,
    createdById: INIT_USER_ID,
  },
]

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
    imageId: ROUTE_IMG_1,
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
    imageId: ROUTE_IMG_2,
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
    imageId: ROUTE_IMG_3,
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
    imageId: ROUTE_IMG_4,
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
    imageId: ROUTE_IMG_5,
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
    imageId: ROUTE_IMG_6,
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
    imageId: ROUTE_IMG_7,
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
    imageId: ROUTE_IMG_8,
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
    imageId: ROUTE_IMG_9,
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
    imageId: ROUTE_IMG_10,
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
    imageId: ROUTE_IMG_11,
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
    imageId: ROUTE_IMG_12,
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
    imageId: ROUTE_IMG_13,
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
    imageId: ROUTE_IMG_14,
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
    imageId: ROUTE_IMG_15,
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
    imageId: ROUTE_IMG_16,
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
    imageId: ROUTE_IMG_17,
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
    imageId: ROUTE_IMG_18,
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
    imageId: ROUTE_IMG_19,
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
    imageId: ROUTE_IMG_20,
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
    imageId: ROUTE_IMG_21,
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
    imageId: ROUTE_IMG_22,
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
    imageId: ROUTE_IMG_23,
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
    imageId: ROUTE_IMG_24,
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
    imageId: ROUTE_IMG_25,
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
    imageId: ROUTE_IMG_26,
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
    imageId: ROUTE_IMG_27,
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
    imageId: ROUTE_IMG_28,
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
    imageId: ROUTE_IMG_29,
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
    imageId: ROUTE_IMG_30,
  },
]

async function initRoutes() {
  for (const photo of photos) {
    await prisma.peakFile.upsert({
      where: { id: photo.id },
      update: photo,
      create: photo,
    })
  }

  await Promise.all(
    routes.map((route) =>
      prisma.route.upsert({
        where: { id: route.id },
        update: {
          ...route,
          deleted: false,
          approvalState: ApprovalState.APPROVED,
        },
        create: {
          ...route,
          userGradeRatingId: route.gradeId,
          deleted: false,
          approvalState: ApprovalState.APPROVED,
        },
      })
    )
  )
}

export default initRoutes
