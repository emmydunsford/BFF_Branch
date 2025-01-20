import { GameState, GameStep, Character } from "../types";

export abstract class BaseStep {
  protected characters: Character[];

  constructor(characters: Character[]) {
    this.characters = characters;
  }

  abstract getStepKey(): string;
  abstract getStep(): GameStep;

  protected updateCharacterFriendshipLevel(
    state: GameState,
    newLevel: number
  ): GameState {
    const charIndex = this.characters.findIndex(
      (char) => char.name === state.currentTarget.name
    );
    if (charIndex !== -1) {
      this.characters[charIndex] = {
        ...this.characters[charIndex],
        friendshipLevel: newLevel,
      };
    }
    return {
      ...state,
      currentTarget: {
        ...state.currentTarget,
        friendshipLevel: newLevel,
      },
    };
  }

  protected hasSharedInterest(state: GameState): boolean {
    // Check if they share any vibes
    const hasSharedVibes = state.player.vibes.some((vibe: string) =>
      state.currentTarget.vibes.includes(vibe)
    );

    // Check if they share any activities
    const hasSharedActivities = state.player.activities.some(
      (activity: string) => state.currentTarget.activities.includes(activity)
    );

    // Check if they share any beverages
    const hasSharedBeverages = state.player.beverages.some((beverage: string) =>
      state.currentTarget.beverages.includes(beverage)
    );

    // Return true if they share any type of interest
    return hasSharedVibes || hasSharedActivities || hasSharedBeverages;
  }
}
