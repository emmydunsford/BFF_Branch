import { GameState, GameStep, FriendshipSteps } from "../types";
import { BaseStep } from "./BaseStep";
import { beverageOptions } from "../gameData";

export class ChooseBeverageStep extends BaseStep {
  getStepKey(): string {
    return FriendshipSteps.CHOOSE_BEVERAGE;
  }

  getStep(): GameStep {
    return {
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
    };
  }
}
