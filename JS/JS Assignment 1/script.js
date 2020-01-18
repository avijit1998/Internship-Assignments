function generateCaptcha() {
    var a = Math.floor(Math.random() * (99 - 10 + 1) ) + 10;
    var b = Math.floor(Math.random() * (99 - 10 + 1) ) + 10;       
    var c = Math.floor(Math.random() * (4 - 1 + 1) ) + 1;  
    var code,val1;
    if(c == 1){
        code = a + '' + '+' + '' + b;
        val1 = a+b;
    } else if (c == 2 && a >= b){
        code = a + '' + '-' +  '' + b;
        val1 = a-b;
    } else if (c == 2 && b > a){
        code = b + '' + '-' +  '' + a;
        val1 = b-a;
    } else if (c == 3) {
        code = a + '' + '*' +  '' + b;
        val1 = a*b;
    } else if (c == 4 && a >= b) {
        code = a + '' + '/' +  '' + b;
        val1 = Math.floor(a/b);
    } else if (c == 4 && a <= b) {
        code = b + '' + '/' +  '' + a;
        val1 = Math.floor(b/a);
    } else {
        code = "Invalid Operation.";
        val1 = 0;
    }
    
    document.getElementById("txtCaptcha").value = val1;
    document.getElementById("txtCaptchaDiv").innerHTML = code;	
    return false;
}

//for current address
function countryChange() {
    var countryState = [
        [
            'IN',[
            ['', 'State/Province'],
            ['OD', 'Odisha'],
            ['AP', 'Andhra Pradesh'],
            ['WB', 'West Bengal'],
            ['MP', 'Madhya Pradesh'],

    ], ],
        [
            'US', [
            ['', 'State/Province'],
            ['AL', 'Alabama'],
            ['AK', 'Alaska'],
            ['AZ', 'Arizona'],
            ['AR', 'Arkansas'],
    ], ],
        [
            'CA', [
            ['', 'State/Province'],
            ['AB', 'Alberta'],
            ['BC', 'British Columbia'],
            ['MB', 'Manitoba'],
            ['NB', 'New Brunswick'],
    ] ]
    ];
    var selectedState;
    var countryElement = document.getElementById('optCountryCurrent');
    var stateElement = document.getElementById('optStateCurrent');
    var stateLabelElement = document.getElementById('lblStateCurrent');
    var listOfState;
    //if country and state have been selected
    if (countryElement && stateElement) {
        listOfState = [['XX', 'None']];

        //states based on country are added into the list
        var currentCountry = countryElement.options[countryElement.selectedIndex].value;
        for (var i = 0; i < countryState.length; i++) {
            if (currentCountry == countryState[i][0]) {
                listOfState = countryState[i][1];
            }
        }

        //atleast there should be two states in the selected list of states for each country
        if (listOfState.length < 2) {
            stateElement.style.display = 'none';
            stateLabelElement.style.display = 'none';
        } else {
            stateElement.style.display = 'inline';
            stateLabelElement.style.display = 'inline';
        }

        // add all states from listofState to option in select field and
        // store the selected option in selectedState
        stateElement.options.length = 0;
        for (var k = 0; k < listOfState.length; k++) {
            stateElement.options[k] = new Option(listOfState[k][1], listOfState[k][0]);    
        }
        for (var j = 0; j < stateElement.length; j++) {
            if (stateElement.options[j].selected === true) {
                selectedState = stateElement.options[j].value;
            }        
        }
    }
}

