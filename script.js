// ===== MODEL =====
let events = JSON.parse(localStorage.getItem("events")) || [];
let editIndex = -1;

// ===== AUTH =====
function login() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    if (user === "admin" && pass === "123") {
        document.getElementById("loginPage").classList.add("hidden");
        document.getElementById("app").classList.remove("hidden");
        displayEvents();
    } else {
        document.getElementById("error").innerText = "Invalid login";
    }
}

function logout() {
    location.reload();
}

// ===== CONTROLLER =====
function saveEvent() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const location = document.getElementById("location").value;

    if (!title || !date) {
        alert("Title and Date required!");
        return;
    }

    const event = { title, description, date, time, location };

    if (editIndex === -1) {
        events.push(event);
    } else {
        events[editIndex] = event;
        editIndex = -1;
    }

    localStorage.setItem("events", JSON.stringify(events));

    clearForm();
    displayEvents();
}

function editEvent(index) {
    const e = events[index];

    document.getElementById("title").value = e.title;
    document.getElementById("description").value = e.description;
    document.getElementById("date").value = e.date;
    document.getElementById("time").value = e.time;
    document.getElementById("location").value = e.location;

    editIndex = index;
}

function deleteEvent(index) {
    events.splice(index, 1);
    localStorage.setItem("events", JSON.stringify(events));
    displayEvents();
}

// ===== VIEW =====
function displayEvents() {
    const list = document.getElementById("eventList");
    list.innerHTML = "";

    events.forEach((e, i) => {
        list.innerHTML += `
            <li>
                <b>${e.title}</b> (${e.date}) - ${e.location}
                <br>
                ${e.description} | ${e.time}
                <br>
                <button onclick="editEvent(${i})">Edit</button>
                <button onclick="deleteEvent(${i})">Delete</button>
                <hr>
            </li>
        `;
    });
}

function clearForm() {
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("date").value = "";
    document.getElementById("time").value = "";
    document.getElementById("location").value = "";
}