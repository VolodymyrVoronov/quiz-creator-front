import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Flex, Box, Text } from "bumbag";
import { ImPencil, ImList2 } from "react-icons/im";

import Paths from "const/path";

import DoubleButtons from "components/DoubleButtons/DoubleButtons";

const StartPage: FC<{}> = (): JSX.Element => {
  const navigation = useNavigate();

  const onCreateNewQuizButtonClick = () => {
    navigation(Paths.AuthPage);
  };

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
        <DoubleButtons
          onTopButtonClick={onCreateNewQuizButtonClick}
          topButtonText="Create new quiz"
          topButtonArialLabel="Create new quiz button"
          topButtonIcon={<ImPencil />}
          onBottomButtonClick={onAllQuizzesButtonClick}
          bottomButtonText="All quizzes"
          bottomButtonArialLabel="All quizzes button"
          bottomButtonIcon={<ImList2 />}
        />
      </Box>
    </Flex>
  );
};

export default StartPage;
