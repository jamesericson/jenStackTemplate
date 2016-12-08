console.log('genero sourced');

var events = [];

$(document).ready(function() {
    // Hide the unfilter button until the user filters data
    $('#unfilterButton').hide();
    // Add event handlers
    enable();
}); //end doc ready

function enable() {
    $('#testPostButton').on('click', function() {
        postData();
    }); // end testGetButton

    $(document).on('click', '.sort', sort);


    $(document).on('click', '.athlete', function() {
        $('#unfilterButton').show();
        var athleteName = $(this).data();

        $.ajax({
            type: 'POST',
            url: '/filter',
            data: athleteName,
            success: function(response) {
                console.log('Response from filter: ', response);
                events = response;
                displayOnDom(response);
            },
            error: function() {
                console.log('error with ajax call...');
            }
        }); // end ajax
    }); //end athlete click

    $('#unfilterButton').on('click', function() {
        $('#unfilterButton').hide();
        $.ajax({
            type: 'GET',
            url: '/unfilter',
            success: function(response) {
                events = response;
                displayOnDom(response);
            }
        });
    }); //end unfilterButton click
}

// Award constructor
function Award(eventName, athleteName, awardGiven) {
    this.eventName = eventName;
    this.athleteName = athleteName;
    this.awardGiven = awardGiven;
}

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
}; // end postData

function displayOnDom(array) {
    var outputText = '<table id="display-table"> ' +
        '<thead><td><button type="button" class="sort" sortValue="athleteName" >Sort by Name</button></td>' +
        '<td><button type="button" class ="sort" sortValue="eventName" >Sort by Event</button></td>' +
        '<td><button type="button" class="sort" sortValue="awardGiven" >Sort by Award</button></td>';
    // Loop through array and create elements

    for (var i = 0; i < array.length; i++) {
        outputText += "<tr><td class='athlete' data-name='" + array[i].athleteName + "'>" + array[i].athleteName + "</td>";
        outputText += "<td>" + array[i].eventName + "</td>";
        outputText += "<td>" + array[i].awardGiven + "</td></tr>";
    }
    outputText += "</table>";
    // Append elements to the DOM
    $('.output-div').html(outputText);
} // end displayOnDom

function sort(){
  var sortValue = $(this).attr("sortValue");
  console.log('the sort value is:' + sortValue);
      events.sort(function(a, b) {
          var nameA = a[sortValue].toLowerCase(),
              nameB = b[sortValue].toLowerCase();
          if (nameA < nameB) //sort string ascending
              return -1;
          if (nameA > nameB)
              return 1;
          return 0; //default return value (no sorting)
      });
      displayOnDom(events);
}
