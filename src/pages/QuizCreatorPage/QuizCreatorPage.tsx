import { FC, Fragment } from "react";
import { Button, Card, Divider, Flex, Heading, Set, Text } from "bumbag";

import { ImPlus } from "react-icons/im";

import { quizStore } from "store/quizStore";

import QuizCreatorTitleEditor from "components/QuizCreatorTitleEditor/QuizCreatorTitleEditor";
import QuizCreatorQuestionEditor from "components/QuizCreatorQuestionEditor/QuizCreatorQuestionEditor";

// import styles from "./QuizCreatorPage.module.css";

const QuizCreatorPage: FC<{}> = (): JSX.Element => {
  const { createNewQuiz, addNewQuestion, quiz } = quizStore();

  const onCrateNewQuizButtonClick = () => {
    createNewQuiz();
  };

  const onAddNewQuestionButtonClick = () => {
    addNewQuestion(quiz[0].id);
  };

  console.log(quiz);

  return (
    <Flex
      flexDirection="column"
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
          <Flex width="100%" marginTop="25px" flexDirection="column">
            <QuizCreatorTitleEditor />

            <Divider marginY="25px" />

            {quiz[0].questions.map((questionItem) => {
              const { id, question, options } = questionItem;

              return (
                <Fragment key={id}>
                  <QuizCreatorQuestionEditor
                    questionId={id}
                    question={question}
                    options={options}
                  />
                  <Divider marginY="25px" />
                </Fragment>
              );
            })}
          </Flex>
        )}
      </Card>
      {quiz.length !== 0 && (
        <Card width="100%" marginTop="15px">
          <Set spacing="minor-5">
            <Button
              onClick={onAddNewQuestionButtonClick}
              palette="secondary"
              type="button"
            >
              Added new question
            </Button>
            <Button palette="success" type="button" color="white">
              Save quiz
            </Button>
          </Set>
        </Card>
      )}
    </Flex>
  );
};

export default QuizCreatorPage;
