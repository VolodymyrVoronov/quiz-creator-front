import { FC } from "react";
import { Box, Divider, Flex, Set, Tag, Text } from "bumbag";

import { IAnswerOption } from "store/quizStore";

interface IResultQuestionProps {
  question: string;
  options: IAnswerOption[];
}

const ResultQuestion: FC<IResultQuestionProps> = ({
  question,
  options,
}): JSX.Element => {
  return (
    <Flex flexDirection="column" width="100%">
      <Box>
        <Text
          fontSize={{
            "min-mobile": "16px",
            "min-desktop": "20px",
            "min-fullHD": "24px",
          }}
          fontWeight="bold"
        >
          {question}
        </Text>
      </Box>
      <Set
        orientation="vertical"
        spacing="minor-3"
        marginTop="5px"
        width="100%"
      >
        {options.map((option, index) => {
          const { id, answerOption, correct, userAnswer } = option;

          const isCorrect = correct === true && (
            <Tag palette="success" color="white">
              Correct
            </Tag>
          );

          const isWrong = correct === false && (
            <Tag palette="danger" color="white">
              Wrong
            </Tag>
          );

          const UserAnswer = userAnswer === true && <Tag>Your answered</Tag>;

          return (
            <Flex
              key={id}
              width="100%"
              padding="5px"
              border="1px solid rgba(0,0,0, 0.1)"
              borderRadius="5px"
              backgroundColor={
                correct === true
                  ? "rgba(103,198,185, 0.05)"
                  : correct === false
                  ? "rgba(243,112,91, 0.05)"
                  : "white"
              }
            >
              <Text width="100%">
                <Flex flexDirection="column">
                  <Box style={{ marginRight: "auto" }}>
                    <strong>{index + 1}.{" "}</strong> {answerOption}
                  </Box>
                  <Set marginTop="2px">
                    {isCorrect}
                    {isWrong}
                    {UserAnswer}
                  </Set>
                </Flex>
              </Text>
            </Flex>
          );
        })}
      </Set>
      <Divider width="100%" marginTop="20px" />
    </Flex>
  );
};

export default ResultQuestion;
