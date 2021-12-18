import { FC } from "react";
import { motion } from "framer-motion";
import { Flex, Box, Text } from "bumbag";

import StartPageButtons from "components/StartPageButtons/StartPageButtons";

const StartPage: FC<{}> = (): JSX.Element => {
  const onCreateNewQuizButtonClick = () => {};

  const onAllQuizzesButtonClick = () => {};

  return (
    <Flex
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      height="100vh"
    >
      <Box>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "easeOut", duration: 2, delay: 5.6 }}
        >
          <Text fontSize="56px" fontWeight="bold">
            Quiz Creator
          </Text>
        </motion.span>
      </Box>
      <Box marginTop="25px">
        <StartPageButtons
          onTopButtonClick={onCreateNewQuizButtonClick}
          topButtonText="Create new quiz"
          topButtonArialLabel="Create new quiz button"
          onBottomButtonClick={onAllQuizzesButtonClick}
          bottomButtonText="All quizzes"
          bottomButtonArialLabel="All quizzes button"
        />
      </Box>
    </Flex>
  );
};

export default StartPage;
