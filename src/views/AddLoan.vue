<template>
    <div class="add-loan">
        <label for="name">Name</label>
        <input type="text" name="name" id="name" v-model="name" >
        <label for="principal">Principal</label>
        <input type="number" name="principal" id="principal" v-model="principal" >
        <label for="interest">Interest</label>
        <input type="number" name="interest" id="interest" v-model="interest" >
        <label for="minimum">Minimum</label>
        <input type="number" name="minimum" id="minimum" v-model="minimum" >
        <input type="button" value="Submit" v-on:click="addLoan"/>
    </div>
</template>
<script lang="ts">
import { Loan } from '@/models/loan';
import { defineComponent } from 'vue';
import { addLoan } from '@/store/loans.state'

export default defineComponent({
    name: 'AddLoan',
    components: {

    },
    data() {
        return {
            name: '',
            principal: 0,
            interest: 0,
            minimum: 0
        }
    },
    methods: {
        addLoan() {
            console.log('addLoan');
            console.log(`Name: ${this.name} Principal: $${this.principal}, Interest: ${this.interest}%, Minimum: $${this.minimum}`);
           if(this.name && this.principal > 0 && this.interest >= 0 && this.minimum > 0) {
               console.log('adding loan');
            addLoan(new Loan(this.name, this.principal, this.interest, this.minimum));
           }
        }
    }
});
</script>