import { useEffect } from "react";
import ModalPortal from "../modal/ModalPortal";
import {
  ToastCheckIcon,
  ToastStyled,
  ToastButtonX,
  ToastXIcon,
} from "./notificationToast.styled";

interface NotificationToastProps {
  title: string;
  isToastActive: boolean;
  errorTitle: string;
  isErrorActive: boolean;
  setIsToastActive: (e: boolean) => void;
}

const NotificationToast = ({
  title,
  isToastActive,
  errorTitle,
  isErrorActive,
  setIsToastActive,
}: NotificationToastProps) => {
  const handleClick = () => {
    setIsToastActive(false);
  };

  useEffect(() => {
    if (isToastActive === false) return;

    const idSetTimeout = setTimeout(() => {
      setIsToastActive(false);
    }, 5000);

    return () => {
      clearTimeout(idSetTimeout);
    };
  }, [isToastActive]);

  useEffect(() => {
    if (isErrorActive === false) return;

    const idSetTimeout = setTimeout(() => {
      setIsToastActive(false);
    }, 5000);

    return () => {
      clearTimeout(idSetTimeout);
    };
  }, [isErrorActive]);

  if (isToastActive) {
    return (
      <ModalPortal modalRootId="modal-toast-root">
        <ToastStyled id="toast-box" isError={false}>
          <ToastCheckIcon>
            <img src="./img/icon-check.png" alt="Aprobado" />
          </ToastCheckIcon>
          <p>{title}</p>
          <ToastButtonX onClick={handleClick}>
            <ToastXIcon>
              <img src="./img/icon-x.png" alt="Aprobado" />
            </ToastXIcon>
          </ToastButtonX>
        </ToastStyled>
      </ModalPortal>
    );
  }

  if (isErrorActive) {
    return (
      <ModalPortal modalRootId="modal-toast-root">
        <ToastStyled id="toast-box" isError={true}>
          <ToastCheckIcon>
            <img src="./img/icon-error.png" alt="Error" />
          </ToastCheckIcon>
          <p>{errorTitle}</p>
          <ToastButtonX onClick={handleClick}>
            <ToastXIcon>
              <img src="./img/icon-x.png" alt="Error" />
            </ToastXIcon>
          </ToastButtonX>
        </ToastStyled>
      </ModalPortal>
    );
  }

  return null;
};

export default NotificationToast;
