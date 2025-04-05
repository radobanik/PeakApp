import { UserLabeled, userLabeledSelector } from "../user";

type SessionMinimal = {
    id: string;
    createdAt: Date;
    updatedAt: Date | null;
    createdBy: UserLabeled;

    note: string;
};

const selector = {
    id: true,
    createdAt: true,
    updatedAt: true,
    createdBy: {
        select: userLabeledSelector
    },

    note: true
}

export type { SessionMinimal };
export { selector }