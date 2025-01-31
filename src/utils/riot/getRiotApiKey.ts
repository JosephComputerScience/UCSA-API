export const getRiotApiKey = () => {
  if (!process.env.RIOT_API_KEY) {
    console.log("RIOT_API_KEY not set, defaulting to empty string");
  }
  return process.env.RIOT_API_KEY || "";
};
