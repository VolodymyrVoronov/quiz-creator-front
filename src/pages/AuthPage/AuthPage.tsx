import { FC, memo } from "react";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { ImEnter, ImKey2 } from "react-icons/im";

import quizzesStore from "store/quizzesStore";

import Paths from "const/path";

import BackButton from "components/common/BackButton/BackButton";
import PageLayout from "components/PageLayout/PageLayout";

const AuthPage: FC<{}> = observer((): JSX.Element => {
  const navigation = useNavigate();

  const onSingInButtonClick = () => {
    quizzesStore.setTypeOfAuthForm(true);

    navigation(Paths.AuthFormPage);
  };

  const onSingUpButtonClick = () => {
    quizzesStore.setTypeOfAuthForm(false);

    navigation(Paths.AuthFormPage);
  };

  return (
    <>
      <BackButton routeName={Paths.StartPage} />
      <PageLayout
        pageTitle="Authentication"
        onTopButtonClick={onSingInButtonClick}
        topButtonText="Sign in"
        topButtonArialLabel="Sign in button"
        topButtonIcon={<ImEnter />}
        onBottomButtonClick={onSingUpButtonClick}
        bottomButtonText="Sign up"
        bottomButtonArialLabel="Sign up button"
        bottomButtonIcon={<ImKey2 />}
      />
    </>
  );
});

export default memo(AuthPage);
