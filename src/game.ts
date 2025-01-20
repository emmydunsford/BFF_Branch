import { GameState, GameStep, FriendshipSteps } from "./types";
import { characters, player } from "./gameData";
import { StepManager } from "./steps/StepManager";

export class FriendshipGame {
  private state: GameState;
  private stepManager: StepManager;

  constructor() {
    // Create a deep copy of the characters array to maintain state
    const gameCharacters = characters.map((char) => ({ ...char }));
    this.stepManager = new StepManager(gameCharacters);

    this.state = {
      player: { ...player },
      currentTarget: { ...gameCharacters[0] },
      gameStep: FriendshipSteps.INITIAL,
      inventory: [],
      message: "Welcome to the Friendship Algorithm!",
    };
  }

  public getCurrentStep(): GameStep {
    return this.stepManager.getStep(this.state.gameStep);
  }

  public getState(): GameState {
    return { ...this.state };
  }

  public makeChoice(optionIndex: number): void {
    const currentStep = this.getCurrentStep();
    const selectedOption = currentStep.options[optionIndex];

    if (selectedOption) {
      const newState = selectedOption.action(this.state);
      this.state = {
        ...newState,
        gameStep: newState.gameStep || selectedOption.nextStep,
      };
    }
  }
}
