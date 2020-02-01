jQuery.fn.extend({
    countryChange: function() {
        var str1 = '#' + $(this).closest('.country').attr('id');
        var str2 = '#' + $(this).closest('.country').parent().parent().find('.find-state-field:eq(1)').attr('id');
        var str3 = '#' + $(this).closest('.country').parent().parent().find('.find-state-field').attr('id');
        
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
            listOfState = [['', 'None']];

            //states based on country are added into the list
            var currentCountry = $(str1).children("option:selected").val();
                for (var i = 0; i < countryState.length; i++) {
                    if (currentCountry === countryState[i][0]) {
                        listOfState = countryState[i][1];
                    }
                }

            // add all states from listofState to option in select field
            $(str2)[0].options.length = 0;
            for (var k = 0; k < listOfState.length; k++) {
                $(str2)[0].options[k] = new Option(listOfState[k][1], listOfState[k][0]);    
            }
        }
    }
});
