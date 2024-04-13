'use client';

import { alertIcons } from '@/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { twMerge } from 'tailwind-merge';
import { AlertMessage } from '../types/interfaces';

interface Props {
  children?: React.ReactNode;
  alert: AlertMessage | null;
  position?: 'left' | 'right';
  onClick?: () => void;
}

function Alert({ alert, onClick }: Props) {
  // const color = `bg-${alert?.color}`;
  const colors = {
    primary: 'bg-primary',
    danger: 'bg-danger',
    warning: 'bg-warning',
    info: 'bg-info',
  };
  const color = colors[alert!.color];
  return (
    <div
      className={twMerge(
        'fixed bottom-5 left-5 rounded-lg px-5 py-3 text-white flex items-center gap-3 shadow-lg font-mono',
        color,
        // alert?.position === 'left' ? 'left-5' : 'right-5'
        `${alert?.position}-5`,
        onClick && 'cursor-pointer'
      )}
      onClick={onClick}
    >
      {alert && (
        <FontAwesomeIcon icon={alertIcons[alert.color]} className="w-5 h-5" />
      )}
      {alert?.message}
    </div>
  );
}

export default Alert;
