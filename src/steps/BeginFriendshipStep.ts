import { GameState, GameStep, FriendshipSteps } from "../types";
import { BaseStep } from "./BaseStep";

export class BeginFriendshipStep extends BaseStep {
  getStepKey(): string {
    return FriendshipSteps.BEGIN_FRIENDSHIP;
  }

  getStep(): GameStep {
    return {
      description: "Congratulations!",
      options: [
        {
          text: "Begin friendship!",
          nextStep: FriendshipSteps.GAME_OVER,
          action: (state: GameState) => {
            return this.updateCharacterFriendshipLevel(
              {
                ...state,
                message: `You have successfully befriended ${state.currentTarget.name}!`,
                gameStep: FriendshipSteps.GAME_OVER,
              },
              state.currentTarget.friendshipLevel + 1
            );
          },
        },
      ],
    };
  }
}
