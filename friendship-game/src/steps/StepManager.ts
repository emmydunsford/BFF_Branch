import { GameState, GameStep, FriendshipSteps, Character } from "../types";
import { InitialStep } from "./InitialStep";
import { PlaceCallStep } from "./PlaceCallStep";
import { HomeStep } from "./HomeStep";
import { LeaveMessageStep } from "./LeaveMessageStep";
import { WaitCallbackStep } from "./WaitCallbackStep";
import { ShareMealStep } from "./ShareMealStep";
import { CounterOfferStep } from "./CounterOfferStep";
import { HotBeverageStep } from "./HotBeverageStep";
import { ChooseBeverageStep } from "./ChooseBeverageStep";
import { RecreationalActivityStep } from "./RecreationalActivityStep";
import { BeginFriendshipStep } from "./BeginFriendshipStep";
import { BecomeEnemyStep } from "./BecomeEnemyStep";
import { GameOverStep } from "./GameOverStep";

export class StepManager {
  private stepClasses: Map<string, any>;
  private characters: Character[];

  constructor(characters: Character[]) {
    this.characters = characters;
    this.stepClasses = new Map();
    this.initializeStepClasses();
  }

  private initializeStepClasses(): void {
    const steps = [
      InitialStep,
      PlaceCallStep,
      HomeStep,
      LeaveMessageStep,
      WaitCallbackStep,
      ShareMealStep,
      CounterOfferStep,
      HotBeverageStep,
      ChooseBeverageStep,
      RecreationalActivityStep,
      BeginFriendshipStep,
      BecomeEnemyStep,
      GameOverStep,
    ];

    steps.forEach((StepClass) => {
      const step = new StepClass(this.characters);
      this.stepClasses.set(step.getStepKey(), StepClass);
    });
  }

  public getStep(stepKey: string): GameStep {
    const StepClass = this.stepClasses.get(stepKey);
    if (StepClass) {
      const step = new StepClass(this.characters);
      return step.getStep();
    }
    return {
      description: "Error: Step not found",
      options: [],
    };
  }

  public updateStep(stepKey: string, step: GameStep): void {
    // Implementation needed
  }
}
