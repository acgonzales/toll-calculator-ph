import { useContext } from 'react';
import { DirectionsContext } from '@/stores/directions';

export const useDirections = () => {
  const context = useContext(DirectionsContext);
  if (!context) {
    throw new Error('useDirections must be used within a DirectionsProvider');
  }
  return context;
};
