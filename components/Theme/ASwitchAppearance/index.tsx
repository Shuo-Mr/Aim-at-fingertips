import { useEffect, useState } from "react";
import ASwitch from "../ASwitch";

function useAppearance() {
  const [checked, setChecked] = useState<boolean>(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {}, [checked]);

  return (
    <ASwitch
      className="VPSwitchAppearance"
      onClick={() => {
        console.log("nih");
      }}
      // aria-label="toggle dark mode"
      // :aria-checked="checked"
    ></ASwitch>
  );
}

export default useAppearance;
