import { Card } from "./card.model";

export interface Expense {
    id: number;
    merchant: string;
    amount: number;
    date: Date;
    category: string;
    cardUsed: string;
    type: 'income' | 'expense';
}