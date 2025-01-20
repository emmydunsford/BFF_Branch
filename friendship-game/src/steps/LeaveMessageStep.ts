import { GameState, GameStep, FriendshipSteps } from "../types";
import { BaseStep } from "./BaseStep";

export class LeaveMessageStep extends BaseStep {
  getStepKey(): string {
    return FriendshipSteps.LEAVE_MESSAGE;
  }

  getStep(): GameStep {
    return {
      description: "They did not answer. What would you like to do?",
      options: [
        {
          text: "Leave a polite message",
          nextStep: FriendshipSteps.WAIT_CALLBACK,
          action: (state: GameState) => ({
            ...state,
            message:
              "You left a polite message. Now you must wait for them to call back.",
            gameStep: FriendshipSteps.WAIT_CALLBACK,
          }),
        },
        {
          text: "Immediately spam endless emotional voice notes until they reply",
          nextStep: FriendshipSteps.BECOME_ENEMY,
          action: (state: GameState) => ({
            ...state,
            message: "Your messages have scared them away!",
            gameStep: FriendshipSteps.BECOME_ENEMY,
          }),
        },
      ],
    };
  }
}
