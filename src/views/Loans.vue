<template>
   <div id="loans-summary">
        <div id="loans-summary-body">
            <Loans v-bind:loans="loans" v-on:delete="deleteLoan"></loans>
            <new-loan v-on:add-new-loan="addNewLoan"></new-loan>
        </div>
    </div>
</template>

<script lang="ts">
import Loans from '@/components/Loans.vue'
import NewLoan from '@/components/NewLoan.vue'
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Loan } from '@/models/loan';

@Component({
    name: 'loans-summary',
    components: {
        Loans,
        NewLoan
    }
})
export default class LoansSummary extends Vue {
    private loans = new Array<Loan>()

    addNewLoan(): void {
        console.log('addNewLoan');
    }
    deleteLoan(): void {
        console.log('deleteLoan');
    }
}
</script>