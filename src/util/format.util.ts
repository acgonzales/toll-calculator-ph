export const formatPrice = (price: number) => {
  return `PHP ${price.toFixed(2)}`;
};

export const formatDuration = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0 && minutes > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} and ${minutes} minute${minutes > 1 ? 's' : ''}`;
  }
  if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''}`;
  }
  if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''}`;
  }
  return 'Less than a minute';
};

export const formatDistance = (distanceInMeters: number) => {
  const distance = distanceInMeters / 1000;
  return `${distance.toFixed(2)} km`;
};
