import { FC } from "react";
import { ProgressBar } from "bumbag";

interface IChosenQuizProgressBarProps {
  progressStatus: number;
}

const ChosenQuizProgressBar: FC<IChosenQuizProgressBarProps> = ({
  progressStatus,
}): JSX.Element => {
  return <ProgressBar value={progressStatus} color="success" />;
};

export default ChosenQuizProgressBar;
