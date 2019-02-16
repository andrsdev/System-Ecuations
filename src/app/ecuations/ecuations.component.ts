import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ecuations',
  templateUrl: './ecuations.component.html',
  styleUrls: ['./ecuations.component.css']
})
export class EcuationsComponent implements OnInit {

  steps = [];
  rowStep = [];

  stepsCounter = 0;
  literals = ['a','b','c','d','e','f','g'];
  methods = [
    'Reduction',
    'Evening',
    'Substitution',
    'Cramer',
    'Gauss',
    'Gauss Jordan'
  ]

  selectedMethod;
  selectedLiterals;
  variablesNumber;
  solved = false;

  matrix = [];
  result = [];
  reductionRow = [];
  evening1 = [];
  evening2 = [];


  constructor() { }

  ngOnInit() {
 
    this.setNumberOfVariables(2);
    this.setMethod(5);
  }

  setNumberOfVariables(num){  
    this.solved = false;
    this.variablesNumber = num;
    this.selectedLiterals = this.literals.slice(0, num);

    this.matrix = [];
    for (let i = 0; i < num; i++) {
     this.matrix[i] = new Array(num + 1).fill("0"); 
    }
  }

  setMethod(num){
    this.solved = false;
    this.selectedMethod = num;
  }


  solve(){
    this.steps = [];
    this.rowStep = [];
    this.stepsCounter = 0;
    let matrix = this.matrix.slice();

    for (let column = 0; column < this.variablesNumber - 1; column++) {
      for (let row = column + 1; row < this.variablesNumber; row++) {
        matrix[row] = this.operateRows(matrix[column], matrix[row], column, row);
      }
    }

    console.log(matrix.slice());
           
    for (let column = this.variablesNumber - 1; column > 0; column--) {
      for (let row = column - 1; row >= 0; row--) {
        matrix[row] = this.operateRows(matrix[column], matrix[row], column, row);
      }
    }

    this.result = [];
    for (let pos = 0; pos < this.variablesNumber; pos++) {
      this.result.push((matrix[pos][this.variablesNumber]/matrix[pos][pos]).toString());
    }

    console.log(this.result);
    console.log("Steps", this.steps);
    this.solved = true;

    this.solveEvening();
  }

  solveEvening(){
    let row1 = this.matrix[0].slice();
    let row2 = this.matrix[1].slice();

    for (let i = 1; i < this.variablesNumber; i++) {
      row1[i] = row1[i]*(-1);
      row2[i] = row2[i]*(-1);
    }

    for (let i = 1; i <= this.variablesNumber; i++) {
      row1[i] = Math.round(row1[i]/row1[0] * 100)/100;
      row2[i] = Math.round(row2[i]/row2[0] * 100)/100;
    }

    this.evening1 = row1.slice(1);
    this.evening2 = row2.slice(1);

    console.log("r1", this.evening1);
    console.log("r2", this.evening2);
  }

  operateRows(row1, row2, column, row){
    let newRow = []; 
    this.steps.push(
      "F" +  (row + 1).toString() + " = " +
      row1[column].toString() + "F" +  (row + 1).toString() + 
      " - " 
      + row2[column].toString() + "F" + (column + 1).toString()
    );

    for (let i = 0; i <= this.variablesNumber; i++) {
      const first = (row2[i]*row1[column]);
      const second = (row1[i]*row2[column]);
      newRow[i] =  first - second;
    }

    this.stepsCounter++;
    this.rowStep.push(newRow.slice());
    return newRow;
  }

}
