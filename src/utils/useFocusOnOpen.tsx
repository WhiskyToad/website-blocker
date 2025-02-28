import { useEffect, useRef } from 'react';

export function useFocusOnOpen<T extends HTMLElement>(isOpen: boolean) {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    if (isOpen && elementRef.current) {
      elementRef.current.focus();
    }
  }, [isOpen]);

  return elementRef;
}
