import { GameState, GameStep, FriendshipSteps } from "../types";
import { BaseStep } from "./BaseStep";

export class CounterOfferStep extends BaseStep {
  getStepKey(): string {
    return FriendshipSteps.COUNTER_OFFER;
  }

  getStep(): GameStep {
    return {
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
    };
  }
}
