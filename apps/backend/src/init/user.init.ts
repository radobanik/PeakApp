import { PrismaClient, Role } from '@prisma/client';
import bcrypt from "bcrypt";

const userClient = new PrismaClient().user;
const saltRounds = 10;

const sampleUsers = [
  {
    id: "6e32c2b2-6cd0-4b3b-8adf-cf707d8cb0d9",
    userName: "johndoe",
    password: bcrypt.hashSync("password123", saltRounds),
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@password123.com",
    roles: [Role.USER],
  },
  {
    id: "9bc29d7d-4c79-4b9f-8e5a-8e33e7f9c971",
    userName: "janedoe",
    password: bcrypt.hashSync("password123", saltRounds),
    firstName: "Jane",
    lastName: "Doe",
    email: "jane.doe@password123.com",
    roles: [Role.USER],
  },
  {
    id: "d2d2f7cd-e18b-4935-b075-0a764d0e07c5",
    userName: "michaelsmith",
    password: bcrypt.hashSync("password123", saltRounds),
    firstName: "Michael",
    lastName: "Smith",
    email: "michael.smith@password123.com",
    roles: [Role.MAINTANER],
  },
  {
    id: "b8e8ccf7-b9a9-49b6-9144-0b0a82a6f7a5",
    userName: "emilyjohnson",
    password: bcrypt.hashSync("password123", saltRounds),
    firstName: "Emily",
    lastName: "Johnson",
    email: "emily.johnson@password123.com",
    roles: [Role.ADMIN], 
  },
  {
    id: "a7a120d2-facf-4975-8d16-40509ffb86cd",
    userName: "chrisbrown",
    password: bcrypt.hashSync("password123", saltRounds),
    firstName: "Chris",
    lastName: "Brown",
    email: "chris.brown@password123.com",
    roles: [Role.USER, Role.USER],
  },
];

async function initUsers() {
    await userClient.createMany({
        data: sampleUsers
    });
};

export default initUsers;
