import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Flex,
  Input,
  Text,
  Stack,
  Set,
  Button,
  Box,
  Avatar,
  Divider,
} from "bumbag";
import { motion } from "framer-motion";
import { ImEnvelop, ImLock, ImUser } from "react-icons/im";

import { authStore } from "store/authStore";
import { appStore } from "store/appStore";

import Paths from "const/path";

import BackButton from "components/common/BackButton/BackButton";

interface IFormState {
  avatar?: string;
  email: string;
  password: string;
  passwordConfirm?: string;
}

const AuthFormPage: FC<{}> = (): JSX.Element => {
  const navigation = useNavigate();

  const {
    isSignInForm,
    isAuthorizing,
    errorMessage,
    signIn,
    signUp,
    setErrorMassageToDefault,
  } = authStore();
  const { avatars } = appStore();

  const initialFormState = isSignInForm
    ? {
        email: "",
        password: "",
      }
    : {
        avatar: "",
        email: "",
        password: "",
        passwordConfirm: "",
      };

  const [formData, setFormData] = useState<IFormState>(initialFormState);

  useEffect(() => {
    if (isSignInForm === undefined) {
      navigation(Paths.AuthPage);
    }
  }, []);

  useEffect(() => {
    const onKeyPress = (e: { keyCode: number }) => {
      if (e.keyCode === 27) {
        setFormData(initialFormState);
      }
    };

    window.addEventListener("keydown", onKeyPress);

    return () => {
      window.removeEventListener("keydown", onKeyPress);
    };
  }, []);

  const onFormInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const onAvatarClick = (avatarStr: string) => {
    setFormData({
      ...formData,
      avatar: avatarStr,
    });
  };

  const onAvatarEnterKeyPress = (e: { keyCode: number }, avatarStr: string) => {
    if (e.keyCode === 13) {
      setFormData({
        ...formData,
        avatar: avatarStr,
      });
    }
  };

  const onCancelButtonClick = () => {
    setFormData(initialFormState);
  };

  const onAuthButtonClick = () => {
    if (isSignInForm) {
      signIn(formData, navigation);
    } else {
      signUp(formData, navigation);
    }
  };

  const onBackButtonClick = () => {
    setErrorMassageToDefault();
  };

  const areFormFieldsEmpty = isSignInForm
    ? formData.email.length === 0 || formData.password.length === 0
    : formData.email.length === 0 ||
      formData.password.length === 0 ||
      formData.passwordConfirm?.length === 0 ||
      formData.avatar?.length === 0;

  const isOneOfTheFormFieldEmpty = isSignInForm
    ? formData.email.length === 0 && formData.password.length === 0
    : formData.email.length === 0 &&
      formData.password.length === 0 &&
      formData.passwordConfirm?.length === 0 &&
      formData.avatar?.length === 0;

  const arePasswordsMatch = formData.password === formData.passwordConfirm;

  return (
    <motion.div
      initial={{ x: -500, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ ease: "easeOut", duration: 2 }}
    >
      <BackButton routeName={Paths.AuthPage} onClick={onBackButtonClick} />
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
              {isSignInForm ? "Sign In" : "Sign Up"}
            </Text>
          </motion.span>

          <Divider marginTop="10px" />

          <Flex flexDirection="column" marginTop="25px">
            {!isSignInForm ? (
              <Flex flexDirection="row" marginBottom="15px">
                <Flex
                  flexDirection="column"
                  justifyContent="flex-start"
                  alignItems="center"
                  marginRight="25px"
                  width="50%"
                >
                  <Text
                    marginBottom="10px"
                    fontSize={{
                      "min-mobile": "18px",
                      "min-desktop": "22px",
                      "min-fullHD": "24px",
                    }}
                    lineHeight="26px"
                  >
                    Avatar
                  </Text>
                  <Flex justifyContent="center">
                    {formData.avatar ? (
                      <Avatar
                        fit="cover"
                        height="75px"
                        width="75px"
                        src={formData.avatar}
                        alt="User Avatar"
                        backgroundColor="white"
                      />
                    ) : (
                      <Box fontSize="60px" data-testid="test-avatar">
                        <ImUser />
                      </Box>
                    )}
                  </Flex>
                </Flex>

                <Flex>
                  <Flex flexDirection="row" flexWrap="wrap">
                    {avatars.map((avatarItem, i) => {
                      const { id, avatar, imageAlt } = avatarItem;
                      return (
                        <motion.span
                          key={id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{
                            ease: "easeOut",
                            duration: 1,
                            delay: i / 5,
                          }}
                        >
                          <Avatar
                            onClick={() => onAvatarClick(avatar)}
                            onKeyDown={(e) => onAvatarEnterKeyPress(e, avatar)}
                            fit="cover"
                            height="50px"
                            width="50px"
                            src={avatar}
                            alt={imageAlt}
                            backgroundColor="white"
                            transition="250ms ease"
                            _hover={{
                              cursor: "pointer",
                              transition: "250ms ease",
                              transform: "scale(1.1)",
                            }}
                            tabIndex={0}
                            margin={{
                              "min-mobile": "2px",
                              "min-tablet": "3px",
                              "min-desktop": "8px",
                              "min-widescreen": "11px",
                              "min-fullHD": "11px",
                            }}
                          />
                        </motion.span>
                      );
                    })}
                  </Flex>
                </Flex>
              </Flex>
            ) : null}

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
                after={
                  <Box alignY="center" alignX="center" marginX="15px">
                    <ImEnvelop />
                  </Box>
                }
                aria-label="Email field"
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
                after={
                  <Box
                    alignY="center"
                    alignX="center"
                    marginX="11px"
                    color={
                      !isSignInForm
                        ? arePasswordsMatch && formData.password.length > 0
                          ? "#67C6B9"
                          : formData.password.length > 0
                          ? "#F3705B"
                          : "#435B6C"
                        : "#435B6C"
                    }
                  >
                    <ImLock />
                  </Box>
                }
                aria-label="Password field"
              />

              {!isSignInForm ? (
                <Input
                  onChange={onFormInputChange}
                  value={formData.passwordConfirm}
                  label="Confirm password"
                  name="passwordConfirm"
                  type="password"
                  width="100%"
                  size="medium"
                  isRequired
                  after={
                    <Box
                      alignY="center"
                      alignX="center"
                      marginX="11px"
                      color={
                        !isSignInForm &&
                        formData.passwordConfirm &&
                        arePasswordsMatch &&
                        formData.passwordConfirm?.length > 0
                          ? "#67C6B9"
                          : formData.password.length > 0
                          ? "#F3705B"
                          : "#435B6C"
                      }
                    >
                      <ImLock />
                    </Box>
                  }
                  aria-label="Confirm password field"
                />
              ) : null}

              <Set spacing="minor-4" orientation="horizontal">
                <Button
                  onClick={onCancelButtonClick}
                  palette="danger"
                  color="white"
                  type="button"
                  flexGrow="1"
                  disabled={isOneOfTheFormFieldEmpty}
                  aria-label="Clear all fields"
                >
                  Cancel
                </Button>
                <Button
                  onClick={onAuthButtonClick}
                  palette="primary"
                  color="white"
                  type="button"
                  flexGrow="1"
                  isLoading={isAuthorizing}
                  disabled={areFormFieldsEmpty}
                  aria-label={isSignInForm ? "Sign In" : "Sign Up"}
                >
                  {isSignInForm ? "Sign In" : "Sign Up"}
                </Button>
              </Set>
            </Stack>
          </Flex>

          {errorMessage ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ease: "easeOut", duration: 2 }}
            >
              <Box marginTop="10px">
                <Text fontWeight={400} color="danger">
                  {errorMessage}
                </Text>
              </Box>
            </motion.div>
          ) : null}
        </Card>
      </Flex>
    </motion.div>
  );
};

export default AuthFormPage;
