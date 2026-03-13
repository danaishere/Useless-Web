let feedCount = 0;
let hasSword = false;
let hasCrown = false;

// Array of quirky confirmation messages
const confirmationMessages = [
    "Yum! That was delicious!",
    "Burp! Thanks for the tasty thoughts!",
    "Nom nom nom! Got any more?"
];

const swordMessages = [
    "⚔️ Ready to battle stress with steel!"
];

const crownMessages = [
    "👑 ALL HAIL THE FROG KING!"
];

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
    
    let title = "You've fed the frog";
    if (hasCrown) {
        title = "You've fed the FROG KING";
    } else if (hasSword) {
        title = "You've fed the warrior frog";
    }
    
    counter.textContent = `${title} ${feedCount} ${timeText}`;
}

function updateEvolutionStatus() {
    const swordStatus = document.getElementById('swordStatus');
    const crownStatus = document.getElementById('crownStatus');
    
    if (hasSword) {
        swordStatus.textContent = '🗡️ Sword: UNLOCKED!';
        swordStatus.classList.add('unlocked');
    }
    
    if (hasCrown) {
        crownStatus.textContent = '👑 Crown: UNLOCKED!';
        crownStatus.classList.add('unlocked');
    }
}

function checkEvolution() {
    // Check for sword at 3 feeds
    if (feedCount >= 3 && !hasSword) {
        hasSword = true;
        const sword = document.getElementById('frogSword');
        sword.classList.remove('hidden');
        sword.classList.add('show');
        
        // Show sword unlock message
        setTimeout(() => {
            showConfirmation((swordMessages));
        }, 500);
        
        updateEvolutionStatus();
        return true; // Evolution happened
    }
    
    // Check for crown at 5 feeds
    if (feedCount >= 5 && !hasCrown) {
        hasCrown = true;
        const crown = document.getElementById('frogCrown');
        crown.classList.remove('hidden');
        crown.classList.add('show');
        
        // Show crown unlock message
        setTimeout(() => {
            showConfirmation((crownMessages));
        }, 500);
        
        updateEvolutionStatus();
        return true; // Evolution happened
    }
    
    return false; // No evolution
}

function switchFrogImage(imageType) {
    const frogImage = document.getElementById('frogImage');
    
    if (imageType === 'eating') {
        frogImage.src = 'img/Frog-openmouth.png';
    } else {
        frogImage.src = 'img/Frog-default.png';
    }
}

function getRandomMessage(messageArray) {
    const randomIndex = Math.floor(Math.random() * messageArray.length);
    return messageArray[randomIndex];
}

function getRandomConfirmationMessage() {
    return getRandomMessage(confirmationMessages);
}

//https://css-tricks.com/adding-particle-effects-to-dom-elements-with-canvas/
function createTextShards(text, inputElement) {
    const inputRect = inputElement.getBoundingClientRect();
    const words = text.split(' ');
    const shards = [];
    
    words.forEach((word, index) => {
        if (word.trim()) {
            const shard = document.createElement('div');
            shard.textContent = word;
            shard.style.position = 'fixed';
            shard.style.left = `${inputRect.left + Math.random() * inputRect.width}px`;
            shard.style.top = `${inputRect.top + Math.random() * inputRect.height}px`;
            shard.style.fontSize = '1rem';
            shard.style.color = '#FF6B35';
            shard.style.fontWeight = 'bold';
            shard.style.pointerEvents = 'none';
            shard.style.zIndex = '1000';
            shard.style.fontFamily = 'Press Start 2P, monospace';
            
            document.body.appendChild(shard);
            shards.push(shard);
            
            // Animate shard flying to frog
            setTimeout(() => {
                const frogRect = document.getElementById('frogImage').getBoundingClientRect();
                const targetX = frogRect.left + frogRect.width / 2;
                const targetY = frogRect.top + frogRect.height / 2;
                
                shard.style.transition = 'all 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                shard.style.left = `${targetX}px`;
                shard.style.top = `${targetY}px`;
                shard.style.opacity = '0';
                shard.style.transform = 'scale(0.1)';
            }, index * 200 );
        }
    });
    
    // Clean up shards after animation
    setTimeout(() => {
        shards.forEach(shard => {
            if (shard.parentNode) {
                shard.parentNode.removeChild(shard);
            }
        });
    }, 3000);
}

function showConfirmation(message) {
    const confirmation = document.createElement('div');
    confirmation.className = 'confirmation';
    confirmation.textContent = message;
    document.body.appendChild(confirmation);
    
    setTimeout(() => {
        if (confirmation.parentNode) {
            confirmation.parentNode.removeChild(confirmation);
        }
    }, 2000);
}

function feedFrog() {
    const inputField = document.getElementById('stressInput');
    const text = inputField.value.trim();
    
    if (text) {
        feedCount++;
        updateCounter();
        
        // Create text shards animation
        createTextShards(text, inputField);
        
        // Clear input
        inputField.value = '';
        
        // Switch to open mouth image and trigger animation
        switchFrogImage('eating');
        const frogImage = document.getElementById('frogImage');
        frogImage.classList.add('feeding-animation');
        
        // Switch back to default image after eating animation
        setTimeout(() => {
            switchFrogImage('default');
            frogImage.classList.remove('feeding-animation');
        }, 1500);
        
        // Check for evolution first
        const evolved = checkEvolution();
        
        // Show regular confirmation if no evolution happened
        if (!evolved) {
            setTimeout(() => {
                showConfirmation(getRandomConfirmationMessage());
            }, 1000);
        }
    }
}

// Enter key support
document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('stressInput');
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) { 
            e.preventDefault();
            feedFrog();
        }
    });
    
});
