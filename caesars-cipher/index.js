

// 65 to 90 and 97 to 122
let test1 = "'"
console.log(test1.charCodeAt(0));

function rot13(str) {

    let strRes = [];
    for (let i = 0; i < str.length; i++) {
        //get charcode
        let num = str.charCodeAt(i);
        console.log("num=", num);

        if(num<65){
            strRes.push(str[i])
            console.log(strRes);   
        }else if(num>64 && num<91){
            let numC = num + 13;
            console.log("numC=", numC)
            if (numC <= 90) {
                console.log("pointer1")
                strRes.push(String.fromCharCode(numC));
                console.log(strRes);
            } else {
                numC -= 26;
                console.log("pointer2,numC>90", numC);
                strRes.push(String.fromCharCode(numC));
                console.log(strRes);
            }
        }else if(num>90 && num <97){
            console.log("pointer3,num=",num)
            strRes.push(str[i])
            console.log(strRes);   

        }else if(num>96 && num<123){
            numC = num + 13;
            console.log("numC=", numC)
            if (numC <= 122) {
                console.log("pointer1")
                strRes.push(String.fromCharCode(numC));
                console.log(strRes);
            } else {
                numC -= 26;
                console.log("pointer2,numC>122", numC);
                strRes.push(String.fromCharCode(numC));
                console.log(strRes);
            }
        }
    }
    let result = strRes.join("");
    console.log(result);
    return result;
}

rot13("The sky is clear, so go for a morning walk");


let encBtn = document.querySelector("#enc-btn");
let decBtn = document.querySelector("#dec-btn");
let encInput = document.querySelector("#enc-input");
let decInput = document.querySelector("#dec-input");
let encOutput = document.querySelector("#enc-output");
let decOutput = document.querySelector("#dec-output");
let resBtn = document.querySelector("#reset-btn");
console.log(encInput.value);
console.log(decInput.value);

encBtn.addEventListener("click",function(){
    let str = encInput.value;
    let result = rot13(str);
    encOutput.value = result;

})

decBtn.addEventListener("click",function(){
    let str = decInput.value;
    let result = rot13(str);
    decOutput.value = result;

})

resBtn.addEventListener("click",function(){
    encInput.value = "";
    decInput.value = "";
    encOutput.value = "";
    decOutput.value = "";

})

