import { TOGGLE_DARK_MODE, SET_THEME_MODE } from "@/context/constants";

export function applyThemeToDocument(
  dispatch: (action: { type: string; payload: any }) => void
) {
  const html = document.documentElement;
  const preference = localStorage.getItem("theme") || "system";
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  const isDark =
    preference === "dark" || (preference === "system" && systemPrefersDark);

  dispatch({ type: TOGGLE_DARK_MODE, payload: isDark });
  dispatch({ type: SET_THEME_MODE, payload: preference });

  html.classList.remove("light", "dark");
  html.classList.add(isDark ? "dark" : "light");
  html.setAttribute("data-theme", isDark ? "dark" : "light");
}

export function syncThemeStateToHtml(darkMode: boolean, themeMode: string) {
  const html = document.documentElement;
  const theme = darkMode ? "dark" : "light";

  html.classList.remove("light", "dark");
  html.classList.add(theme);
  html.setAttribute("data-theme", theme);
  localStorage.setItem("theme", themeMode);
}
