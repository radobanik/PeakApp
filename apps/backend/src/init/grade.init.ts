import { PrismaClient } from "@prisma/client";

const gradeClient = new PrismaClient().grade;

const frenchGrades = [
  { id: "550e8400-e29b-41d4-a716-446655440000", name: "1", rating: 10, color: "#0000FF" },
  { id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8", name: "2", rating: 20, color: "#0040FF" },
  { id: "6ba7b811-9dad-11d1-80b4-00c04fd430c8", name: "3", rating: 30, color: "#0080FF" },
  { id: "6ba7b812-9dad-11d1-80b4-00c04fd430c8", name: "4a", rating: 40, color: "#00BFFF" },
  { id: "6ba7b813-9dad-11d1-80b4-00c04fd430c8", name: "4b", rating: 50, color: "#00FF80" },
  { id: "6ba7b814-9dad-11d1-80b4-00c04fd430c8", name: "4c", rating: 60, color: "#00FF00" },
  { id: "6ba7b815-9dad-11d1-80b4-00c04fd430c8", name: "5a", rating: 70, color: "#80FF00" },
  { id: "6ba7b816-9dad-11d1-80b4-00c04fd430c8", name: "5b", rating: 80, color: "#BFFF00" },
  { id: "6ba7b817-9dad-11d1-80b4-00c04fd430c8", name: "5c", rating: 90, color: "#FFFF00" },
  { id: "6ba7b818-9dad-11d1-80b4-00c04fd430c8", name: "6a", rating: 100, color: "#FFC000" },
  { id: "6ba7b819-9dad-11d1-80b4-00c04fd430c8", name: "6a+", rating: 110, color: "#FFA500" },
  { id: "6ba7b81a-9dad-11d1-80b4-00c04fd430c8", name: "6b", rating: 120, color: "#FF8000" },
  { id: "6ba7b81b-9dad-11d1-80b4-00c04fd430c8", name: "6b+", rating: 130, color: "#FF4000" },
  { id: "6ba7b81c-9dad-11d1-80b4-00c04fd430c8", name: "6c", rating: 140, color: "#FF0000" },
  { id: "6ba7b81d-9dad-11d1-80b4-00c04fd430c8", name: "6c+", rating: 150, color: "#D00000" },
  { id: "6ba7b81e-9dad-11d1-80b4-00c04fd430c8", name: "7a", rating: 160, color: "#A00000" },
  { id: "6ba7b81f-9dad-11d1-80b4-00c04fd430c8", name: "7a+", rating: 170, color: "#800000" },
  { id: "6ba7b820-9dad-11d1-80b4-00c04fd430c8", name: "7b", rating: 180, color: "#600000" },
  { id: "6ba7b821-9dad-11d1-80b4-00c04fd430c8", name: "7b+", rating: 190, color: "#400000" },
  { id: "6ba7b822-9dad-11d1-80b4-00c04fd430c8", name: "7c", rating: 200, color: "#200000" },
  { id: "6ba7b823-9dad-11d1-80b4-00c04fd430c8", name: "7c+", rating: 210, color: "#100000" },
  { id: "6ba7b824-9dad-11d1-80b4-00c04fd430c8", name: "8a", rating: 220, color: "#000000" },
  { id: "6ba7b825-9dad-11d1-80b4-00c04fd430c8", name: "8a+", rating: 230, color: "#000000" },
  { id: "6ba7b826-9dad-11d1-80b4-00c04fd430c8", name: "8b", rating: 240, color: "#000000" },
  { id: "6ba7b827-9dad-11d1-80b4-00c04fd430c8", name: "8b+", rating: 250, color: "#000000" },
  { id: "6ba7b828-9dad-11d1-80b4-00c04fd430c8", name: "8c", rating: 260, color: "#000000" },
  { id: "6ba7b829-9dad-11d1-80b4-00c04fd430c8", name: "8c+", rating: 270, color: "#000000" },
  { id: "6ba7b82a-9dad-11d1-80b4-00c04fd430c8", name: "9a", rating: 280, color: "#000000" },
  { id: "6ba7b82b-9dad-11d1-80b4-00c04fd430c8", name: "9a+", rating: 290, color: "#000000" },
  { id: "6ba7b82c-9dad-11d1-80b4-00c04fd430c8", name: "9b", rating: 300, color: "#000000" },
  { id: "6ba7b82d-9dad-11d1-80b4-00c04fd430c8", name: "9b+", rating: 310, color: "#000000" },
  { id: "6ba7b82e-9dad-11d1-80b4-00c04fd430c8", name: "9c", rating: 320, color: "#000000" },
];

async function initGrades() {
  await Promise.all(
    frenchGrades.map((grade) =>
      gradeClient.upsert({
        where: { id: grade.id },
        update: grade,
        create: grade,
      })
    )
  );
}

export default initGrades;
