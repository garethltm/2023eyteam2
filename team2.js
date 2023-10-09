const showhome = () => {
    document.getElementById("content-container").style.display = "block";
    document.getElementById("comment-container").style.display = "none";
    document.getElementById("events-container").style.display = "none";
    document.getElementById("registration-container").style.display = "none";
    document.getElementById("login-container").style.display = "none";
    document.getElementById("shop-container").style.display = "none";
    document.getElementById("game-container").style.display = "none";
    document.getElementById("game").style.backgroundColor = "transparent";
    document.getElementById("shop").style.backgroundColor = "transparent";
    document.getElementById("home").style.backgroundColor = "red";
    document.getElementById("guestbook").style.backgroundColor = "transparent";
    document.getElementById("registration-container").style.backgroundColor = "transparent";
    document.getElementById("login").style.backgroundColor = "transparent";
    document.getElementById("events").style.backgroundColor = "transparent";

}
const showcomment = () => {
    document.getElementById("content-container").style.display = "none";
    document.getElementById("comment-container").style.display = "block";
    document.getElementById("registration-container").style.display = "none";
    document.getElementById("login-container").style.display = "none";
    document.getElementById("events-container").style.display = "none";
    document.getElementById("shop-container").style.display = "none";
    document.getElementById("game-container").style.display = "none";
    document.getElementById("game").style.backgroundColor = "transparent";
    document.getElementById("shop").style.backgroundColor = "transparent";
    document.getElementById("home").style.backgroundColor = "transparent";
    document.getElementById("guestbook").style.backgroundColor = "red";
    document.getElementById("registration").style.backgroundColor = "transparent";
    document.getElementById("login").style.backgroundColor = "transparent";
    document.getElementById("events").style.backgroundColor = "transparent";


}
function submitComment() {
    const nameInput = document.getElementById('name-input');
    const commentInput = document.getElementById('comment-input');
    const commentsFrame = document.getElementById('comments-frame');  

    const name = nameInput.value;
    const comment = commentInput.value;

    if (name && comment) {
        const data = {
            name: name,
            comment: comment
        };

        fetch('https://cws.auckland.ac.nz/ako/api/Comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) 
        })
        .then(response => response.text())
        .then(data => {
            console.log('Comment Submitted:', data);
            
            
            nameInput.value = '';
            commentInput.value = '';
            
            
            commentsFrame.src = commentsFrame.src;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    } else {
        alert('Please fill out both fields.');
    }
}

const showregistration = () => {
    document.getElementById("content-container").style.display = "none";
    document.getElementById("comment-container").style.display = "none";
    document.getElementById("login-container").style.display = "none";
    document.getElementById("events-container").style.display = "none";
    document.getElementById("registration-container").style.display = "block";
    document.getElementById("shop-container").style.display = "none";
    document.getElementById("game-container").style.display = "none";
    document.getElementById("game").style.backgroundColor = "transparent";
    document.getElementById("shop").style.backgroundColor = "transparent";
    document.getElementById("home").style.backgroundColor = "transparent";
    document.getElementById("guestbook").style.backgroundColor = "transparent";
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
    document.getElementById("comment-container").style.display = "none";
    document.getElementById("registration-container").style.display = "none";
    document.getElementById("login-container").style.display = "block";
    document.getElementById("events-container").style.display = "none";
    document.getElementById("shop-container").style.display = "none";
    document.getElementById("game-container").style.display = "none";
    document.getElementById("game").style.backgroundColor = "transparent";
    document.getElementById("shop").style.backgroundColor = "transparent";
    document.getElementById("home").style.backgroundColor = "transparent";
    document.getElementById("guestbook").style.backgroundColor = "transparent";
    document.getElementById("registration").style.backgroundColor = "transparent";
    document.getElementById("login").style.backgroundColor = "red";
    document.getElementById("events").style.backgroundColor = "transparent";
}

function submitLogin() {
    
    const usernameInput = document.getElementById('login-username-input');
    const passwordInput = document.getElementById('login-password-input');

    const username = usernameInput.value;
    const password = passwordInput.value;

    const base64Credentials = btoa(username + ':' + password);

    fetch('https://cws.auckland.ac.nz/ako/api/TestAuth', {
        method: 'GET',
        headers: {
            'Authorization': 'Basic ' + base64Credentials,
            'accept': 'text/plain'
        }
    })
    .then(response => {
        if(response.ok) {
            return response.text();
        } else {
            throw new Error("Login failed");
        }
    })
    .then(data => {
        if(data.includes("authentication success")) { 
            document.getElementById("login-container").style.display = "none";
            document.getElementById("content-container").style.display = "block";
            
            const usernameDisplay = document.getElementById("username-display");
            usernameDisplay.innerText = "Hello, " + username + "!";
            usernameDisplay.style.display = "block";

            document.getElementById("logout-button").style.display = "block";
            localStorage.setItem('username', username);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Login failed! Please check your credentials.');
    });
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
    
    document.getElementById("content-container").style.display = "none";
    document.getElementById("comment-container").style.display = "none";
    document.getElementById("registration-container").style.display = "none";
    document.getElementById("login-container").style.display = "none";
    document.getElementById("shop-container").style.display = "none";
    document.getElementById("game-container").style.display = "none";
    document.getElementById("game").style.backgroundColor = "transparent";
    document.getElementById("shop").style.backgroundColor = "transparent";
    document.getElementById("home").style.backgroundColor = "transparent";
    document.getElementById("guestbook").style.backgroundColor = "transparent";
    document.getElementById("registration").style.backgroundColor = "transparent";
    document.getElementById("login").style.backgroundColor = "transparent";
    document.getElementById("events").style.backgroundColor = "red";

    
    document.getElementById("events-container").style.display = "block";

    const eventList = document.getElementById("events-list");
    
    eventList.innerHTML = "";

    fetch('https://cws.auckland.ac.nz/ako/api/EventCount')
        .then(response => response.text())
        .then(count => {
            const eventCount = parseInt(count);

            for (let i = 0; i < eventCount; i++) {
                fetch(`https://cws.auckland.ac.nz/ako/api/Event/${i}`)
                    .then(response => response.text())
                    .then(data => {
                        const eventElement = document.createElement("div");
                        eventElement.className = "event-card";

                        
                        const summaryMatch = /SUMMARY:(.*)/g.exec(data);
                        const descriptionMatch = /DESCRIPTION:(.*)/g.exec(data);
                        const locationMatch = /LOCATION:(.*)/g.exec(data);
                        const startMatch = /DTSTART:(\d{8}T\d{6}Z)/g.exec(data);
                        const endMatch = /DTEND:(\d{8}T\d{6}Z)/g.exec(data);
                        const startFormatted = formatDate(startMatch[1]);
                        const endFormatted = formatDate(endMatch[1]);




                        if (summaryMatch && descriptionMatch && locationMatch && startMatch && endMatch) {
                            eventElement.innerHTML = `
                                <div class="event-title">${summaryMatch[1]}</div>
                                <div class="event-description">${descriptionMatch[1]}</div>
                                <div class="event-location">Location: ${locationMatch[1]}</div>
                                <div class="event-start">Start Time: ${startFormatted}</div>
                                <div class="event-end">End Time: ${endFormatted}</div>
                            `;

                            eventList.appendChild(eventElement);
                        }
                    });
            }
        });
}


document.getElementById("events").addEventListener("click", showEvents);

document.getElementById("shop").addEventListener("click", function() {

    initShop(); 
    showItems(); 
    
});
function isUserLoggedIn() {
    return !!localStorage.getItem('username');
}


function initShop() {
    
    const shopContainer = document.getElementById("shop-container");
    
    shopContainer.style.display = "block";
    shopContainer.innerHTML = `
        <input type="text" id="search-box" placeholder="searching...">
        <div id="items-list"></div>
    `;

    
    const searchBox = document.getElementById("search-box");
    searchBox.addEventListener("input", function(e) {
        showItems(e.target.value);
    });
}

function showItems(keyword) {
    const apiUrl = keyword ? 
        `https://cws.auckland.ac.nz/ako/api/Items/${keyword}` :
        'https://cws.auckland.ac.nz/ako/api/AllItems';

    fetch(apiUrl)
        .then(response => response.json())
        .then(items => displayItems(items));
}

function displayItems(items) {
    const itemsList = document.getElementById("items-list");
    if(itemsList) {
        itemsList.innerHTML = '';  
        items.forEach(item => {
            const itemDiv = document.createElement("div");
            itemDiv.className = "item-card";

            
            const itemImg = document.createElement("img");
            itemImg.classList.add("item-img");
            itemImg.src = `https://cws.auckland.ac.nz/ako/api/ItemImage/${item.id}`;
            itemDiv.appendChild(itemImg);

            
            const itemInfo = document.createElement("div");
            itemInfo.className = "item-info";

            
            const itemName = document.createElement("h2");
            itemName.innerText = item.name;
            itemInfo.appendChild(itemName);

            
            const itemDescription = document.createElement("p");
            itemDescription.innerText = item.description;
            itemInfo.appendChild(itemDescription);

            
            const itemPrice = document.createElement("p");
            itemPrice.className = "item-price";
            itemPrice.innerText = `$${item.price}`;
            itemInfo.appendChild(itemPrice);

            
            const buyButton = document.createElement("button");
            buyButton.innerText = "Buy";
            buyButton.addEventListener("click", function() {
                if (isUserLoggedIn()) {
                    const userName = localStorage.getItem("username");
                    alert(`Thanks ${userName} for purchasing item with ID: ${item.id}`);
                } else {
                    alert("Please login first!");
                    showlogin(); 
                }
            });
            itemInfo.appendChild(buyButton);

            
            itemDiv.appendChild(itemInfo);

            
            itemsList.appendChild(itemDiv);
        });
    } else {
        console.error('Items list container not found!');
    }
}

const showproduct = () => {
    document.getElementById("content-container").style.display = "none";
    document.getElementById("comment-container").style.display = "none";
    document.getElementById("registration-container").style.display = "none";
    document.getElementById("login-container").style.display = "none";
    document.getElementById("events-container").style.display = "none";
    document.getElementById("shop-container").style.display = "block";
    document.getElementById("game-container").style.display = "none";
    document.getElementById("game").style.backgroundColor = "transparent";
    document.getElementById("home").style.backgroundColor = "transparent";
    document.getElementById("guestbook").style.backgroundColor = "transparent";
    document.getElementById("registration").style.backgroundColor = "transparent";
    document.getElementById("login").style.backgroundColor = "transparent";
    document.getElementById("events").style.backgroundColor = "transparent";
    document.getElementById("shop").style.backgroundColor = "red";
}
document.getElementById("shop").addEventListener("click", showproduct);




document.getElementById("game").addEventListener("click", function() {
    showgame();
});

let pairsArray = [];

function loadMatchingGame() {
    fetch('https://cws.auckland.ac.nz/ako/api/MatchingPair')
        .then(response => response.json())
        .then(data => {
            const pairsData = data.pairs.split('|');
            pairsArray = pairsData.map(pair => {
                const [english, maori] = pair.split('@');
                return { english, maori };
            });
            initializeGame();
        })
        .catch(error => console.error('Error fetching data:', error));
}
let score = 0;

function initializeGame() {
    const fixedAndDropZone = document.getElementById('fixed-and-drop-zone');
    const draggableColumn = document.getElementById('draggable-column');

    fixedAndDropZone.innerHTML = '';
    draggableColumn.innerHTML = '';

    pairsArray.forEach(pair => {
        const pairContainer = document.createElement('div');
        pairContainer.style.display = 'flex';

        const fixedCard = createCard(pair.english, 'english');
        pairContainer.appendChild(fixedCard);

        const dropZoneCard = createCard('', 'dropzone', false, true);
        pairContainer.appendChild(dropZoneCard);

        fixedAndDropZone.appendChild(pairContainer);

        const draggableCard = createCard(pair.maori, 'maori', true);
        draggableColumn.appendChild(draggableCard);
    });
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
const showgame = () => {
    document.getElementById("content-container").style.display = "none";
    document.getElementById("comment-container").style.display = "none";
    document.getElementById("registration-container").style.display = "none";
    document.getElementById("login-container").style.display = "none";
    document.getElementById("events-container").style.display = "none";
    document.getElementById("shop-container").style.display = "none";
    document.getElementById("game-container").style.display = "flex";
    document.getElementById("game").style.backgroundColor = "red";
    document.getElementById("home").style.backgroundColor = "transparent";
    document.getElementById("guestbook").style.backgroundColor = "transparent";
    document.getElementById("registration").style.backgroundColor = "transparent";
    document.getElementById("login").style.backgroundColor = "transparent";
    document.getElementById("events").style.backgroundColor = "transparent";
    document.getElementById("shop").style.backgroundColor = "transparent";
    loadMatchingGame();
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