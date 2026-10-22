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
    text: "You receive a strange note telling you to go to an old house at the edge of town. The note says that something important is hidden inside, but it does not explain what it is. When you arrive, the house looks abandoned. The windows are dark and the front door is locked. You notice a small light coming from one of the upstairs windows.",
    choices: [
      {
        text: "Examine the front door",
        nextScene: "frontDoor"
      },
      {
        text: "Search the yard",
        nextScene: "yard"
      },
      {
        text: "Look through the window",
        nextScene: "porch"
      }
    ]
  },

  yard: {
    title: "Location: Front Yard",
    text: "You search the yard and find an old wooden box underneath a pile of leaves. The box is locked, but there is a small piece of paper next to it. The paper says: \"The key is closer than you think.\" You look around and notice something shiny underneath a nearby rock.",
    choices: [
      {
        text: "Move the rock",
        action: function () {
          pickUpItem("Rusty Key");
        },
        nextScene: "yardWithKey"
      },
      {
        text: "Search around the house",
        nextScene: "porch"
      },
      {
        text: "Go back to the front door",
        nextScene: "frontDoor"
      }
    ]
  },

  yardWithKey: {
    title: "Location: Front Yard",
    text: "You find a small rusty key. You put it in your inventory.",
    choices: [
      {
        text: "Go to the front door",
        nextScene: "frontDoor"
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

  frontDoor: {
    title: "Location: Front Door",
    text: "You stand in front of the old wooden door. The handle is covered in dust.",
    choices: [
      {
        text: "Try to open the door",
        action: unlockFrontDoor
      },
      {
        text: "Examine the lock",
        action: function() {
          if (messageDisplay) {
            messageDisplay.textContent = "The lock is old and rusted.";
          }
        }
      },
      {
        text: "Go back to the yard",
        nextScene: "yard"
      }
    ]
  },

  livingRoom: {
    title: "Location: Living Room",
    text: "You enter the house and find yourself in a dark living room. There is an old couch, a bookshelf, and a painting hanging on the wall. You notice that the painting looks like it has been moved recently.",
    choices: [
      {
        text: "Examine the painting",
        nextScene: "paintingScene"
      },
      {
        text: "Search the bookshelf",
        action: function() {
          if (messageDisplay) {
            messageDisplay.textContent = "The bookshelf is filled with old books.";
          }
        }
      },
      {
        text: "Go to the kitchen",
        nextScene: "kitchen"
      }
    ]
  },

  paintingScene: {
    title: "Location: Living Room",
    text: "You move the painting and find a small note hidden behind it. The note says: \"The truth is hidden below.\" You realize there may be something hidden in the basement.",
    choices: [
      {
        text: "Go to the kitchen",
        nextScene: "kitchen"
      },
      {
        text: "Search for the basement",
        nextScene: "basement"
      }
    ]
  },

  kitchen: {
    title: "Location: Kitchen",
    text: "You walk into the kitchen. Most of the cabinets are empty, but one cabinet is locked. You notice a strange symbol carved into the cabinet door.",
    choices: [
      {
        text: "Search the cabinets",
        action: function () {
          pickUpItem("Flashlight");
        },
        nextScene: "kitchenWithFlashlight"
      },
      {
        text: "Go back to living room",
        nextScene: "livingRoom"
      }
    ]
  },

  kitchenWithFlashlight: {
    title: "Location: Kitchen",
    text: "You search the cabinets and find an old flashlight. The flashlight still works, but its battery is almost dead.",
    choices: [
      {
        text: "Search for the basement",
        nextScene: "basement"
      }
    ]
  },

  basement: {
    title: "Location: Basement",
    text: "You find the basement door underneath the stairs. It is completely dark. You turn on your flashlight and slowly walk downstairs. At the bottom, you find several old boxes and a desk. On the desk is a photograph of the house. There is a red circle around one of the rooms in the photograph.",
    choices: [
      {
        text: "Search the desk",
        action: function () {
          pickUpItem("Basement Key");
        },
        nextScene: "basementWithKey"
      }
    ]
  },

  basementWithKey: {
    title: "Location: Basement",
    text: "You search the desk and find another key. You notice a locked door at the other end of the basement.",
    choices: [
      {
        text: "Go to the locked room",
        nextScene: "lockedRoom"
      }
    ]
  },

  lockedRoom: {
    title: "Location: Locked Room",
    text: "You walk toward the locked room. There is a small keyhole underneath a strange symbol.",
    choices: [
      {
        text: "Unlock the door",
        action: unlockBasementDoor
      },
      {
        text: "Leave the house",
        nextScene: "ending2"
      }
    ]
  },

  ending1: {
    title: "Ending: Solve the Mystery",
    text: "You read through the notes and discover that the person who lived in the house disappeared years ago. The final note explains that they hid evidence of what happened inside the house because they were afraid someone would find it. You have solved the mystery."
  },

  ending2: {
    title: "Ending: Leave the House",
    text: "You become uncomfortable with what you have discovered. You decide that you have seen enough and leave the house. The mystery remains unsolved."
  },

  ending3: {
    title: "Ending: Trapped",
    text: "You enter the locked room without paying attention to the door behind you. Suddenly, the door closes and locks. You search for another exit but cannot find one. You are trapped inside the mysterious room."
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
  if (scene.choices) {
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
function unlockFrontDoor() {
  if (inventory.includes("Rusty Key")) {
    messageDisplay.textContent = "The key fits perfectly into the lock. You turn it and the door slowly opens.";
    updateScene("livingRoom");
  } else {
    messageDisplay.textContent = "The door is locked. You need to find a key before you can enter.";
  }
}

function unlockBasementDoor() {
  if (inventory.includes("Basement Key")) {
    messageDisplay.textContent = "You put the key into the lock. The door opens.";
    updateScene("ending1");
  } else {
    messageDisplay.textContent = "The door will not open. You need to find the key before you can discover what is inside.";
  }
}