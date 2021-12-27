import { FC } from "react";
import { Flex, Text, Set } from "bumbag";

import { IQuestion } from "store/quizCreatorStore";

import ChosenQuizAnswerOptionCheckBox from "components/ChosenQuizAnswerOptionCheckBox/ChosenQuizAnswerOptionCheckBox";

interface IChosenQuizAnswerOptionProps {
  questionToAnswer?: IQuestion;
}

const ChosenQuizAnswerOption: FC<IChosenQuizAnswerOptionProps> = ({
  questionToAnswer,
}): JSX.Element => {
  return (
    <Set orientation="vertical">
      {questionToAnswer?.options.map((option) => {
        const { id, answerOption, userAnswer } = option;

        return (
          <Flex key={id}>
            <ChosenQuizAnswerOptionCheckBox
              questionId={questionToAnswer.id}
              optionId={id}
              userAnswer={userAnswer}
            />
            <Text>{answerOption}</Text>
          </Flex>
        );
      })}
    </Set>
  );
};

export default ChosenQuizAnswerOption;
