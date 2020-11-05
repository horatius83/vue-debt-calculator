/**
 * Calculate the minimum payment need to pay off a loan within the time period specified
 * @param presentValue - the present value of the loan
 * @param ratePerPeriod - the interest rate per period (per month would be APR / 12)
 * @param numberOfPeriods - number of periods (per month would be year * 12)
 */
export function getLoanDurationPaymentAmount(presentValue: number, ratePerPeriod: number, numberOfPeriods: number) {
    return (ratePerPeriod * presentValue) / (1 - Math.pow(1 + ratePerPeriod, -1.0 * numberOfPeriods));
}

export class Loan {
    constructor(public name: string, public principal: number, public interest: number, public minimum: number) {}

    getMinimumPayment(maxNumberOfPayments: number): number {
        const interestPerPayPeriod = this.interest / 12.0;
        return Math.min(
            Math.max(
                getLoanDurationPaymentAmount(this.principal, interestPerPayPeriod, maxNumberOfPayments),
                this.minimum
            ),
            this.principal
        );
    }
}

export function simpleInterest(principal: number, rateInPercent: number, timeInYears: number) {
    const rate = rateInPercent / 100.0;
    return principal * (1.0 + rate * timeInYears);
}

