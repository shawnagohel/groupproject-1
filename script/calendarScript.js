function saveMyData(event) {
  jQuery.post(
      '/event/save', 
      {
          title: event.title,
          start: event.start,
          end: event.end,
          url: event.url
      }
  );
}
//var a = [{ "title": "new appointment", "start": "2020-09-09"  }];
//var a = JSON.stringify(a);
//localStorage.setItem("event", a);


document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {

    plugins: [ 'interaction', 'dayGrid', 'timeGrid', 'list' ],//these are included above this script tag in HTML, includes core components

    header: {
      right: 'addEventButton'//we can change position between 'left' 'right' and 'center'
    },

    events: JSON.parse(localStorage.getItem("event")),

    customButtons: {//this lets us create the button for add event
      addEventButton: {
        text: 'Add Meal',//this should pull data from meal planner on click
        click: function() {

          var date = new Date(prompt('Enter a date YYYY-MM-DD form') + " 16:00"); 
          var title = "test";
          var url = "https://google.com";

          var saveEvent = [{
            title: title,
            start: date,
            end: date,
            allDay: true,
            url: url
          }];

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