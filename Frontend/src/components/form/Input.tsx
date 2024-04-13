'use client';

import { forwardRef, useEffect, useId, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
  className?: string;
  label?: string;
  value?: string | number;
  onChange?: any;
  type?: 'text' | 'password' | 'email' | 'number' | 'phone';
  placeholder?: string;
  rounded?: boolean;
  error?: any;
  name: string;
  suffix?: any;
  suffixPos?: any;
  required?: boolean;
  rows?: number;
  disabled?: boolean;
  onClickEnter?: any;
}

const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const {
    className,
    label = '',
    value,
    onChange,
    type = 'text',
    placeholder = '',
    rounded = true,
    error = '',
    name,
    suffix,
    suffixPos = '',
    required = false,
    rows = 0,
    disabled = false,
    onClickEnter,
    // ...rest
  } = props;

  const id = useId();

  const [focused, setFocused] = useState(false);

  const roundedClass = rounded ? 'rounded-full' : 'rounded';
  const errorClass = error && 'text-danger';
  const labelClass =
    !focused && !placeholder
      ? 'pt-3 text-md cursor-text'
      : 'pt-1 text-xs bg-lightgray';

  useEffect(() => {
    if (value) {
      setFocused(true);
    }
  }, [value]);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    if (!value) {
      setFocused(false);
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onClickEnter?.();
    }
  };

  return (
    <div className={twMerge('mb-4 w-full', errorClass, className)}>
      <div className="relative w-full">
        {rows ? (
          <textarea
            disabled={disabled}
            id={id}
            // ref={ref}
            placeholder={placeholder}
            onChange={(e) => onChange(name, e.currentTarget.value)}
            value={value}
            className={twMerge(
              'w-full outline-none mr-3 pt-4 pb-1 px-6 bg-lightgray placeholder-slate-500 rounded-xl',
              className
            )}
            onFocus={handleFocus}
            onBlur={handleBlur}
            rows={rows}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <input
            disabled={disabled}
            id={id}
            type={type}
            ref={ref}
            placeholder={placeholder}
            onChange={(e) => onChange(name, e.currentTarget.value)}
            value={value}
            className={twMerge(
              'w-full outline-none mr-3 pt-4 pb-1 px-6 bg-lightgray placeholder-slate-500',
              roundedClass,
              className
            )}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
          />
        )}
        <label
          htmlFor={id}
          className={`${labelClass} absolute left-0 top-0 ml-6 w-[calc(100%_-_theme(spacing.12))] transition-all duration-100 font-medium`}
        >
          {label} {required && '*'}
        </label>
        {!disabled && (
          <div
            className={twMerge(
              `absolute right-10 top-0 h-full flex items-center transition-all duration-100 font-medium `,
              suffixPos
            )}
          >
            {suffix}
          </div>
        )}
      </div>
      <div>
        {error && <div className="mt-2  text-sm font-medium">{error}</div>}
      </div>
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
