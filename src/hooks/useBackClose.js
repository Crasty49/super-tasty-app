import { useEffect } from "react";

export default function useBackClose(isOpen, onClose) {

  useEffect(() => {

    if (!isOpen) return;

    // empuja estado al historial
    window.history.pushState(null, "");

    const handleBack = () => {
      onClose();
    };

    window.addEventListener("popstate", handleBack);

    return () => {
      window.removeEventListener("popstate", handleBack);
    };

  }, [isOpen, onClose]);
}
