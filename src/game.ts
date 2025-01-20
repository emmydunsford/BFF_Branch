import { GameState, GameStep, FriendshipSteps, Character } from "./types";
import {
  characters,
  player,
  beverageOptions,
  activityOptions,
} from "./gameData";

export class FriendshipGame {
  private state: GameState;
  private steps!: Map<string, GameStep>;
  private characters: Character[];

  constructor() {
    // Create a deep copy of the characters array to maintain state
    this.characters = characters.map((char) => ({ ...char }));
    this.state = {
      player: { ...player },
      currentTarget: { ...this.characters[0] },
      gameStep: FriendshipSteps.INITIAL,
      inventory: [],
      message: "Welcome to the Friendship Algorithm!",
    };
    this.initializeSteps();
  }

  private initializeSteps() {
    this.steps = new Map<string, GameStep>();

    this.steps.set(FriendshipSteps.INITIAL, {
      description: "Choose a friend to befriend:",
      options: this.characters.map((char) => ({
        text: `Try to befriend ${char.name} (Friendship Level: ${char.friendshipLevel})`,
        nextStep: FriendshipSteps.PLACE_CALL,
        action: (state: GameState) => ({
          ...state,
          currentTarget: { ...char },
          message: `You decided to try to befriend ${char.name}!`,
          gameStep: FriendshipSteps.PLACE_CALL,
        }),
      })),
    });

    this.steps.set(FriendshipSteps.PLACE_CALL, {
      description: "You need to contact your potential friend.",
      options: [
        {
          text: "Place a phone call",
          nextStep: FriendshipSteps.HOME,
          action: (state: GameState) => ({
            ...state,
            message: "Calling...",
            gameStep: FriendshipSteps.HOME,
          }),
        },
      ],
    });

    this.steps.set(FriendshipSteps.HOME, {
      description: "Calling...",
      options: [
        {
          text: "Wait for answer...",
          nextStep: FriendshipSteps.SHARE_MEAL,
          action: (state: GameState) => {
            const isHome = Math.random() < 0.5; // 50% chance of being home
            if (isHome) {
              return {
                ...state,
                message: `${state.currentTarget.name} answered the phone!`,
                gameStep: FriendshipSteps.SHARE_MEAL,
              };
            } else {
              return {
                ...state,
                message: "No one answered...",
                gameStep: FriendshipSteps.LEAVE_MESSAGE,
                nextStep: FriendshipSteps.LEAVE_MESSAGE,
              };
            }
          },
        },
      ],
    });

    this.steps.set(FriendshipSteps.LEAVE_MESSAGE, {
      description: "They did not answer. What would you like to do?",
      options: [
        {
          text: "Leave a polite message",
          nextStep: FriendshipSteps.WAIT_CALLBACK,
          action: (state: GameState) => ({
            ...state,
            message:
              "You left a polite message. Now you must wait for them to call back.",
            gameStep: FriendshipSteps.WAIT_CALLBACK,
          }),
        },
        {
          text: "Immediately spam endless emotional voice notes until they reply",
          nextStep: FriendshipSteps.BECOME_ENEMY,
          action: (state: GameState) => ({
            ...state,
            message: "Your messages have scared them away!",
            gameStep: FriendshipSteps.BECOME_ENEMY,
          }),
        },
      ],
    });

    this.steps.set(FriendshipSteps.WAIT_CALLBACK, {
      description: "Waiting for a callback...",
      options: [
        {
          text: "Wait patiently",
          nextStep: FriendshipSteps.SHARE_MEAL,
          action: (state: GameState) => {
            const callsBack = Math.random() < 0.7; // 70% chance they call back
            const nextStep = callsBack
              ? FriendshipSteps.SHARE_MEAL
              : FriendshipSteps.BECOME_ENEMY;
            return {
              ...state,
              message: callsBack
                ? "They called back! Now you can try to befriend them."
                : "They never called back...",
              gameStep: nextStep,
            };
          },
        },
        {
          text: "Call again angrily after 5 mississippis",
          nextStep: FriendshipSteps.BECOME_ENEMY,
          action: (state: GameState) => ({
            ...state,
            message: "They realized you're a psycho and blocked you.",
            gameStep: FriendshipSteps.BECOME_ENEMY,
          }),
        },
      ],
    });

    this.steps.set(FriendshipSteps.SHARE_MEAL, {
      description: "Would you like to share a meal?",
      options: [
        {
          text: "Yes, invite them to dine together",
          nextStep: FriendshipSteps.HOT_BEVERAGE,
          action: (state: GameState) => {
            const acceptsMeal = Math.random() < 0.7; // 70% chance of accepting
            return {
              ...state,
              message: acceptsMeal
                ? "They accepted your dinner invitation!"
                : "They said no...",
              gameStep: acceptsMeal
                ? FriendshipSteps.HOT_BEVERAGE
                : FriendshipSteps.COUNTER_OFFER,
            };
          },
        },
        {
          text: "No, that's too much commitment",
          nextStep: FriendshipSteps.BECOME_ENEMY,
          action: (state: GameState) => ({
            ...state,
            message: "Your reluctance has offended them!",
            gameStep: FriendshipSteps.BECOME_ENEMY,
          }),
        },
      ],
    });

    this.steps.set(FriendshipSteps.COUNTER_OFFER, {
      description: "They suggested a different activity.",
      options: [
        {
          text: "Be a doormat and tell them you're down as long as they'll spend time with you",
          nextStep: FriendshipSteps.HOT_BEVERAGE,
          action: (state: GameState) => ({
            ...state,
            message: "You agreed to their suggestion!",
            gameStep: FriendshipSteps.HOT_BEVERAGE,
          }),
        },
        {
          text: "Have a spine and tell them you will not be gaslighted into doing something you don't want to do",
          nextStep: FriendshipSteps.BECOME_ENEMY,
          action: (state: GameState) => ({
            ...state,
            message: "They took offense to your rejection!",
            gameStep: FriendshipSteps.BECOME_ENEMY,
          }),
        },
      ],
    });

    this.steps.set(FriendshipSteps.HOT_BEVERAGE, {
      description: "Do you enjoy a hot beverage?",
      options: [
        {
          text: "Yes, offer a beverage",
          nextStep: FriendshipSteps.CHOOSE_BEVERAGE,
          action: (state: GameState) => ({
            ...state,
            message: "Let's choose a beverage to offer.",
            gameStep: FriendshipSteps.CHOOSE_BEVERAGE,
          }),
        },
        {
          text: "No, I'm from Boston it's not even that cold outside",
          nextStep: FriendshipSteps.BECOME_ENEMY,
          action: (state: GameState) => ({
            ...state,
            message:
              "They gently reminded you that you're not actually from Boston.",
            gameStep: FriendshipSteps.BECOME_ENEMY,
          }),
        },
      ],
    });

    this.steps.set(FriendshipSteps.CHOOSE_BEVERAGE, {
      description: "What beverage would you like to offer?",
      options: beverageOptions.map((beverage) => ({
        text: `Offer ${beverage}`,
        nextStep: FriendshipSteps.RECREATIONAL_ACTIVITY,
        action: (state: GameState) => {
          const likesBeverage = Math.random() < 0.6; // 60% chance of liking the beverage
          return {
            ...state,
            message: likesBeverage
              ? `They enjoyed the ${beverage}!`
              : `They didn't like the ${beverage}. How did you mess up ${beverage}??`,
            gameStep: likesBeverage
              ? FriendshipSteps.RECREATIONAL_ACTIVITY
              : FriendshipSteps.BECOME_ENEMY,
          };
        },
      })),
    });

    this.steps.set(FriendshipSteps.RECREATIONAL_ACTIVITY, {
      description: "Choose a recreational activity:",
      options: [
        ...activityOptions.map((activity) => ({
          text: `Suggest ${activity}`,
          nextStep: FriendshipSteps.BEGIN_FRIENDSHIP,
          action: (state: GameState) => {
            const hasSharedInterest = this.hasSharedInterest();
            return {
              ...state,
              message: hasSharedInterest
                ? "You found a shared interest!"
                : "You don't seem to have much in common...",
              gameStep: hasSharedInterest
                ? FriendshipSteps.BEGIN_FRIENDSHIP
                : FriendshipSteps.BECOME_ENEMY,
            };
          },
        })),
        {
          text: "Suggest something inappropriate",
          nextStep: FriendshipSteps.BECOME_ENEMY,
          action: (state: GameState) => {
            const isToxic = Math.random() < 0.2; // 20% chance of toxic situationship
            if (isToxic) {
              // Update the character's friendship level in our maintained array
              const charIndex = this.characters.findIndex(
                (char) => char.name === state.currentTarget.name
              );
              if (charIndex !== -1) {
                this.characters[charIndex] = {
                  ...this.characters[charIndex],
                  friendshipLevel: 69,
                };
              }
              return {
                ...state,
                message: `${state.currentTarget.name} is intrigued by your suggestion... You've entered a toxic situationship!`,
                currentTarget: {
                  ...state.currentTarget,
                  friendshipLevel: 69,
                },
                gameStep: FriendshipSteps.GAME_OVER,
              };
            }
            return {
              ...state,
              message: "Your suggestion was highly inappropriate!",
              gameStep: FriendshipSteps.BECOME_ENEMY,
            };
          },
        },
      ],
    });

    this.steps.set(FriendshipSteps.BEGIN_FRIENDSHIP, {
      description: "Congratulations!",
      options: [
        {
          text: "Begin friendship!",
          nextStep: FriendshipSteps.GAME_OVER,
          action: (state: GameState) => {
            // Update the character's friendship level in our maintained array
            const charIndex = this.characters.findIndex(
              (char) => char.name === state.currentTarget.name
            );
            if (charIndex !== -1) {
              this.characters[charIndex] = {
                ...this.characters[charIndex],
                friendshipLevel: this.characters[charIndex].friendshipLevel + 1,
              };
            }
            return {
              ...state,
              message: `You have successfully befriended ${state.currentTarget.name}!`,
              currentTarget: {
                ...state.currentTarget,
                friendshipLevel: state.currentTarget.friendshipLevel + 1,
              },
              gameStep: FriendshipSteps.GAME_OVER,
            };
          },
        },
      ],
    });

    this.steps.set(FriendshipSteps.BECOME_ENEMY, {
      description: "Oh no!",
      options: [
        {
          text: "Accept your failure",
          nextStep: FriendshipSteps.GAME_OVER,
          action: (state: GameState) => {
            // Update the character's friendship level in our maintained array
            const charIndex = this.characters.findIndex(
              (char) => char.name === state.currentTarget.name
            );
            if (charIndex !== -1) {
              this.characters[charIndex] = {
                ...this.characters[charIndex],
                friendshipLevel: Math.max(
                  -1,
                  this.characters[charIndex].friendshipLevel - 1
                ),
              };
            }
            return {
              ...state,
              message: `${state.currentTarget.name} has become your enemy!`,
              currentTarget: {
                ...state.currentTarget,
                friendshipLevel: Math.max(
                  -1,
                  state.currentTarget.friendshipLevel - 1
                ),
              },
              gameStep: FriendshipSteps.GAME_OVER,
            };
          },
        },
      ],
    });

    this.steps.set(FriendshipSteps.GAME_OVER, {
      description: "Game Over",
      options: [
        {
          text: "Try again with someone else",
          nextStep: FriendshipSteps.INITIAL,
          action: (state: GameState) => {
            // Update the character's friendship level in our maintained array
            const charIndex = this.characters.findIndex(
              (char) => char.name === state.currentTarget.name
            );
            if (charIndex !== -1) {
              this.characters[charIndex] = {
                ...this.characters[charIndex],
                friendshipLevel: state.currentTarget.friendshipLevel,
              };
            }

            // Reinitialize the INITIAL step with updated characters
            this.steps.set(FriendshipSteps.INITIAL, {
              description: "Choose a friend to befriend:",
              options: this.characters.map((char) => ({
                text: `Try to befriend ${char.name} (Friendship Level: ${char.friendshipLevel})`,
                nextStep: FriendshipSteps.PLACE_CALL,
                action: (state: GameState) => ({
                  ...state,
                  currentTarget: { ...char },
                  message: `You decided to try to befriend ${char.name}!`,
                  gameStep: FriendshipSteps.PLACE_CALL,
                }),
              })),
            });

            return {
              ...state,
              message: "Let's try to make a new friend!",
              gameStep: FriendshipSteps.INITIAL,
              currentTarget: { ...this.characters[0] },
            };
          },
        },
      ],
    });
  }

  public getCurrentStep(): GameStep {
    return (
      this.steps.get(this.state.gameStep) || {
        description: "Error: Step not found",
        options: [],
      }
    );
  }

  public getState(): GameState {
    return { ...this.state };
  }

  public makeChoice(optionIndex: number): void {
    const currentStep = this.getCurrentStep();
    const selectedOption = currentStep.options[optionIndex];

    if (selectedOption) {
      const newState = selectedOption.action(this.state);
      this.state = {
        ...newState,
        gameStep: newState.gameStep || selectedOption.nextStep,
      };
    }
  }

  public hasSharedInterest(): boolean {
    return this.state.player.interests.some((interest) =>
      this.state.currentTarget.interests.includes(interest)
    );
  }
}
