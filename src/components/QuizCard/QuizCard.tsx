import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Box, Button, Card, Divider, Flex, Set } from "bumbag";

import { IUserData } from "store/authStore";
import { IQuestion, quizStore } from "store/quizStore";

import Paths from "const/path";

interface IQuizCardProps {
  quizDbId: string;
  quizId: string;
  userQuizId: string;
  userQuizAvatar: string;
  quizTitle: string;
  userData: IUserData;
  questions: IQuestion[];
}

const QuizCard: FC<IQuizCardProps> = ({
  quizDbId,
  quizId,
  userQuizId,
  userQuizAvatar,
  quizTitle,
  userData,
  questions,
}): JSX.Element => {
  const navigation = useNavigate();

  const { deleteQuiz, isDeleting, startQuiz } = quizStore();

  const onStartQuizButtonClick = (): void => {
    startQuiz(quizId);
    navigation(`${Paths.QuizzesPage}/quiz/${quizId}`);
  };

  const onDeleteQuizButtonClick = (): void => {
    deleteQuiz(quizDbId, quizId);
  };

  return (
    <Card
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      width={{
        "min-mobile": "100%",
        "min-desktop": "100%",
        "min-fullHD": "48%",
      }}
      margin="1%"
      standalone
    >
      <Flex flexDirection="column">
        <Card.Header>
          <Card.Title
            fontSize={{
              "min-mobile": "16px",
              "min-desktop": "20px",
              "min-fullHD": "22px",
            }}
          >
            {quizTitle}
          </Card.Title>

          <Box alignSelf="flex-start" marginLeft="30px">
            <Avatar src={userQuizAvatar} alt="Avatar of quiz's author" />
          </Box>
        </Card.Header>
        <Card.Content>Questions: {questions.length}</Card.Content>
      </Flex>

      <Card.Footer>
        <Divider marginBottom="15px" />
        <Set>
          <Button
            onClick={onStartQuizButtonClick}
            palette="primary"
            color="white"
            size="small"
          >
            Start quiz
          </Button>
          {userQuizId === userData.id && (
            <Button
              onClick={onDeleteQuizButtonClick}
              palette="danger"
              color="white"
              size="small"
              isLoading={isDeleting}
            >
              Delete quiz
            </Button>
          )}
        </Set>
      </Card.Footer>
    </Card>
  );
};

export default QuizCard;
