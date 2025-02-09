import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { QueryService } from '../services/query.service';
import { QueryFilter } from '../models/query-filter.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expense-query',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './expense-query.component.html',
  styleUrl: './expense-query.component.css'
})
export class ExpenseQueryComponent implements OnInit{
  queryForm!: FormGroup;

  constructor(private fb: FormBuilder, private queryService: QueryService) {}

  ngOnInit(): void {
    this.queryForm = this.fb.group({
      type: [''],
      category: [''],
      merchant: [''],
      startDate: [''],
      endDate: [''],
      cardUsed: [''],
    });

    this.queryForm.valueChanges.subscribe(val => {
      const filter: QueryFilter = {
        type: val.type || undefined,
        category: val.category || undefined,
        merchant: val.merchant || undefined,
        startDate: val.startDate ? new Date(val.startDate) : undefined,
        endDate: val.endDate ? new Date(val.endDate) : undefined,
        cardUsed: val.cardUsed || undefined,
      };
      this.queryService.setQueryFilter(filter);
    });
  }
}
