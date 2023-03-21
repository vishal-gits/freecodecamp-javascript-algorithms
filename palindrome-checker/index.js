
let btn = document.querySelector("#submit-btn");
// console.log(btn);

    let bodyElement = document.querySelector("body");
    // console.log(bodyElement);
    let p1 = document.createElement("p");
    // console.log(p1);
    bodyElement.append(p1);


btn.addEventListener("click",function(e){
    e.preventDefault();
if(document.querySelector("input").value){   
    // console.log("i am clicked");
    let inputEl = document.querySelector("input");
    // console.log(inputEl);
    let str = inputEl.value;
    // console.log(str);
   
    // console.log(palindrome(str));
    let result = palindrome(str);
    // console.log(result);
    
    


    if(result===true){
          p1.innerHTML = `The expression entered is <b>'${str}\'</b> <span style="display:block; font-weight:bold; font-size:25px;">This is a Palindrome</span>`
        //    console.log(p1.innerHTML);
          } else{
            p1.innerHTML = `The expression entered is <b>'${str}\'</b> <span style="display:block; font-weight:bold; font-size:25px;">This is NOT a Palindrome</span>`
        //    console.log(p1.innerHTML);
          }
    document.querySelector("input").value=null;
}      
});



function palindrome(str) {

let strregex= /[A-Za-z0-9]+/gi;
let str1 = str.toLowerCase().match(strregex);
// console.log(str1);

let strjoined = str1.join("");
// console.log(str1.join(""));

let strarr = [...strjoined]
// console.log(strarr,Array.isArray(strarr));
let arrtemp = [];
strarr.forEach((element,index)=> arrtemp.push(strarr[strarr.length-1-index]));
// console.log(arrtemp)
let strfinal = arrtemp.join("");
// console.log(strfinal);


if(strjoined===strfinal){
//   console.log("true");
    return true;
  } else {
    return false;
  };

};

