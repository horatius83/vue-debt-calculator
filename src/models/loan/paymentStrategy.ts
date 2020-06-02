import { Payment } from './payment';

export function avalanche(
    payments: Array<Payment>, 
    totalMoney: number, 
    dateOfPayment: Date): Array<Payment> {

   return sortAndGetPayments(
       payments, 
       totalMoney, 
       dateOfPayment, 
       avalancheSort); 
}

export function snowball(
    payments: Array<Payment>, 
    totalMoney: number, 
    dateOfPayment: Date): Array<Payment> {

    return sortAndGetPayments(
        payments, 
        totalMoney, 
        dateOfPayment, 
        snowballSort);
}

export function double(
    payments: Array<Payment>, 
    totalMoney: number, 
    dateOfPayment: Date): Array<Payment> {

    const sortingFunction = avalancheSort;
    const priorityList = payments.sort(sortingFunction);
    const minimumMoney = payments.reduce((acc,x) => acc + x.getMinimumMonthlyPayment(dateOfPayment).amountPaid, 0);
    let extraMoney = totalMoney - minimumMoney;
    if(extraMoney < 0) {
        throw new Error(`Monthly payment amount ${totalMoney} was less than the minimum amount needed ${minimumMoney}`);
    }
    let newPayments = [];
    for(const payment of priorityList) {
        if(payment.principal > 0) {
            if(extraMoney == 0) {
                newPayments.push(payment.getMinimumMonthlyPayment(dateOfPayment));
            } else {
                let minimumMonthlyPayment = payment.getMinimumMonthlyPayment(dateOfPayment);
                if(minimumMonthlyPayment.amountPaid <= extraMoney) {
                    const payment = Math.min(minimumMonthlyPayment.amountPaid, minimumMonthlyPayment.principal);
                    extraMoney -= payment;
                    minimumMonthlyPayment.amountPaid += payment;
                    minimumMonthlyPayment.wasDoubled = true;
                    newPayments.push(minimumMonthlyPayment);
                } else {
                    newPayments.push(payment.getMinimumMonthlyPayment(dateOfPayment));
                }
            }
        }
    }
    return newPayments;
}

function avalancheSort(a: Payment, b: Payment): number {
    return  b.loan.interest - a.loan.interest;
}

function snowballSort(a: Payment, b: Payment): number {
    return a.loan.principal - b.loan.principal;
}

function sortAndGetPayments(
    payments: Array<Payment>, 
    totalMoney: number, 
    dateofPayment: Date, 
    sortingFunction: (a: Payment, b: Payment) => number): Array<Payment> {

    const priorityList = payments.sort(sortingFunction);
    const minimumMoney = payments.reduce((acc,x) => acc + x.getMinimumMonthlyPayment(dateofPayment).amountPaid, 0);
    let extraMoney = totalMoney - minimumMoney;
    if(extraMoney < 0) {
        throw new Error(`Monthly payment amount ${totalMoney} was less than the minimum amount needed ${minimumMoney}`);
    }
    let newPayments = [];
    for(const payment of priorityList) {
        if(payment.principal > 0) {
            if(extraMoney == 0) {
                newPayments.push(payment.getMinimumMonthlyPayment(dateofPayment));
            } else {
                const minimumMonthlyPayment = payment.getMinimumMonthlyPayment(dateofPayment);
                let [newPayment, bonusMoney] = minimumMonthlyPayment.createBonusMoneyPayment(extraMoney);
                extraMoney = bonusMoney;
                newPayments.push(newPayment);
            }
        }
    }
    return newPayments;
}