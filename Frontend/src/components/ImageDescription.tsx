import Image from 'next/image';
import React from 'react';

interface Props {
  className?: string;
  title?: string;
  description?: string;
  imageUrl: string;
  invert?: boolean;
  buttonTitle?: string;
  children?: React.ReactNode;
}

const ImageDescription = ({
  className,
  title,
  description,
  imageUrl,
  invert,
  children,
}: Props) => {
  const orderClasses = invert ? 'md:flex-row-reverse' : 'md:flex-row';

  return (
    <div className={`${className} md:flex ${orderClasses}`}>
      <div className="w-full md:w-[55%]">
        <div className="h3 font-medium mb-4">{title}</div>
        <p className="text-base">{description}</p>
        <div className="my-5">{children}</div>
      </div>
      <div className="w-full md:w-[45%] flex justify-center">
        <Image
          src={imageUrl}
          alt={title || ''}
          width={369}
          height={191}
          className="rounded-lg"
        />
      </div>
    </div>
  );
};

export default ImageDescription;
