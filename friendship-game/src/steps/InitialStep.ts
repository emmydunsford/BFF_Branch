import { GameState, GameStep, FriendshipSteps, Character } from "../types";
import { BaseStep } from "./BaseStep";

export class InitialStep extends BaseStep {
  getStepKey(): string {
    return FriendshipSteps.INITIAL;
  }

  getStep(): GameStep {
    return {
      description: "Choose a friend to befriend:",
      options: this.characters.map((char) => ({
        text: this.getCharacterText(char),
        nextStep: FriendshipSteps.PLACE_CALL,
        action: (state: GameState) => {
          // Get the character with their current friendship level from the characters array
          const charIndex = this.characters.findIndex(
            (c) => c.name === char.name
          );
          const currentChar =
            charIndex !== -1 ? { ...this.characters[charIndex] } : { ...char };

          return {
            ...state,
            currentTarget: currentChar,
            message: `You decided to try to befriend ${currentChar.name}!`,
            gameStep: FriendshipSteps.PLACE_CALL,
          };
        },
      })),
    };
  }

  private getCharacterText(char: Character): string {
    let status = "";
    if (char.friendshipLevel === 69) {
      status = " 🔥 (Toxic Situationship)";
    } else if (char.friendshipLevel > 0) {
      status = " " + "❤️".repeat(char.friendshipLevel);
    } else if (char.friendshipLevel < 0) {
      status = " 💔 (Enemy)";
    }
    return `${char.name} (${char.description})${status} [Level: ${char.friendshipLevel}]`;
  }
}
