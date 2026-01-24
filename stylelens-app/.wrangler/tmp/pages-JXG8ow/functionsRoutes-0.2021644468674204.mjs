import { onRequestPost as __api_analyze_ts_onRequestPost } from "/Users/choikjun/Desktop/keepdev/StyleLens/stylelens-app/functions/api/analyze.ts"

export const routes = [
    {
      routePath: "/api/analyze",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_analyze_ts_onRequestPost],
    },
  ]