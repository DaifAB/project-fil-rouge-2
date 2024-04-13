'use client';

import { Dictionary } from '@/types/interfaces';
import { useEffect, useState } from 'react';

interface Props {
  dict: Dictionary;
}

function TestimonialsCarousel({ dict }: Props) {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [slide, setSlide] = useState('');

  const testimonial = dict.home?.testimonials?.[testimonialIndex];
  const testiLength = dict.home?.testimonials?.length || 2;

  useEffect(() => {
    const interval = setInterval(() => {
      setSlide('transition-all -translate-x-96 opacity-0');

      setTimeout(() => {
        setSlide('translate-x-96 opacity-0');
        setTimeout(() => {
          setSlide('transition-all opacity-1');
          setTestimonialIndex((index) => (index + 1) % testiLength);
        }, 300);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-primary py-5 text-center flex justify-between overflow-hidden">
      <div
        className={`${slide} w-full flex flex-col transla justify-center gap-2 ease-in-out duration-500`}
      >
        <div className="text-sm text-white font-bold uppercase">
          {testimonial?.title}
        </div>
        <div className="text-white w-1/2 mx-auto text-[22px] font-medium font-mono">
          “{testimonial?.content}”
        </div>
        <div className="mx-auto text-sm text-lightgray italic font-mono">
          {testimonial?.author}
        </div>
      </div>
    </div>
  );
}

export default TestimonialsCarousel;
