import { UserLabeled } from "../model/user";

// TODO this is a mock implementation, replace with actual implementation
const provide = () : UserLabeled => {
    return {
        id: "6e32c2b2-6cd0-4b3b-8adf-cf707d8cb0d9",
        userName: "johndoe",
        firstName: "John",
        lastName: "Doe"
    };
}

export default provide;
