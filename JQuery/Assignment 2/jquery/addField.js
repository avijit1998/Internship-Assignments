$(document).ready(function(){
    
    var counterPhone = 2, counterAddress = 2;
    var numbersForPhoneId = [1, 0, 0, 0];
    var numbersForAddressId = [1,0,0];
    var phoneFieldNum;
    var addressFieldNum;
    $(document).on("click", ".btn-remove-phone", function () {
        var phoneFieldIdNumber = $(this).attr('id').replace(/[^\d]+/, '');
        phoneFieldIdNumber++;
	      if(counterPhone === 1){
            alert("No more phone fields to remove");
            return false;
        }
        counterPhone--;
        numbersForPhoneId[phoneFieldIdNumber-1] = 0;        	
        $("#phoneField" + phoneFieldIdNumber).remove();
        event.preventDefault();	
    });
    
    $(document).on("click", "#btnAddPhone", function () {
        if(counterPhone>4){
            alert("Only 4 phone numbers are allowed");
            return false;
        }
        for (var i = 0; i < numbersForPhoneId.length; ++i) {
            if(numbersForPhoneId[i] === 0){
              phoneFieldNum = i+1;
              break;
            }
        }      	
        var newPhoneFieldDiv = $(document.createElement('div')).attr("id", 'phoneField' + phoneFieldNum);
        var txtPhoneId = 'txtPhone' + phoneFieldNum;        
	      newPhoneFieldDiv.after().html('<label for="txtPhone' + phoneFieldNum + '">Phone Number' + ' </label>' +
          '<input type="text" name="phone' + phoneFieldNum + '" id="' + txtPhoneId + '" class="validate-phone" value="">' + 
          '<button class="btn-remove-phone glowing-btn" id="btnRemovePhone' + (phoneFieldNum-1) +'">X</button>');
        
        numbersForPhoneId[phoneFieldNum-1] = 1;
        
        $("#grpPhoneField").append(newPhoneFieldDiv);
        $('#'+txtPhoneId).css("width", "50%");
        counterPhone++;
        event.preventDefault();
      });

    $(document).on("click",".btn-remove-address", function () {
        var addressFieldIdNumber = $(this).attr('id').replace(/[^\d]+/, '');
        addressFieldIdNumber++;
	      if(counterAddress===1){
            alert("No more address field to remove");
            return false;
        }
        counterAddress--;
        numbersForAddressId[addressFieldIdNumber-1] = 0;	
        $("#addressField" + addressFieldIdNumber).remove();
        event.preventDefault();	
    });

    $(document).on("click", "#btnAddAddress", function () {
        if(counterAddress > 3){
            alert("Only 3 addresses are allowed");
            return false;
        }
        for (var i = 0; i < numbersForAddressId.length; ++i) {
            if(numbersForAddressId[i] === 0){
                addressFieldNum = i+1;
                break;
            }
        } 	
        var newAddressFieldDiv = $(document.createElement('div')).attr({
            id: "addressField" + addressFieldNum
        });       
        newAddressFieldDiv.after().html('<div id="multilineAddressField' + addressFieldNum +'"><label for="txtAddress' + addressFieldNum +
          '">Address</label><textarea id="txtAddress' + addressFieldNum + '" class="validate-address" name="address'+ addressFieldNum +
          '" placeholder="Enter address."></textarea></div><div id="emsgAddressField' + addressFieldNum + 
          '" class="error-message"></div><div id="cityField'+ addressFieldNum +'"><label for="txtCity'+ addressFieldNum +
          '">City</label><input type="text" id="txtCity'+ addressFieldNum +'" class="validate-city" name="city'+ addressFieldNum +
          '" placeholder="Enter city.."></div><div id="emsgCityField'+ addressFieldNum + '" class="error-message"></div><div id="countryField'+
            addressFieldNum +'"><label for="optCountry' + addressFieldNum +
          '">Country</label><select class="country validate-country" name="country'+ addressFieldNum +'" id="optCountry'+ 
          addressFieldNum +'"><option value="">-select-</option><option value="IN">India</option><option value="US">United States</option>' +
          '<option value="CA">Canada</option></select></div><div id="emsgCountryField'+ addressFieldNum + 
          '" class="error-message"></div><div id="stateField' + addressFieldNum + '"><label id="lblState' + addressFieldNum +
          '" class="find-state-field" for="optState' + addressFieldNum + '">State</span></label><select name="state'+
          addressFieldNum +'" id="optState'+ addressFieldNum +
          '" class="find-state-field validate-state"><option value="">State/Province</option></select></div><div id="emsgStateField'+ 
          addressFieldNum +'" class="error-message"></div><div id="zipcode' + 
          addressFieldNum +'"><label for="txtZipcode' + addressFieldNum + '">ZipCode</label><input type="text"' + 
          'id="txtZipcode' + addressFieldNum +'" class="validate-zipcode" name="zipcode' + addressFieldNum +
          '" placeholder="Zip Code.."></div><div id="emsgZipCodeField'+ addressFieldNum +
          '" class="error-message"></div><button class="btn-remove-address glowing-btn" id="btnRemoveAddress'+ (addressFieldNum-1) +
          '">X Remove Address</button>');
      
        numbersForAddressId[addressFieldNum-1] = 1;  
    
        $("#grpAddressField").append(newAddressFieldDiv);
        $('#'+'txtZipcode'+ addressFieldNum).css("width", "50%");
        counterAddress++;
        event.preventDefault();
    });
});  

    