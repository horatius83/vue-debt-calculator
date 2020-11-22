<template>
    <h1>Loans</h1>
    <table>
        <tr>
            <th>Name</th>
            <th>Principal</th>
            <th>Interest</th>
            <th>Minimum</th>
        </tr>
        <tr v-for="(loan, index) in loans" :key="index">
            <td>{{ loan.name }}</td>
            <td>{{ loan.principal }}</td>
            <td>{{ loan.interest }}</td>
            <td>{{ loan.minimum }}</td>
        </tr>
    </table>
    <router-link to="/addloan">
        <button>Add Loan</button>
    </router-link>
</template>
<script lang="ts">
import { Loan } from '@/models/loan';
import { getLoans } from '@/store/loans.state';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Loans',
  components: {
    // HelloWorld,
  },
  created() {
      const loans = getLoans();
      for(const loan of loans) {
          this.loans.push(loan);
      }
  },
  data() {
      return {
          loans: new Array<Loan>()
      }
  },
  
});
</script>