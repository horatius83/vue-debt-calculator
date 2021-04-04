<template>
    <div id="loans-table" v-if="hasLoans">
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
                <td>${{ loan.principal }}</td>
                <td>{{ loan.interest * 100.0 }}%</td>
                <td>${{ loan.minimum }}</td>
                <td><button v-on:click="deleteLoan(index)">Delete</button></td>
            </tr>
        </table>
    </div>
    <div class="add-loan">
        <h2>Add Loan</h2>
        <div id="loan-name">
            <label for="name">Name</label>
            <input type="text" name="name" id="name" ref="nameRef" v-model.trim="name" >
        </div>
        <div id="loan-principal">
            <label for="principal">Principal</label>
            <input type="number" name="principal" id="principal" v-model.number="principal" >
        </div>
        <div id="loan-interest">
            <label for="interest">Interest</label>
            <input type="number" name="interest" id="interest" v-model.number="interest" >
        </div>
        <div id="loan-minimum">
            <label for="minimum">Minimum</label>
            <input type="number" name="minimum" id="minimum" v-model.number="minimum" >
        </div>
        <div id="loan-submit">
            <button v-on:click="addLoan">Submit</button>
        </div>
    </div>
    <!--
    <div class="add-loan-from-file">
        <h2>Add Loans From File</h2>
        <input  type="file" v-on:change="uploadLoans($event.target.files)">
    </div>
    -->
    <div class="save-loans-to_file">
        <div>
            <a :href="loansFile" download="loans.json">Click here to download loans as JSON</a>
        </div>
        <div>
            <a :href="loansFile" download="loans.json">Click here to download payment plan as JSON</a>
        </div>
        <div>
            <a :href="loansFile" download="loans.json">Click here to download payment plan as PDF</a>
        </div>
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
      },
      hasLoans(): boolean {
          return getLoans().length > 0;
      }
  },
  methods: {
        addLoan() {
            if(this.name && this.principal > 0 && this.interest >= 0 && this.minimum > 0) {
                const newLoan: Loan = new Loan(this.name, this.principal, this.interest / 100.0, this.minimum);
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
        /*
        uploadLoans(files: FileList) {
            console.log(`Uploading files... ${new Date()}`);
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
                for (const loan of loans.map(x => new Loan(x.name, x.principal, x.interest, x.minimum))) {
                    addLoan(loan);
                }
            }
            for (const file of files) {
                fileReader.readAsText(file);
            }
        }
        */
    }
});
</script>