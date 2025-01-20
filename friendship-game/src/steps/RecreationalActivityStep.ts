import { GameState, GameStep, FriendshipSteps } from "../types";
import { BaseStep } from "./BaseStep";
import { activityOptions } from "../gameData";

export class RecreationalActivityStep extends BaseStep {
  getStepKey(): string {
    return FriendshipSteps.RECREATIONAL_ACTIVITY;
  }

  getStep(): GameStep {
    return {
      description: "Choose a recreational activity:",
      options: [
        ...activityOptions.map((activity) => ({
          text: `Suggest ${activity}`,
          nextStep: FriendshipSteps.BEGIN_FRIENDSHIP,
          action: (state: GameState) => {
            const hasSharedInterest = this.hasSharedInterest(state);
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
              return this.updateCharacterFriendshipLevel(
                {
                  ...state,
                  message: `${state.currentTarget.name} is intrigued by your suggestion... You've entered a toxic situationship!`,
                  gameStep: FriendshipSteps.GAME_OVER,
                },
                69
              );
            }
            return {
              ...state,
              message: "Your suggestion was highly inappropriate!",
              gameStep: FriendshipSteps.BECOME_ENEMY,
            };
          },
        },
      ],
    };
  }
}
