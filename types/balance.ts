export type Balance = {
    id: string;
    userId: string;
    accountType: string;
    balance: number;
    creditLimit: number;
    createdAt: string;
};

export type AccountResponse = Record<string, Balance>;

export function convertAccountsToArray(response: AccountResponse): Balance[] {
    return Object.values(response);
}
