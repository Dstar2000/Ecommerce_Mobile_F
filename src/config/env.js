import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.API_URL;

console.log("Using API URL:", API_URL);

export default {
  API_URL,
};
