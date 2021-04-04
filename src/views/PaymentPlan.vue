<template>
    <h2>Payment Plan</h2>
    <div id="payment-plan-parameters">
        <label for="maximumPayments">Maximum Payments</label>
        <input type="number" min="0" :max="maximumPayments" name="maximumPayments" v-model.number="totalPayment">
        <label for="paymentAmount" >Payment Amount</label>
        <input type="number" :min="minimumPaymentAmount" name="paymentAmount" v-model.number="paymentAmount">
    </div>
    <div class="payment-month" v-for="(month, index) in paymentPlan" :key="index">
        <h3>{{month.month}}</h3>
        <table>
            <thead>
                <th>Loan</th>
                <th>Payment</th>
                <th>Amount Left</th>
            </thead>
            <tr>
            </tr>
        </table>
    </div>
</template>
<script lang="ts">
import { Loan } from '@/models/loan';
import { Payment } from '@/models/payment';
import { createPaymentPlan, getMinimumPayments } from '@/models/paymentPlan';
import { getLoans, getMaximumPayments, getStartingDate, getStrategy } from '@/store/loans.state';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'PaymentPlan',
    data() {
        return {
            totalPayment: 0,
            paymentAmount: 0
        }
    },
    created() {
        this.totalPayment = this.maximumPayments;
        this.paymentAmount = this.minimumPaymentAmount;
    },
    computed: {
        startingDate() {
            return getStartingDate();
        },
        maximumPayments() {
            return getMaximumPayments();
        },
        minimumPaymentAmount() {
            return getMinimumPayments(getMaximumPayments(), getLoans());
        },
        paymentPlan(): Array<{month: string; payments: Map<string, Payment>}> {
            debugger;
            const [_, strategy] = getStrategy();
            if(!strategy) {
                return [];
            }
            const loans = getLoans();
            const startingDate = getStartingDate();
            const maximumPayments = getMaximumPayments();
            if(!loans.length || !startingDate || !maximumPayments) {
                return [];
            }
            const paymentPlan = createPaymentPlan(loans, maximumPayments, this.totalPayment, strategy);
            const maximumPaymentPlanLength = [...paymentPlan.values()]
                .reduce((acc,x) => x.length > acc ? x.length : acc, 0);
            const dateTimeFormatter = new Intl.DateTimeFormat([...navigator.languages], {year: 'numeric', month: 'long'});
            const paymentsByMonth = new Array<{month: string; payments: Map<string, Payment>}>();
            for(let i=0;i<maximumPaymentPlanLength;++i) {
                const month = new Date(startingDate.getFullYear(), startingDate.getMonth() + i, 1);
                const monthAsString = dateTimeFormatter.format(month);
                const payments = new Map(Object.entries(paymentPlan)
                    .filter(e => e[1].length < i) // if the payments have ceased then don't try access them
                    .map(e => [e[0], e[1][i]]) // get mapping of loan-name to the payment for this month
                );
                paymentsByMonth.push({month: monthAsString, payments});
            }
            return paymentsByMonth;
        }
    }
});
</script>