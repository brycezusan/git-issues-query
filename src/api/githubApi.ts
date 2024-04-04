import axios from "axios";

const api = axios.create({
  baseURL: "https://api.github.com/repos/facebook/react",
  // headers: {
  //   Authorization:
  //     "Bearer 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",
  // },
});

export default api;
