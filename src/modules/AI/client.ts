import axios from "axios";

export const AIClient = axios.create({
  baseURL: "http://localhost:8000/ai",
  headers: {
    "Content-Type": "application/json",
  },
});

export const message = async ({ query }: { query: string }) => {
  return AIClient.post("/query-name", {
    query,
  });
};
