import { createPortal } from "react-dom";
import { useEffect } from "react";
import { Overlay, Children } from "./Modal.styled";

const modalRoot: Element | null = document.querySelector("#modal-root")!;

interface IProps {
  children: JSX.Element;
  onClose: Function;
}

const Modal: React.FC<IProps> = ({ children, onClose }) => {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.code === "Escape") {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      return window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <Children>{children}</Children>
    </Overlay>,
    modalRoot
  );
};

export default Modal;
