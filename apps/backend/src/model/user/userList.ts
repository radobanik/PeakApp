import config from "../../core/config";
import { toNotNullListParams, IncommingListParams, NonNullListParams, validateListParams } from "../common/listParams";

type UserList = {
    id: string;
    userName: string;
    email: string;
    
    firstName: string;
    lastName: string;
}

const selector = {
    id: true,
    userName: true,
    email: true,
    
    firstName: true,
    lastName: true,
}

type IncommingUserListParams = {
    firstName: String | null,
    lastName: String | null,
    email: String | null,
} & IncommingListParams;

type NonNullUserListParams = {
    firstName: String,
    lastName: String,
    email: String,
} & NonNullListParams;

const validSortFields = ['firstName', 'lastName', 'email'];

const validateUserListParams = (params: NonNullUserListParams) => {
    validateListParams(params, validSortFields);
}

const defaultUserListParams = (params: IncommingUserListParams): NonNullUserListParams => {
    const {firstName, lastName, email, ...listParams} =  params;
    return {
        firstName: firstName || '',
        lastName: lastName || '',
        email: email || '',
        ...toNotNullListParams(listParams, config.listLimit.user),
    };

}

export type { UserList, IncommingUserListParams, NonNullUserListParams };
export { selector, validateUserListParams, defaultUserListParams };
