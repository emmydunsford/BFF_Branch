import { Character } from "./types";

export const characters: Character[] = [
  {
    name: "Emily",
    friendshipLevel: 0,
    currentStep: "initial",
    interests: ["reading", "slay", "photography", "tea"],
  },
  {
    name: "Raymond",
    friendshipLevel: 0,
    currentStep: "initial",
    interests: ["gaming", "coding", "tequila", "rizz"],
  },
  {
    name: "Hayden",
    friendshipLevel: 0,
    currentStep: "initial",
    interests: ["sports", "music", "cooking", "coffee"],
  },
];

export const player: Character = {
  name: "Emmy",
  friendshipLevel: 0,
  currentStep: "initial",
  interests: ["science", "books", "tea", "coding", "tequila", "rizz"],
};

export const beverageOptions = ["tea", "coffee", "cocoa", "tequila"];

export const activityOptions = [
  "reading together",
  "playing video games",
  "going for a walk",
  "watching a movie",
  "cooking together",
  "listening to music",
];
