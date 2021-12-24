import { FC, memo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Avatar, Button, Flex, Set, Text } from "bumbag";
import { ImExit } from "react-icons/im";

import { authStore } from "store/authStore";
import { quizCreatorStore } from "store/quizCreatorStore";

import Paths from "const/path";

import styles from "./UserBlock.module.css";

const UserBlock: FC<{}> = (): JSX.Element => {
  const navigation = useNavigate();

  const { clearQuiz } = quizCreatorStore();

  const {
    userData: { avatar, email },
    logOut,
  } = authStore();

  const onLogOutButtonClick = () => {
    logOut();
    clearQuiz();

    navigation(Paths.StartPage, { replace: true });
  };

  return (
    <motion.div
      initial={{ y: -200 }}
      animate={{ y: 0 }}
      transition={{ ease: "easeOut", duration: 2 }}
      className={styles.userBlock}
    >
      <Flex flexDirection="row">
        <Set spacing="minor-5">
          <Text>{email}</Text>
          <Avatar src={avatar} alt={email} size="50px" />
          <Button
            onClick={onLogOutButtonClick}
            palette="primary"
            borderRadius="50%"
            color="white"
            aria-label="Back button"
            type="button"
          >
            <ImExit />
          </Button>
        </Set>
      </Flex>
    </motion.div>
  );
};

export default memo(UserBlock);
