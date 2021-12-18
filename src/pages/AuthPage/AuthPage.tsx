import { FC } from "react";
import { Flex, Box } from "bumbag";
import { ImEnter, ImKey2 } from "react-icons/im";

import DoubleButtons from "components/DoubleButtons/DoubleButtons";

const AuthPage: FC<{}> = (): JSX.Element => {
  const onSingInButtonClick = () => {};

  const onSingUpButtonClick = () => {};

  return (
    <Flex
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      height="100vh"
    >
      <Box>
        <DoubleButtons
          onTopButtonClick={onSingInButtonClick}
          topButtonText="Sign in"
          topButtonArialLabel="Sign in button"
          topButtonIcon={<ImEnter />}
          onBottomButtonClick={onSingUpButtonClick}
          bottomButtonText="Sign up"
          bottomButtonArialLabel="Sign up button"
          bottomButtonIcon={<ImKey2 />}
        />
      </Box>
    </Flex>
  );
};

export default AuthPage;
