


let inputTable = document.querySelector("#input-table");

//cashT=Total cash available in drawer
let cashT;
//cid=Cash array with all details
let cid = [];

//Calculate Total Cash and Cash Array Function
let calcCash = function () {
  cashT = 0;
  cid.length = 0;
  for (let i = 1; i < 10; i++) {
    //input table elements push to cid array
    let iprow = inputTable.getElementsByTagName("tr")[i];
    let iphd = (iprow.querySelector("th")).textContent;

    let ipd0 = Number(iprow.getElementsByTagName("td")[0].textContent)

    let ipd1 = Number(iprow.querySelector("input").value);

    let ipd2El = iprow.getElementsByTagName("td")[2];

    let ipd2 = ((ipd0 * ipd1 * 100) / 100);

    ipd2El.textContent = (ipd0 * ipd1).toFixed(2);

    let innerArr = [];
    innerArr.push(iphd);
    innerArr.push(ipd0);
    innerArr.push(ipd1);
    innerArr.push(ipd2);

    cid.push(innerArr);
    // Total Cash calculation
    cashT += ((ipd2 * 100) / 100);

  }
}



//Initialize cash calculation on page open
calcCash();



//Total Cash Display in input table
let cashEl = document.querySelector("#cash");
cashEl.textContent = ((cashT * 100) / 100).toFixed(2);







let formEl = document.querySelector("form");

//Update input table for any change in entries/input
formEl.addEventListener("input", function (event) {
  calcCash();

  cashEl.textContent = ((cashT * 100) / 100).toFixed(2);
})

//Reset input table
let resetBtn = document.querySelector("#input-reset");
resetBtn.addEventListener("click", function () {
  window.location.reload();
})


//Submit btn leads to output initialization
let submit = document.querySelector("#input-submit");

let outputTable = document.querySelector("#output-table");

let outputStatus = document.querySelector("#output-status");

