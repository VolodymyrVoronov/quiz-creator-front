import { FC } from "react";
import { Flex, Box, Text } from "bumbag";

import StartPageButtons from "components/StartPageButtons/StartPageButtons";

const StartPage: FC<{}> = (): JSX.Element => {
  return (
    <Flex
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      height="100vh"
    >
      <Box>
        <Text fontSize="56px" fontWeight="bold">
          Quiz Creator
        </Text>
      </Box>
      <Box marginTop="25px">
        <StartPageButtons />
      </Box>
    </Flex>
  );
};

export default StartPage;
