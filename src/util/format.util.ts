import { DirectionsTollCalculationOverviewLeg } from '@/types/common.types';

export const formatLegName = (leg: DirectionsTollCalculationOverviewLeg) => {
  if (leg.type == 'toll') {
    return `${leg.entry.expressway} ${leg.entry.name} -> ${leg.exit.name}`;
  } else {
    const stepName = leg.steps.find((step) => !!step.name)?.name;
    return stepName ?? 'n/a';
  }
};

export const formatPrice = (price: number) => {
  return `PHP ${price.toFixed(2)}`;
};
