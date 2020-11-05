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
import { defineComponent } from 'vue';
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'Loans',
  components: {
    // HelloWorld,
  },
  created() {
      //this.loans = this.$store.loans;
  },
  data() {
      return {
          loans: []
      }
  },
  
});
</script>