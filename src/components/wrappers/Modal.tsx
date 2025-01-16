import { createPortal } from "react-dom";
import Page from "./Page";

type ModalProps = {
  isOpen: boolean;
  children: React.ReactNode;
};

export default function Modal({ isOpen, children }: ModalProps) {
  if (!isOpen) return <></>;

  return createPortal(
    <Page className="fixed inset-0 z-50 w-full max-w-[375px] mx-auto bg-red-200">
      {children}
    </Page>,
    document.body
  );
}
