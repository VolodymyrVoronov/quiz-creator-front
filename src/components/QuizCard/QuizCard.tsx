import { FC } from "react";

import { Card } from "bumbag";

import { IUserData } from "store/authStore";

interface IQuizCardProps {
  quizDbId: string;
  quizId: string;
  userQuizId: string;
  quizTitle: string;
  userData: IUserData;
}

const QuizCard: FC<IQuizCardProps> = ({
  quizDbId,
  quizId,
  userQuizId,
  quizTitle,
  userData,
}): JSX.Element => {
  return (
    <Card
      width={{
        "min-mobile": "100%",
        "min-desktop": "48%",
      }}
      margin="1%"
      standalone
    >
      <Card.Header>
        <Card.Title>{quizTitle}</Card.Title>
      </Card.Header>

      <Card.Content>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        diam ipsum, cursus id placerat congue, ultrices eget lectus. Duis
        posuere, lacus sed tristique commodo, sapien turpis mollis nunc,
        vestibulum consectetur lectus augue sit amet justo.
      </Card.Content>

      <Card.Footer>Button</Card.Footer>
    </Card>
  );
};

export default QuizCard;
