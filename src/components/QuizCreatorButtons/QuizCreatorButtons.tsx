import { FC, Fragment } from "react";
import { Set } from "bumbag";

import QuizCreatorButton from "components/QuizCreatorButton/QuizCreatorButton";

interface IQuizCreatorButtonsProps {
  editingMode: boolean;
  onEditButtonClick: () => void;
  onSaveButtonClick: () => void;
  onCancelButtonClick: () => void;
  onClearButtonClick: () => void;
  isButtonDisabled: boolean;
  mt?: any;
  mr?: any;
  ml?: any;
  mb?: any;
}

const QuizCreatorButtons: FC<IQuizCreatorButtonsProps> = ({
  editingMode,
  onEditButtonClick,
  onSaveButtonClick,
  onCancelButtonClick,
  onClearButtonClick,
  isButtonDisabled,
  mt = "5px",
  mr,
  ml,
  mb,
}): JSX.Element => {
  return (
    <Set
      marginTop={mt}
      marginRight={mr}
      marginLeft={ml}
      marginBottom={mb}
      flexWrap="nowrap"
    >
      <QuizCreatorButton
        isButtonDisabled={editingMode}
        onClick={onEditButtonClick}
        size="small"
        buttonText="Edit"
      />

      {editingMode && (
        <Fragment>
          <QuizCreatorButton
            onClick={onSaveButtonClick}
            size="small"
            palette="success"
            color="white"
            isButtonDisabled={isButtonDisabled}
            buttonText="Save"
          />

          <QuizCreatorButton
            onClick={onCancelButtonClick}
            size="small"
            palette="secondary"
            buttonText="Cancel"
          />

          <QuizCreatorButton
            onClick={onClearButtonClick}
            size="small"
            palette="warning"
            isButtonDisabled={isButtonDisabled}
            buttonText="Clear"
          />
        </Fragment>
      )}
    </Set>
  );
};

export default QuizCreatorButtons;
