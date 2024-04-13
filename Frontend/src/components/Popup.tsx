'use client';

import useOutsideClick from '@/hooks/useOutsideClick';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef } from 'react';

// a popup component using tailwindcss
interface Props {
  children: React.ReactNode;
  title?: string;
  description?: string;
  width?: string;
  open?: boolean;
  showCloseButton?: boolean;
  onClose?: any;
  outsideClick?: boolean;
}

function Popup({
  children,
  title,
  description,
  open,
  showCloseButton,
  onClose,
  outsideClick = true,
}: Props) {
  const ref = useRef(null);

  useOutsideClick(ref, () => {
    if (!outsideClick) {
      return;
    }
    onClose();
  });

  if (!open) {
    return;
  }

  return (
    <div className="fixed z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div
        ref={ref}
        className={`w-full sm:w-2/3 2xl:w-3/5 mx-5 bg-white rounded-lg p-5`}
      >
        <div className="flex justify-between">
          {title && <div className="h4 mb-2 uppercase">{title}</div>}
          {showCloseButton && (
            <FontAwesomeIcon
              icon={faClose}
              className="w-5 h-5 cursor-pointer text-secondary"
              onClick={onClose}
            />
          )}
        </div>
        {description && <p className="t1 mb-7">{description}</p>}
        {children}
      </div>
    </div>
  );
}

export default Popup;
