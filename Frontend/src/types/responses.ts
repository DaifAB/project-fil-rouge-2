import {
  Branch,
  Concept,
  Country,
  Equipment,
  Ingredient,
} from '@/types/interfaces';

export type GetAvailableBrandsResponse = Concept & {
  cookedBy: number;
  cookedIn: Country;
};
export type GetBrandProfileResponse = Concept & {
  ingredients: Ingredient[];
  equipements: Equipment[];
  avergaePrice: number;
  averageCalories: number;
  averageBasket: number;
  availableProducts: number;
  availableMenus: number;
};

export type GetKitchenProfileResponse = Branch & {
  lastMonthOrders: number;
  lateOrderPrep: number;
};
