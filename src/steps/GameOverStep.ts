import { GameState, GameStep, FriendshipSteps } from "../types";
import { BaseStep } from "./BaseStep";

export class GameOverStep extends BaseStep {
  getStepKey(): string {
    return FriendshipSteps.GAME_OVER;
  }

  getStep(): GameStep {
    return {
      description: "Game Over",
      options: [
        {
          text: "Try again with someone else",
          nextStep: FriendshipSteps.INITIAL,
          action: (state: GameState) => {
            // Keep the current target's friendship level in the characters array
            const charIndex = this.characters.findIndex(
              (char) => char.name === state.currentTarget.name
            );
            if (charIndex !== -1) {
              this.characters[charIndex] = {
                ...this.characters[charIndex],
                friendshipLevel: state.currentTarget.friendshipLevel,
              };
            }

            // Just return to initial state without modifying any friendship levels
            return {
              ...state,
              message: "Let's try to make a new friend!",
              gameStep: FriendshipSteps.INITIAL,
            };
          },
        },
      ],
    };
  }
}
