import { GameState, GameStep, FriendshipSteps } from "../types";
import { BaseStep } from "./BaseStep";

export class HotBeverageStep extends BaseStep {
  getStepKey(): string {
    return FriendshipSteps.HOT_BEVERAGE;
  }

  getStep(): GameStep {
    return {
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
    };
  }
}
