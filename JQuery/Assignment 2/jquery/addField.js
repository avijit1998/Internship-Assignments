$(document).ready(function(){
    
    var counterPhone = 2, counterAddress = 2;
    $(document).on("click", ".btn-remove-phone", function () {
	    if(counterPhone==1){
          alert("No more phone fields to remove");
          return false;
        }
        counterPhone--;	
        $("#phoneField" + counterPhone).remove();
        event.preventDefault();	
     });
    
     $(document).on("click", "#btnAddPhone", function () {
        if(counterPhone>4){
            alert("Only 4 phone numbers are allowed");
            return false;
	    }      	
        var newPhoneFieldDiv = $(document.createElement('div')).attr("id", 'phoneField' + counterPhone);
        var txtPhoneId = 'txtPhone' + counterPhone;        
	    newPhoneFieldDiv.after().html('<label for="txtPhone' + counterPhone + '">Phone Number ' + counterPhone + ' </label>' +
          '<input type="number" name="phone' + counterPhone + '" id="' + txtPhoneId + '" value="">' + 
          '<button class="btn-remove-phone">X</button>');
        
          
        $("#grpPhoneField").append(newPhoneFieldDiv);
        $('#'+txtPhoneId).css("width", "80%");
        counterPhone++;
        event.preventDefault();
    });

    $(document).on("click", ".btn-remove-address", function () {
	    if(counterAddress==1){
          alert("No more address field to remove");
          return false;
        }
        counterAddress--;	
        $("#addressField" + counterAddress).remove();
        event.preventDefault();	
     });

    $(document).on("click", "#btnAddAddress", function () {
      if(counterAddress>3){
          alert("Only 3 addresses are allowed");
          return false;
    }      	
      var newAddressFieldDiv = $(document.createElement('div')).attr("id", 'addressField' + counterAddress);       
    newAddressFieldDiv.after().html('<div id="multilineAddressField' + counterAddress +'"><label for="txtAddress' + counterAddress +
    '">Address '+ counterAddress +'</label><textarea id="txtCurrent' + counterAddress + '" name="address'+ counterAddress +
    '" placeholder="Enter address."></textarea></div><div id="cityField'+ counterAddress +'"><label for="txtCity'+ counterAddress +
    '">City '+ counterAddress +'</label><input type="text" id="txtCity'+ counterAddress +'" name="city'+ counterAddress +
    '" placeholder="Enter city.."></div><div id="countryField'+ counterAddress +'"><label for="optCountry' + counterAddress +
    '">Country ' + counterAddress + '</label><select class="country" name="country'+ counterAddress +'" id="optCountry'+ counterAddress +
    '"><option value="">-select-</option><option value="IN">India</option><option value="US">United States</option>' +
    '<option value="CA">Canada</option></select></div><div id="stateField' + counterAddress + '"><label id="lblState' + counterAddress +
    '" class="initial-hide" for="optState' + counterAddress + '">State ' + counterAddress + '</span></label><select name="state'+ counterAddress +
    '" id="optState'+ counterAddress +'" class="initial-hide"><option value="">State/Province</option></select></div><div id="zipcode' + 
    counterAddress +'"><label for="txtZipcode' + counterAddress + '">ZipCode ' + counterAddress + '</label><input type="number"' + 
    'id="txtZipcode' + counterAddress +'" name="zipcode' + counterAddress +'" placeholder="Zip Code.."></div><button class="btn-remove-address">X Remove Address</button>');
      
        
      $("#grpAddressField").append(newAddressFieldDiv);
      counterAddress++;
      event.preventDefault();
  });
});  

    