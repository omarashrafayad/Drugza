export interface ReturnType {
    id: string | number;
    order: number;
    customer: {
        name: string;
        image: string;
    };
    inventory: {
        name: string;
        phone: string;
    }
    date: string;
    quantity: number;
    amount: string;
    reason: string;
    method: string;
    status: "paid" | "due" | "canceled";
}