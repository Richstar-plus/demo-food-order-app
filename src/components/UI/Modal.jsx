import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ccreatePortal } from "react-dom";

export function Modal({ children, open, className = '' }) {
  const dialog = useRef();
  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`}>
      {children}
    </dialog>,
    document.getElementById("modal"),
  );
}
