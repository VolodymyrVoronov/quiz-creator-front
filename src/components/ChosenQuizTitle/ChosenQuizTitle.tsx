import { FC } from "react";
import { Text } from "bumbag";

interface IChosenQuizTitleProps {
  titleText?: string;
}

const ChosenQuizTitle: FC<IChosenQuizTitleProps> = ({
  titleText,
}): JSX.Element => {
  return (
    <Text
      marginRight="20px"
      fontSize={{
        "min-mobile": "20px",
        "min-desktop": "28px",
        "min-fullHD": "38px",
      }}
      fontWeight="bold"
    >
      {titleText}
    </Text>
  );
};

export default ChosenQuizTitle;
