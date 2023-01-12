var getEnv = function(envVar) {
    env = process.env[envVar];
    if (env !== null && env !== undefined) {
        return env;
    }
    else {
        throw new Error("NOTION_CLIENT environment variable missing");
    }
}

module.exports = { getEnv };