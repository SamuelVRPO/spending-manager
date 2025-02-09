import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Expense } from '../models/expense.model';
import { ExpenseService } from '../services/expense.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit, OnDestroy{
  expenses: Expense[] = [];
  private subscription!: Subscription;

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.subscription = this.expenseService.expenses$.subscribe((expenses: Expense[]) => {
      this.expenses = expenses;
    });
  }

  async deleteExpense(expenseId: number): Promise<void> {
    await this.expenseService.deleteExpense(expenseId);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
