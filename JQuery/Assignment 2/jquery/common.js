jQuery.fn.extend({
    generateCaptcha: function () {
        var a = Math.floor(Math.random() * 10) + 1;
        var b = Math.floor(Math.random() * 10) + 1;       
        var c = Math.floor(Math.random() * 4) + 1;  
        var code,val1;
        if(c === 1){
            code = a + '+' + b;
            val1 = a+b;
        } else if (c === 2 && a >= b){
            code = a + '-' + b;
            val1 = a-b;
        } else if (c === 2 && b > a){
            code = b + '-' + a;
            val1 = b-a;
        } else if (c === 3) {
            code = a + '*' + b;
            val1 = a*b;
        } else if (c === 4 && a >= b) {
            code = a + '/' + b;
            val1 = Math.floor(a/b);
        } else if (c === 4 && a <= b) {
            code = b + '/' + a;
            val1 = Math.floor(b/a);
        } else {
            code = "Invalid Operation.";
            val1 = 0;
        }
        var captcha = $('#hiddenTxtCaptcha');
        captcha.val(val1);
        $("#txtCaptchaDiv").html(code);
    },
    restrictNumeric: function(e) {
        var regexpAlpha = /[a-z]/i;
        var value = String.fromCharCode(e.which) || e.key;
    
        // No letters
        if (regexpAlpha.test(value)) {
          e.preventDefault();
          return false;
        }
    },
    checkSpcialChar: function(event){
        if(!((event.keyCode >= 65) && (event.keyCode <= 90) || (event.keyCode >= 97) && (event.keyCode <= 122) || (event.keyCode >= 48) && (event.keyCode <= 57) || (event.keyCode >= 8) && (event.keyCode <= 13))){
           event.preventDefault();
           return;
        }
        event.returnValue = true;
    }
});

$('#captchaField').generateCaptcha();

$('#grpAddressField').on('change', 'select.country', function() {
    $(this).countryChange();
});

$('#captchaField').on('click',"#btnRefreshCaptcha", function (e) {
    e.preventDefault();
    $(this).generateCaptcha();    
});
$(function(){
    var dtToday = new Date();
    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();
    if(month < 10)
        month = '0' + month.toString();
    if(day < 10)
        day = '0' + day.toString();
    var maxDate = year + '-' + month + '-' + day;    
    $('#txtBirthDate').attr('max', maxDate);
});
$('#txtAdhaar').on('keydown keyup keypress', function(){
    $(this).restrictNumeric(event);
    $(this).checkSpcialChar(event);
});
$('#grpPhoneField').on('keydown keyup keypress', 'input.validate-phone',function(){
    $(this).restrictNumeric(event);
    $(this).checkSpcialChar(event);
});
$('#grpAddressField').on('keydown keyup keypress','input.validate-zipcode', function() {
    $(this).restrictNumeric(event);
    $(this).checkSpcialChar(event);
});

