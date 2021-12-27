import { FC } from "react";
import { motion } from "framer-motion";
import { Container, Flex } from "bumbag";

import Paths from "const/path";

import BackButton from "components/common/BackButton/BackButton";

const QuizPage: FC<{}> = (): JSX.Element => {
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
          width="1200px"
          paddingY={{
            "min-mobile": "75px",
            "min-desktop": "100px",
            "min-fullHD": "100px",
          }}
          paddingX={{
            "min-mobile": "10px",
          }}
        >
          Quiz Page
        </Flex>
      </Container>
    </motion.div>
  );
};

export default QuizPage;
