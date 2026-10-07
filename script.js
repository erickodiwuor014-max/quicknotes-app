const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");
const clearAllButton = document.querySelector("#clear-all-btn");

let notes = [];

function createNoteCard(note) {
    const listItem = document.createElement("li");
    listItem.classList.add("note-card");
    listItem.classList.add("category-" + note.category.toLowerCase());

    const categoryLabel = document.createElement("span");
    categoryLabel.classList.add("note-category");
    categoryLabel.textContent = note.category;

    const noteText = document.createElement("p");
    noteText.textContent = note.text;

    const dateLabel = document.createElement("small");
    dateLabel.classList.add("note-date");
    dateLabel.textContent = note.createdAt;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", function () {
        notes = notes.filter(function (item) {
            return item.id !== note.id;
        });

        render();
    });

    listItem.appendChild(categoryLabel);
    listItem.appendChild(noteText);
    listItem.appendChild(dateLabel);
    listItem.appendChild(deleteButton);

    return listItem;
}

function render() {
    notesList.replaceChildren();

    notes.forEach(function (note) {
        const noteCard = createNoteCard(note);
        notesList.appendChild(noteCard);
    });
}

noteForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const text = noteInput.value.trim();
    const category = noteCategory.value;

    if (text === "") {
        return;
    }

    const newNote = {
        id: Date.now().toString(),
        text: text,
        category: category,
        createdAt: new Date().toLocaleString()
    };

    notes.push(newNote);

    noteInput.value = "";
    render();
});

searchInput.addEventListener("input", function () {
    render();
});

clearAllButton.addEventListener("click", function () {
    if (notes.length === 0) {
        return;
    }

    if (confirm("Delete all notes?")) {
        notes = [];
        render();
    }
});

render();
