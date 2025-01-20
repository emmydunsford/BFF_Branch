import { Character } from "./types";

export const vibeOptions = [
  "slaying",
  "rizzing",
  "doomscrolling",
  "booktok",
  "gatekeeping",
  "main character energy",
  "touch grass",
  "chronically online",
  "aesthetic",
  "fit check",
  "no thoughts head empty",
  "living laugh loving",
  "girlbossing",
  "throwing shade",
  "being unserious",
  "material gworl",
  "terminally online",
  "gaslight gatekeep girlboss",
  "bestie vibes",
  "geeking",
  "tweaking",
];

export const beverageOptions = ["tea", "coffee", "cocoa", "tequila"];

export const activityOptions = [
  "reading",
  "gaming",
  "walking",
  "movies",
  "cooking",
  "music",
];

export const characters: Character[] = [
  {
    name: "Emily",
    description: "The aesthetic booktok queen",
    friendshipLevel: 0,
    currentStep: "initial",
    vibes: ["booktok", "slaying", "aesthetic", "main character energy"],
    activities: ["reading", "movies"],
    beverages: ["tea", "cocoa"],
  },
  {
    name: "Raymond",
    description: "The online menace",
    friendshipLevel: 0,
    currentStep: "initial",
    vibes: ["doomscrolling", "chronically online", "rizzing", "throwing shade"],
    activities: ["gaming", "movies"],
    beverages: ["tequila", "coffee"],
  },
  {
    name: "Hayden",
    description: "The wholesome one",
    friendshipLevel: 0,
    currentStep: "initial",
    vibes: ["touch grass", "fit check", "living laugh loving", "bestie vibes"],
    activities: ["walking", "cooking"],
    beverages: ["coffee", "tea"],
  },
  {
    name: "Saarang",
    description: "The chaotic one",
    friendshipLevel: 0,
    currentStep: "initial",
    vibes: [
      "terminally online",
      "no thoughts head empty",
      "girlbossing",
      "being unserious",
    ],
    activities: ["music", "gaming"],
    beverages: ["cocoa", "tequila"],
  },
];

export const player: Character = {
  name: "Emmy",
  description: "The ultimate girlboss",
  friendshipLevel: 0,
  currentStep: "initial",
  vibes: [
    "gaslight gatekeep girlboss",
    "material gworl",
    "slaying",
    "rizzing",
    "doomscrolling",
    "booktok",
  ],
  activities: ["reading", "gaming"],
  beverages: ["tea", "tequila"],
};
