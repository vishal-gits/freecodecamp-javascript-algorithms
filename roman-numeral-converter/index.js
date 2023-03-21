
//Initiate counter and result
let count = 0;
let romanN, romanN1;


//Convert Button Click Event- to convert number to roman number
$("#convert").click(function () {

  $("input").stop();
  $("span").stop();

  // checking validity
  if ((document.querySelector("#numbr")).checkValidity()) {

    // console.log('All OK');

    let numbr = $("#numbr").val();

    // console.log(numbr);
    // calling converter function convertToRoman
    if (numbr) {

      count++;

      romanN = convertToRoman(numbr);

      $("#roman").text(romanN);

      $("#roman").toggleClass("bg-info");
      //appending results on output table
      if (count == 1) {
        $("thead").append("<tr><th>Number</th><th>Roman Number</th></tr>");
        $("#output-body").append("<tr><td>" + numbr + "</td><td>" + romanN + "</td></tr>");
        console.log("1st one");
      } else {
        if (romanN !== romanN1) {
          console.log("changed", romanN, romanN1);
          $("#output-body").append("<tr><td>" + numbr + "</td><td>" + romanN + "</td></tr>");
        }
      }
      // for reset button after 5 entries
      if (count == 5) {
        $("#output-body").after("<button class='btn btn-primary mx-auto mt-5' id='reset-btn' type='reset'>Reset</button>")

        $("#reset-btn").click(function () {
          window.location.reload();
        })
      }

      romanN1 = romanN;
      console.log("romanN1", romanN1);

    }
  }

  //validation warning
  else {
    setInterval(function () {
      if ($("span").hasClass("text-dark")) {
        $("span").addClass("text-warning").removeClass("text-dark");
      } else {
        $("span").addClass("text-dark").removeClass("text-warning");
      }
    }, 650);


  }
});

// converter function
function convertToRoman(num) {

  console.log(num);
  let numbers = [1, 4, 5, 9, 10, 40, 50, 90, 100, 400, 500, 900, 1000]
  let romans = ["I", "IV", "V", "IX", "X", "XL", "L", "XC", "C", "CD", "D", "CM", "M"]

  // 1,5,10,50,100,500,1000
  // I,V,X,L,C,D,M

  let resArr = [];
  let chkNum = num;
  let numtemp;
  let tempQ;
  let tempR;


  function lessThan(num) {
    return numbers.find((element, index, arr) => num <= arr[index + 1]);
  }

  function equalTo(num) {
    return numbers.some(element => num === element)
  }


  do {
    // console.log(chkNum)

    if (chkNum === 1) {
      // console.log("chkNum equal to 1")
      resArr.push(romans[numbers.indexOf(chkNum)]);
      //  console.log(resArr);
      break;
    }
    else if (equalTo(chkNum)) {
      // console.log("chkNum equal found")
      resArr.push(romans[numbers.indexOf(chkNum)]);
      // console.log(resArr);
      break;
    }
    else {
      let lessNum;

      if (chkNum > 1000) {
        lessNum = 1000;
      }
      else {
        lessNum = lessThan(chkNum);
        // console.log("chkNum less than found",lessNum);
      }

      tempQ = Math.floor(chkNum / lessNum);
      // console.log("tempQ=",tempQ);

      if (tempQ >= 1) {
        // console.log("pointer for loop")
        for (let i = 1; i <= tempQ; i++) {
          // console.log(numbers.indexOf(lessNum),"index for roman");
          resArr.push(romans[numbers.indexOf(lessNum)]);
          // console.log(resArr);
        }
      }

      tempR = chkNum % lessNum;
      // console.log(tempR,"=tempR");
      chkNum = tempR;
      // console.log("bottom chkNum=",chkNum);
    }

  } while (chkNum > 0);

  let result = resArr.join("");
  return result;

}
