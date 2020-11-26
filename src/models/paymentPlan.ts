import { Loan } from './loan';
import { Payment } from './payment';
import { getLastPayment } from './paymentStrategy';

export function getMinimumPayments(maxNumberOfPayments: number, loans: Loan[]): number {
    return loans
        .map(ln => ln.getMinimumPayment(maxNumberOfPayments))
        .reduce((a,b) => a + b, 0);
}

export function createPaymentPlan(
    loans: Loan[], 
    maxNumberOfPayments: number, 
    totalPayment: number, 
    paymentStrategy: (payments: Map<string, Payment[]>, loans: Loan[], additionalPayment: number) => [number, Map<string, Payment>] 
): Map<string, Payment[]> {
    const minimumPaymentLookup = new Map(loans.map(ln => [ln.name, ln.getMinimumPayment(maxNumberOfPayments)]));
    // Create initial minimum payments
    const paymentPlan = new Map(loans.map(ln => {
        const minimumPayment = minimumPaymentLookup.get(ln.name) as number;
        const newPayment = new Payment(ln.principal - minimumPayment, minimumPayment)
        return [ln.name, [newPayment]]
    }));
    // Determine if total payment exceeds the minimum required payment
    const minimumTotalPayment = Object.values(paymentPlan).reduce((acc, xs) => acc + xs[0], 0);
    if(minimumTotalPayment > totalPayment) {
        throw new Error(`Can not create a payment plan with total payment ${totalPayment} as the minimum is ${minimumTotalPayment}`);
    }

    for(let i=0; i<maxNumberOfPayments; ++i) {
        // Apply payment strategy to anything left over
        const additionalPayment = totalPayment - minimumTotalPayment;
        const [leftOver, additionalPayments] = paymentStrategy(paymentPlan, loans, additionalPayment);
        if(leftOver === 0) {
            return paymentPlan;
        }
        for(const [loanName, payment] of Object.entries(additionalPayments)) {
            const lastPayment = getLastPayment(paymentPlan.get(loanName)) as Payment;
            lastPayment.amountLeft = payment.amountLeft;
            lastPayment.amountPaid += payment.amountPaid;
        }
        // If the total left is 0 then return
        const areLoansPaidOff = Object.values(paymentPlan)
            .map(pp => getLastPayment(pp))
            .reduce((acc, p) => p 
                ? acc || p.amountLeft > 0 
                : acc, 
            false);
        if(areLoansPaidOff) {
            return paymentPlan;
        }
        // Otherwise, calculate minimum payments 
        for(const [loanName, payments] of Object.entries(paymentPlan)) {
            const minimumPayment = minimumPaymentLookup.get(loanName) as number;
            const lastPayment = getLastPayment(payments);
            if(lastPayment && lastPayment.amountLeft > 0) {
                const amountLeft = lastPayment.amountLeft > minimumPayment
                    ? lastPayment.amountLeft - minimumTotalPayment
                    : lastPayment.amountLeft;
                const amountPaid = lastPayment.amountLeft > minimumPayment
                    ? minimumTotalPayment
                    : lastPayment.amountLeft;
                payments.push(new Payment(amountLeft, amountPaid));
            }
        }
    }
    throw new Error("Exceeded the maximum number of payments");
}