import { FC } from "react";
import ReactDOM from "react-dom";

const BackButton: FC<{}> = (): JSX.Element => {
  const portalContainer = document.getElementById("back-button") as HTMLElement;

  return ReactDOM.createPortal(<div></div>, portalContainer);
};

export default BackButton;