submit.addEventListener("click", function (event) {

  let formElVa = document.querySelector("form");
  //Check form Validity
  if (formElVa.checkValidity()) {

    event.preventDefault();
    
    
    //Displaying Output Div-container
    let fillerdiv = document.querySelector("#filler");

    fillerdiv.style.display = "none";

    let outputdiv = document.querySelector("#output");

    outputdiv.style.display = "unset";

    
    outputdiv.style.border = "5px solid darkgray";
    outputdiv.style.backgroundColor = "#def2f1";
        outputdiv.style.borderRadius = "30px";
    outputdiv.style.marginTop = "20px";
    outputdiv.style.marginBottom = "20px";
    outputdiv.style.flexBasis = "45vw";
    outputdiv.style.color = "black";
    
    


    //Displaying output    
    const price = document.querySelector("#price").value;

    const payment = document.querySelector("#cash-paid").value;

    const result = checkCashRegister(price, payment, cid);

    let statusResult = result.status;
    let cashResult = [...result.change];

    let resultList = statusResult.split(/[:,]/);
    console.log(resultList);

    outputStatus.innerHTML = `<p style="text-align:center; font-size:20px; font-weight:bold;">Output Status</p>`;
    
    

    let outputList = document.querySelector("#output-list");
    console.log(outputList.children[0]);

    outputList.children[0].style.fontWeight = "bold";
    outputList.children[0].style.fontSize = "1.2rem";

    //inclusion and removal of content and bullets in output list
    for (let i = 0; i < resultList.length; i++) {
      outputList.children[i].style.listStyle = "disc";
      outputList.children[i].textContent = resultList[i];
    }
    outputList.children[0].style.listStyle = "none";
    for (let i = resultList.length; i < 5; i++) {
      outputList.children[i].style.listStyle = "none";
      outputList.children[i].textContent = "";
    }

    //inclusion and removal of table boundary in output table

    let tdnum;
    if(cashResult.length===0){
    tdnum = 0;
    } else{
      tdnum = cashResult.length * 4 + 4;
    }



    let tabletd = outputTable.querySelectorAll("td,th");
    outputTable.style.borderRadius = "10px";
    outputTable.style.margin = "20px auto";
    
    
    
    for (let i = 0; i < tdnum; i++) {
      tabletd[i].style.border = "2px solid darkgray";
      tabletd[i].style.borderRadius = "10px";
      tabletd[i].style.textAlign = "center";
      tabletd[i].style.padding = "5px 10px";
      tabletd[i].style.backgroundColor = "white";
      // tabletd[i].style.backgroundColor = "darkgray";
      tabletd[i].style.color = "darkslategrey";
      tabletd[i].style.fontWeight = "bold";
    }


    for (let i = tdnum; i <= tabletd.length; i++) {
      if (tabletd[i]) {
        tabletd[i].style.border = "none";
        tabletd[i].style.backgroundColor = "unset";
      }
    }
  



    //cash result table display    
    let rowHd = outputTable.getElementsByTagName("tr")[0];
    
    if (cashResult.length > 0) {

      rowHd.cells[0].innerHTML = "Currency";
      rowHd.cells[1].innerHTML = "Value(in$)";
      rowHd.cells[2].innerHTML = "Count";
      rowHd.cells[3].innerHTML = "Total Value(in$)";

    } else {
      rowHd.cells[0].innerHTML = "";
      rowHd.cells[1].innerHTML = "";
      rowHd.cells[2].innerHTML = "";
      rowHd.cells[3].innerHTML = "";

    }

    for (let i = 1; i <= cashResult.length; i++) {

      let row = outputTable.getElementsByTagName("tr")[i];

      let d0 = row.getElementsByTagName("td")[0];
      let d1 = row.getElementsByTagName("td")[1];
      let d2 = row.getElementsByTagName("td")[2];
      let d3 = row.getElementsByTagName("td")[3];

      d0.textContent = `${cashResult[i - 1][0]}`;
      d1.textContent = `${cashResult[i - 1][1]}`;
      d2.textContent = `${cashResult[i - 1][2]}`;
      d3.textContent = `${cashResult[i - 1][3]}`;
    }
    // deleting any extra outputs, if any from previous transaction
    for (let i = cashResult.length + 1; i < 10; i++) {

      let row = outputTable.getElementsByTagName("tr")[i];
      let d0 = row.getElementsByTagName("td")[0];
      let d1 = row.getElementsByTagName("td")[1];
      let d2 = row.getElementsByTagName("td")[2];
      let d3 = row.getElementsByTagName("td")[3];

      d0.textContent = "";
      d1.textContent = "";
      d2.textContent = "";
      d3.textContent = "";
    }




  }
  else {
    console.log("Validity is not ok")
  }
}
);

