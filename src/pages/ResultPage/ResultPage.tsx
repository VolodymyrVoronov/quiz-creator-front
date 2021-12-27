import { FC } from "react";
import { motion } from "framer-motion";
import { Box, Card, Container, Divider, Flex, Set, Text } from "bumbag";

import { quizStore } from "store/quizStore";

const ResultPage: FC<{}> = (): JSX.Element => {
  const { chosenQuiz, quizResult } = quizStore();

  console.log(chosenQuiz, quizResult);

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
            <Flex>
              <Flex flexDirection="column" alignItems="center" width="100%">
                <Box>
                  <Text
                    fontSize={{
                      "min-mobile": "26px",
                      "min-desktop": "38px",
                      "min-fullHD": "48px",
                    }}
                    fontWeight="bold"
                  >
                    Result
                  </Text>
                </Box>
                <Divider width="100%" />
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
              </Flex>
            </Flex>
          </Card>
        </Flex>
      </Container>
    </motion.div>
  );
};

export default ResultPage;
