import { FC } from "react";
import { Flex, Text } from "bumbag";

import styles from "./NothingFound.module.css";

interface INothingFoundProps {
  text: string;
}

const NothingFound: FC<INothingFoundProps> = ({ text }): JSX.Element => {
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      marginTop="25px"
      paddingY="25px"
      paddingX="50px"
      backgroundColor="primary"
      borderRadius="25px"
      style={{
        margin: "0 auto",
      }}
      altitude="400"
    >
      <Text
        marginTop="15px"
        fontSize={{
          "min-mobile": "22px",
          "min-desktop": "26px",
          "min-fullHD": "30px",
        }}
        textAlign="center"
        color="white"
      >
        {text}
      </Text>
      <div className={styles.animationContainer}>
        <span className={styles.loader}></span>
      </div>
    </Flex>
  );
};

export default NothingFound;