// Check Cash Register Function and Calculate output result
function checkCashRegister(price, payment, cid) {

  let cidReg = [];

  //deleting any zero cash rows
  for (let i = 0; i < cid.length; i++) {
    // console.log(i,cid[i][3],"=cid[i][3]");
    if (cid[i][3] !== 0) {
      cidReg.push(cid[i]);
    }
  };

  //result initialize  
  let result = { status: "", change: [] };

  //calculate change value to be returned
  let changeValue = payment - price;

  //array for iteration and calculation  
  let countArr = [];

  //check changeValue and decide result
  if (changeValue < 0) {
    result.status = `INSUFFICIENT CASH PAID: Balance amount of $${(price - payment).toFixed(2)} to be paid`;
    result.change = [];
  } else if (changeValue === 0) {
    result.status = `CASH COUNTER OPEN: Cash Paid $${price.toFixed(2)} is equal to the purchase price, No change to be returned. `;
    result.change = [];
  } else if (changeValue > cashT) {
    result.status = `INSUFFICIENT FUNDS: There is not enough cash to return the change, Cash balance in drawer is $${cashT.toFixed(2)}, It is less than the change $${changeValue.toFixed(2)} to be returned.`;
    result.change = [];
  } else if (changeValue === cashT) {
    result.status = `CASH COUNTER CLOSED:(after paying the change $${changeValue.toFixed(2)})Cash Balance in drawer will be zero, So pay the change & close cash counter. Below is all the change to be returned`;
    result.change = [...cidReg];


  } else {
    //tempValue - initialize temporary change value 
    let tempValue = changeValue;

    //do while loop for iteration on cash array cidReg
    do {
      //flush any previous entry in countArr
      countArr.pop();

      let pointer = 0;
      //checking for max. currency available for change/tempValue
      for (let i = cidReg.length - 1; i >= 0; i--) {

        if ((tempValue / cidReg[i][1]).toFixed(2) >= 1 && cidReg[i][3] !== 0) {
          countArr.push(cidReg[i]);
          pointer = i;
          break;
        }
      }


      //in case no such currency is available for change
      if (countArr.length === 0) {
        result.status = `INSUFFICIENT FUNDS: Change of $${changeValue.toFixed(2)} can't be returned, Available cash is $${cashT.toFixed(2)} more than the change to be returned, But do not have the specific currency to return the change.`;
        countArr.length = 0;
        countArr = [...cid];
        result.change = countArr;
        console.log(result);
        break;
      }

      //calculating count(countQ) of the currency selected in countArr
      let countQ = Math.floor(tempValue / countArr[0][1]);
      // available and pending currency 
      let aviCur;
      let pendingCur = 0;
      if (countQ * countArr[0][1] <= countArr[0][3]) {
        aviCur = countQ * countArr[0][1];
      } else {
        aviCur = countArr[0][3]
        pendingCur = countQ * countArr[0][1] - countArr[0][3];


      }
      //deleting currency array which has been already counted, so that it is not considered once again
      cidReg.splice(pointer, cidReg.length - pointer);

      //count of currency to be returned
      let changeCount = parseInt(aviCur / countArr[0][1]);

      //pushing currency name, currency value, currency count and calculated currency to be changed/returned in the result.change array
      result.change.push([countArr[0][0], countArr[0][1], changeCount, aviCur]);

      //countR = remaining/pending cash in total value to be returned
      let countR = tempValue - countQ * countArr[0][1]

      // if pendingCur(in countR array) and countR(pending cash in total temp/changeValue) is zero, push to result
      if (countR === 0 && pendingCur === 0) {
        if (cashT - tempValue > 0) {
          result.status = `CASH COUNTER "OPEN": Change to be returned is $${changeValue.toFixed(2)}, After change returned - cash balance in drawer - $${(cashT - changeValue).toFixed(2)}, Below is the breakup of change to be returned.`;

          break;

        } else {
          result.status = `INSUFFICIENT FUNDS: Though cash Balance is $${(cashT - changeValue).toFixed(2)} greater than the change $${changeValue}, But do not have specific currency "$${(countArr[0][0]).toFixed(2)}" to return the change. `;
          countArr.length = 0;
          countArr = [...cid];
          result.change = countArr;

          break;
        }
      } else {
        // changing temp value to remaining currency to checked for
        tempValue = (pendingCur + countR).toFixed(2);

      }
      if (countArr[0][1] === 0.01) {
        result.status = `INSUFFICIENT_FUNDS: Though cash available is $${cashT}, But as per below combination of currencies-only $${(result.change.reduce((sum, element, index) => sum += element[3], 0)).toFixed(2)} is available, It is less than required change of $${changeValue}`;




      }
    } while (countArr[0][1] > 0.01);

  }

  return result;
}





//Check Sample Data

let openArr = [350, 700, 95, 155, 45, 38, 26, 19, 7, 6, 4];
let closeArr = [1350, 1700, 75, 55, 185, 20, 58, 15, 5, 2, 1];
let insuftArr = [350, 700, 50, 50, 50, 100, 10, 0, 0, 0, 5];

let sampleFunc = function (arr) {

  console.log("i am clicked");

  let inputEl = formEl.querySelectorAll("input");
  console.log(inputEl);

  for (let i = 0; i <= 10; i++) {
    inputEl[i].value = arr[i];
    console.log(inputEl[i].value);

  }
  calcCash();
  cashEl.textContent = ((cashT * 100) / 100).toFixed(2);
  let autosubmit = document.querySelector("#input-submit");
  autosubmit.click();


}


let openbtn = document.querySelector("#open-sample");
openbtn.addEventListener("click", function () {
  sampleFunc(openArr);
});

let closebtn = document.querySelector("#close-sample");
closebtn.addEventListener("click", function () {
  sampleFunc(closeArr);
});

let insuftbtn = document.querySelector("#insuft-sample");
insuftbtn.addEventListener("click", function () {
  sampleFunc(insuftArr);
});




openbtn.addEventListener("click", function () {

  let autosubmit = document.querySelector("#input-submit");
  autosubmit.click();


})



