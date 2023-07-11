import React from "react";
import { classNames } from "@/shared/utils/format";


interface Props {
  title: string | JSX.Element;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  capitalizeTitle?: boolean;
  secondary?: boolean;
  disabled?: boolean;
  className?: string;
  altClassName?: string;
  isBusy?: boolean;
}

const Button: React.FC<Props> = ({
  title,
  onClick,
  capitalizeTitle,
  secondary,
  disabled,
  className,
  altClassName,
  isBusy,
}) => {
  return (
    <div className={disabled? "opacity-75 " : ""}>
      <button className={altClassName || `py-3 lg:text-lg w-full btn-primary ${disabled? 'cursor-not-allowed btn-disabled' : ''}`} onClick={onClick ? onClick : undefined} disabled={disabled}>
      {isBusy ? (
          "loading"
        ) : capitalizeTitle ? (
          title
        ) : (
          title
        )}
      </button>
    </div>
  );
};

export default Button;