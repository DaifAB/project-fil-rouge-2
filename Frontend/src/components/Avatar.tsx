import React from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
  image: string;
  className?: string;
}
function Avatar({ image, className }: Props) {
  return (
    <div
      className={twMerge(
        className,
        'h-[43px] w-[43px] bg-cover bg-center rounded-full border border-primary'
      )}
      style={{
        backgroundImage: `url(${image})`,
      }}
    ></div>
  );
}

export default Avatar;
