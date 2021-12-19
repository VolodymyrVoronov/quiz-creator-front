import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { ImPencil, ImList2 } from "react-icons/im";

import Paths from "const/path";

import Page from "components/Page/Page";

const StartPage: FC<{}> = (): JSX.Element => {
  const navigation = useNavigate();

  const onCreateNewQuizButtonClick = () => {
    navigation(Paths.AuthPage);
  };

  const onAllQuizzesButtonClick = () => {};

  return (
    <Page
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
