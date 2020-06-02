import { getMinimumMonthlyPayment } from '../util/interest';

export class Loan {
    constructor(
        public name: string, 
        public principal: number,
        public interest: number,
        public minimum: number) { }

    getMinimumPayment(): number {
        return getMinimumMonthlyPayment(this.principal, this.interest, this.minimum);
    }
}
