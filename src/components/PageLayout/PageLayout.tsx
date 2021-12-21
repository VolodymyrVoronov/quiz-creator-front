import { FC, ReactNode } from "react";
import { Box, Flex, Text } from "bumbag";
import { motion } from "framer-motion";

import DoubleButtons from "components/DoubleButtons/DoubleButtons";

interface IPageLayoutProps {
  pageTitle: string;

  onTopButtonClick: () => void;
  topButtonText: string;
  topButtonArialLabel: string;
  topButtonDisabled?: boolean;
  topButtonIcon?: ReactNode;

  onBottomButtonClick: () => void;
  bottomButtonText: string;
  bottomButtonArialLabel: string;
  bottomButtonDisabled?: boolean;
  bottomButtonIcon?: ReactNode;
}

const PageLayout: FC<IPageLayoutProps> = ({
  pageTitle,

  onTopButtonClick,
  topButtonText,
  topButtonArialLabel,
  topButtonIcon,

  onBottomButtonClick,
  bottomButtonText,
  bottomButtonArialLabel,
  bottomButtonIcon,
}): JSX.Element => {
  return (
    <Flex
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      height="100%"
      paddingY="25px"
      paddingTop={{
        "min-mobile": "75px",
        "min-desktop": "150px",
        "min-fullHD": "140px",
      }}
    >
      <Box>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "easeOut", duration: 2, delay: 4 }}
        >
          <Text
            fontSize={{
              "min-mobile": "36px",
              "min-desktop": "48px",
              "min-fullHD": "56px",
            }}
            fontWeight="bold"
          >
            {pageTitle}
          </Text>
        </motion.span>
      </Box>
      <Box marginTop="25px">
        <DoubleButtons
          onTopButtonClick={onTopButtonClick}
          topButtonText={topButtonText}
          topButtonArialLabel={topButtonArialLabel}
          topButtonIcon={topButtonIcon}
          onBottomButtonClick={onBottomButtonClick}
          bottomButtonText={bottomButtonText}
          bottomButtonArialLabel={bottomButtonArialLabel}
          bottomButtonIcon={bottomButtonIcon}
        />
      </Box>
    </Flex>
  );
};

export default PageLayout;
