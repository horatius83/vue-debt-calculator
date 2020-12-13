import { Loan } from '@/models/loan';
import { Payment } from '@/models/payment';
import { expect } from 'chai';
import { createPaymentStrategy, avalanche, snowball } from '../../src/models/paymentStrategy';

describe('paymentStrategy', () => {
    describe('createPaymentStrategy', () => {
        it('should pay down one loan if loans principal is greater', () => {
            const loan2 = new Loan('Loan 2', 2000, 0.2, 20);
            const loans = [
                new Loan('Loan 1', 1000, 0.1, 10),
                loan2
            ];
            const maximumNumberOfPayments = 120;
            const minimumPayments = new Map(loans.map(ln => {
                const minimumPayment = ln.getMinimumPayment(maximumNumberOfPayments);
                const payment = new Payment(ln.principal - minimumPayment, minimumPayment);
                return [ln.name, [payment]];
            }));
            const paymentStrategy = createPaymentStrategy(([a, _], [b, __]) => b.interest - a.interest);

            const [remaining, extraPayments] = paymentStrategy(minimumPayments, loans, 100);

            expect(remaining).to.equal(0);
            expect(extraPayments.has('Loan 1')).to.be.false;
            expect(extraPayments.has('Loan 2')).to.be.true;
            expect(extraPayments.get('Loan 2')).to.equal(100);
        });
        it('should pay down multiple loans if the first loans principal is less than the extra amount', () => {
            const loan2 = new Loan('Loan 2', 2000, 0.2, 20);
            const amountPaid = 2100;
            const loans = [
                new Loan('Loan 1', 1000, 0.1, 10),
                loan2
            ];
            const maximumNumberOfPayments = 120;
            const minimumPayments = new Map(loans.map(ln => {
                const minimumPayment = ln.getMinimumPayment(maximumNumberOfPayments);
                const payment = new Payment(ln.principal - minimumPayment, minimumPayment);
                return [ln.name, [payment]];
            }));
            const paymentStrategy = createPaymentStrategy(([a, _], [b, __]) => b.interest - a.interest);

            const [remaining, extraPayments] = paymentStrategy(minimumPayments, loans, amountPaid);

            expect(remaining).to.equal(0);
            expect(extraPayments.has('Loan 1')).to.be.true;
            expect(extraPayments.get('Loan 1')).to.equal(amountPaid - (2000 - loan2.getMinimumPayment(maximumNumberOfPayments)));
            expect(extraPayments.has('Loan 2')).to.be.true;
            expect(extraPayments.get('Loan 2')).to.equal(2000 - loan2.getMinimumPayment(maximumNumberOfPayments));
        });
        it('should return the amount remaining if all loan principals are less than the extra amount', () => {
            const amountPaid = 3100;
            const loan2 = new Loan('Loan 2', 2000, 0.2, 20);
            const loans = [
                new Loan('Loan 1', 1000, 0.1, 10),
                loan2
            ];
            const minimumPayments = new Map(loans.map(ln => {
                const payment = new Payment(ln.principal, 0);
                return [ln.name, [payment]];
            }));
            const paymentStrategy = createPaymentStrategy(([a, _], [b, __]) => b.interest - a.interest);

            const [remaining, extraPayments] = paymentStrategy(minimumPayments, loans, amountPaid);

            expect(remaining).to.equal(100);
            expect(extraPayments.has('Loan 1')).to.be.true;
            expect(extraPayments.get('Loan 1')).to.equal(1000);
            expect(extraPayments.has('Loan 2')).to.be.true;
            expect(extraPayments.get('Loan 2')).to.equal(2000);
        });
    })
    describe('avalanche', () => {
        it('should pay loans with the highest interest first', () => {
            const loan2 = new Loan('Loan 2', 2000, 0.2, 20);
            const loans = [
                new Loan('Loan 1', 1000, 0.1, 10),
                loan2
            ];
            const maximumNumberOfPayments = 120;
            const minimumPayments = new Map(loans.map(ln => {
                const minimumPayment = ln.getMinimumPayment(maximumNumberOfPayments);
                const payment = new Payment(ln.principal - minimumPayment, minimumPayment);
                return [ln.name, [payment]];
            }));

            const [remaining, extraPayments] = avalanche(minimumPayments, loans, 100);

            expect(remaining).to.equal(0);
            expect(extraPayments.has('Loan 1')).to.be.false;
            expect(extraPayments.has('Loan 2')).to.be.true;
            expect(extraPayments.get('Loan 2')).to.equal(100);
        });
    });
    describe('snowball', () => {
        it('should pay loans with the lowest principal first', () => {
            const loan1 = new Loan('Loan 1', 1000, 0.1, 10);
            const loans = [
                loan1,
                new Loan('Loan 2', 2000, 0.2, 20)
            ];
            const maximumNumberOfPayments = 120;
            const minimumPayments = new Map(loans.map(ln => {
                const minimumPayment = ln.getMinimumPayment(maximumNumberOfPayments);
                const payment = new Payment(ln.principal - minimumPayment, minimumPayment);
                return [ln.name, [payment]];
            }));

            const [remaining, extraPayments] = snowball(minimumPayments, loans, 100);

            expect(remaining).to.equal(0);
            expect(extraPayments.has('Loan 2')).to.be.false;
            expect(extraPayments.has('Loan 1')).to.be.true;
            expect(extraPayments.get('Loan 1')).to.equal(100);
        });
    });
});