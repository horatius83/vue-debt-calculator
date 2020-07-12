<template>
   <div id="loans-summary">
        <div id="loans-summary-body">
            <h1>Test</h1>
            <Loans v-bind:loans="loans" v-on:delete="deleteLoan"></loans>
            <new-loan v-on:add-new-loan="addNewLoan"></new-loan>
        </div>
    </div>
</template>

<script lang="ts">
import Loans from '@/components/Loans.vue'

export default {
    name: 'loans-summary',
    components: {
        Loans,
        //NewLoan
    },
}
</script>