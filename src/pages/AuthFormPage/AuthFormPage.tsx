import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Flex, Input, Text, Stack, Set, Button } from "bumbag";
import { motion } from "framer-motion";

import authStore from "store/authStore";

import Paths from "const/path";

import BackButton from "components/common/BackButton/BackButton";

interface IFormState {
  email: string;
  password: string;
  passwordConfirm?: string;
}

const AuthFormPage: FC<{}> = (): JSX.Element => {
  const navigation = useNavigate();

  const initialFormState = authStore.isSignInForm
    ? {
        email: "",
        password: "",
      }
    : {
        email: "",
        password: "",
        passwordConfirm: "",
      };

  const [formData, setFormData] = useState<IFormState>(initialFormState);

  useEffect(() => {
    if (authStore.isSignInForm === undefined) {
      navigation(Paths.AuthPage);
    }
  }, [navigation]);

  const onFormInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const onCancelButtonClick = () => {
    setFormData(initialFormState);
  };

  const onAuthButtonClick = () => {
    console.log(formData);
  };

  const isFormFieldsEmpty = authStore.isSignInForm
    ? formData.email.length === 0 || formData.password.length === 0
    : formData.email.length === 0 ||
      formData.password.length === 0 ||
      formData.passwordConfirm?.length === 0;

  return (
    <motion.div
      initial={{ x: -500, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ ease: "easeOut", duration: 2 }}
    >
      <Flex
        flexDirection="row"
        justifyContent="center"
        paddingY={{
          "min-mobile": "75px",
          "min-desktop": "100px",
          "min-fullHD": "150px",
        }}
        paddingX={{
          "min-mobile": "10px",
          "min-desktop": "25px",
          "min-fullHD": "50px",
        }}
      >
        <BackButton routeName={Paths.AuthPage} />
        <Card width="600px" variant="shadowed">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "easeOut", duration: 1 }}
          >
            <Text
              fontSize={{
                "min-mobile": "26px",
                "min-desktop": "38px",
                "min-fullHD": "48px",
              }}
              fontWeight="bold"
            >
              {authStore.isSignInForm ? "Sign In" : "Sign Up"}
            </Text>
          </motion.span>
          <Flex flexDirection="column" marginTop="25px">
            <Stack spacing="minor-5" orientation="vertical">
              <Input
                onChange={onFormInputChange}
                value={formData.email}
                label="Email"
                name="email"
                type="text"
                width="100%"
                size="medium"
                isRequired
              />

              <Input
                onChange={onFormInputChange}
                value={formData.password}
                label="Password"
                name="password"
                type="password"
                width="100%"
                size="medium"
                isRequired
              />

              {!authStore.isSignInForm ? (
                <Input
                  onChange={onFormInputChange}
                  value={formData.passwordConfirm}
                  label="Confirm password"
                  name="passwordConfirm"
                  type="password"
                  width="100%"
                  size="medium"
                  isRequired
                />
              ) : null}

              <Set spacing="minor-4" orientation="horizontal">
                <Button
                  onClick={onCancelButtonClick}
                  palette="danger"
                  color="white"
                  type="button"
                  flexGrow="1"
                  isLoading={false}
                  disabled={isFormFieldsEmpty}
                >
                  Cancel
                </Button>
                <Button
                  onClick={onAuthButtonClick}
                  palette="primary"
                  color="white"
                  type="button"
                  flexGrow="1"
                  isLoading={false}
                  disabled={isFormFieldsEmpty}
                >
                  {authStore.isSignInForm ? "Sign In" : "Sign Up"}
                </Button>
              </Set>
            </Stack>
          </Flex>
        </Card>
      </Flex>
    </motion.div>
  );
};

export default AuthFormPage;
