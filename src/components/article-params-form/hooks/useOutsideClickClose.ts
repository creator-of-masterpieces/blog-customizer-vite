import { useEffect, type RefObject } from 'react';

type UseOutsideClickCloseProps = {
  isOpen: boolean;
  rootRef: RefObject<HTMLElement | null>;
  onClose: () => void;
};

export const UseOutsideClickClose = ({
  isOpen,
  rootRef,
  onClose,
}: UseOutsideClickCloseProps): void => {
  useEffect(() => {
    if (!isOpen) return;

    const handleMouseDown = (evt: MouseEvent): void => {
      const div = rootRef.current;
      const { target } = evt;
      if (!div || !(target instanceof Node)) return;

      if (!div.contains(target)) {
        onClose();
      }
    };

    window.addEventListener('mousedown', handleMouseDown);
    return (): void => {
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, [isOpen, rootRef, onClose]);
};
