$(document).ready(function() {
    $("#txtLastName").on('click', function(){
        $("form").validate().element('#txtFirstName');
    });
    
    $("#txtConfirmPassword").on('click', function(){
        $("form").validate().element('#txtPassword');
    });

    $("#txtBirthDate").on('click', function(){
        $("form").validate().element('select#optGender');
    });

    $("#txtPhoneNumber").on('click', function(){
        $("form").validate().element('#txtBirthDate');
    });
    
    $("#optCountryCurrent").on('click', function(){
        $("form").validate().element('#txtAddressCurrent');
    });

    $("#optCountryPermanent").on('click', function(){
        $("form").validate().element('#txtAddressPermanent');
    });

    $("#txtCityCurrent").on('click', function(){
        $("form").validate().element('select#optStateCurrent');
    });

    $("#txtCityPermanent").on('click', function(){
        $("form").validate().element('select#optStatePermanent');
    });
});