//for permanent address
function otherCountryChange() {
    var countryState = [
        [
            'IN',[
            ['', 'State/Province'],
            ['OD', 'Odisha'],
            ['AP', 'Andhra Pradesh'],
            ['WB', 'West Bengal'],
            ['MP', 'Madhya Pradesh'],

    ], ],
        [
            'US', [
            ['', 'State/Province'],
            ['AL', 'Alabama'],
            ['AK', 'Alaska'],
            ['AZ', 'Arizona'],
            ['AR', 'Arkansas'],
    ], ],
        [
            'CA', [
            ['', 'State/Province'],
            ['AB', 'Alberta'],
            ['BC', 'British Columbia'],
            ['MB', 'Manitoba'],
            ['NB', 'New Brunswick'],
    ] ]
    ];
    var selectedState;
    var countryElement = document.getElementById('optCountryPermanent');
    var stateElement = document.getElementById('optStatePermanent');
    var stateLabelElement = document.getElementById('lblStatePermanent');

    //if country and state have been selected
    if (countryElement && stateElement) {
        var listOfState = [['XX', 'None']];

        //states based on country are added into the list
        var currentCountry = countryElement.options[countryElement.selectedIndex].value;
        for (var i = 0; i < countryState.length; i++) {
            if (currentCountry == countryState[i][0]) {
                listOfState = countryState[i][1];
            }
        }

        //atleast there should be two states in the selected list of states for each country
        if (listOfState.length < 2) {
            stateElement.style.display = 'none';
            stateLabelElement.style.display = 'none';
        } else {
            stateElement.style.display = 'inline';
            stateLabelElement.style.display = 'inline';
        }
    
        // add all states from listofState to option in select field and
        // store the selected option in selectedState
        stateElement.options.length = 0;
        for (var k = 0; k < listOfState.length; k++) {
            stateElement.options[k] = new Option(listOfState[k][1], listOfState[k][0]);    
        }
        for (var j = 0; j < stateElement.length; j++) {
            if (stateElement.options[j].selected === true) {
                selectedState = stateElement.options[j].value;
            }        
        }      
    }
}
 
function checkValidCaptcha(){
    var str1 = removeSpaces(document.getElementById('txtCaptcha').value);
	var str2 = removeSpaces(document.getElementById('txtVisibleCaptcha').value);
	if (str1 == str2){
		return true;	
	}else{
		return false;
	}
}

// Remove the spaces from the entered and generated code
function removeSpaces(string){
	return string.split(' ').join('');
}

