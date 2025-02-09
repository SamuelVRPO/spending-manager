import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseQueryComponent } from './expense-query.component';

describe('ExpenseQueryComponent', () => {
  let component: ExpenseQueryComponent;
  let fixture: ComponentFixture<ExpenseQueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseQueryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpenseQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
