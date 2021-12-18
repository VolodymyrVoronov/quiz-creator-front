import { FC } from "react";
import { Flex, Box, Text } from "bumbag";

const StartPage: FC<{}> = (): JSX.Element => {
  return (
    <Flex
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      height="100vh"
    >
      <Box>
        <Text fontSize="36px" fontWeight="bold">
          Quiz Creator
        </Text>
      </Box>
      <Box>Buttons</Box>
    </Flex>
  );
};

export default StartPage;
