// Pet states and constants
const MAX_STAT = 100;
const MIN_STAT = 0;
const STAT_INCREASE = 30; // Increased to make interactions more rewarding
const HUNGER_DECREASE = 5; // Decreased to make stats last longer
const CLEANLINESS_DECREASE = 4; // Decreased to make stats last longer
const HAPPINESS_DECREASE = 4; // Decreased to make stats last longer
const TIMER_INTERVAL = 12000; // Increased to 12 seconds for slower decreases
const ANIMATION_TIMEOUT = 2500; // Longer animations for better visual experience

// Pet stats
let petStats = {
  hunger: 100,
  cleanliness: 100,
  happiness: 100
};

// DOM elements
const petElement = document.getElementById('pet');
const petMouth = document.getElementById('pet-mouth');
const hungerBar = document.getElementById('hunger-bar');
const hungerValue = document.getElementById('hunger-value');
const cleanlinessBar = document.getElementById('cleanliness-bar');
const cleanlinessValue = document.getElementById('cleanliness-value');
const happinessBar = document.getElementById('happiness-bar');
const happinessValue = document.getElementById('happiness-value');
const feedButton = document.getElementById('feed-btn');
const cleanButton = document.getElementById('clean-btn');
const playButton = document.getElementById('play-btn');
const statusMessage = document.getElementById('status-message');
const foodItem = document.getElementById('food-item');
const soapBubbles = document.getElementById('soap-bubbles');
const ball = document.getElementById('ball');
const waterDrops = document.getElementById('water-drops');
const sponge = document.getElementById('sponge');

// Sound effects (using short beep sounds)
const feedSound = new Audio("data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA==");
const cleanSound = new Audio("data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA==");
const playSound = new Audio("data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA==");

// Enhanced updatePetMood function
function updatePetMood() {
  const averageStat = (petStats.hunger + petStats.cleanliness + petStats.happiness) / 3;
  
  // Remove all previous mouth styles
  petMouth.classList.remove('happy-mouth', 'neutral-mouth', 'sad-mouth', 'super-happy-mouth');
  
  if (petStats.hunger < 20 || petStats.cleanliness < 20 || petStats.happiness < 20) {
    petMouth.classList.add('sad-mouth');
    statusMessage.innerText = 'Your pet is sad!';
    statusMessage.style.color = '#ff6b6b';
    statusMessage.classList.add('shake-effect');
    setTimeout(() => {
      statusMessage.classList.remove('shake-effect');
    }, 500);
  } else if (petStats.hunger < 50 || petStats.cleanliness < 50 || petStats.happiness < 50) {
    petMouth.classList.add('neutral-mouth');
    statusMessage.innerText = 'Your pet is okay.';
    statusMessage.style.color = '#ffa94d';
  } else if (averageStat > 70) {
    petMouth.classList.add('happy-mouth');
    statusMessage.innerText = 'Your pet is happy!';
    statusMessage.style.color = '#51cf66';
    if (averageStat > 90) {
      statusMessage.classList.add('glow-effect');
      setTimeout(() => {
        statusMessage.classList.remove('glow-effect');
      }, 2000);
    }
  } else {
    petMouth.classList.add('neutral-mouth');
    statusMessage.innerText = 'Your pet is content.';
    statusMessage.style.color = '#ffa94d';
  }
}

// Update status bar UI
function updateStatusBars() {
  hungerBar.style.width = `${petStats.hunger}%`;
  hungerValue.innerText = Math.round(petStats.hunger);
  cleanlinessBar.style.width = `${petStats.cleanliness}%`;
  cleanlinessValue.innerText = Math.round(petStats.cleanliness);
  happinessBar.style.width = `${petStats.happiness}%`;
  happinessValue.innerText = Math.round(petStats.happiness);
  
  // Update color based on value
  hungerBar.style.backgroundColor = petStats.hunger < 30 ? '#ff6b6b' : 
                                   petStats.hunger < 60 ? '#ffa94d' : '#51cf66';
  cleanlinessBar.style.backgroundColor = petStats.cleanliness < 30 ? '#ff6b6b' : 
                                       petStats.cleanliness < 60 ? '#ffa94d' : '#51cf66';
  happinessBar.style.backgroundColor = petStats.happiness < 30 ? '#ff6b6b' : 
                                     petStats.happiness < 60 ? '#ffa94d' : '#51cf66';
  
  updatePetMood();
}

// Update pet stats over time
function decreaseStats() {
  petStats.hunger = Math.max(MIN_STAT, petStats.hunger - HUNGER_DECREASE);
  petStats.cleanliness = Math.max(MIN_STAT, petStats.cleanliness - CLEANLINESS_DECREASE);
  petStats.happiness = Math.max(MIN_STAT, petStats.happiness - HAPPINESS_DECREASE);
  updateStatusBars();
}

// Feed the pet
function feedPet() {
  if (petStats.hunger < MAX_STAT) {
    feedButton.disabled = true;
    foodItem.style.display = 'block';
    feedSound.play();
    
    // Animate food moving to pet
    foodItem.classList.add('feed-animation');
    
    setTimeout(() => {
      petStats.hunger = Math.min(MAX_STAT, petStats.hunger + STAT_INCREASE);
      updateStatusBars();
      
      // Reset animation
      foodItem.style.display = 'none';
      foodItem.classList.remove('feed-animation');
      feedButton.disabled = false;
    }, ANIMATION_TIMEOUT);
  }
}

// Clean the pet
function cleanPet() {
  if (petStats.cleanliness < MAX_STAT) {
    cleanButton.disabled = true;
    
    // Show cleaning animation elements
    soapBubbles.style.display = 'block';
    waterDrops.style.display = 'block';
    sponge.style.display = 'block';
    cleanSound.play();
    
    // Animate cleaning
    sponge.classList.add('clean-animation');
    soapBubbles.classList.add('bubbles-animation');
    waterDrops.classList.add('water-animation');
    
    setTimeout(() => {
      petStats.cleanliness = Math.min(MAX_STAT, petStats.cleanliness + STAT_INCREASE);
      updateStatusBars();
      
      // Reset animation
      soapBubbles.style.display = 'none';
      waterDrops.style.display = 'none';
      sponge.style.display = 'none';
      sponge.classList.remove('clean-animation');
      soapBubbles.classList.remove('bubbles-animation');
      waterDrops.classList.remove('water-animation');
      cleanButton.disabled = false;
    }, ANIMATION_TIMEOUT);
  }
}

// Play with the pet
function playWithPet() {
  if (petStats.happiness < MAX_STAT) {
    playButton.disabled = true;
    ball.style.display = 'block';
    playSound.play();
    
    // Animate ball bouncing
    ball.classList.add('play-animation');
    petElement.classList.add('pet-jump');
    
    setTimeout(() => {
      petStats.happiness = Math.min(MAX_STAT, petStats.happiness + STAT_INCREASE);
      updateStatusBars();
      
      // Reset animation
      ball.style.display = 'none';
      ball.classList.remove('play-animation');
      petElement.classList.remove('pet-jump');
      playButton.disabled = false;
    }, ANIMATION_TIMEOUT);
  }
}

// Event listeners
feedButton.addEventListener('click', feedPet);
cleanButton.addEventListener('click', cleanPet);
playButton.addEventListener('click', playWithPet);

// Initialize the game
function initGame() {
  updateStatusBars();
  // Start the timer to decrease stats
  setInterval(decreaseStats, TIMER_INTERVAL);
}

// Start the game when the page loads
window.addEventListener('load', initGame);