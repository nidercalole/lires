function parseCustomDate(dateString) {
    let datePart = dateString.split(", ")[1]; 
    let currentYear = new Date().getFullYear();
    let [day, month] = datePart.split(".").map(num => parseInt(num, 10));
    let parsedDate = new Date(currentYear, month - 1, day + 1); // Monat ist 0-basiert in JS

    return parsedDate;
}


const tabs = document.querySelectorAll('.tab');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tab.classList.toggle('active');
    });
});
let firstDayInList
function fillTableWithDates() {
    let table = document.querySelector("table");
    let today = new Date();
    let dayOffset = today.getDay() === 0 ? -6 : 1 - today.getDay(); // Montag als erster Tag der Woche
    let startDate = new Date(today);
    startDate.setDate(today.getDate() + dayOffset);
    const weekdayNames = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
    firstDayInList = startDate

    let cells = table.querySelectorAll(".head");
    cells.forEach((cell, index) => {
        let date = new Date(startDate);
        date.setDate(startDate.getDate() + index);
        let weekday = weekdayNames[date.getDay()];
        let formattedDate = date.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" });
        cell.textContent = `${weekday}, ${formattedDate}`;
        cell.id = `${date.getDate().toString().padStart(2, "0")}${(date.getMonth() + 1).toString().padStart(2, "0")}`;
    });
}

document.addEventListener("DOMContentLoaded", fillTableWithDates);


const draggables = document.querySelectorAll(".draggable");
const dropZones = document.querySelectorAll(".cell");

draggables.forEach(draggable => {
    draggable.addEventListener("dragstart", function(event) {
        draggable.classList.add("dragging");
        event.dataTransfer.setData("text", draggable.id);
    });

    draggable.addEventListener("dragend", () => {
        draggable.classList.remove("dragging");
    });
});
dropZones.forEach(dropZone => {
    dropZone.addEventListener("dragover", event => {
        event.preventDefault();
    });

    dropZone.addEventListener("drop", async event => {
        event.preventDefault();

        const draggableId = event.dataTransfer.getData("text");
        const originalDraggable = document.getElementById(draggableId);
        if (originalDraggable.parentElement === dropZone || !originalDraggable) {
            return;
        }
        const clone = originalDraggable.cloneNode(true);
        const cloneId = Math.random().toString(36).substring(7);
        let span = clone.querySelector(".tooltip-container"); // Hole das span-Element
        if (span) {
            let originalText = span.textContent.trim();
            span.textContent = originalText.length > 13 ? originalText.substring(0, 13) + "..." : originalText;
            
            // Erstelle ein neues div für den Tooltip und füge es dem span hinzu
            let tooltip = document.createElement("div");
            tooltip.className = "tooltip";
            tooltip.textContent = originalText; // Setze den gesamten Text als Tooltip
            span.appendChild(tooltip);
        }
        
        let date = parseCustomDate(dropZone.parentElement.querySelector(".head").textContent);

        clone.classList.remove("dragging");
        clone.classList.remove("draggable");
        clone.classList.add("dropped");
        clone.id = cloneId;
        clone.draggable = false;
        clone.classList.remove("tab-content");
        clone.style = "";

        await fetch('/calendar/addRecToCollection', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                recid: draggableId,
                usrid: getUserCredetials()[1],
                date: date,
                cloneId: cloneId
            })
        }).then((response) =>{
            if(!response.ok){
                return alert("Fehler beim Hinzufügen des Rezepts zum Kalender");
            }
            const removeBtn = document.createElement("button");
            removeBtn.innerHTML = "X";
            removeBtn.classList.add("remove-btn");
            removeBtn.onclick = () => {
                fetch('/calendar/removeRecFromCollection', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        cloneId: cloneId,
                        usrid: getUserCredetials()[1],
                    })
                }).then((response) => {
                    if(!response.ok){
                        return alert("Fehler beim Entfernen des Rezepts aus dem Kalender");
                    }
                });
                clone.remove();
            }
            clone.appendChild(removeBtn);
    
            dropZone.appendChild(clone);
        })
    });
});