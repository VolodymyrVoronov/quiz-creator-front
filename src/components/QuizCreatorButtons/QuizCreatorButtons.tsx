import { FC, Fragment } from "react";
import { Button, Set } from "bumbag";

interface IQuizCreatorButtonsProps {
  editingMode: boolean;
  onEditButtonClick: () => void;
  onSaveButtonClick: () => void;
  onCancelButtonClick: () => void;
  onClearButtonClick: () => void;
  isButtonDisabled: boolean;
}

const QuizCreatorButtons: FC<IQuizCreatorButtonsProps> = ({
  editingMode,
  onEditButtonClick,
  onSaveButtonClick,
  onCancelButtonClick,
  onClearButtonClick,
  isButtonDisabled,
}): JSX.Element => {
  return (
    <Set marginTop="5px">
      <Button disabled={editingMode} onClick={onEditButtonClick} size="small">
        Edit
      </Button>

      {editingMode && (
        <Fragment>
          <Button
            onClick={onSaveButtonClick}
            size="small"
            palette="success"
            color="white"
            disabled={isButtonDisabled}
          >
            Save
          </Button>
          <Button
            onClick={onCancelButtonClick}
            size="small"
            palette="secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={onClearButtonClick}
            size="small"
            palette="danger"
            color="white"
            disabled={isButtonDisabled}
          >
            Clear
          </Button>
        </Fragment>
      )}
    </Set>
  );
};

export default QuizCreatorButtons;
