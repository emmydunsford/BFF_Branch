import { GameState, GameStep, FriendshipSteps } from "../types";
import { BaseStep } from "./BaseStep";

export class WaitCallbackStep extends BaseStep {
  getStepKey(): string {
    return FriendshipSteps.WAIT_CALLBACK;
  }

  getStep(): GameStep {
    return {
      description: "Waiting for a callback...",
      options: [
        {
          text: "Wait patiently",
          nextStep: FriendshipSteps.SHARE_MEAL,
          action: (state: GameState) => {
            const callsBack = Math.random() < 0.7; // 70% chance they call back
            const nextStep = callsBack
              ? FriendshipSteps.SHARE_MEAL
              : FriendshipSteps.BECOME_ENEMY;
            return {
              ...state,
              message: callsBack
                ? "They called back! Now you can try to befriend them."
                : "They never called back...",
              gameStep: nextStep,
            };
          },
        },
        {
          text: "Call again angrily after 5 mississippis",
          nextStep: FriendshipSteps.BECOME_ENEMY,
          action: (state: GameState) => ({
            ...state,
            message: "They realized you're a psycho and blocked you.",
            gameStep: FriendshipSteps.BECOME_ENEMY,
          }),
        },
      ],
    };
  }
}
