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
        var captcha = $('#txtCaptcha');
        captcha.val(val1);
        $("#txtCaptchaDiv").html(code);
    },
    countryChange: function() { 
        var str1 = '#' + $(this).closest('.country').attr('id');
        var str2 = '#' + $(this).closest('.country').parent().parent().find('.initial-hide:eq(1)').attr('id');
        var str3 = '#' + $(this).closest('.country').parent().parent().find('.initial-hide').attr('id');
        console.log(str1 + " " + str2 + " " + str3);
        
        var countryState = [
            [
                'IN',[
                ['', 'State/Province'],
                ['OD', 'Odisha'],
                ['AP', 'Andhra Pradesh'],
                ['WB', 'West Bengal'],
                ['MP', 'Madhya Pradesh']
        ] ],
            [
                'US', [
                ['', 'State/Province'],
                ['AL', 'Alabama'],
                ['AK', 'Alaska'],
                ['AZ', 'Arizona'],
                ['AR', 'Arkansas']
        ] ],
            [
                'CA', [
                ['', 'State/Province'],
                ['AB', 'Alberta'],
                ['BC', 'British Columbia'],
                ['MB', 'Manitoba'],
                ['NB', 'New Brunswick']
        ] ]
        ];
        var listOfState;
       
        //if country and state have been selected
        if ($(str1)[0] && $(str2)[0]) {
            listOfState = [['XX', 'None']];
    
            //states based on country are added into the list
            var currentCountry = $(str1).children("option:selected").val();
            for (var i = 0; i < countryState.length; i++) {
                if (currentCountry === countryState[i][0]) {
                    listOfState = countryState[i][1];
                }
            }
    
            //atleast there should be two states in the selected list of states for each country
            if (listOfState.length < 2) {
                $(str2).css("display","none");
                $(str3).css("display","none");
            } else {
                $(str2).css("display","inline");
                $(str3).css("display","inline");
            }
    
            // add all states from listofState to option in select field
            $(str2)[0].options.length = 0;
            for (var k = 0; k < listOfState.length; k++) {
                $(str2)[0].options[k] = new Option(listOfState[k][1], listOfState[k][0]);    
            }
        }
    }
});


$(document).ready(function() {
    $(this).generateCaptcha();

    $(".country").change(function() {
        $(this).countryChange();
    });
    
    $("#btnRefreshCaptcha").click(function (e) {
        e.preventDefault();
        $(this).generateCaptcha();    
    });

    $.validator.addMethod("regex", function (value, element, regexpr) {
        return this.optional(element) || regexpr.test(value);
    }, "Please check your input.");

    $("#registerForm").validate({
        rules: {
            firstName: {
                required: true,
                regex: /^[A-Za-z ]+$/
            },
            middleName:  {
                regex: /^[A-Za-z ]+$/
            },
            lastName: {
                required: true,
                regex: /^[A-Za-z]+$/
            },
            email: {
                required: true,
                regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            },
            password: {
                required: true,
                regex: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/
            },
            confirmPassword: {
                required: true,
                equalTo: "#txtPassword"
            },
            gender: {
                required: true
            },
            birthday: {
                required: true
            },
            phoneNumber: {
                required: true,
                regex: /^\d{10}$/
            },
            altPhone: {
                regex: /^\d{10}$/
            },
            currentAddress: {
                required: true
            },
            countryCurrent: {
                required:true
            },
            stateCurrent: {
                required: true,
            },
            cityCurrent: {
                required: true,
                regex: /^[a-zA-Z ]{2,47}$/
            },
            zipcodeCurrent: {
                required: true
            },
            permanentAddress: {
                required: true
            },
            countryPermanent: {
                required:true
            },
            statePermanent: {
                required: true
            },
            cityPermanent: {
                required: true,
                regex: /^[a-zA-Z ]{2,47}$/
            },
            zipcodePermanent: {
                required: true
            },
            inputCaptcha: {
                required: true,
                equalTo: "#txtCaptcha"
            }
        },
        messages:{
            firstName: {
                required: "Please enter your first name.",
                regex: "Please enter a valid first name."
            },
            middleName:{
                regex: "Please enter a valid middle name."
            },
            lastName: {
                required: "Please enter your last name.",
                regex: "Please enter a valid last name"
            },
            email: {
                required: "Please enter the email address",
                regex: "Please a valid email address"
            },
            password: {
                required: "Please provide a password.",
                regex: "The password length must be 8 or more and must contain at least one lowercase letter, one uppercase letter, one numeric digit, one special character."
            },
            confirmPassword: {
                required: "Please provide a password.",
                equalTo: "Please enter the same password as above."
            },
            gender: {
                required: "Please enter your gender."
            },
            birthday: {
                required: "Please enter your date of birth."
            },
            phoneNumber: {
                required: "Please enter your phone number.",
                regex: "Please enter a valid phone number"
            },
            altPhone: {
                regex: "Please enter a valid phone number."
            },
            currentAddress:{
                required: "Please enter your current address."
            },
            countryCurrent: {
                required: "Please enter your current country."
            },
            stateCurrent: {
                required: "Please enter your current state.",
            },
            cityCurrent:{

                required: "Please enter your current city.",
                regex: "Please enter a valid city name"
            },
            zipcodeCurrent: {
                required: "Please enter your current address zip-code."
            },
            permanentAddress: {
                required: "Please enter your permanent address."
            },
            countryPermanent: {
                required: "Please enter your permanent country."
            },
            statePermanent: {
                required: "Please enter your permanent state."
            },
            cityPermanent:{
                required: "Please enter your permanent city.",
                regex: "Please enter a valid city name"
            },
            zipcodePermanent: {
                required: "Please enter your permanent address zip-code."
            },
            inputCaptcha: {
                required: "Please enter the captcha.",
                equalTo: "Wrong Answer. CAPTCHA failed."
            }
        },
        submitHandler: function() {
            $("#registerForm")[0].reset();
            alert("Form submitted!");

        }
    });
});