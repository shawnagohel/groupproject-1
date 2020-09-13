var saveEvent = [];
saveEvent = JSON.parse(localStorage.getItem("event"));

document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {

    plugins: [ 'interaction', 'dayGrid', 'timeGrid', 'list' ],//these are included above this script tag in HTML, includes core components

    header: {
      center: 'addEventButton'//we can change position between 'left' 'right' and 'center'
    },

    events: saveEvent,

    customButtons: {//this lets us create the button for add event
      addEventButton: {
        text: 'Add Meal',//this should pull data from meal planner on click
        click: function() {

          var date = new Date(prompt('Enter a date YYYY-MM-DD form') + " 16:00"); 
          var title = "test";
          var url = "https://google.com";

          saveEvent.push
          (
            {
              title: title,
              start: date,
              end: date,
              allDay: true,
              url: url
            }
          )

          localStorage.setItem("event", JSON.stringify(saveEvent));

          //ideally date, url and time are selected after selecting a meal


          if (!isNaN(date.valueOf())) { //checks if the date is valid
          calendar.addEvent({
            title: title,
            start: date,
            end: date,
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