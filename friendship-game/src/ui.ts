import { FriendshipGame } from "./game";
import { GameState, GameStep } from "./types";

export class GameUI {
  private game: FriendshipGame;
  private container: HTMLElement;
  private characterInfo: HTMLElement;
  private currentStep: HTMLElement;
  private options: HTMLElement;
  private statusBar: HTMLElement;

  constructor() {
    this.game = new FriendshipGame();
    this.container = document.getElementById("game") as HTMLElement;
    this.characterInfo = document.getElementById(
      "character-info"
    ) as HTMLElement;
    this.currentStep = document.getElementById("current-step") as HTMLElement;
    this.options = document.getElementById("options") as HTMLElement;
    this.statusBar = document.getElementById("status-bar") as HTMLElement;
    this.render();
  }

  private render(): void {
    const state = this.game.getState();
    const currentStep = this.game.getCurrentStep();

    this.renderCharacterInfo(state);
    this.renderCurrentStep(currentStep);
    this.renderOptions(currentStep);
    this.renderStatusBar(state);
  }

  private renderCharacterInfo(state: GameState): void {
    this.characterInfo.innerHTML = `
            <h2>Player: ${state.player.name}</h2>
            <p>Current Target: ${state.currentTarget.name}</p>
            <p>Friendship Level: ${state.currentTarget.friendshipLevel}</p>
        `;
  }

  private renderCurrentStep(step: GameStep): void {
    this.currentStep.innerHTML = `
            <h3>${step.description}</h3>
        `;
  }

  private renderOptions(step: GameStep): void {
    this.options.innerHTML = "";
    step.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.textContent = option.text;
      button.classList.add("option-button");
      button.addEventListener("click", () => this.handleChoice(index));
      this.options.appendChild(button);
    });
  }

  private renderStatusBar(state: GameState): void {
    this.statusBar.innerHTML = `
            <p>${state.message}</p>
        `;
  }

  private handleChoice(optionIndex: number): void {
    this.game.makeChoice(optionIndex);
    this.render();
  }
}
