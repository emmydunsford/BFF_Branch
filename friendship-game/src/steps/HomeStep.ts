import { GameState, GameStep, FriendshipSteps } from "../types";
import { BaseStep } from "./BaseStep";

export class HomeStep extends BaseStep {
  getStepKey(): string {
    return FriendshipSteps.HOME;
  }

  getStep(): GameStep {
    return {
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
              };
            }
          },
        },
      ],
    };
  }
}
