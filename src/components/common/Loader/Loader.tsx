import { FC } from "react";
import { motion } from "framer-motion";

import styles from "./Loader.module.css";

const Loader: FC<{}> = (): JSX.Element => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeOut", duration: 1 }}
      className={styles.loaderContainer}
    >
      <span className={styles.loader}>Loading</span>
    </motion.div>
  );
};

export default Loader;
