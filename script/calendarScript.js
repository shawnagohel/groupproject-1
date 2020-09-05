document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {

    plugins: [ 'interaction', 'dayGrid', 'timeGrid', 'list' ],//these are included above this script tag in HTML, includes core components

    header: {
      right: 'addEventButton'//we can change position between 'left' 'right' and 'center'
    },

    customButtons: {//this lets us create the button for add event
      addEventButton: {
        text: 'Add Meal',//this should pull data from meal planner on click
        click: function() {

          var date = new Date('2020-09-' + prompt('Enter a day DD form')); 
          var title = "test";
          var url = "https://google.com";

          //ideally date, url and time are selected after selecting a meal


          if (!isNaN(date.valueOf())) { //checks if the date is valid
          calendar.addEvent({
            title: title,
            start: date,
            allDay: true,//all day lets us not worry about specific times of day
            url: url
          });
          //make it save to localStorage
          }
          else {
            alert('Not a Valid day');
          }
        }
      }
    }
  });

  calendar.render();
});