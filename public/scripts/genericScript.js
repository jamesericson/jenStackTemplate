console.log('genero sourced');

var events = [];

$(document).ready(function() {
    console.log('JQ');
    $('#unfilterButton').hide();

    // test get function
    var getData = function() {
        console.log('in getData');
        $.ajax({
            type: 'GET',
            url: '/testGet',
            success: function(response) {
                console.log('back from get call:', response);
                $('.output-div').append('<p>Response: ' + response.field0 + '</p>');
            },
            error: function() {
                console.log('error with ajax call...');
            }
        });
    }; // end getData

    // test get function
    var postData = function() {
        console.log('in postData');

        var eventName = $('#eventName').val();
        var athleteName = $('#athleteName').val();
        var awardGiven = $('#awardGiven').val();

        var thisAward = new Award(eventName, athleteName, awardGiven);

        $.ajax({
            type: 'POST',
            url: '/testPost',
            data: thisAward,
            success: function(response) {
                console.log('back from post call:', response);
                events = response;
                displayOnDom(response);
            },
            error: function() {
                console.log('error with ajax call...');
            }
        });
    }; // end getData

    /// - buttons to test - ///

    $('#testPostButton').on('click', function() {
        console.log('in testPostButton on click');
        postData();
    }); // end testGetButton

    $('#sortButton').on('click', function() {
        events.sort(function(a, b) {
            var nameA = a.eventName.toLowerCase(),
                nameB = b.eventName.toLowerCase();
            if (nameA < nameB) //sort string ascending
                return -1;
            if (nameA > nameB)
                return 1;
            return 0; //default return value (no sorting)
        });
        displayOnDom(events);
    }) //end sortButton event

    $('#unfilterButton').on('click', function(){
        $('#unfilterButton').hide();
        $.ajax({
            type: 'GET',
            url: '/unfilter',
            success: function(response) {
                events = response;
                displayOnDom(response);
            }
        })
    });//end unfilterButton click

    $(document).on('click', '.athlete', function(){
        $('#unfilterButton').show();
        var athleteName = $(this).data();

        $.ajax({
            type: 'POST',
            url: '/filter',
            data: athleteName,
            success: function(response){
                console.log('Response from filter: ', response);
                events = response;
                displayOnDom(response);
            },
            error: function() {
                console.log('error with ajax call...');
            }
        }) // end ajax
    }) //end athlete click

    function displayOnDom(array) {
        var outputText = "";
        for (var i = 0; i < array.length; i++) {
            outputText += "<h2 class='athlete' data-name='" + array[i].athleteName + "'>" + array[i].athleteName + "</h2>";
            outputText += "<p>" + array[i].eventName + "</p>";
            outputText += "<p>" + array[i].awardGiven + "</p>";
        }
        $('.output-div').html(outputText);
    } // end displayOnDom


}); //end doc ready

function Award(eventName, athleteName, awardGiven) {
    this.eventName = eventName;
    this.athleteName = athleteName;
    this.awardGiven = awardGiven;
}