function validateForm() {
    event.preventDefault();
    var error = "";
    
    var regexName = /^[a-zA-Z ]{2,30}$/, 
        regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
        regexPhone = /^\d{10}$/,
        regexCityName = /^[a-zA-Z ]{2,47}$/,
        regexNumber = /^\d+$/; 
    
    var fldFirstName = document.forms.myForm.firstName,
        fldMiddleName = document.forms.myForm.middleName,
        fldLastName = document.forms.myForm.lastName,
        fldEmailId = document.forms.myForm.email,
        fldPassword = document.forms.myForm.password,
        fldConfirmPassword = document.forms.myForm.confirmPassword,
        genderSelectBox = document.forms.myForm.gender,
        txtGenderSelectedValue = genderSelectBox.options[genderSelectBox.selectedIndex].value,
        fldBirthDate = document.forms.myForm.birthday,
        fldPhoneNumber = document.forms.myForm.phoneNumber,
        fldAltPhoneNumber = document.forms.myForm.altPhone,
        fldCurrentAddress = document.forms.myForm.currentAddress,
        countryCurrentSelectBox = document.forms.myForm.countryCurrent,
        txtCurrentCountrySelectedValue = countryCurrentSelectBox.options[countryCurrentSelectBox.selectedIndex].value,
        stateCurrentSelectBox = document.forms.myForm.stateCurrent,
        txtCurrentStateSelectedValue = stateCurrentSelectBox.options[stateCurrentSelectBox.selectedIndex].value,
        fldCurrentCity = document.forms.myForm.cityCurrent,
        fldZipCode = document.forms.myForm.zipcodeCurrent,
        fldPermanentAddress = document.forms.myForm.permanentAddress,
        countryPermanentSelectBox = document.forms.myForm.countryPermanent,
        txtPermanentCountrySelectedValue = countryPermanentSelectBox.options[countryPermanentSelectBox.selectedIndex].value,
        statePermanentSelectBox = document.forms.myForm.statePermanent,
        txtPermanentStateSelectedValue = statePermanentSelectBox.options[statePermanentSelectBox.selectedIndex].value,
        fldPermanentCity = document.forms.myForm.cityPermanent,
        fldZipCodePermanent = document.forms.myForm.zipcodePermanent,
        txtCaptcha = document.forms.myForm.inputCaptcha;

    if(fldFirstName.value === ""){
        error += "Please enter the first name field.\n";
        fldFirstName.focus();
    }
    else if(regexName.test(fldFirstName.value) !== true) {
        error+="Please enter a valid first name.\n";
        fldFirstName.focus();
    }

    if (fldMiddleName.value !== ""){
        if (regexName.test(fldMiddleName.value) !== true) {
            error += "Please enter a valid middle name.\n";
            fldMiddleName.focus();
        }
    }

    if(fldLastName.value === ""){
        error += "Please enter the last name field.\n";
        fldLastName.focus();
    }
    else if(regexName.test(fldLastName.value) !== true) {
        error+="Please enter a valid last name.\n";
        fldLastName.focus();
    }

    if(fldEmailId.value === ""){
        error += "Please enter your email-id.\n";
        fldEmailId.focus();
    }
    else if(regexEmail.test(fldEmailId.value) !== true) {
        error += "Please enter a valid email.\n";
        fldEmailId.focus();
    }

    if(fldPassword.value === ""){
        error += "Please enter the password.\n";
        fldPassword.focus();
    }
    else if(regexPassword.test(fldPassword.value) !== true){
        error += "The password length must be 8 or more and must contain at least one lowercase letter, one uppercase letter, one numeric digit.\n";
        fldPassword.focus();
    }

    if(fldConfirmPassword.value === ""){
        error += "Please type your password to confirm.\n";
        fldConfirmPassword.focus();
    }
    else if(fldPassword.value !== fldConfirmPassword.value){
        error += "The passwords do not match.\n";
        fldConfirmPassword.focus();
    }

    if(txtGenderSelectedValue === ""){
        error += "Please mention your gender.\n";
    }

    if(fldBirthDate.value === ""){
        error += "Please enter your date of birth.\n";
        fldBirthDate.focus();
    }

    if (fldPhoneNumber.value === "") {
        error += "Please mention your phone number.\n";
        fldPhoneNumber.focus();
    }
    else if(regexPhone.test(fldPhoneNumber.value) !== true) {
        error += "Please enter a valid 10 digit phone number.\n";
        fldPhoneNumber.focus();
    }

    if (fldAltPhoneNumber.value !== ""){
        if (regexPhone.test(fldAltPhoneNumber.value) !== true) {
            error += "Please enter a valid alt. phone number.\n";
            fldAltPhoneNumber.focus();
        }
    }
    
    //current address validation
    if(fldCurrentAddress.value === ""){
        error += "Please enter your current address.\n";
        fldCurrentAddress.focus();
    }

    if(txtCurrentCountrySelectedValue === "") {
        error += "Please select the country you live in.\n";
    }

    if(txtCurrentStateSelectedValue === "") {
        error += "Please select the state you live in.\n";
    }

    if (fldCurrentCity.value === "") {
        error += "Please enter the city you live in.\n";
        fldCurrentCity.focus();
    }
    else if(regexCityName.test(fldCurrentCity.value) !== true) {
        error += "Please enter a valid city name.\n";
        fldCurrentCity.focus();
    }

    if (fldZipCode.value === "") {
        error += "Please enter the zip code for your current address.\n";
        fldZipCode.focus();
    }
    else if(regexNumber.test(fldZipCode.value) !== true) {
        error += "Please enter a valid zip code.\n";
        fldZipCode.focus();
    }

    //permanent address validation
    if(fldPermanentAddress.value === ""){
        error += "Please enter your permanent address.\n";
        fldPermanentAddress.focus();
    }

    if(txtPermanentCountrySelectedValue === "") {
        error += "Please enter your permanent country.\n";
    }

    if(txtPermanentStateSelectedValue === "") {
        error += "Please enter your permanent state.\n";
    }

    if (fldPermanentCity.value === "") {
        error += "Please enter your permanent city.\n";
        fldPermanentCity.focus();
    }
    else if(regexCityName.test(fldPermanentCity.value) !== true) {
        error += "Please enter a valid city name for your permanent city.\n";
        fldPermanentCity.focus();
    }

    if (fldZipCodePermanent.value === "") {
        error += "Please enter the zip code for your permanent address.\n";
        fldZipCodePermanent.focus();
    }
    else if(regexNumber.test(fldZipCodePermanent.value) !== true) {
        error += "Please enter a valid zip code.\n";
        fldZipCodePermanent.focus();
    }

    if (txtCaptcha.value === "") {
        error += "Captcha is empty.\n";
        fldFirstName.focus();
    }
    else if(checkValidCaptcha(txtCaptcha.value) === false){
        error += "Wrong Answer. CAPTCHA failed.";
        fldFirstName.focus();
    }
    
    if (error !== "") {
        alert(error);
        return false; 
    }
}
