import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { ImPencil, ImList2 } from "react-icons/im";

import Paths from "const/path";

import PageLayout from "components/PageLayout/PageLayout";

const StartPage: FC<{}> = (): JSX.Element => {
  const navigation = useNavigate();

  const onCreateNewQuizButtonClick = () => {
    navigation(Paths.AuthPage);
  };

  const onAllQuizzesButtonClick = () => {
    navigation(Paths.AllQuizzesPage);
  };

  return (
    <PageLayout
      pageTitle="Quiz Creator"
      onTopButtonClick={onCreateNewQuizButtonClick}
      topButtonText="Create new quiz"
      topButtonArialLabel="Create new quiz button"
      topButtonIcon={<ImPencil />}
      onBottomButtonClick={onAllQuizzesButtonClick}
      bottomButtonText="All quizzes"
      bottomButtonArialLabel="All quizzes button"
      bottomButtonIcon={<ImList2 />}
    />
  );
};

export default StartPage;
