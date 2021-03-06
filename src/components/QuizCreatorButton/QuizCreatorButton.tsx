import { FC, memo, ReactNode } from "react";
import { Button } from "bumbag";

interface IQuizCreatorButtonProps {
  onClick: () => void;
  isButtonDisabled?: boolean;
  palette?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark";
  color?: string;
  size?: "small" | "medium" | "large";
  buttonText?: string;
  children?: ReactNode;
  mt?: any;
  mr?: any;
  ml?: any;
  mb?: any;
  w?: any;
  variant?: "outlined";
  isLoading?: boolean;
  buttonName?: string;
}

const QuizCreatorButton: FC<IQuizCreatorButtonProps> = ({
  onClick,
  palette,
  isButtonDisabled,
  color,
  size,
  buttonText,
  children,
  mt,
  mr,
  ml,
  mb,
  w,
  variant,
  isLoading,
  buttonName,
}): JSX.Element => {
  return (
    <Button
      onClick={onClick}
      size={size}
      palette={palette}
      color={color}
      disabled={isButtonDisabled}
      type="button"
      marginTop={mt}
      marginRight={mr}
      marginLeft={ml}
      marginBottom={mb}
      width={w}
      variant={variant}
      isLoading={isLoading}
      aria-label={buttonName}
    >
      {buttonText}
      {children}
    </Button>
  );
};

export default memo(QuizCreatorButton);
