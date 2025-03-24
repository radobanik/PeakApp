import { PrismaClient } from '@prisma/client';

const userClient = new PrismaClient().user;

const sampleUsers = [
    {
      id: "6e32c2b2-6cd0-4b3b-8adf-cf707d8cb0d9",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com"
    },
    {
      id: "9bc29d7d-4c79-4b9f-8e5a-8e33e7f9c971",
      firstName: "Jane",
      lastName: "Doe",
      email: "jane.doe@example.com"
    },
    {
      id: "d2d2f7cd-e18b-4935-b075-0a764d0e07c5",
      firstName: "Michael",
      lastName: "Smith",
      email: "michael.smith@example.com"
    },
    {
      id: "b8e8ccf7-b9a9-49b6-9144-0b0a82a6f7a5",
      firstName: "Emily",
      lastName: "Johnson",
      email: "emily.johnson@example.com"
    },
    {
      id: "a7a120d2-facf-4975-8d16-40509ffb86cd",
      firstName: "Chris",
      lastName: "Brown",
      email: "chris.brown@example.com"
    }
];

async function initUsers() {
    await userClient.createMany({
        data: sampleUsers
    })
};

export default initUsers;
