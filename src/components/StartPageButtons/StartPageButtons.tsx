import { FC } from "react";
import { motion } from "framer-motion";

import styles from "./StartPageButtons.module.css";

interface IStartPageButtonsProps {
  onClickTopButton?: () => void;
  topButtonText?: string;
  topButtonArialLabel?: string;

  onClickBottomButton?: () => void;
  bottomButtonText?: string;
  bottomButtonArialLabel?: string;
}

const StartPageButtons: FC<IStartPageButtonsProps> = ({
  onClickTopButton,
  onClickBottomButton,
  topButtonArialLabel,
  bottomButtonArialLabel,
  topButtonText,
  bottomButtonText,
}): JSX.Element => {
  return (
    <div className={styles.buttonsContainer}>
      <button className={`${styles.button} ${styles.topButton}`} type="button">
        Create new Quiz
        <span>😀</span>
      </button>
      <button
        className={`${styles.button} ${styles.bottomButton}`}
        type="button"
      >
        <span>😀</span>
        All quizzes
      </button>
    </div>
  );
};

export default StartPageButtons;
