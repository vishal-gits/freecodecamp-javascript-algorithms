

$("#check").click(function(event){
    event.preventDefault();

    let str = $("#input-num").val();
    console.log(str);
    
    let result = telephoneCheck(str)
    
    console.log(result);

    if(result){
        $("#output-text").text("Number is Valid")
    }else{
        $("#output-text").text("Number is Not Valid")
    }
    
})





function telephoneCheck(str) {


    let strReg = /^1{0,1}(?=\s|-|\(){0,1}(\s|-){0,1}(\d{3}|\(\d{3}\))(\s|-){0,1}\d{3}(\s|-){0,1}\d{4}$/;
    
    let resMatch = str.match(strReg);
    // console.log(resMatch);
    
    let resTest = strReg.test(str);
    // console.log(resTest);
    
      return resTest;
    }
    
    // telephoneCheck("5555555555");