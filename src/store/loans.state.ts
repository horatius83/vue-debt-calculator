import { Loan } from '@/models/loan';
import { strategyMap } from '@/models/paymentStrategy';
import { ref } from "vue";

const loansState = ref({
    loans: new Array<Loan>(),
    startingDate: new Date(),
    strategy: "Avalanche"
});

const localStorageKey = 'U1eaf8698-92d7-4177-bd92-7f301d62fa65';
const updateLocalStorage = (state: {loans: Loan[]; startingDate: Date; strategy: string}) => {
    localStorage.setItem(localStorageKey, JSON.stringify({
        loans: state.loans, 
        startingDate: state.startingDate,
        strategy: state.strategy
    }));
};

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

export {addLoan, getLoans, deleteLoan, setStartingDate, getStartingDate, setStrategy, getStrategy};
