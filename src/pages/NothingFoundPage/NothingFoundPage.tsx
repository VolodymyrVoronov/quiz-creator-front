import { FC } from "react";
import { motion } from "framer-motion";
import { Flex } from "bumbag";

import Paths from "const/path";

import NothingFound from "components/common/NothingFound/NothingFound";
import BackButton from "components/common/BackButton/BackButton";

const NothingFoundPage: FC<{}> = (): JSX.Element => {
  return (
    <motion.div
      initial={{ x: -500, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ ease: "easeOut", duration: 2 }}
    >
      <Flex
        flexDirection="row"
        justifyContent="center"
        paddingY={{
          "min-mobile": "75px",
          "min-desktop": "100px",
          "min-fullHD": "150px",
        }}
        paddingX={{
          "min-mobile": "10px",
          "min-desktop": "25px",
          "min-fullHD": "50px",
        }}
      >
        <BackButton routeName={Paths.StartPage} />

        <NothingFound text="Page not found" />
      </Flex>
    </motion.div>
  );
};

export default NothingFoundPage;
