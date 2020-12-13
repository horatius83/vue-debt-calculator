import { expect } from 'chai';
import { createPaymentPlan, getMinimumPayments } from '@/models/paymentPlan';
import { Loan } from '@/models/loan';
import { avalanche } from '@/models/paymentStrategy';

describe('paymentPlan', () => {
    describe('getMinimumPayments', () => {
        it('should handle empty arrys', () => {
            const result = getMinimumPayments(120, []);

            expect(result).to.equal(0);

        });
        it('should calculate the minimum payments', () => {
            const loans = [
                new Loan('Loan 1', 1000, 0.2, 10),
                new Loan('Loan 2', 2000, 0.2, 20)
            ];
            const expectedResult = loans.map(x => x.getMinimumPayment(120)).reduce((a,b) => a + b, 0);

            const result = getMinimumPayments(120, loans);

            expect(result).to.equal(expectedResult);
        });
    });
    describe('createPaymentPlan', () => {
        it('should throw an exception if the minimum payment is greater than the total payment', () => {
            const maximumNumberOfPayments = 120;
            const loans = [
                new Loan('Loan 1', 1000, 0.2, 10),
                new Loan('Loan 2', 2000, 0.2, 20)
            ];
            const minimumPayment = getMinimumPayments(maximumNumberOfPayments, loans);
            const payment = minimumPayment - 10;

            expect(() => 
                createPaymentPlan(loans, maximumNumberOfPayments, payment, avalanche)
            ).to.throw();
        });
        it('should throw an exception if the number of payments exceeds the maximum number of payments', () => {
            const maximumNumberOfPayments = 120;
            const loans = [
                new Loan('Loan 1', 1000, 0.2, 10),
                new Loan('Loan 2', 2000, 0.2, 20)
            ];
            const minimumPayment = getMinimumPayments(maximumNumberOfPayments + 1, loans);
            const payment = minimumPayment;

            expect(() => createPaymentPlan(loans, maximumNumberOfPayments, payment, avalanche)).to.throw();
        });
        
    });
});