<template>
    <div class="add-loan">
        <label for="name">Name</label>
        <input type="text" name="name" id="name" :value="name" />
        <label for="principal">Principal</label>
        <input type="number" name="principal" id="principal" :value="principal" />
        <label for="interest">Interest</label>
        <input type="number" name="interest" id="interest" :value="interest" />
        <label for="minimum">Minimum</label>
        <input type="number" name="minimum" id="minimum" :value="minimum" />
        <input type="button" value="Submit" />
    </div>
</template>
<script lang="ts">
import { Loan } from '@/models/loan';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'AddLoan',
    components: {

    },
    data() {
        return {
            name: 'Name',
            principal: 0,
            interest: 0,
            minimum: 0
        }
    },
    methods: {
        addLoan() {
           //this.$store.addLoan(new Loan(this.name, this.principal, this.interest, this.minimum));
        }
    }
});
</script>