import { FC, MouseEventHandler, ReactNode } from "react";
type Props = {
  children?: ReactNode;
  className?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
};

const VSwitch: FC<Props> = ({ children, className, onClick }) => {
  return (
    <button className={`ASwitch ${className}`} type="button" onClick={onClick} role="aria-checked">
      <span className="check">
        {children && <span className="icon">{children}</span>}
      </span>
    </button>
  );
};

export default VSwitch;
