import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Box, Button, Card, Container, Divider, Flex, Set, Text } from "bumbag";

import { quizStore } from "store/quizStore";

import Paths from "const/path";
import ResultQuestion from "components/ResultQuestion/ResultQuestion";
import ResultChart from "components/ResultChart/ResultChart";

const ResultPage: FC<{}> = (): JSX.Element => {
  const navigation = useNavigate();
  const { chosenQuiz, quizResult, resetChosenQuiz } = quizStore();

  useEffect(() => {
    if (!chosenQuiz) {
      navigation(Paths.QuizzesPage);
    }
  }, [chosenQuiz, navigation]);

  const onAllQuizzesButtonClick = (): void => {
    navigation(Paths.QuizzesPage);
    resetChosenQuiz();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeOut", duration: 2 }}
    >
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
            <Flex flexDirection="column" alignItems="center" width="100%">
              <Box textAlign="center">
                <Text
                  fontSize={{
                    "min-mobile": "22px",
                    "min-desktop": "28px",
                    "min-fullHD": "38px",
                  }}
                  fontWeight="bold"
                >
                  Result: {chosenQuiz?.quizTitle}
                </Text>
              </Box>

              <Divider width="100%" marginY="15px" />

              <Set>
                <Text
                  fontSize={{
                    "min-mobile": "16px",
                    "min-desktop": "20px",
                    "min-fullHD": "22px",
                  }}
                  fontWeight="bold"
                >
                  Correct:{" "}
                  <Text color="success">{quizResult.correctAnswers}</Text>
                </Text>
                <Divider height="100%" orientation="vertical" />
                <Text
                  fontSize={{
                    "min-mobile": "16px",
                    "min-desktop": "20px",
                    "min-fullHD": "22px",
                  }}
                  fontWeight="bold"
                >
                  Wrong: <Text color="danger">{quizResult.wrongAnswers}</Text>
                </Text>
              </Set>

              <Divider width="100%" marginY="15px" />

              <Set
                alignSelf="flex-start"
                width="100%"
                orientation="vertical"
                spacing="minor-5"
              >
                {chosenQuiz?.questions.map((questionIte) => {
                  const { id, question, options } = questionIte;

                  return (
                    <ResultQuestion
                      key={id}
                      question={question}
                      options={options}
                    />
                  );
                })}
              </Set>

              <Box
                width={{
                  "min-mobile": "75%",
                  "min-desktop": "50%",
                }}
                marginY="25px"
              >
                <ResultChart chartData={quizResult} />
              </Box>

              <Divider width="100%" marginY="15px" />

              <Box width="100%" marginTop="15px">
                <Button
                  onClick={onAllQuizzesButtonClick}
                  palette="gray"
                  type="button"
                >
                  To all quizzes
                </Button>
              </Box>
            </Flex>
          </Card>
        </Flex>
      </Container>
    </motion.div>
  );
};

export default ResultPage;
