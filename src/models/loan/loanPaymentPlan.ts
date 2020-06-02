import { createPayment, Payment } from './payment';
import { Loan } from './loan';

export class LoanPaymentPlan {
    payments: Array<Payment>;

    constructor(public loan: Loan, payments?: Array<Payment>) { 
        this.payments = payments ?? [];
    }

    getMinimumPayment(dateOfPayment: Date): Payment {
        if(this.payments.length) {
            const lastPayment = this.payments[this.payments.length - 1];
            return lastPayment.getMinimumMonthlyPayment(dateOfPayment);
        } else {
            return createPayment(this.loan, dateOfPayment);
        }
    }

    getMostRecentPayment(dateOfPayment: Date): Payment {
        if(this.payments.length) {
            const lastPayment = this.payments[this.payments.length - 1];
            return lastPayment;
        } else {
            return createPayment(this.loan, dateOfPayment);
        }
    }
}