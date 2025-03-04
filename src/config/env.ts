interface Environment {
  MAPBOX_API_KEY: string;
}

function getEnvironmentVariables(): Environment {
  return {
    MAPBOX_API_KEY: import.meta.env.VITE_MAPBOX_API_KEY,
  };
}

const env = getEnvironmentVariables();

export default env;
