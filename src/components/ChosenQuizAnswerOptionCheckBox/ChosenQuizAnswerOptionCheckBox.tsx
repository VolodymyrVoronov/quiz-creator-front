import { FC, useState } from "react";
import { Checkbox } from "bumbag";

import { quizStore } from "store/quizStore";

interface IChosenQuizAnswerOptionCheckBoxProps {
  questionId: string;
  optionId: string;
  userAnswer: boolean;
}

const ChosenQuizAnswerOptionCheckBox: FC<IChosenQuizAnswerOptionCheckBoxProps> =
  ({ questionId, optionId, userAnswer }): JSX.Element => {
    const { setUserAnswer } = quizStore();

    const [checked, setChecked] = useState(userAnswer);

    const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.checked;

      setChecked(value);
      setUserAnswer(questionId, optionId, value);
    };

    return (
      <Checkbox
        onChange={onCheckboxChange}
        marginRight="15px"
        fontSize={{
          "min-mobile": "18px",
          "min-desktop": "22px",
          "min-fullHD": "26px",
        }}
        checked={checked}
      />
    );
  };

export default ChosenQuizAnswerOptionCheckBox;
