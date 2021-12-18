import { FC } from "react";
import { motion } from "framer-motion";
import { ImPencil, ImList2 } from "react-icons/im";

import styles from "./StartPageButtons.module.css";

interface IStartPageButtonsProps {
  onTopButtonClick: () => void;
  topButtonText: string;
  topButtonArialLabel: string;
  topButtonDisabled?: boolean;

  onBottomButtonClick: () => void;
  bottomButtonText: string;
  bottomButtonArialLabel: string;
  bottomButtonDisabled?: boolean;
}

const StartPageButtons: FC<IStartPageButtonsProps> = ({
  onTopButtonClick,
  onBottomButtonClick,
  topButtonArialLabel,
  bottomButtonArialLabel,
  topButtonText,
  bottomButtonText,
  topButtonDisabled,
  bottomButtonDisabled,
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
        {topButtonText}
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ delay: 4.1, duration: 0.5, ease: "easeIn" }}
          className={styles.icon}
        >
          <ImPencil />
        </motion.span>
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
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ delay: 4.1, duration: 0.5, ease: "easeIn" }}
          className={styles.icon}
        >
          <ImList2 />
        </motion.span>
        {bottomButtonText}
      </motion.button>
    </motion.div>
  );
};

export default StartPageButtons;
