export type Character = {
  name: string;
  description: string;
  friendshipLevel: number;
  currentStep: string;
  vibes: string[];
  activities: string[];
  beverages: string[];
};

export type GameState = {
  player: Character;
  currentTarget: Character;
  gameStep: string;
  inventory: string[];
  message: string;
};

export type StepOption = {
  text: string;
  nextStep: string;
  action: (state: GameState) => GameState;
};

export type GameStep = {
  description: string;
  options: StepOption[];
};

export enum FriendshipSteps {
  INITIAL = "initial",
  PLACE_CALL = "place_call",
  HOME = "home",
  LEAVE_MESSAGE = "leave_message",
  WAIT_CALLBACK = "wait_callback",
  SHARE_MEAL = "share_meal",
  COUNTER_OFFER = "counter_offer",
  HOT_BEVERAGE = "hot_beverage",
  CHOOSE_BEVERAGE = "choose_beverage",
  RECREATIONAL_ACTIVITY = "recreational_activity",
  BEGIN_FRIENDSHIP = "begin_friendship",
  GAME_OVER = "game_over",
  BECOME_ENEMY = "become_enemy",
}
