<template>
    <div id="loans-table">
        <h2>Loans</h2>
        <table>
            <tr>
                <th>Name</th>
                <th>Principal</th>
                <th>Interest</th>
                <th>Minimum</th>
                <th></th>
            </tr>
            <tr v-for="(loan, index) in loans" :key="index">
                <td>{{ loan.name }}</td>
                <td>{{ loan.principal }}</td>
                <td>{{ loan.interest }}</td>
                <td>{{ loan.minimum }}</td>
                <td><button v-on:click="deleteLoan(index)">Delete</button></td>
            </tr>
        </table>
    </div>
    <div class="add-loan">
        <h2>Add Loan</h2>
        <label for="name">Name</label>
        <input type="text" name="name" id="name" ref="nameRef" v-model.trim="name" >
        <label for="principal">Principal</label>
        <input type="number" name="principal" id="principal" v-model.number="principal" >
        <label for="interest">Interest</label>
        <input type="number" name="interest" id="interest" v-model.number="interest" >
        <label for="minimum">Minimum</label>
        <input type="number" name="minimum" id="minimum" v-model.number="minimum" >
        <button v-on:click="addLoan">Submit</button>
    </div>
    <div class="add-loan-from-file">
        <h2>Add Loans From File</h2>
        <input  type="file" v-on:change="uploadLoans($event.target.files)">
    </div>
    <div class="save-loans-to_file">
        <h2>Save Loans To File</h2>
        <a :href="loansFile" download="loans.json">Click here to download loans</a>
    </div>
</template>
<script lang="ts">
import { Loan } from '@/models/loan';
import { addLoan, deleteLoan, getLoans } from '@/store/loans.state';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Loans',
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
  computed: {
      loans() {
          return getLoans();
      },
      loansFile() {
          const json = new Blob([JSON.stringify(getLoans())], {type: "text/json"});
          return URL.createObjectURL(json);
      }
  },
  methods: {
        addLoan() {
            if(this.name && this.principal > 0 && this.interest >= 0 && this.minimum > 0) {
                const newLoan: Loan = new Loan(this.name, this.principal, this.interest, this.minimum);
                addLoan(newLoan);
                this.name = '';
                this.principal = 0;
                this.interest = 0;
                this.minimum = 0;
            }
        },
        deleteLoan(index: number) {
            deleteLoan(index);
        },
        uploadLoans(files: FileList) {
            if(files.length <= 0) {
                console.log('No files to upload');
                return;
            }
            const fileReader = new FileReader();
            fileReader.onload = function(e) {
                const contents = e?.target?.result as string;
                if (!contents) {
                    console.log('Could not read file contents');
                    return;
                }
                const loans = JSON.parse(contents) as Array<Loan>;
                for (const loan of loans) {
                    addLoan(loan);
                }
            }
            for (const file of files) {
                fileReader.readAsText(file);
            }
        }
    }
});
</script>