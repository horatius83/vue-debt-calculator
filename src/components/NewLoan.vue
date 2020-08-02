<template>
    <div class="card fluid">
        <div v-if="!shouldDisplayForm">
            <button v-on:click="displayForm" id="addNewLoanButton">Add New Loan</button>
        </div>
        <div v-if="shouldDisplayForm">
            <label for="new-loan-name">Name</label>
            <input 
                name="new-loan-name" 
                id="new-loan-name" 
                v-model="name" 
                required="required" 
            />
            <label for="new-loan-principal">Principal</label>
            <input 
                name="new-loan-principal" 
                type="number" 
                inputmode="decimal" 
                v-model.number="principal" 
                step="0.01" 
                min="0"
            />
            <label for="new-loan-interest">Interest</label>
            <input 
                name="new-loan-interest" 
                id="new-loan-interest" 
                type="number" 
                inputmode="decimal" 
                v-model.number="interest" 
                step="0.01" 
                min="0"
            />
            <label for="new-loan-minimum">Minimum</label>
            <input 
                name="new-loan-minimum" 
                id="new-loan-minimum" 
                type="number" 
                inputmode="decimal" 
                v-model.number="minimum" 
                step="0.01" 
                min="0"
            />
            <div class="row">
                <button class="primary" v-on:click="addNewLoan()">Create New Loan</button>
                <button class="secondary" v-on:click="clear()">Cancel</button>
            </div>
            <div v-if="shouldDisplayErrors">
                <ul>
                    <li v-for="error in errors" :key="error" class="error-message">{{ error }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Loan } from '@/models/loan';
import Component from 'vue-class-component';

@Component
export default class NewLoan extends Vue {
    shouldDisplayForm = false;
    name = '';
    principal = 0;
    interest = 0;
    minimum = 0;
    errors: Array<string> = [];
    
    addNewLoan(): void {
        this.validateForm();
        if(this.errors.length === 0) {
            this.$emit('add-new-loan', new Loan(this.name, this.principal, this.interest, this.minimum));
            this.clear();
        }
    }
    clear(): void {
        this.shouldDisplayForm = false;
        this.name = '';
        this.principal = 0;
        this.interest = 0;
        this.minimum = 0;
        this.errors = [];
        this.$nextTick().then(() => {
            document.getElementById("addNewLoanButton")?.focus();
        });
    }
    displayForm(): void {
        this.shouldDisplayForm = true;
        this.$nextTick().then(() => {
            document.getElementById('new-loan-name')?.focus();
            this.errors = [];
        });
    }
    validateForm(): boolean {
        this.errors = [];
        if(!this.name) {
            this.errors.push('Loan needs a name');
        }
        if(!this.principal) {
            this.errors.push('Loan needs a principal amount');
        }
        if(!this.minimum) {
            this.errors.push('Loan needs a minimum payment');
        }
        return this.errors.length === 0;
    }
    get shouldDisplayErrors(): boolean {
        return (this.errors.length !== 0);
    }
    mounted() {
        document.getElementById("addNewLoanButton")?.focus();
    }
}
</script>