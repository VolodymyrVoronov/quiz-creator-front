import React, { FC, useCallback, useState } from "react";
import { Flex, Input, Text } from "bumbag";
import { motion } from "framer-motion";

import { quizStore } from "store/quizStore";

import QuizCreatorButtons from "components/QuizCreatorButtons/QuizCreatorButtons";

const QuizCreatorTitleEditor: FC<{}> = (): JSX.Element => {
  const { updateQuizTitle, quiz } = quizStore();

  const [editingMode, setEditingMode] = useState<boolean>(false);
  const [quizTitle, setQuizTitle] = useState<string>("Quiz title");

  const onEditButtonClick = useCallback(() => {
    setEditingMode(() => true);
    setQuizTitle(() => quiz[0].quizTitle);
  }, [quiz]);

  const onSaveButtonClick = useCallback(() => {
    setEditingMode(() => false);

    updateQuizTitle(quizTitle, quiz[0].id);
  }, [quiz, quizTitle, updateQuizTitle]);

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeOut", duration: 2 }}
    >
      <Flex width="100%" flexDirection="column">
        <Text>Quiz title:</Text>
        {editingMode ? (
          <Input
            onChange={onInputChange}
            value={quizTitle}
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
              "min-mobile": "20px",
              "min-desktop": "28px",
              "min-fullHD": "38px",
            }}
            fontWeight="bold"
          >
            {quiz[0].quizTitle}
          </Text>
        )}

        <QuizCreatorButtons
          editingMode={editingMode}
          onEditButtonClick={onEditButtonClick}
          onSaveButtonClick={onSaveButtonClick}
          onCancelButtonClick={onCancelButtonClick}
          onClearButtonClick={onClearButtonClick}
          isButtonDisabled={quizTitle.length === 0}
        />
      </Flex>
    </motion.div>
  );
};

export default QuizCreatorTitleEditor;
