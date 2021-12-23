import { FC } from "react";
import { Button, Card, Flex, Heading, Text } from "bumbag";

import { ImPlus } from "react-icons/im";

import { quizStore } from "store/quizStore";

import QuizCreatorTitleEditor from "components/QuizCreatorTitleEditor/QuizCreatorTitleEditor";

// import styles from "./QuizCreatorPage.module.css";

const QuizCreatorPage: FC<{}> = (): JSX.Element => {
  const { createNewQuiz, quiz } = quizStore();

  const onCrateNewQuizButtonClick = () => {
    createNewQuiz();
  };

  console.log(quiz);

  return (
    <Flex
      flexDirection="row"
      justifyContent="center"
      paddingY={{
        "min-mobile": "75px",
        "min-desktop": "100px",
        "min-fullHD": "100px",
      }}
      paddingX={{
        "min-mobile": "10px",
        "min-desktop": "25px",
        "min-fullHD": "50px",
      }}
    >
      <Card width="100%">
        <Heading use="h3" textAlign="center">
          Quiz Creator
        </Heading>
        {quiz.length === 0 && (
          <Flex justifyContent="center" marginY="15px">
            <Button
              onClick={onCrateNewQuizButtonClick}
              palette="primary"
              color="white"
            >
              Create new quiz
              <Text display="flex" fontSize="14px" marginLeft="10px">
                <ImPlus />
              </Text>
            </Button>
          </Flex>
        )}

        {quiz.length !== 0 && (
          <Flex width="100%" marginTop="25px">
            <QuizCreatorTitleEditor />
          </Flex>
        )}
      </Card>
    </Flex>
  );
};

export default QuizCreatorPage;
