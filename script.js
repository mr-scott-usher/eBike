const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  siteNav.classList.toggle("is-open", !isOpen);
});

siteNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    siteNav.classList.remove("is-open");
  }
});

const adventureTitle = document.querySelector("#adventure-title");
const adventureStory = document.querySelector("#adventure-story");
const adventureChoices = document.querySelector("#adventure-choices");
const adventureProgress = document.querySelector("#adventure-progress");
const adventureFeedback = document.querySelector("#adventure-feedback");
const adventureRestart = document.querySelector("#adventure-restart");

const adventure = {
  start: {
    step: 1,
    title: "The big ask",
    story:
      "“Everyone at school has an e-bike,” your 15-year-old says. You agree to help, but first you need a bike that fits their age and a plan that puts safety before speed.",
    choices: [
      {
        label: "Look for a Class 1 pedal-assist bike that fits their needs.",
        next: "helmet",
        feedback: "Good start: Class 1 assist cuts out at 20 mph and is a sensible place to start comparing age-appropriate options.",
      },
      {
        label: "Buy a Class 3 bike so they won’t outgrow it.",
        next: "class3-loss",
      },
      {
        label: "Choose the fastest bike online, even though its class and specs are unclear.",
        next: "unknown-loss",
      },
    ],
  },
  "class3-loss": {
    end: true,
    title: "The ride is over—for now",
    story:
      "You buy a Class 3 bike, but your child is only 15. In California, a rider must be at least 16 to operate a Class 3 e-bike. A helmet is also required for every Class 3 rider.",
  },
  "unknown-loss": {
    end: true,
    title: "The ride is over—for now",
    story:
      "You cannot confirm the bike’s class, speed limits, or safety features. Without clear specifications, you can’t tell whether it meets California’s e-bike definition or whether it’s an appropriate choice. Don’t buy until you can verify the details.",
  },
  helmet: {
    step: 2,
    title: "Gear up before the first ride",
    story:
      "You’ve found a suitable Class 1 option. Your child wants to head out as soon as it arrives. What do you do about a helmet?",
    choices: [
      {
        label: "Fit a properly sized helmet, fasten it, and make wearing it non-negotiable.",
        next: "practice",
        feedback: "Right call: California requires helmets for riders under 18.",
      },
      {
        label: "Skip the helmet for a short ride around the block.",
        next: "helmet-loss",
      },
    ],
  },
  "helmet-loss": {
    end: true,
    title: "The ride is over—for now",
    story:
      "Your child is under 18, so California law requires a helmet while riding an e-bike. A short trip is no exception, and a helmet helps protect against serious head injury.",
  },
  practice: {
    step: 3,
    title: "Build confidence first",
    story:
      "The helmet fits. Before your child rides in traffic, you notice the bike is new to them and its brakes haven’t been checked. What’s your next move?",
    choices: [
      {
        label: "Check the brakes, tires, lights, and fit; then practice together in a quiet, permitted area.",
        next: "route",
        feedback: "A quick bike check and supervised practice help your child learn to control the bike before riding around traffic.",
      },
      {
        label: "Let them go alone on busy streets and figure it out as they ride.",
        next: "practice-loss",
      },
    ],
  },
  "practice-loss": {
    end: true,
    title: "The ride is over—for now",
    story:
      "Your child is new to the bike, and you haven’t checked the brakes or practiced basic control. Sending them straight into busy traffic leaves avoidable risks unchecked. Pause, inspect the bike, and practice together first.",
  },
  route: {
    step: 4,
    title: "Pick a route that works for everyone",
    story:
      "Your child is ready for a first neighborhood ride. You’re in Corona, where local rules and posted signs matter on sidewalks and trails. Which plan do you choose?",
    choices: [
      {
        label: "Choose a posted, permitted route; obey signs, yield to people walking, and stay at or below 10 mph on sidewalks or trails.",
        next: "win",
        feedback: "You checked the route and planned to ride considerately within Corona’s local sidewalk and trail rules.",
      },
      {
        label: "Take the quickest trail, ignore a restriction sign, and ride fast past pedestrians.",
        next: "route-loss",
      },
    ],
  },
  "route-loss": {
    end: true,
    title: "The ride is over—for now",
    story:
      "Ignoring posted restrictions can put you where bikes aren’t allowed, and speeding past pedestrians risks hurting someone. In Corona, ride no faster than 10 mph on sidewalks or trails, yield to people walking, and follow posted restrictions.",
  },
  win: {
    end: true,
    won: true,
    title: "You’re ready to roll",
    story:
      "You helped your 15-year-old choose an age-appropriate Class 1 bike, wear a helmet, practice on a checked bike, and plan a considerate route. You made the safer, more informed choice together.",
  },
};

function showAdventureNode(nodeId, feedback = "") {
  const node = adventure[nodeId];
  adventureTitle.textContent = node.title;
  adventureStory.textContent = node.story;
  adventureProgress.textContent = node.step ? `Decision ${node.step} of 4` : "Adventure complete";
  adventureFeedback.textContent = feedback;
  adventureFeedback.hidden = !feedback;
  adventureChoices.replaceChildren();
  adventureRestart.hidden = !node.end;
  document.querySelector("#adventure-game").classList.toggle("is-ending", Boolean(node.end));
  document.querySelector("#adventure-game").classList.toggle("is-winning", Boolean(node.won));

  node.choices?.forEach((choice) => {
    const button = document.createElement("button");
    button.className = "adventure-choice";
    button.type = "button";
    button.textContent = choice.label;
    button.addEventListener("click", () => {
      showAdventureNode(choice.next, choice.feedback || "");
      adventureTitle.focus();
    });
    adventureChoices.append(button);
  });
}

adventureRestart.addEventListener("click", () => {
  showAdventureNode("start");
  adventureTitle.focus();
});

showAdventureNode("start");
