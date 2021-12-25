import { FC, useEffect } from "react";
import { motion } from "framer-motion";
import { Container, Flex } from "bumbag";

import { quizStore } from "store/quizStore";
import { authStore } from "store/authStore";

import Paths from "const/path";

import Loader from "components/common/Loader/Loader";
import QuizCard from "components/QuizCard/QuizCard";
import BackButton from "components/common/BackButton/BackButton";

const AllQuizzesPage: FC<{}> = (): JSX.Element => {
  const { fetchAllQuizzes, quizzes, isLoading, errorMessage } = quizStore();
  const { userData } = authStore();

  useEffect(() => {
    fetchAllQuizzes();
  }, [fetchAllQuizzes]);

  return (
    <motion.div
      initial={{ x: -500, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ ease: "easeOut", duration: 2 }}
    >
      <BackButton routeName={Paths.StartPage} />
      <Container display="flex" justifyContent="center">
        {isLoading ? (
          <Loader />
        ) : (
          <Flex
            flexDirection="row"
            flexWrap="wrap"
            width="1200px"
            paddingY={{
              "min-mobile": "75px",
              "min-desktop": "100px",
              "min-fullHD": "100px",
            }}
            paddingX={{
              "min-mobile": "10px",
            }}
          >
            {quizzes.map((quiz) => {
              const { _id, id, userId, quizTitle } = quiz;
              console.log(quiz);

              return (
                <QuizCard
                  key={id}
                  quizDbId={_id}
                  quizId={id}
                  userQuizId={userId}
                  quizTitle={quizTitle}
                  userData={userData}
                />
              );
            })}
          </Flex>
        )}
      </Container>
    </motion.div>
  );
};

export default AllQuizzesPage;
