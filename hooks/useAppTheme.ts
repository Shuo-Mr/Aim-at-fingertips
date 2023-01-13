import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { APPEARANCE_KEY } from "utils/config";
import { isServer } from "utils/utils";

function useAppTheme(): [
  boolean,
  Dispatch<SetStateAction<boolean>>,
  () => void
] {
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setChecked(isDark);
  }, []);

  if (isServer()) {
    return [checked, setChecked, () => {}];
  }

  const query = window.matchMedia("(prefers-color-scheme: dark)");
  const classList = document.documentElement.classList;

  let userPreference = localStorage.getItem(APPEARANCE_KEY);

  let isDark =
    userPreference === "auto" || userPreference == null
      ? query.matches
      : userPreference === "dark";

  query.onchange = (e) => {
    if (userPreference === "auto") {
      setClass((isDark = e.matches));
    }
  };

  function setClass(dark: boolean): void {
    classList[dark ? "add" : "remove"]("dark");
    setChecked(dark);
  }

  function toggle() {
    setClass((isDark = !isDark));

    userPreference = isDark
      ? query.matches
        ? "auto"
        : "dark"
      : query.matches
      ? "light"
      : "auto";

    localStorage.setItem(APPEARANCE_KEY, userPreference);
  }

  return [checked, setChecked, toggle];
}

export default useAppTheme;
