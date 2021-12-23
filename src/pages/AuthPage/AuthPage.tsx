import { FC, memo } from "react";
import { useNavigate } from "react-router-dom";
import { ImEnter, ImKey2 } from "react-icons/im";

import { authStore } from "store/authStore";

import Paths from "const/path";

import BackButton from "components/common/BackButton/BackButton";
import PageLayout from "components/PageLayout/PageLayout";

const AuthPage: FC<{}> = (): JSX.Element => {
  const navigation = useNavigate();

  const { setTypeOfAuthForm } = authStore();

  const onSingInButtonClick = () => {
    setTypeOfAuthForm(true);

    navigation(Paths.AuthFormPage);
  };

  const onSingUpButtonClick = () => {
    setTypeOfAuthForm(false);

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
};

export default memo(AuthPage);
