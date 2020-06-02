import { 
    calculateNewPrincipalForMonth, 
    getMinimumMonthlyPayment } from '../util/interest';
import { Loan } from './loan';

export class Payment {
    wasDoubled = false;

    constructor(
        public loan: Loan,
        public principal: number, 
        public amountPaid: number, 
        public dateOfPayment: Date) {}

    getMinimumMonthlyPayment(dateOfPayment: Date): Payment {
        const newPrincipal = calculateNewPrincipalForMonth(this.principal, this.loan.interest);
        const minimum = getMinimumMonthlyPayment(newPrincipal, this.loan.interest, this.loan.minimum);
        return new Payment(
            this.loan,
            Math.max(newPrincipal - minimum, 0),
            minimum,
            dateOfPayment
        )
    }

    createBonusMoneyPayment(bonusMoney: number): [Payment, number] {
        let bonusPayment = new Payment(this.loan, this.principal, this.amountPaid, this.dateOfPayment);
        if(bonusMoney < bonusPayment.principal) {
            bonusPayment.principal -= bonusMoney;
            bonusPayment.amountPaid += bonusMoney;
            bonusMoney = 0;
        } else {
            bonusMoney -= bonusPayment.principal;
            bonusPayment.amountPaid += bonusPayment.principal;
            bonusPayment.principal = 0;
        }
        return [bonusPayment, bonusMoney];
    }
}

export function createPayment(loan: Loan, dateOfPayment: Date): Payment {
    const minimumPayment = loan.getMinimumPayment();
    const newPrincipal = calculateNewPrincipalForMonth(loan.principal, loan.interest);
    return new Payment(loan, newPrincipal - minimumPayment, minimumPayment, dateOfPayment);
}