import { useEffect } from "react";
import {
  ToastCheckIcon,
  ToastStyled,
  ToastButtonX,
  ToastXIcon,
} from "./notificationToast.styled";

interface NotificationToastProps {
  title: string;
  isToastActive: boolean;
  setIsToastActive: (e: boolean) => void;
}

const NotificationToast = ({
  title,
  isToastActive,
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

  if (isToastActive) {
    return (
      <ToastStyled>
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
    );
  }
  return null;
};

export default NotificationToast;
