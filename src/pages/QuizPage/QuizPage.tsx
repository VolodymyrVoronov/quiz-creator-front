import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Divider,
  Flex,
  Text,
} from "bumbag";

import { quizStore } from "store/quizStore";

import Paths from "const/path";

import BackButton from "components/common/BackButton/BackButton";
import ChosenQuizTitle from "components/ChosenQuizTitle/ChosenQuizTitle";
import ChosenQuizProgressBar from "components/ChosenQuizProgressBar/ChosenQuizProgressBar";
import ChosenQuizAnswerOption from "components/ChosenQuizAnswerOption/ChosenQuizAnswerOption";

const QuizPage: FC<{}> = (): JSX.Element => {
  const navigation = useNavigate();

  const { chosenQuiz } = quizStore();

  const [numberOfTheQuestion, setNumberOfTheQuestion] = useState(0);

  useEffect(() => {
    if (!chosenQuiz) {
      navigation(Paths.QuizzesPage);
    }
  }, [chosenQuiz, navigation]);

  const onNextButtonClick = (): void => {
    setNumberOfTheQuestion(numberOfTheQuestion + 1);
  };

  const onShowResultsButtonClick = (): void => {
    console.log(chosenQuiz);
  };

  const questionToAnswer = chosenQuiz?.questions[numberOfTheQuestion];
  const amountOfQuestions = chosenQuiz?.questions.length;
  const isEndOfQuiz = numberOfTheQuestion === (amountOfQuestions as number) - 1;
  const progress =
    ((numberOfTheQuestion + 1) / (amountOfQuestions as number)) * 100;

  return (
    <motion.div
      initial={{ x: -500, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ ease: "easeOut", duration: 2 }}
    >
      <BackButton routeName={Paths.QuizzesPage} />
      <Container display="flex" justifyContent="center">
        <Flex
          flexDirection="column"
          justifyContent="center"
          width="1024px"
          paddingY={{
            "min-mobile": "75px",
            "min-desktop": "100px",
            "min-fullHD": "100px",
          }}
          paddingX={{
            "min-mobile": "10px",
          }}
        >
          <Card>
            <Flex flexDirection="column">
              <Flex justifyContent="space-between" alignItems="center">
                <ChosenQuizTitle titleText={chosenQuiz?.quizTitle} />
                <Avatar
                  marginLeft="25px"
                  src={chosenQuiz?.userAvatar}
                  alt="Avatar of quiz's author"
                  size="small"
                />
              </Flex>

              <Box marginTop="25px">
                <ChosenQuizProgressBar progressStatus={progress} />
              </Box>

              <Box marginTop="25px">
                <Text
                  fontSize={{
                    "min-mobile": "16px",
                    "min-desktop": "20px",
                    "min-fullHD": "22px",
                  }}
                >
                  {questionToAnswer?.question}
                </Text>
              </Box>

              <Flex marginTop="25px">
                <ChosenQuizAnswerOption questionToAnswer={questionToAnswer} />
              </Flex>

              <Divider marginTop="25px" />

              <Flex justifyContent="center" marginTop="25px">
                {isEndOfQuiz && (
                  <Button
                    onClick={onShowResultsButtonClick}
                    palette="secondary"
                    color="white"
                    size="small"
                    type="button"
                  >
                    Show result
                  </Button>
                )}

                {!isEndOfQuiz && (
                  <Button
                    onClick={onNextButtonClick}
                    palette="success"
                    color="white"
                    size="small"
                    type="button"
                  >
                    Next question
                  </Button>
                )}
              </Flex>
            </Flex>
          </Card>
        </Flex>
      </Container>
    </motion.div>
  );
};

export default QuizPage;
