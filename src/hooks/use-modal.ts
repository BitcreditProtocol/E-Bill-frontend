import { useState, useCallback } from "react";

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);
  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { isOpen, openModal, closeModal };
};

export default useModal;
