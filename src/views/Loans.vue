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
            <td>{{loan.name}}</td>
            <td>{{loan.principal}}</td>
            <td>{{loan.interest}}</td>
            <td>{{loan.minimum}}</td>
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
  data() {
      return {
          loans: [
            {name: 'Test Name', principal: 1983, interest: 0.05, minimum: 19.0},
            {name: 'Test Name 2', principal: 1985, interest: 0.03, minimum: 19.0}
          ]
      }
  }
});
</script>