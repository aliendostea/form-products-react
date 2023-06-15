import { useRef, useState } from "react";
import gsap from "gsap";

const useModal = () => {
  const [isModalActive, setIsModalActive] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const removeElAnimation = () => {
    gsap.to(modalRef.current, {
      opacity: 0,
      y: -50,
      onComplete: () => setIsModalActive(false),
    });
  };

  const onMouseDownModal = (e: any) => {
    if (e.target.className?.animVal !== undefined) return;

    const toast = document.querySelector("#toast-box");
    const addModelWattsBomb = document.querySelector(
      "#box-add-model-watts-bomb"
    );

    if (e.target.id === "toast-box" || toast?.contains(e.target)) return;
    if (
      e.target.id === "box-add-model-watts-bomb" ||
      addModelWattsBomb?.contains(e.target)
    )
      return;
    if (modalRef.current?.contains(e.target)) return;

    removeElAnimation();
  };
  const openModal = () => {
    setIsModalActive(true);
  };

  const closeModal = () => {
    removeElAnimation();
  };

  return [
    isModalActive,
    openModal,
    closeModal,
    onMouseDownModal,
    modalRef,
  ] as const;
};

export default useModal;
