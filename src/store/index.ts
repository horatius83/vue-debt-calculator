import { Loan } from '@/models/loan';
import { createStore } from 'vuex'

export default createStore({
  state: {
    loans: new Array<Loan>(),
  },
  mutations: {
    addLoan (state, loan: Loan) {
      state.loans.push(loan);
    },
  },
  actions: {
  },
  modules: {
  }
})
