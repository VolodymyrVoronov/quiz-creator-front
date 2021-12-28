import React, { FC, useCallback, useState } from "react";
import { Box, Divider, Flex, Input, Set, Tag, Text } from "bumbag";
import { motion } from "framer-motion";
import { ImBin } from "react-icons/im";

import { IAnswerOption, quizCreatorStore } from "store/quizCreatorStore";

import QuizCreatorButtons from "components/QuizCreatorButtons/QuizCreatorButtons";
import QuizCreatorQuestionOptionEditor from "components/QuizCreatorQuestionOptionEditor/QuizCreatorQuestionOptionEditor";
import QuizCreatorButton from "components/QuizCreatorButton/QuizCreatorButton";

interface IQuizCreatorTitleEditorProps {
  questionId: string;
  question: string;
  options: IAnswerOption[];
  amountOfQuestions: number;
}

const QuizCreatorQuestionEditor: FC<IQuizCreatorTitleEditorProps> = ({
  questionId,
  question,
  options,
  amountOfQuestions,
}): JSX.Element => {
  const { updateQuestionTitle, addNewAnswerOption, deleteQuestion } =
    quizCreatorStore();

  const [editingMode, setEditingMode] = useState<boolean>(false);
  const [questionTitle, setQuestionTitle] = useState<string>("Question title");

  const onEditButtonClick = useCallback(() => {
    setEditingMode(() => true);
    setQuestionTitle(() => question);
  }, [question]);

  const onSaveButtonClick = useCallback(() => {
    setEditingMode(() => false);

    updateQuestionTitle(questionTitle, questionId);
  }, [questionId, questionTitle, updateQuestionTitle]);

  const onCancelButtonClick = useCallback(() => {
    setEditingMode(() => false);
  }, []);

  const onClearButtonClick = useCallback(() => {
    setQuestionTitle(() => "");
  }, []);

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const title = e.target.value;

      setQuestionTitle(title);
    },
    []
  );

  const onAddNewAnswerOptionButtonClick = (): void => {
    addNewAnswerOption(questionId);
  };

  const onDeleteThisQuestionButtonClick = (): void => {
    deleteQuestion(questionId);
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

  const isAtLeastOneOptionCorrect = options.some(
    (option) => option.correct === true
  );

  return (
    <Flex width="100%" flexDirection="column">
      <Text>Question title:</Text>
      {editingMode ? (
        <Input
          onChange={onInputChange}
          value={questionTitle}
          marginRight="20px"
          fontSize={{
            "min-mobile": "16px",
            "min-desktop": "18px",
            "min-fullHD": "20px",
          }}
          name="Question title"
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
                  amountOfAnswerOptions={options.length}
                />
                <Divider marginY="10px" />
              </motion.article>
            );
          })}
        </motion.section>
      </Flex>

      <Set orientation="vertical" spacing="minor-3" marginTop="10px">
        {!isAtLeastOneOptionCorrect && (
          <Tag
            palette="warning"
            size="medium"
            fontSize={{
              "min-mobile": "12px",
              "min-tablet": "14px",
              "min-desktop": "16px",
            }}
          >
            At least one option should be correct
          </Tag>
        )}

        <QuizCreatorButton
          onClick={onAddNewAnswerOptionButtonClick}
          size="small"
          palette="success"
          color="white"
          buttonText="Add new answer option"
          w={{
            "min-mobile": "100%",
            "min-desktop": "auto",
          }}
        />

        {amountOfQuestions >= 2 && (
          <QuizCreatorButton
            onClick={onDeleteThisQuestionButtonClick}
            size="small"
            palette="danger"
            color="white"
            buttonText="Delete this question"
            w={{
              "min-mobile": "100%",
              "min-desktop": "auto",
            }}
          >
            <Box marginLeft="10px">
              <ImBin />
            </Box>
          </QuizCreatorButton>
        )}
      </Set>
    </Flex>
  );
};

export default QuizCreatorQuestionEditor;
