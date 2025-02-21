const tabs = document.querySelectorAll('.tab');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tab.classList.toggle('active');
    });
});

function fillTableWithDates() {
    let table = document.querySelector("table");
    let today = new Date();
    let dayOffset = today.getDay() === 0 ? -6 : 1 - today.getDay(); // Montag als erster Tag der Woche
    let startDate = new Date(today);
    startDate.setDate(today.getDate() + dayOffset);
    const weekdayNames = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];

    let cells = table.querySelectorAll(".head");
    cells.forEach((cell, index) => {
        let date = new Date(startDate);
        date.setDate(startDate.getDate() + index);
        let weekday = weekdayNames[date.getDay()];
        let formattedDate = date.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" });
        cell.textContent = `${weekday}, ${formattedDate}`;
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

    dropZone.addEventListener("drop", event => {
        event.preventDefault();

        const draggableId = event.dataTransfer.getData("text");
        const originalDraggable = document.getElementById(draggableId);
        if (originalDraggable.parentElement === dropZone || !originalDraggable) {
            return;
        }
        const clone = originalDraggable.cloneNode(true);

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


        clone.classList.remove("dragging");
        clone.classList.remove("draggable");
        clone.classList.add("dropped");
        clone.id = draggableId + "_clone_" + Math.random().toString(36).substring(7);
        clone.draggable = false;
        clone.classList.remove("tab-content");
        clone.style = "";

        const removeBtn = document.createElement("button");
        removeBtn.innerHTML = "X";
        removeBtn.classList.add("remove-btn");
        removeBtn.onclick = () => clone.remove();
        clone.appendChild(removeBtn);

        dropZone.appendChild(clone);


    });
});