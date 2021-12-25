import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { ImPencil, ImList2 } from "react-icons/im";

import { authStore } from "store/authStore";

import Paths from "const/path";

import { checkIfObjectEmpty } from "helpers/checkIfObjectEmpty";

import PageLayout from "components/PageLayout/PageLayout";

const StartPage: FC<{}> = (): JSX.Element => {
  const navigation = useNavigate();
  const { userData } = authStore();

  const onCreateNewQuizButtonClick = () => {
    if (!checkIfObjectEmpty(userData)) {
      navigation(Paths.QuizCreator);
    } else {
      navigation(Paths.AuthPage);
    }
  };

  const onAllQuizzesButtonClick = () => {
    navigation(Paths.QuizzesPage);
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
