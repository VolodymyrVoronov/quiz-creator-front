import { FC, ReactNode } from "react";
import { motion } from "framer-motion";
import { Text } from "bumbag";

import styles from "./DoubleButtons.module.css";

interface IDoubleButtonsProps {
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

const DoubleButtons: FC<IDoubleButtonsProps> = ({
  onTopButtonClick,
  onBottomButtonClick,
  topButtonArialLabel,
  bottomButtonArialLabel,
  topButtonText,
  bottomButtonText,
  topButtonDisabled,
  bottomButtonDisabled,
  topButtonIcon,
  bottomButtonIcon,
}): JSX.Element => {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ delay: 3.1, duration: 1, ease: "easeIn" }}
      className={styles.buttonsContainer}
    >
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ x: [-550, 100, 0], opacity: 1 }}
        transition={{ duration: 3 }}
        className={`${styles.button} ${styles.topButton}`}
        type="button"
        onClick={onTopButtonClick}
        aria-label={topButtonArialLabel}
        disabled={topButtonDisabled}
      >
        <Text>{topButtonText}</Text>

        {topButtonIcon && (
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ delay: 4.1, duration: 0.5, ease: "easeIn" }}
            className={styles.icon}
          >
            {topButtonIcon}
          </motion.span>
        )}
      </motion.button>
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ x: [550, -100, 0], opacity: 1 }}
        transition={{ duration: 3 }}
        className={`${styles.button} ${styles.bottomButton}`}
        type="button"
        onClick={onBottomButtonClick}
        aria-label={bottomButtonArialLabel}
        disabled={bottomButtonDisabled}
      >
        {bottomButtonIcon && (
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ delay: 4.1, duration: 0.5, ease: "easeIn" }}
            className={styles.icon}
          >
            {bottomButtonIcon}
          </motion.span>
        )}

        <Text>{bottomButtonText}</Text>
      </motion.button>
    </motion.div>
  );
};

export default DoubleButtons;
