import { Loan } from '@/models/loan';
import { strategyMap } from '@/models/paymentStrategy';
import { ref } from "vue";

const loansState = ref({
    loans: new Array<Loan>(),
    startingDate: new Date(),
    strategy: "Avalanche"
});

const addLoan = (loan: Loan) => {
    loansState.value.loans.push(loan);
};
const getLoans = () => loansState.value.loans;
const deleteLoan = (index: number): boolean => {
    if(index >= 0 && index < loansState.value.loans.length) {
        loansState.value.loans.splice(index, 1);
        return true;
    }
    return false;
}

const setStartingDate = (date: Date) => loansState.value.startingDate = date;
const getStartingDate = () => loansState.value.startingDate;

const setStrategy = (strategy: string) => loansState.value.strategy = strategy;
const getStrategy = () => [loansState.value.strategy, strategyMap.get(loansState.value.strategy)];

export {
    addLoan, 
    getLoans, 
    deleteLoan, 
    setStartingDate, 
    getStartingDate, 
    setStrategy, 
    getStrategy
};
