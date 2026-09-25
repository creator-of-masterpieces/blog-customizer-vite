import { useEffect, type RefObject } from 'react';

type UseOutsideClickCloseProps = {
  isOpen: boolean;
  rootRef: RefObject<HTMLElement | null>;
  onClose: () => void;
};

export const useOutsideClickClose = ({
  isOpen,
  rootRef,
  onClose,
}: UseOutsideClickCloseProps): void => {
  useEffect(() => {
    if (!isOpen) return;

    const handleMouseDown = (evt: MouseEvent): void => {
      const rootElement = rootRef.current;
      const { target } = evt;
      if (!rootElement || !(target instanceof Node)) return;

      if (!rootElement.contains(target)) {
        onClose();
      }
    };

    window.addEventListener('mousedown', handleMouseDown);
    return (): void => {
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, [isOpen, rootRef, onClose]);
};
