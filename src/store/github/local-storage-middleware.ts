import type { Middleware } from "@reduxjs/toolkit";
import { LS_FAV_KEY } from "./github.slice";

export const localeStorageMiddleware: Middleware =
  (store) => (next) => (action) => {
    const result = next(action);

    // безопасная проверка
    if (typeof action === "object" && action !== null && "type" in action) {
      if (String(action.type).startsWith("github/")) {
        const state = store.getState();
        localStorage.setItem(
          LS_FAV_KEY,
          JSON.stringify(state.github.favourites)
        );
      }
    }

    return result;
  };
