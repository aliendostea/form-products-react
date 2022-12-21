import { BtnClose, ModalParent, ModalStyle } from "./Modal.style";
import ModalPortal from "./ModalPortal";
import CloseIcon from "@mui/icons-material/Close";

interface ModalTypes {
  children: React.ReactElement;
  isModalActive: boolean;
  closeModal: () => void;
  onMouseDownModal: (e: any) => void;
  modalRef: React.MutableRefObject<HTMLDivElement | null>;
}

const Modal = ({
  isModalActive,
  closeModal,
  onMouseDownModal,
  modalRef,
  children,
}: ModalTypes) => {
  if (isModalActive) {
    return (
      <ModalPortal modalRootId="modal-root">
        <ModalParent onMouseDown={onMouseDownModal}>
          <ModalStyle ref={modalRef}>
            <>
              <BtnClose onClick={closeModal}>
                <CloseIcon />
              </BtnClose>
              {children}
            </>
          </ModalStyle>
        </ModalParent>
      </ModalPortal>
    );
  }

  return null;
};

export default Modal;
