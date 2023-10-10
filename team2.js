const showhome = () => {
    document.getElementById("content-container").style.display = "block";
    document.getElementById("events-container").style.display = "block";
    document.getElementById("registration-container").style.display = "none";
    document.getElementById("login-container").style.display = "none";
    document.getElementById("home").style.backgroundColor = "red";
    document.getElementById("registration-container").style.backgroundColor = "transparent";
    document.getElementById("login").style.backgroundColor = "transparent";
    document.getElementById("events").style.backgroundColor = "transparent";

}

const showregistration = () => {
    document.getElementById("content-container").style.display = "none";
    document.getElementById("login-container").style.display = "none";
    document.getElementById("events-container").style.display = "none";
    document.getElementById("registration-container").style.display = "block";
    document.getElementById("home").style.backgroundColor = "transparent";
    document.getElementById("registration").style.backgroundColor = "red";
    document.getElementById("login").style.backgroundColor = "transparent";
    document.getElementById("events").style.backgroundColor = "transparent";
}

function submitRegistration() {
    const usernameInput = document.getElementById('username-input');
    const passwordInput = document.getElementById('password-input');
    const addressInput = document.getElementById('address-input');

    const username = usernameInput.value;
    const password = passwordInput.value;
    const address = addressInput.value;

    if (username && password && address) {
        const data = {
            username: username,
            password: password,
            address: address
        };

        fetch('https://cws.auckland.ac.nz/ako/api/Register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.text())
        .then(data => {
            alert(data);  
            if(data !== "Username not available") {
                usernameInput.value = '';
                passwordInput.value = '';
                addressInput.value = '';
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    } else {
        alert('Please fill out all fields.');
    }
}


document.getElementById("registration").addEventListener("click", showregistration);


const showlogin = () => {
    document.getElementById("content-container").style.display = "none";
    document.getElementById("registration-container").style.display = "none";
    document.getElementById("login-container").style.display = "block";
    document.getElementById("events-container").style.display = "none";
    document.getElementById("home").style.backgroundColor = "transparent";
    document.getElementById("registration").style.backgroundColor = "transparent";
    document.getElementById("login").style.backgroundColor = "red";
    document.getElementById("events").style.backgroundColor = "transparent";
}

function submitLogin() {
    
    const usernameInput = document.getElementById('login-username-input');
    const passwordInput = document.getElementById('login-password-input');

    const username = usernameInput.value;
    const password = passwordInput.value;

    if (username === 'admin') {
        window.location.href = 'admin.html';
    }
    
    const base64Credentials = btoa(username + ':' + password);
}


document.getElementById("login").addEventListener("click", showlogin);
document.addEventListener("DOMContentLoaded", function() {


    const savedUsername = localStorage.getItem('username');
    if(savedUsername) {
        document.getElementById("username-display").innerText = "Hello, " + savedUsername + "!";
        document.getElementById("username-display").style.display = "block";
        document.getElementById("logout-button").style.display = "block";
    }
});
function logout() {
    
    localStorage.removeItem('username');

    
    document.getElementById("username-display").style.display = "none";
    document.getElementById("logout-button").style.display = "none";

    
}


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


function createCard(text, type, isDraggable = false, isDroppable = false) {
    const card = document.createElement('div');
    card.className = `card ${type}`;
    
    if (text.startsWith('data:image')) {
        const img = document.createElement('img');
        img.src = text;
        card.appendChild(img);
    } else if (text.startsWith('data:audio')) {
        const audio = document.createElement('audio');
        audio.controls = true;
        const source = document.createElement('source');
        source.src = text;
        source.type = 'audio/mpeg';
        audio.appendChild(source);
        card.appendChild(audio);
    } else {
        card.innerText = text;
    }
    
    card.draggable = isDraggable;

    if (isDraggable) {
        card.addEventListener('dragstart', handleDragStart);
        card.addEventListener('dragend', handleDragEnd);
    }
    
    if (isDroppable) {
        card.addEventListener('drop', handleDrop);
        card.addEventListener('dragover', handleDragOver);
    }

    return card;
}

let draggedItem = null;

function handleDragStart(e) {
    draggedItem = this;
}

function handleDragEnd(e) {
    this.style.opacity = '1';
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDrop(e) {
    e.preventDefault();
    const isMatch = checkMatchAndUpdateScore(draggedItem, this);
    if (isMatch) {
        if (draggedItem.querySelector('img')) {
            this.innerHTML = draggedItem.innerHTML;
        } else if (draggedItem.querySelector('audio')) {
            this.innerHTML = draggedItem.innerHTML;
        } else {
            this.innerText = draggedItem.innerText;
        }
        this.classList.add('correct');
        draggedItem.style.display = 'none';
        score++;
        document.getElementById('score-display').innerText = `score: ${score}`;
        alert("you are right!");
    } else {
        alert("you are wrong.Please try again");
    }
}


function checkMatchAndUpdateScore(dragged, target) {
    const englishCardAdjacent = target.previousElementSibling;
    
    let englishText;
    if (englishCardAdjacent.querySelector('img')) {
        englishText = englishCardAdjacent.querySelector('img').src;
    } else if (englishCardAdjacent.querySelector('audio')) {
        englishText = englishCardAdjacent.querySelector('audio source').src;
    } else {
        englishText = englishCardAdjacent.innerText;
    }

    const matchingPair = pairsArray.find(pair => pair.english === englishText);
    let draggedText;
    if (dragged.querySelector('img')) {
        draggedText = dragged.querySelector('img').src;
    } else if (dragged.querySelector('audio')) {
        draggedText = dragged.querySelector('audio source').src;
    } else {
        draggedText = dragged.innerText;
    }

    return matchingPair && matchingPair.maori === draggedText;
}

function fetchAPIContent() {
    fetch('https://cws.auckland.ac.nz/ako/api/Version')
    .then(response => response.text())
    .then(data => {
        
        document.getElementById('api-content').innerHTML = '&copy; ' + data;
    })
    .catch(error => {
        console.error('Error fetching API content:', error);
    });
}

fetchAPIContent();
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
