import { Loan } from '@/models/loan';
import { Payment } from '@/models/payment';
import { expect } from 'chai';
import { createPaymentStrategy, avalanche, snowball } from '../../src/models/paymentStrategy';

describe('paymentStrategy', () => {
    describe('createPaymentStrategy', () => {
        it('should pay down one loan if loans principal is greater', () => {
            const loans = [
                new Loan('Loan 1', 1000, 0.1, 10),
                new Loan('Loan 2', 2000, 0.2, 20)
            ];
            const minimumPayments = new Map(loans.map(ln => {
                const minimumPayment = ln.getMinimumPayment(120);
                const payment = new Payment(ln.principal - minimumPayment, minimumPayment);
                return [ln.name, [payment]];
            }));
            const totalAmountPaid = [...minimumPayments.values()].reduce((acc, x) => acc + x[0].amountPaid, 0);
            const paymentStrategy = createPaymentStrategy(([a, _], [b, __]) => b.interest - a.interest);

            debugger;
            const [remaining, extraPayments] = paymentStrategy(minimumPayments, loans, 100);

            console.log('extraPayments');
            console.log(JSON.stringify(extraPayments));
            expect(remaining).to.equal(0);
            expect(extraPayments.has('Loan 2')).to.be.true;
        });
        /*
        it('should pay down multiple loans if the first loans principal is less than the extra amount', () => {

        });
        it('should return the amount remaining if all loan principals are less than the extra amount', () => {

        });
        */
    })
    /*
    describe('avalanche', () => {
        it('should pay loans with the highest interest first', () => {

        });
    });
    describe('snowball', () => {
        it('should pay loans with the lowest principal first', () => {

        });
    });
    */
});