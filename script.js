// --------------------------------------------------
// SCENES
// Read through the comments below to see what this section does
//
// TO CUSTOMIZE THIS SECTION
// 1) add fields for each scene, as relevant, to match your mockup
// 2) customize the scenes to fit your story
// 3) add any new fields to the function below
// --------------------------------------------------

// First, we create a variable for the current scene being displayed
let currentScene = "prologue";

// Then, we create an object that stores the data for each scene,
const scenes = {
  // See "backyard" for the first example
  prologue: {
    title: "Location: The Mystery House",
    img: "https://www.magnific.com/free-photos-vectors/mystery-house.jpg",
    // each choice can have text, an action, and/or nextScene
    text: "You receive a strange note telling you to go to an old house at the edge of town. The note says that something important is hidden inside, but it does not explain what it is. When you arrive, the house looks abandoned. The windows are dark and the front door is locked. You notice a small light coming from one of the upstairs windows.",

    choices: [
      {
        text: "Examine the front door",
        nextScene: "frontDoor"
      },
      {
        text: "search the yard",
        nextScene: "yard"
      },
      {
        text: "Look through the window",
        nextScene: "porch"
      }
    ]
  },

  entrance: {
    title: "Location: Entrance",
    character: "Interviewee: Neighbor",
    text: "well what I remember...",
    choices: [
      {
        text: "Ask about the dog",
        nextScene: "backyard"
      },
      {
        text: "Ask about the neighbor",
        nextScene: "hallway"
      }
    ]
  },

  frontDoor: {
    title: "Location: Front Door",
    text: "You stand in front of the old wooden door. The handle is covered in dust.",
    choices: [
      {
        text: "Try to open the door",
        action: unlockDoor
      },
      {
        text: "Go back",
        nextScene: "prologue"
      }
    ]
  },

  yard: {
    title: "Location: Yard",
    text: "You search the yard and find an old wooden box underneath a pile of leaves.",
    choices: [
      {
        text: "Pick up the brass key",
        action: function () {
          pickUpItem("brass key");
        },
        nextScene: "prologue"
      }
    ]
  },

  porch: {
    title: "Location: Porch",
    text: "You peer through the dusty window, but it's too dark to see much inside.",
    choices: [
      {
        text: "Go back",
        nextScene: "prologue"
      }
    ]
  },

  backyard: {
    title: "Backyard",
    text: "You head around to the backyard.",
    choices: [
      {
        text: "Return to entrance",
        nextScene: "entrance"
      }
    ]
  },

  hallway: {
    title: "The Hallway",
    text: "The hallway is dark and silent.",
    choices: [
      {
        text: "backyard",
        nextScene: "lockedDoor"
      }
    ]
  },

  lockedDoor: {
    title: "The Locked Door",
    text: "The door handle doesn't move.",
    choices: [
      {
        text: "Try to open it",
        action: unlockDoor
      },
      {
        text: "Go back",
        nextScene: "backyard"
      }
    ]
  },

  solution: {
    title: "The solution",
    text: "You solved the mystery!"
  }
};

// --------------------------------------------------
// UPDATE SCENES
// Read through the comments below to see what this section does
//
// TO CUSTOMIZE THIS SECTION
// 1) add a new const variable for each new field you added above
// Make sure to match the ids used in your mock up with the fields 
// 2) set the .textContent of each variable to the corresponding field in the scene object
// Use sceneTitle as a model
// --------------------------------------------------

// First, we create variables to hold the references to the HTML elements
// Technically you could just use document.getElementById('id-name') 
// in the function itself, but that would be very wordy 
// and make the code harder to read
const sceneTitle = document.getElementById("scene-title");
const sceneText = document.getElementById("scene-text");
const choicesContainer = document.getElementById("choices-container");
const characterName = document.getElementById("character-name");
const sceneImg = document.getElementById("scene-img");

// Then, we create a function to update the scene,
function updateScene(sceneName) {

  //This update the variable currentScene with the new scene passed as a parameter
  currentScene = sceneName;

  //This accesses the scene object based on the scene name
  const scene = scenes[sceneName];

  // Here, for each html element, you change the textContent to match
  // the appropriate text from the scene object
  sceneTitle.textContent = scene.title;
  sceneText.textContent = scene.text;
  
  if (characterName) {
    characterName.textContent = scene.character || "";
  }

  if (sceneImg) {
    if (scene.img) {
      sceneImg.src = scene.img;
      sceneImg.style.display = "block";
    } else {
      sceneImg.style.display = "none";
    }
  }

  // Clear the old buttons before creating new ones
  choicesContainer.innerHTML = "";

  // Loop through each choice in the scene, connecting an action and nextScene if included
  scene.choices.forEach(function (choice) {
    const button = document.createElement("button");

    button.textContent = choice.text;

    button.addEventListener("click", function () {
      if (choice.action) {
        choice.action();
      }

      if (choice.nextScene) {
        updateScene(choice.nextScene);
      }
    });

    choicesContainer.appendChild(button);
  });
}

// This updates the screen with the current scene
updateScene(currentScene);


// --------------------------------------------------
// HEALTH
// Read through the comments below to see what this section does
//
// TO CUSTOMIZE THIS SECTION
// Either customize the name from health to steps, stress, etc...
// OR
// create a copy of each step for each additional state you want to track throughout the game
// --------------------------------------------------

// Create a variable for health
let health = 100;

// Display current health
const healthDisplay = document.getElementById("health-display");

// Create a function to update health 
function updateHealth(amount) {
  health += amount;
  if (healthDisplay) {
    healthDisplay.textContent = health;
  }
}

// This refreshes the health display
updateHealth(0);

// --------------------------------------------------
// INVENTORY
// Read through the comments below to see what this section does
//
// For now, you are probably leaving this section as is. 
// --------------------------------------------------

// Create a variable for inventory
let inventory = [];

// Display current inventory
const inventoryDisplay = document.querySelector("#inventory-display");
const messageDisplay = document.getElementById("message-display");

// Create a function to update inventory 
function pickUpItem(itemName) {
    // Add itemName to the inventory array
    // Show the updated inventory on the page
  if (!inventory.includes(itemName)) {
    inventory.push(itemName);
  }
  if (inventoryDisplay) {
    inventoryDisplay.textContent = inventory.join(", ");
  }
  if (messageDisplay) {
    messageDisplay.textContent = `Item gained: ${itemName}`;
  }
}

// --------------------------------------------------
// CONDITIONAL 
// Depending on how you want to implement the conditional logic, you may 
// simply adjust the names below or you may need to expand upon this section
// --------------------------------------------------

// Create a function that checks if the inventory contains one item and if so shows the win condition scene.
function unlockDoor() {
  if (inventory.includes("brass key")) {
    updateScene("solution");
  } else {
    messageDisplay.textContent = "The door is locked.";
  }
}