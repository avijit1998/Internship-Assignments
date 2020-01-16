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
    var countryElement = document.getElementById('countryId');
    var stateElement = document.getElementById('stateId');
    var stateLabelElement = document.getElementById('stateLabel');

    if (countryElement && stateElement) {
        var listOfState = [['XX', 'None']];

        var currentCountry = countryElement.options[countryElement.selectedIndex].value;
        for (var i = 0; i < countryState.length; i++) {
            if (currentCountry == countryState[i][0]) {
                listOfState = countryState[i][1];
            }
        }
        if (listOfState.length < 2) {
            stateElement.style.display = 'none';
            stateLabelElement.style.display = 'none';
        } else {
            stateElement.style.display = 'inline';
            stateLabelElement.style.display = 'inline';
        }
    
        for (var j = 0; j < stateElement.length; j++) {
            if (stateElement.options[j].selected === true) {
                selectedState = stateElement.options[j].value;
            }        
        }
        
        stateElement.options.length = 0;
        for (var k = 0; k < listOfState.length; k++) {
            stateElement.options[k] = new Option(listOfState[k][1], listOfState[k][0]);
            if (listOfState[k][0] == selectedState) {
                stateElement.options[k].selected = true;
            }    
        }      
    }
}

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
    var countryElement = document.getElementById('o-countryId');
    var stateElement = document.getElementById('o-stateId');
    var stateLabelElement = document.getElementById('o-stateLabel');

    if (countryElement && stateElement) {
        var listOfState = [['XX', 'None']];

        var currentCountry = countryElement.options[countryElement.selectedIndex].value;
        for (var i = 0; i < countryState.length; i++) {
            if (currentCountry == countryState[i][0]) {
                listOfState = countryState[i][1];
            }
        }
        if (listOfState.length < 2) {
            stateElement.style.display = 'none';
            stateLabelElement.style.display = 'none';
        } else {
            stateElement.style.display = 'inline';
            stateLabelElement.style.display = 'inline';
        }
    
        for (var j = 0; j < stateElement.length; j++) {
            if (stateElement.options[j].selected === true) {
                selectedState = stateElement.options[j].value;
            }        
        }
        
        stateElement.options.length = 0;
        for (var k = 0; k < listOfState.length; k++) {
            stateElement.options[k] = new Option(listOfState[k][1], listOfState[k][0]);
            if (listOfState[k][0] == selectedState) {
                stateElement.options[k].selected = true;
            }    
        }      
    }
}

function trimfield(str) { 
    return str.replace(/^\s+|\s+$/g,''); 
}

function validateForm() {
    var name_regex = /^[a-zA-Z ]{2,30}$/, 
        email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        pswd_regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
        phone_regex = /^\d{10}$/,
        city_regex = /^[a-zA-Z ]{2,47}$/;
    var genderSelectBox = document.forms.myForm.gender;
    var genderSelectedValue = genderSelectBox.options[genderSelectBox.selectedIndex].value;
    var countrySelectBox = document.forms.myForm.country;
    var countrySelectedValue = countrySelectBox.options[countrySelectBox.selectedIndex].value;
    var stateSelectBox = document.forms.myForm.state;
    var stateSelectedValue = stateSelectBox.options[stateSelectBox.selectedIndex].value;
    var first_name = document.forms.myForm.fname.value,
        last_name = document.forms.myForm.lname.value,
        email_id = document.forms.myForm.email.value,
        pswdfield1 = document.forms.myForm.pswd.value,
        pswdfield2 = document.forms.myForm.c_pswd.value,
        ph_number = document.forms.myForm.phone.value,
        addr = document.forms.myForm.address.value,
        city_field = document.forms.myForm.city.value;
    if(first_name == "" || last_name == "" || email_id == "" || pswdfield1 == "" || 
    pswdfield2 == ""|| genderSelectedValue == "" || ph_number == "" || trimfield(addr) == "" || 
    countrySelectedValue == "" || stateSelectedValue == "" || city_field == ""){
        alert("Required field(*) must not be empty.");
        return false;
    }
    else if(name_regex.test(first_name) != true) {
        alert("Please enter a valid name.");
        return false;
    }
    else if(name_regex.test(last_name) != true) {
        alert("Please enter a valid name.");
        return false;
    }
    else if(email_regex.test(email_id) != true) {
        alert("Please enter a valid email.");
        return false;
    }
    else if(pswd_regex.test(pswdfield1) != true){
        alert("The password length must be 8 or more and must contain at least one lowercase letter, one uppercase letter, one numeric digit.");
        return false;
    }
    else if(pswdfield1 != pswdfield2){
        alert("The passwords do not match.");
        return false;
    }
    else if(phone_regex.test(ph_number) != true) {
        alert("Please enter a valid phone number.");
        return false;
    }
    else if(city_regex.test(city_field) != true) {
        alert("Please enter a valid city name.");
        return false;
    }
     
}