import { FC } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "bumbag";
import { ImArrowLeft2 } from "react-icons/im";

import styles from "./BackButton.module.css";

interface IBackButtonProps {
  routeName: string;
}

const BackButton: FC<IBackButtonProps> = ({ routeName }): JSX.Element => {
  const portalContainer = document.getElementById("back-button") as HTMLElement;

  return ReactDOM.createPortal(
    <motion.div
      initial={{ y: -200 }}
      animate={{ y: 0 }}
      transition={{ ease: "easeOut", duration: 2 }}
      className={styles.backButton}
    >
      <Link to={routeName}>
        <Button
          palette="primary"
          borderRadius="50%"
          color="white"
          aria-label="Back button"
        >
          <ImArrowLeft2 />
        </Button>
      </Link>
    </motion.div>,
    portalContainer
  );
};

export default BackButton;
