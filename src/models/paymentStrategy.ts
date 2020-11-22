import { Payment } from './payment';
import { Loan } from './loan';

export type PaymentStrategy = (payments: Map<string, Payment[]>, loans: Loan[], additionalPayment: number) => [number, Map<string, Payment>];

export function getLastPayment(payments: (Payment[] | undefined)): (Payment | undefined) {
    if(payments) {
        return payments[payments.length-1];
    }
}

export function avalanche(payments: Map<string, Payment[]>, loans: Loan[], additionalPayment: number): [number, Map<string, Payment>] {
    const priorityList = (loans
        .map<[Loan, (Payment | undefined)]>(ln => [ln, getLastPayment(payments.get(ln.name))])
        .filter(([_, lastPayment]) => {
            return lastPayment && lastPayment.amountLeft > 0 ? true : false;
        }) as Array<[Loan, Payment]>)
        .sort(([a, _], [b, __]) => b.interest - a.interest);
    const additionalPayments = new Map<string, Payment>();
    for(const [ln, lastPayment] of priorityList) {
        if(lastPayment.amountLeft > additionalPayment) {
            additionalPayments.set(ln.name, new Payment(lastPayment.amountLeft - additionalPayment, additionalPayment));
            return [0, additionalPayments];
        } else {
            additionalPayments.set(ln.name, new Payment(0, lastPayment.amountLeft));
            additionalPayment -= lastPayment.amountLeft;
        }
    }
    return [additionalPayment, additionalPayments];
}

const strategyMap = new Map<string, PaymentStrategy>([
    ["avalanche", avalanche]
]);
export {strategyMap};