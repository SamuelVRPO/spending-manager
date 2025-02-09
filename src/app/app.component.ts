import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ExpenseFormComponent } from './expense-form/expense-form.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { ExpenseQueryComponent } from "./expense-query/expense-query.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ExpenseFormComponent,
    ExpenseListComponent,
    ExpenseQueryComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'spending-manager';
}
