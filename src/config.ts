
/**
 * Environment for the server. This is extracted from the environment variable
 */
const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT

/**
 * Live Api Url. This is extracted from the environment variable
 */
const LIVE_API_URL = import.meta.env.VITE_LIVE_API_URL;

/**
 * Dev Api Url. This is extracted from the environment variable
 */
const DEV_API_URL = import.meta.env.VITE_DEV_API_URL;

/**
 * Base Url. This is extracted from the environment variable
 */
const BASE_URL = ENVIRONMENT === "live" ? LIVE_API_URL : DEV_API_URL;

console.log('env: ', ENVIRONMENT)
console.log('BASE URL: ', BASE_URL)

export {
    ENVIRONMENT,
    LIVE_API_URL,
    DEV_API_URL,
    BASE_URL
};
