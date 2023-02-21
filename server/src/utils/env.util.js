// Simple env variable helper func
// TODO: pull from .env file
var getEnv = function(envVar) {
  env = process.env[envVar];
  if (env !== null && env !== undefined) {
    return env;
  }
  else {
    throw new Error(envVar + " environment variable missing!");
  }
}

module.exports = { getEnv };
