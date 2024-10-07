let flashcards = [];
let currentFlashcardIndex = 0;
let showingAnswer = false;

// Function to shuffle the questions
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
}

// Fetch the flashcards from the JSON file
fetch('flashcards.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        flashcards = data;
        shuffle(flashcards); // Shuffle the questions after loading them
        // Load the first flashcard after shuffling
        currentFlashcardIndex = 0;
        loadFlashcard();
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

// Function to show the answer
function showAnswer() {
    if (flashcards.length === 0) return;

    const answerElement = document.getElementById("answer");
    if (!showingAnswer) {
        answerElement.textContent = flashcards[currentFlashcardIndex].answer;
        showingAnswer = true;
    }
}

// Function to load the next flashcard
function nextFlashcard() {
    if (flashcards.length === 0) return;

    currentFlashcardIndex = (currentFlashcardIndex + 1) % flashcards.length;
    loadFlashcard();
    showingAnswer = false;
}

// Function to load a flashcard
function loadFlashcard() {
    const flashcardElement = document.getElementById("question");
    const answerElement = document.getElementById("answer");

    flashcardElement.textContent = flashcards[currentFlashcardIndex].question;
    answerElement.textContent = ""; // Clear the answer when loading the next question
}
