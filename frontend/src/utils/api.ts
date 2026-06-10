import axios from "axios";

// In production, this will use the VITE_API_URL environment variable (e.g. your Render URL)
// In development, it will default to the Vite proxy or localhost:8000
const API_URL = import.meta.env.VITE_API_URL || "/api";

export const api = axios.create({
  baseURL: API_URL,
});
