<template>
    <div class="card fluid">
        <table id="loans-table">
            <thead>
                <th class="loans-table-name-column">Name</th>
                <th class="loans-table-principal-column">Principal</th>
                <th class="loans-table-interest-column">Interest</th>
                <th class="loans-table-minimum-column">Minimum</th>
                <th class="loans-table-delete-column"></th>
            </thead>
            <tr v-for="loan in loans" :key="loan.name">
                <td data-label="Name">{{ loan.name }}</td>
                <td data-label="Principal">{{ loan.principal | currency }}</td>
                <td data-label="Interest">{{ loan.interest }}%</td>
                <td data-label="Minimum">{{ loan.minimum | currency }}</td>
                <td><button class="secondary" v-on:click="$emit('delete', loan)">Delete</button></td>
            </tr>
        </table>
    </div>
</template>
<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator';
import { Loan } from '@/models/loan';

@Component
export default class Loans extends Vue {
    @Prop() public loans!: Loan[]
}
</script>