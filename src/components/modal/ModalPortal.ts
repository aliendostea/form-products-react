import { useEffect, useRef, ReactNode, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import { createModalRootFunction } from "./createModalRoot";

interface ModalProps {
  children: ReactNode;
  modalRootId: string;
}

const ModalPortal = ({ children, modalRootId }: ModalProps) => {
  const [modalRoot, setModalRoot] = useState<any | null>(null);
  const el = useRef(document.createElement("div"));

  useEffect(() => {
    const current = el.current;

    if (!modalRoot) {
      return;
    }
    modalRoot!.appendChild(current);
    return () => void modalRoot!.removeChild(current);
  }, [modalRoot]);

  useLayoutEffect(() => {
    const element = createModalRootFunction(modalRootId);
    if (element === null) return;

    setModalRoot(element);
  }, []);

  return createPortal(children, el.current);
};

export default ModalPortal;
