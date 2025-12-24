// runs before rendering to stop FOUC
export function getThemeInitScript() {
  return `(function () {
      try {
        const preference = localStorage.getItem("theme") || "system";
        const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const isDark = preference === "dark" || (preference === "system" && systemPrefersDark);
        const theme = isDark ? "dark" : "light";
        document.documentElement.classList.add(theme);
        document.documentElement.setAttribute("data-theme", theme);
      } catch (e) {}
    })();`;
}
