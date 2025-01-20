import { GameState, GameStep, FriendshipSteps } from "../types";
import { BaseStep } from "./BaseStep";

export class BecomeEnemyStep extends BaseStep {
  getStepKey(): string {
    return FriendshipSteps.BECOME_ENEMY;
  }

  getStep(): GameStep {
    return {
      description: "Oh no!",
      options: [
        {
          text: "Accept your failure",
          nextStep: FriendshipSteps.GAME_OVER,
          action: (state: GameState) => {
            return this.updateCharacterFriendshipLevel(
              {
                ...state,
                message: `${state.currentTarget.name} has become your enemy!`,
                gameStep: FriendshipSteps.GAME_OVER,
              },
              Math.max(-1, state.currentTarget.friendshipLevel - 1)
            );
          },
        },
      ],
    };
  }
}
