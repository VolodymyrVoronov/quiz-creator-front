import React, { FC, useCallback, useState } from "react";
import { Button, Flex, Input, Text } from "bumbag";
import { motion } from "framer-motion";

import { IOption, quizStore } from "store/quizStore";

import QuizCreatorButtons from "components/QuizCreatorButtons/QuizCreatorButtons";
import QuizCreatorQuestionOptionEditor from "components/QuizCreatorQuestionOptionEditor/QuizCreatorQuestionOptionEditor";

interface IQuizCreatorTitleEditorProps {
  questionId: string;
  question: string;
  options: IOption[];
}

const QuizCreatorQuestionEditor: FC<IQuizCreatorTitleEditorProps> = ({
  questionId,
  question,
  options,
}): JSX.Element => {
  const { updateQuestion, addNewAnswerOption } = quizStore();

  const [editingMode, setEditingMode] = useState<boolean>(false);
  const [questionTitle, setQuizTitle] = useState<string>("Quiz title");

  const onEditButtonClick = useCallback(() => {
    setEditingMode(() => true);
    setQuizTitle(() => question);
  }, [question]);

  const onSaveButtonClick = useCallback(() => {
    setEditingMode(() => false);

    updateQuestion(questionTitle, questionId);
  }, [questionId, questionTitle, updateQuestion]);

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

  const onAddNewAnswerOptionButtonClick = (): void => {
    addNewAnswerOption(questionId);
  };

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
    },
  };

  const item = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
    },
  };

  return (
    <Flex width="100%" flexDirection="column">
      <Text>Question title:</Text>
      {editingMode ? (
        <Input
          onChange={onInputChange}
          value={questionTitle}
          marginRight="20px"
          fontSize={{
            "min-mobile": "18px",
            "min-desktop": "20px",
            "min-fullHD": "24px",
          }}
          name="Quiz title"
        />
      ) : (
        <Text
          marginRight="20px"
          fontSize={{
            "min-mobile": "18px",
            "min-desktop": "22px",
            "min-fullHD": "30px",
          }}
          fontWeight="bold"
        >
          {question}
        </Text>
      )}

      <QuizCreatorButtons
        editingMode={editingMode}
        onEditButtonClick={onEditButtonClick}
        onSaveButtonClick={onSaveButtonClick}
        onCancelButtonClick={onCancelButtonClick}
        onClearButtonClick={onClearButtonClick}
        isButtonDisabled={questionTitle.length === 0}
      />

      <Flex flexDirection="column" marginTop="25px">
        <motion.section
          variants={container}
          initial="hidden"
          animate={options.length > 0 && "visible"}
        >
          {options.map((option, index) => {
            const { id, answerOption, correct, userAnswer } = option;

            return (
              <motion.article key={id} variants={item}>
                <QuizCreatorQuestionOptionEditor
                  index={index}
                  id={id}
                  questionId={questionId}
                  answerOption={answerOption}
                  correct={correct}
                  userAnswer={userAnswer}
                />
              </motion.article>
            );
          })}
        </motion.section>
      </Flex>

      <Flex>
        <Button
          onClick={onAddNewAnswerOptionButtonClick}
          marginTop="15px"
          size="small"
          palette="success"
          color="white"
          type="button"
        >
          Add new answer option
        </Button>
      </Flex>
    </Flex>
  );
};

export default QuizCreatorQuestionEditor;
