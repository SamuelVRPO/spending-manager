import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExpenseService } from '../services/expense.service';
import { Expense } from '../models/expense.model';
import { Card } from '../models/card.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css']
})
export class ExpenseFormComponent implements OnInit{
  expenseForm!: FormGroup;
  cards: Card[] = [
    { id: 1, name: "Chase Debit"}, 
    { id: 2, name: "Chase Credit"},
    { id: 3, name: "Amex" }
  ];
  categories: string[] = [
    "Food",
    "Transportation",
    "Subscription",
    "Income",
    "Payment",
    "Care"
  ]

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService,
  ) {}

  ngOnInit(): void {
    this.expenseForm = this.fb.group({
      merchant: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(0)]],
      date: ['', Validators.required],
      category: ['', Validators.required],
      cardUsed: ['', Validators.required],
      type: ['expense', Validators.required],
    });
  }

  async onSubmit(): Promise<void> {
    if (this.expenseForm.valid) {
      const formValue = this.expenseForm.value;
      console.log(formValue);
      const expense: Expense = {
        id: Date.now(),
        merchant: formValue.merchant,
        amount: formValue.amount,
        date: new Date(formValue.date),
        category: formValue.category,
        cardUsed: formValue.cardUsed,
        type: formValue.type,
      };

      await this.expenseService.addExpense(expense);

      this.expenseForm.reset();
    }
  }
}
