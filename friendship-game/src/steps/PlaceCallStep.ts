import { GameState, GameStep, FriendshipSteps } from "../types";
import { BaseStep } from "./BaseStep";

export class PlaceCallStep extends BaseStep {
  getStepKey(): string {
    return FriendshipSteps.PLACE_CALL;
  }

  getStep(): GameStep {
    return {
      description: "You need to contact your potential friend.",
      options: [
        {
          text: "Place a phone call",
          nextStep: FriendshipSteps.HOME,
          action: (state: GameState) => ({
            ...state,
            message: "Calling...",
            gameStep: FriendshipSteps.HOME,
          }),
        },
      ],
    };
  }
}
