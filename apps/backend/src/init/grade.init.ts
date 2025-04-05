import { PrismaClient } from '@prisma/client'

const gradeClient = new PrismaClient().grade

export const GRADE_2_ID = 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d'
export const GRADE_2_PLUS_ID = 'f6e5d4c3-b2a1-49f8-87e6-5d4c3b2a1f0e'
export const GRADE_3A_ID = '9a8b7c6d-5e4f-43a2-b1c0-d9e8f7a6b5c4'
export const GRADE_3B_ID = '3c4d5e6f-7a8b-42c1-d3e4-f5a6b7c8d9e0'
export const GRADE_3C_ID = 'b0a9f8e7-d6c5-41b2-a3f4-e5d6c7b8a9f0'
export const GRADE_4A_ID = '4e5f6a7b-8c9d-43e0-f1a2-b3c4d5e6f7a8'
export const GRADE_4B_ID = '7d8e9f0a-1b2c-44d3-e5f6-a7b8c9d0e1f2'
export const GRADE_4C_ID = '2c3d4e5f-6a7b-45c8-d9e0-f1a2b3c4d5e6'
export const GRADE_5A_ID = 'f9e8d7c6-b5a4-46f3-e2d1-c0b9a8f7e6d5'
export const GRADE_5A_PLUS_ID = '1a2b3c4d-5e6f-47a8-b9c0-d1e2f3a4b5c6'
export const GRADE_5B_ID = '6d5c4b3a-2e1f-48d9-c0b1-a2f3e4d5c6b7'
export const GRADE_5B_PLUS_ID = 'e0f1a2b3-c4d5-49e6-f7a8-b9c0d1e2f3a4'
export const GRADE_5C_ID = '5b6c7d8e-9f0a-4a1b-c2d3-e4f5a6b7c8d9'
export const GRADE_5C_PLUS_ID = 'c3d4e5f6-7a8b-4b2c-d3e4-f5a6b7c8d9e0'
export const GRADE_6A_ID = '8a9b0c1d-2e3f-4c0d-e1f2-a3b4c5d6e7f8'
export const GRADE_6A_PLUS_ID = '4d5e6f7a-8b9c-4d0e-f1a2-b3c4d5e6f7a8'
export const GRADE_6B_ID = '9e8f7a6b-5c4d-4e1f-a2b3-c4d5e6f7a8b9'
export const GRADE_6B_PLUS_ID = '0a1b2c3d-4e5f-4f0a-b1c2-d3e4f5a6b7c8'
export const GRADE_6C_ID = 'b7c8d9e0-f1a2-4a3b-c4d5-e6f7a8b9c0d1'
export const GRADE_6C_PLUS_ID = '2d3e4f5a-6b7c-4b0c-d1e2-f3a4b5c6d7e8'
export const GRADE_7A_ID = 'e6f7a8b9-c0d1-4c2d-e3f4-a5b6c7d8e9f0'
export const GRADE_7A_PLUS_ID = '1f2a3b4c-5d6e-4d1e-f2a3-b4c5d6e7f8a9'
export const GRADE_7B_ID = 'c5d6e7f8-a9b0-4e1f-a2b3-c4d5e6f7a8b9'
export const GRADE_7B_PLUS_ID = '3a4b5c6d-7e8f-4f0a-b1c2-d3e4f5a6b7c8'
export const GRADE_7C_ID = 'd7e8f9a0-b1c2-4d3e-f5a6-b7c8d9e0f1a2'
export const GRADE_7C_PLUS_ID = '4b5c6d7e-8f9a-4a0b-c1d2-e3f4a5b6c7d8'
export const GRADE_8A_ID = 'a0b1c2d3-e4f5-4b6c-d7e8-f9a0b1c2d3e4'
export const GRADE_8A_PLUS_ID = '5e6f7a8b-9c0d-4c1d-e2f3-a4b5c6d7e8f9'
export const GRADE_8B_ID = 'b2c3d4e5-f6a7-4d8e-f9a0-b1c2d3e4f5a6'
export const GRADE_8B_PLUS_ID = '6d7e8f9a-0b1c-4e1f-a2b3-c4d5e6f7a8b9'
export const GRADE_8C_ID = 'c1d2e3f4-a5b6-4f7c-d8e9-f0a1b2c3d4e5'
export const GRADE_8C_PLUS_ID = 'e9f0a1b2-c3d4-4d5e-f6a7-b8c9d0e1f2a3'
export const GRADE_9A_ID = '8f9a0b1c-2d3e-4e5f-a6b7-c8d9e0f1a2b3'
export const GRADE_9A_PLUS_ID = '3b4c5d6e-7f8a-4f0b-c1d2-e3f4a5b6c7d8'
export const GRADE_9B_ID = 'a9b0c1d2-e3f4-4a5b-c6d7-e8f9a0b1c2d3'
export const GRADE_9B_PLUS_ID = '4c5d6e7f-8a9b-4b0c-d1e2-f3a4b5c6d7e8'
export const GRADE_9C_ID = 'b9c0d1e2-f3a4-4c5d-e6f7-a8b9c0d1e2f3'

