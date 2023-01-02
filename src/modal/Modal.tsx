import { createPortal } from "react-dom";

interface Props {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: Props) {
  if (!isOpen) return null;

  return createPortal(
    <>
      <div
        className="absolute inset-0 bg-gray-600 opacity-90 z-10"
        onClick={onClose}
      ></div>
      <div className="absolute inset-0 flex flex-col justify-center items-center z-20">
        {onClose ? (
          <button onClick={onClose}>
            <i className="fa-solid fa-circle-xmark text-3xl absolute top-8 right-8 text-white"></i>
          </button>
        ) : null}
        {children}
      </div>
    </>,
    document.body
  );
}
