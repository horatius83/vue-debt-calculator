<template>
    <h2>Payment Plan</h2>
    <div id="payment-plan-parameters">
        <label for="maximumPayments">Maximum Payments</label>
        <input type="number" min="0" max="120" name="maximumPayments" v-model.number="totalPayments">
    </div>
    <div class="payment-month">
        <h3></h3>
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
import { Payment } from '@/models/payment';
import { createPaymentPlan } from '@/models/paymentPlan';
import { getLoans, getMaximumPayments, getStartingDate, getStrategy } from '@/store/loans.state';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'PaymentPlan',
    data() {
        return {
            totalPayment: 0
        }
    },
    computed: {
        paymentPlan() {
            const [strategyName, strategy] = getStrategy();
            if(!strategy) {
                return new Map<string, Payment[]>();
            }
            const loans = getLoans();
            const startingDate = getStartingDate();
            const maximumPayments = getMaximumPayments();
            const paymentPlan = createPaymentPlan(loans, maximumPayments, this.totalPayment, strategy);
            return paymentPlan;
        }
    }
});
</script>