const frenchGrades = [
  { id: GRADE_2_ID, name: '2', rating: 200, color: '#1E90FF' }, // Dodger Blue
  { id: GRADE_2_PLUS_ID, name: '2+', rating: 250, color: '#00BFFF' }, // Deep Sky Blue
  { id: GRADE_3A_ID, name: '3a', rating: 300, color: '#00CED1' }, // Dark Turquoise
  { id: GRADE_3B_ID, name: '3b', rating: 333, color: '#20B2AA' }, // Light Sea Green
  { id: GRADE_3C_ID, name: '3c', rating: 367, color: '#00FA9A' }, // Medium Spring Green
  { id: GRADE_4A_ID, name: '4a', rating: 400, color: '#00FF7F' }, // Spring Green
  { id: GRADE_4B_ID, name: '4b', rating: 433, color: '#7CFC00' }, // Lawn Green
  { id: GRADE_4C_ID, name: '4c', rating: 467, color: '#ADFF2F' }, // Green Yellow
  { id: GRADE_5A_ID, name: '5a', rating: 500, color: '#FFFF00' }, // Yellow
  { id: GRADE_5A_PLUS_ID, name: '5a+', rating: 517, color: '#FFD700' }, // Gold
  { id: GRADE_5B_ID, name: '5b', rating: 533, color: '#FFA500' }, // Orange
  { id: GRADE_5B_PLUS_ID, name: '5b+', rating: 550, color: '#FF8C00' }, // Dark Orange
  { id: GRADE_5C_ID, name: '5c', rating: 567, color: '#FF6347' }, // Tomato
  { id: GRADE_5C_PLUS_ID, name: '5c+', rating: 583, color: '#FF4500' }, // Orange Red
  { id: GRADE_6A_ID, name: '6a', rating: 600, color: '#FF0000' }, // Red
  { id: GRADE_6A_PLUS_ID, name: '6a+', rating: 617, color: '#DC143C' }, // Crimson
  { id: GRADE_6B_ID, name: '6b', rating: 633, color: '#B22222' }, // Fire Brick
  { id: GRADE_6B_PLUS_ID, name: '6b+', rating: 650, color: '#8B0000' }, // Dark Red
  { id: GRADE_6C_ID, name: '6c', rating: 667, color: '#800000' }, // Maroon
  { id: GRADE_6C_PLUS_ID, name: '6c+', rating: 683, color: '#660000' }, // Dark Maroon
  { id: GRADE_7A_ID, name: '7a', rating: 700, color: '#400000' }, // Very Dark Red
  { id: GRADE_7A_PLUS_ID, name: '7a+', rating: 717, color: '#300000' }, // Nearly Black Red
  { id: GRADE_7B_ID, name: '7b', rating: 733, color: '#200000' }, // Almost Black Red
  { id: GRADE_7B_PLUS_ID, name: '7b+', rating: 750, color: '#100000' }, // Very Dark Gray
  { id: GRADE_7C_ID, name: '7c', rating: 767, color: '#080000' }, // Dark Gray
  { id: GRADE_7C_PLUS_ID, name: '7c+', rating: 783, color: '#040000' }, // Very Dark Gray
  { id: GRADE_8A_ID, name: '8a', rating: 800, color: '#020000' }, // Nearly Black
  { id: GRADE_8A_PLUS_ID, name: '8a+', rating: 817, color: '#010000' }, // Almost Black
  { id: GRADE_8B_ID, name: '8b', rating: 833, color: '#000000' }, // Black
  { id: GRADE_8B_PLUS_ID, name: '8b+', rating: 850, color: '#000000' }, // Black
  { id: GRADE_8C_ID, name: '8c', rating: 867, color: '#000000' }, // Black
  { id: GRADE_8C_PLUS_ID, name: '8c+', rating: 883, color: '#000000' }, // Black
  { id: GRADE_9A_ID, name: '9a', rating: 900, color: '#000000' }, // Black
]

async function initGrades() {
  await Promise.all(
    frenchGrades.map((grade) =>
      gradeClient.upsert({
        where: { id: grade.id },
        update: grade,
        create: grade,
      })
    )
  )
}

export default initGrades
export { frenchGrades }
