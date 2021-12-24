import { Checkbox, Divider, Flex, Input, Text } from "bumbag";
import { FC, Fragment, memo, useCallback, useState } from "react";

import { quizStore } from "store/quizStore";

import QuizCreatorButtons from "components/QuizCreatorButtons/QuizCreatorButtons";
import QuizCreatorButton from "components/QuizCreatorButton/QuizCreatorButton";
import { ImBin } from "react-icons/im";

interface IQuizCreatorQuestionOptionEditorProps {
  index: number;
  id: string;
  questionId: string;
  answerOption: string;
  correct: boolean;
  userAnswer: boolean;
  amountOfAnswerOptions: number;
}

const QuizCreatorQuestionOptionEditor: FC<IQuizCreatorQuestionOptionEditorProps> =
  ({
    index,
    id,
    questionId,
    answerOption,
    correct,
    userAnswer,
    amountOfAnswerOptions,
  }): JSX.Element => {
    const { updateAnswerOption, deleteAnswerOption } = quizStore();

    const [editingMode, setEditingMode] = useState<boolean>(false);
    const [answerOptionText, setQuizTitle] = useState<string>("Quiz title");
    const [checked, setChecked] = useState(correct);

    const onEditButtonClick = useCallback(() => {
      setEditingMode(() => true);
      setQuizTitle(() => answerOption);
    }, [answerOption]);

    const onSaveButtonClick = useCallback(() => {
      setEditingMode(() => false);

      updateAnswerOption(answerOptionText, id, questionId);
    }, [updateAnswerOption, answerOptionText, id, questionId]);

    const onCancelButtonClick = useCallback(() => {
      setEditingMode(() => false);
    }, []);

    const onClearButtonClick = useCallback(() => {
      setQuizTitle(() => "");
    }, []);

    const onInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;

        setQuizTitle(title);
      },
      []
    );

    const onDeleteButtonClick = () => {
      deleteAnswerOption(id, questionId);
    };

    const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.checked;

      setChecked(value);
      updateAnswerOption(value, id, questionId);
    };

    return (
      <Flex flexDirection="row" marginTop="10px" alignItems="center">
        <Checkbox
          onChange={onCheckboxChange}
          marginRight="15px"
          fontSize="28px"
          checked={checked}
        />
        {editingMode ? (
          <Fragment>
            {index + 1}.
            <Input
              onChange={onInputChange}
              value={answerOptionText}
              marginRight="20px"
              fontSize={{
                "min-mobile": "16px",
                "min-desktop": "16px",
                "min-fullHD": "16px",
              }}
              name="Quiz title"
              width="100%"
              marginLeft="5px"
            />
          </Fragment>
        ) : (
          <Text
            marginRight="20px"
            width="100%"
            fontSize={{
              "min-mobile": "18px",
              "min-desktop": "20px",
              "min-fullHD": "22px",
            }}
          >
            {index + 1}. {answerOption}
          </Text>
        )}

        <QuizCreatorButtons
          editingMode={editingMode}
          onEditButtonClick={onEditButtonClick}
          onSaveButtonClick={onSaveButtonClick}
          onCancelButtonClick={onCancelButtonClick}
          onClearButtonClick={onClearButtonClick}
          isButtonDisabled={answerOptionText.length === 0}
          mt={0}
        />

        {amountOfAnswerOptions > 2 && (
          <QuizCreatorButton
            onClick={onDeleteButtonClick}
            size="small"
            palette="danger"
            color="white"
            ml="10px"
          >
            <ImBin />
          </QuizCreatorButton>
        )}
      </Flex>
    );
  };

export default memo(QuizCreatorQuestionOptionEditor);
