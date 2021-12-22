import { FC, memo } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Flex, Set, Text } from "bumbag";
import { ImExit } from "react-icons/im";

import { authStore } from "store/authStore";

import Paths from "const/path";

import styles from "./UserBlock.module.css";

const UserBlock: FC<{}> = (): JSX.Element => {
  const navigation = useNavigate();

  const {
    userData: { avatar, email },
    logOut,
  } = authStore();

  const onLogOutButtonClick = () => {
    logOut();
    navigation(Paths.StartPage, { replace: true });
  };

  return (
    <div className={styles.userBlock}>
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
    </div>
  );
};

export default memo(UserBlock);
