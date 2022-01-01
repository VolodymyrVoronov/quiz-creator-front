import { FC, Fragment, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Container,
  Divider,
  Flex,
  Heading,
  Set,
  Spinner,
  Tag,
  Text,
} from "bumbag";
import { ImPlus } from "react-icons/im";
import { motion } from "framer-motion";

import { quizCreatorStore } from "store/quizCreatorStore";

import Paths from "const/path";

import QuizCreatorTitleEditor from "components/QuizCreatorTitleEditor/QuizCreatorTitleEditor";
import QuizCreatorQuestionEditor from "components/QuizCreatorQuestionEditor/QuizCreatorQuestionEditor";
import BackButton from "components/common/BackButton/BackButton";
import QuizCreatorButton from "components/QuizCreatorButton/QuizCreatorButton";

const QuizCreatorPage: FC<{}> = (): JSX.Element => {
  const navigation = useNavigate();
  const {
    createNewQuiz,
    addNewQuestion,
    saveQuiz,
    quiz,
    isLoading,
    successMessage,
    errorMessage,
    isQuizValid,
  } = quizCreatorStore();

  const divRef = useRef<null | HTMLElement>(null);

  const onCrateNewQuizButtonClick = () => {
    createNewQuiz();
  };

  const onAddNewQuestionButtonClick = () => {
    addNewQuestion(quiz[0].id);

    if (divRef.current) {
      const scrollTImeout = setTimeout(() => {
        divRef.current && divRef.current.scrollIntoView({ behavior: "smooth" });

        clearTimeout(scrollTImeout);
      }, 250);
    }
  };

  const onSaveQuizButtonClick = () => {
    saveQuiz(navigation);
  };

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.5,
      },
    },
  };

  const item = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div
      initial={{ x: -500, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ ease: "easeOut", duration: 2 }}
    >
      <BackButton routeName={Paths.StartPage} />
      <Container display="flex" justifyContent="center">
        <Flex
          flexDirection="column"
          justifyContent="center"
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
          <Card width="100%">
            <Heading use="h3" textAlign="center">
              Quiz Creator
            </Heading>
            {quiz.length === 0 && (
              <Flex justifyContent="center" marginTop="25px">
                <QuizCreatorButton
                  onClick={onCrateNewQuizButtonClick}
                  palette="primary"
                  color="white"
                >
                  Create new quiz
                  <Text display="flex" fontSize="14px" marginLeft="10px">
                    <ImPlus />
                  </Text>
                </QuizCreatorButton>
              </Flex>
            )}

            {quiz.length !== 0 && (
              <Flex width="100%" marginTop="25px" flexDirection="column">
                <QuizCreatorTitleEditor />

                <Divider marginY="25px" borderWidth="2px" />

                <motion.section
                  variants={container}
                  initial="hidden"
                  animate={quiz[0].questions.length > 0 && "visible"}
                >
                  {quiz[0].questions.map((questionItem) => {
                    const { id, question, options } = questionItem;

                    return (
                      <motion.article key={id} variants={item}>
                        <QuizCreatorQuestionEditor
                          questionId={id}
                          question={question}
                          options={options}
                          amountOfQuestions={quiz[0].questions.length}
                        />
                        <Divider marginY="25px" borderWidth="2px" />
                      </motion.article>
                    );
                  })}
                </motion.section>
              </Flex>
            )}
          </Card>
          {quiz.length !== 0 && (
            <Card width="100%" marginTop="15px" ref={divRef}>
              <Set spacing="minor-5">
                {!successMessage && (
                  <Fragment>
                    <QuizCreatorButton
                      onClick={onAddNewQuestionButtonClick}
                      palette="secondary"
                      buttonText="Add new question"
                      size="small"
                      w={{
                        "min-mobile": "100%",
                        "min-desktop": "auto",
                      }}
                      variant="outlined"
                    />
                    <QuizCreatorButton
                      onClick={onSaveQuizButtonClick}
                      palette="success"
                      buttonText="Save quiz"
                      size="small"
                      w={{
                        "min-mobile": "100%",
                        "min-desktop": "auto",
                      }}
                      variant="outlined"
                      isLoading={isLoading}
                      isButtonDisabled={!isQuizValid}
                    />
                  </Fragment>
                )}

                {successMessage && (
                  <Flex alignItems="center">
                    <Set>
                      <Tag palette="success" size="medium" color="white">
                        {successMessage}
                      </Tag>
                      <Text display="flex" alignItems="center">
                        Redirecting...&nbsp;&nbsp;
                        <Spinner color="success" />
                      </Text>
                    </Set>
                  </Flex>
                )}
                {errorMessage && (
                  <Tag palette="danger" size="medium" color="white">
                    {errorMessage}
                  </Tag>
                )}
              </Set>
            </Card>
          )}
        </Flex>
      </Container>
    </motion.div>
  );
};

export default QuizCreatorPage;
