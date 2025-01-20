import { GameState, GameStep, FriendshipSteps } from "../types";
import { BaseStep } from "./BaseStep";

export class ShareMealStep extends BaseStep {
  getStepKey(): string {
    return FriendshipSteps.SHARE_MEAL;
  }

  getStep(): GameStep {
    return {
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
    };
  }
}
