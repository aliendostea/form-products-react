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
    if (e.target.attributes[0]?.value === "cell") return;

    const isDatePicker: string =
      e.target.className.toLowerCase().includes("css") ||
      e.target.className.toLowerCase().includes("mui");

    if (isDatePicker) return;
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
