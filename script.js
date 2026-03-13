let feedCount = 0;

// Splash screen animation
window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('splashScreen').style.display = 'none';
        document.getElementById('gameScreen').style.display = 'block';
    }, 3500); // Show splash for 3.5 seconds
});

function updateCounter() {
    const counter = document.getElementById('feedCounter');
    const timeText = feedCount === 1 ? 'time' : 'times';
    counter.textContent = `You've fed the frog ${feedCount} ${timeText}`;
}

function feedFrog() {
    const userInput = document.getElementById('userInput').value;
    const frogImage = document.getElementById('frog');
    const frogMouth = document.getElementById('frogMouth');
    const confirmation = document.getElementById('confirmation');
    const submitBtn = document.getElementById('submitBtn');
    
    if (userInput.trim() === '') {
        alert('Please enter something to feed the frog!');
        return;
    }
    
    // Increment feed counter and update display
    feedCount++;
    updateCounter();
    
    // Change frog to open mouth
    frogImage.src = 'img/Frog-openmouth.png';
    
    // Show the text going into frog's mouth
    frogMouth.textContent = userInput;
    frogMouth.style.display = 'block';
    
    // Disable submit button temporarily
    submitBtn.disabled = true;
    
    // After 2 seconds, hide the text and show confirmation
    setTimeout(function() {
        frogMouth.style.display = 'none';
        confirmation.style.display = 'block';
        
        // Clear the input
        document.getElementById('userInput').value = '';
        
        // Change frog back to default after eating
        setTimeout(function() {
            frogImage.src = 'img/Frog-default.png';
            confirmation.style.display = 'none';
            submitBtn.disabled = false;
        }, 2000);
        
    }, 2000);
}

// Allow Enter key to submit
document.getElementById('userInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        feedFrog();
    }
});
