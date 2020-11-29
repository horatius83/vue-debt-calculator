import { getLoanDurationPaymentAmount, Loan } from '@/models/loan';
import { expect } from 'chai'

describe('loan.ts', () => {
   describe('getLoanDurationPaymentAmount', () => {
    it('should calculate the minimum payment for a given period correctly', () => {
        const apr = 0.2; // 20%
        const ratePerMonth = apr / 12.0;
        const paymentPeriod = 5; // years
        const totalPayments = 12.0 * paymentPeriod;
        let principal = 5000; // $5000

        const minimumPayment = getLoanDurationPaymentAmount(principal, ratePerMonth, totalPayments);

        for(let i=0;i<5 * 12;++i) {
            principal = (principal *  (1.0 + ratePerMonth)) - minimumPayment;
        }
        expect(principal).to.be.closeTo(0, 0.001);
    });
   });
   describe('getMinimumPayment', () => {
    it('should return the loan duration amount if it is greater than the minimum and less than the principal', () =>{
        const totalPayments = 60.0;
        const loanDurationPaymentAmount = 132.47;
        const loan = new Loan('test', 5000, 0.2, 50);

        const minimum = loan.getMinimumPayment(totalPayments);

        expect(minimum).to.be.closeTo(loanDurationPaymentAmount, 0.001);
    });
    it('should return the minimum if the loan duration amount is less and the minimum is less than then principal', () =>{
        const totalPayments = 60.0;
        const minimumAmount = 140.0;
        const loan = new Loan('test', 5000, 0.2, minimumAmount);

        const minimum = loan.getMinimumPayment(totalPayments);

        expect(minimum).to.be.closeTo(minimumAmount, 0.001);
    });
    it('should return the principal if the principal is less than the loan duration amount and the minimum', () =>{
        const totalPayments = 60.0;
        const principal = 130;
        const loan = new Loan('test', principal, 0.2, 140);

        const minimum = loan.getMinimumPayment(totalPayments);

        expect(minimum).to.be.closeTo(principal, 0.001);
    });
   });
});