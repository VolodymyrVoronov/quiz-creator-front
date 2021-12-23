import { FC, memo } from "react";
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
  buttonText: string;
}

const QuizCreatorButton: FC<IQuizCreatorButtonProps> = ({
  onClick,
  palette,
  isButtonDisabled,
  color,
  size,
  buttonText,
}): JSX.Element => {
  return (
    <Button
      onClick={onClick}
      size={size}
      palette={palette}
      color={color}
      disabled={isButtonDisabled}
      type="button"
    >
      {buttonText}
    </Button>
  );
};

export default memo(QuizCreatorButton);
