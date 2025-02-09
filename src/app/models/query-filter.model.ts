export interface QueryFilter {
    type?: 'income' | 'expense';
    category?: string;
    merchant?: string;
    startDate?: Date;
    endDate?: Date;
    cardUsed?: string;
}