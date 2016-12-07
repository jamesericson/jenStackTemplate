console.log('genero sourced');

var events = [];

$(document).ready(function() {
    // Hide the unfilter button until the user filters data
    $('#unfilterButton').hide();

    // test get function
    var postData = function() {
        // Get user data
        var eventName = $('#eventName').val();
        var athleteName = $('#athleteName').val();
        var awardGiven = $('#awardGiven').val();
        // Build a new award object
        var thisAward = new Award(eventName, athleteName, awardGiven);
        // Post the award to the server
        $.ajax({
            type: 'POST',
            url: '/testPost',
            data: thisAward,
            success: function(response) {
                // Display the returned events
                events = response;
                displayOnDom(response);
            },
            error: function() {
                console.log('error with ajax call...');
            }
        });
    }; // end getData

    $('#testPostButton').on('click', function() {
        postData();
    }); // end testGetButton

    $('#sortButton').on('click', function() {
        // Sort events by event name (case insensitive)
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
    }); //end sortButton event

    $('#unfilterButton').on('click', function(){
        $('#unfilterButton').hide();
        $.ajax({
            type: 'GET',
            url: '/unfilter',
            success: function(response) {
                events = response;
                displayOnDom(response);
            }
        });
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
        }); // end ajax
    }); //end athlete click

    function displayOnDom(array) {
        var outputText = "";
        // Loop through array and create elements
        for (var i = 0; i < array.length; i++) {
            outputText += "<h2 class='athlete' data-name='" + array[i].athleteName + "'>" + array[i].athleteName + "</h2>";
            outputText += "<p>" + array[i].eventName + "</p>";
            outputText += "<p>" + array[i].awardGiven + "</p>";
        }
        // Append elements to the DOM
        $('.output-div').html(outputText);
    } // end displayOnDom


}); //end doc ready

// Award constructor
function Award(eventName, athleteName, awardGiven) {
    this.eventName = eventName;
    this.athleteName = athleteName;
    this.awardGiven = awardGiven;
}
