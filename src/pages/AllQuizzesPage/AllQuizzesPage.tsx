import { FC, Fragment, useEffect } from "react";
import { motion } from "framer-motion";
import { Container, Flex, Tag } from "bumbag";

import { quizStore } from "store/quizStore";
import { authStore } from "store/authStore";

import Paths from "const/path";

import Loader from "components/common/Loader/Loader";
import QuizCard from "components/QuizCard/QuizCard";
import BackButton from "components/common/BackButton/BackButton";
import NothingFound from "components/common/NothingFound/NothingFound";

const AllQuizzesPage: FC<{}> = (): JSX.Element => {
  const { fetchAllQuizzes, quizzes, isLoading, successMessage, errorMessage } =
    quizStore();
  const { userData } = authStore();

  useEffect(() => {
    fetchAllQuizzes();
  }, [fetchAllQuizzes]);

  return (
    <Fragment>
      <BackButton routeName={Paths.StartPage} />
      {errorMessage && (
        <Flex
          position="absolute"
          display="flex"
          justifyContent="center"
          left="50%"
          top="5%"
          transform="translate(-50%, -50%)"
        >
          <Tag palette="danger" size="medium" color="white">
            {errorMessage}
          </Tag>
        </Flex>
      )}

      {successMessage && (
        <Flex
          position="absolute"
          display="flex"
          justifyContent="center"
          left="50%"
          top="5%"
          transform="translate(-50%, -50%)"
        >
          <Tag palette="success" size="medium" color="white">
            {successMessage}
          </Tag>
        </Flex>
      )}

      {isLoading ? (
        <Loader />
      ) : (
        <motion.div
          initial={{ x: -500, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ ease: "easeOut", duration: 2 }}
        >
          <Container display="flex" justifyContent="center">
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
              {!errorMessage && quizzes.length === 0 && (
                <NothingFound text="There aren't any quizzes yet. Create one." />
              )}
              {quizzes.map((quiz) => {
                const { _id, id, userId, userAvatar, quizTitle, questions } =
                  quiz;

                return (
                  <QuizCard
                    key={id}
                    quizDbId={_id}
                    quizId={id}
                    userQuizId={userId}
                    userQuizAvatar={userAvatar}
                    quizTitle={quizTitle}
                    userData={userData}
                    questions={questions}
                  />
                );
              })}
            </Flex>
          </Container>
        </motion.div>
      )}
    </Fragment>
  );
};

export default AllQuizzesPage;
