import axios from "axios";

const api = axios.create({
  baseURL: "https://api.github.com/repos/facebook/react",
  headers: {
    Authorization:
      "Bearer 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",
  },
});

export default api;
