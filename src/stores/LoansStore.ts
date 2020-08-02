import { Loan } from '@/models/loan';
import { avalanche, PaymentStrategy } from '@/models/paymentStrategy';

// https://blog.logrocket.com/how-to-write-a-vue-js-app-completely-in-typescript/

const loanServiceKey = 'debt-calculator-loans';

function saveJsonObject(key: string, thingToSave: object) {
    const thingAsString = JSON.stringify(thingToSave);
    const thingAsBase64 = atob(thingAsString);
    window.localStorage.setItem(key, thingAsBase64);
}

function getJsonObject(key: string) {
    const thingAsBase64 = window.localStorage.getItem(key);
    if(!thingAsBase64) {
        return undefined;
    }
    const thingAsString = btoa(thingAsBase64);
    return JSON.parse(thingAsString);
}

export interface PaymentStrategyOption {
    name: string;
    displayName: string;
    strategy: PaymentStrategy
}

class LoanService {
    private loans: Loan[];
    private totalMonthlyPayment: number;
    private startingMonth: Date;
    public paymentStrategies: Map<string, PaymentStrategyOption>;
    public paymentStrategy: PaymentStrategyOption;

    constructor() {
        /*
        this.loans = [
            new Loan("Monroe and Main", 60.36, 21.0, 20.0),
            new Loan("Blair", 124.87, 27.24, 51),
            new Loan("Chase Slate", 1549.03, 29.99, 51),
            new Loan("JC Penny", 2460.37, 26.99, 99.24),
            new Loan("ExxonMobil", 1478.91, 25.24, 46.70),
            new Loan("Home Depot", 1098.21, 25.99, 37),
            new Loan("Sam's Club", 6717.28, 23.15, 199),
            new Loan("Chevron / Texaco", 1790.62, 27.24, 59),
            new Loan("Woman Within", 1116.68, 27.24, 50),
            new Loan("Dillards", 6228.85, 22.24, 170),
            new Loan("Spruce / Viewtech Financial", 4822.99, 0, 202.96),
            new Loan("Ginny's", 433.74, 21, 30),
            new Loan("Walmart", 3872.16, 17.15, 94),
            new Loan("Military Star", 799.68, 10.49, 45),
            new Loan("Sears", 3797.66, 25.44, 122)
        ];
        */
       const json = getJsonObject(loanServiceKey);
       this.loans = json?.loans as Loan[] || [];
       this.totalMonthlyPayment = json?.totalMonthlyPayment || 0;
       const startingMonth = json?.startingMonth;
       if(startingMonth) {
           this.startingMonth = new Date(startingMonth);
       } else {
           this.startingMonth = new Date();
       }
       
        this.paymentStrategies = new Map<string, PaymentStrategyOption>([
            ['avalanche', {name: 'avalanche', displayName: 'Avalanche', strategy: avalanche}],
            //['snowball'[], {name: 'snowball', displayName: 'Snowball', strategy: snowball}],
            //['double', {name: 'double', displayName: 'Double-Double', strategy: double}]
        ]);
        this.paymentStrategy = this.paymentStrategies.get('avalanche') as PaymentStrategyOption;
    }

    getLoans() {
        return this.loans;
    }

    addLoan(loan: Loan) {
        this.loans.push(loan);
        this.save();
    }

    deleteLoan(loan: Loan) {
        const index = this.loans
            .reduce((j, x, i) => x.name == loan.name ? i : j, -1);
        if(index > -1) {
            this.loans.splice(index,1);
        }
        this.save();
    }

    save() {
        saveJsonObject(loanServiceKey, {
            loans: this.loans,
            totalMonthlyPayment: this.totalMonthlyPayment
        });
    }

    setPaymentStrategy(strategy: string) {
        const ps = this.paymentStrategies.get(strategy);
        if(ps) {
            this.paymentStrategy = ps as PaymentStrategyOption;
        }
        console.log(`Could not get payment strategy for strategy ${strategy}`);
    }

    getPaymentStrategy() {
        return this.paymentStrategy;
    }

    getPaymentStrategies() {
        return this.paymentStrategies;
    }

    getTotalMonthlyPayment() {
        return this.totalMonthlyPayment;
    }

    setTotalMonthlyPayment(payment: number) {
        this.totalMonthlyPayment = payment;
        this.save();
    }

    getMinimumMonthlyPayment() {
        throw new Error('Not implemented');
        /*
        if(!date) {
            date = new Date();
        }
        const payments = this.loans
            .map(ln => new Payment(ln, ln.principal, 0, date))
            .map(p => p.getMinimumMonthlyPayment(date));
        return payments.reduce((acc, x) => acc + x.amountPaid, 0);
        */
    }
}

var loanService = new LoanService();

export { loanService }