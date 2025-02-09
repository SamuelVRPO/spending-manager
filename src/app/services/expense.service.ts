// src/app/services/expense.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Expense } from '../models/expense.model';

const fs = window.require ? window.require('fs').promises : null;
const path = window.require ? window.require('path') : null;

const expenseFilePath = (path && window.process) ? path.join(window.process.cwd(), 'expenses.json') : 'expenses.json';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private expensesSubject = new BehaviorSubject<Expense[]>([]);
  expenses$ = this.expensesSubject.asObservable();

  constructor() {
    this.loadExpenses();
  }

  async readExpenses(): Promise<{ expenses: Expense[] }> {
    try {
      const data = await fs.readFile(expenseFilePath, 'utf8');
      return JSON.parse(data);
    } catch (err: any) {
      if (err.code === 'ENOENT') {
        const initData = { expenses: [] };
        await fs.writeFile(expenseFilePath, JSON.stringify(initData, null, 2));
        return initData;
      } else {
        console.error('Error reading expenses', err);
        return { expenses: [] };
      }
    }
  }

  async writeExpenses(data: { expenses: Expense[] }): Promise<void> {
    try {
      await fs.writeFile(expenseFilePath, JSON.stringify(data, null, 2));
    } catch (err) {
      console.error('Error writing expenses', err);;
    }
  }

  async loadExpenses(): Promise<void> {
    const data = await this.readExpenses();
    this.expensesSubject.next(data.expenses);
  }

  async addExpense(expense: Expense): Promise<void> {
    const data = await this.readExpenses();
    data.expenses.push(expense);
    await this.writeExpenses(data);
    await this.loadExpenses();
  }

  async deleteExpense(expenseId: number): Promise<void> {
    const data = await this.readExpenses();
    data.expenses = data.expenses.filter(expense => expense.id !== expenseId);
    await this.writeExpenses(data);
    await this.loadExpenses();
  }
}
