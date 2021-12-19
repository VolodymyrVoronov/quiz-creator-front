import { FC } from "react";
import { ImEnter, ImKey2 } from "react-icons/im";

import Paths from "const/path";

import BackButton from "components/common/BackButton/BackButton";
import PageLayout from "components/PageLayout/PageLayout";

const AuthPage: FC<{}> = (): JSX.Element => {
  const onSingInButtonClick = () => {};

  const onSingUpButtonClick = () => {};

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

export default AuthPage;
