document.addEventListener("DOMContentLoaded", function() {
    function showHome () {
    document.getElementById("content-container").style.display = "block";
    document.getElementById("events-container").style.display = "block";
    document.getElementById("registration-container").style.display = "none";
    document.getElementById("login-container").style.display = "none";
    document.getElementById("home").style.backgroundColor = "red";
    document.getElementById("registration-container").style.backgroundColor = "transparent";
    document.getElementById("login").style.backgroundColor = "transparent";
    document.getElementById("events").style.backgroundColor = "transparent";

    }
    document.getElementById("home").addEventListener("click", showHome);
    document.getElementById("logout").addEventListener("click", redirectToTeam2());
    
    function showdistance() {
    document.getElementById("content-container").style.display = "none";
    document.getElementById("login-container").style.display = "none";
    document.getElementById("events-container").style.display = "none";
    document.getElementById("registration-container").style.display = "none";
    document.getElementById("commute-container").style.display = "block";
    document.getElementById("distance").style.backgroundColor = "red";
    document.getElementById("home").style.backgroundColor = "transparent";
    document.getElementById("registration").style.backgroundColor = "transparent";
    document.getElementById("login").style.backgroundColor = "transparent";
    document.getElementById("events").style.backgroundColor = "transparent";
    }
    document.getElementById("distance").addEventListener("click", showdistance);




    


    function formatDate(isoString) {

    const year = isoString.slice(0, 4);
    const month = isoString.slice(4, 6);
    const day = isoString.slice(6, 8);
    const hours = isoString.slice(9, 11);
    const minutes = isoString.slice(11, 13);
    const seconds = isoString.slice(13, 15);


    const dateObj = new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds));


    return dateObj.toLocaleString();
    }

    const showEvents = () => {

    document.getElementById("content-container").style.display = "block";
    document.getElementById("registration-container").style.display = "none";
    document.getElementById("login-container").style.display = "none";
    document.getElementById("events-container").style.display = "block";

    document.getElementById("home").style.backgroundColor = "transparent";
    document.getElementById("registration").style.backgroundColor = "transparent";
    document.getElementById("login").style.backgroundColor = "transparent";
    document.getElementById("events").style.backgroundColor = "red";


    document.getElementById("events-container").style.display = "block";

    }


    document.getElementById("events").addEventListener("click", showEvents);

    function isUserLoggedIn() {
    return !!localStorage.getItem('username');
    }



    document.addEventListener('DOMContentLoaded', function() {
    const eventsContainer = document.getElementById('events-list');
    const upcomingEventsList = document.getElementById('upcoming-events-list');

    eventsContainer.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('add-event-btn')) {
            // Get the event card (the parent element of the button)
            const eventCard = e.target.parentElement;

            // Create a new list item for the upcoming events list
            const newEventListItem = document.createElement('li');

            // Get the event title (we assume it's the text of the h2 element inside the card)
            const eventTitle = eventCard.querySelector('h2').innerText;

            // Create a new link for the list item
            const newEventLink = document.createElement('a');
            newEventLink.href = "#";
            newEventLink.innerText = eventTitle;

            // Append the link to the list item
            newEventListItem.appendChild(newEventLink);

            // Append the list item to the upcoming events list
            upcomingEventsList.appendChild(newEventListItem);

            // Remove the original event card from the events container
            eventsContainer.removeChild(eventCard);
        }
    });
    });



    function redirectToTeam2() {
    window.location.href = "team2.html";
    }
    
})
