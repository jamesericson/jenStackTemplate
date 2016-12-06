console.log('genero sourced');

$(document).ready(function() {
    console.log('JQ');

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

    function displayOnDom (array){
        var outputText = "";
        for (var i = 0; i < array.length; i++) {
            outputText += "<h2>" + array[i].athleteName + "</h2>";
            outputText += "<p>" + array[i].eventName + "</p>";
            outputText += "<p>" + array[i].awardGiven + "</p>";
        }
        $('.output-div').html(outputText);
    }


}); //end doc ready

function Award(eventName, athleteName, awardGiven) {
    this.eventName = eventName;
    this.athleteName = athleteName;
    this.awardGiven = awardGiven;
}
