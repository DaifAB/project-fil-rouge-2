'use client';

import useOutsideClick from '@/hooks/useOutsideClick';
import { faCheck, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Input from './Input';

interface Props {
  className?: string;
  options: {
    label?: string | undefined;
    prefixImage?: string;
    value: string | number;
  }[];
  label?: string;
  value?: any;
  placeholder?: string;
  search?: boolean;
  rounded?: boolean;
  error?: string;
  required?: boolean;
  name: string;
  onChange?: any;
  disabled?: boolean;
}

function Select(props: Props) {
  const {
    options,
    className,
    label = '',
    value,
    onChange,
    placeholder = '',
    search,
    rounded = true,
    error = '',
    name,
    required = false,
    disabled = false,
  } = props;

  const id = useId();

  const [focused, setFocused] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [mouseOnOptions, setMouseOnOptions] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchOptions, setSearchOptions] = useState(options);

  useEffect(() => {
    setSearchOptions(
      options.filter((option) =>
        option.label?.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [searchValue, options]);

  const outsideClickref = useRef(null);
  useOutsideClick(outsideClickref, () => {
    setShowOptions(false);
  });

  const isMultiple = Array.isArray(value);

  const getIsValueEmpty = () => {
    if (isMultiple) {
      return value.length === 0;
    } else {
      return !value;
    }
  };

  const compareValue = (val: any) => {
    if (isMultiple) {
      return !!value.find((value) => value === val);
    } else {
      return value === val;
    }
  };

  const text = useMemo(
    () =>
      options
        .filter((option) => {
          if (isMultiple) {
            return value.includes(option.value);
          } else {
            return option.value === value;
          }
        })
        ?.map((option) => option.label)
        .join(' - '),
    [value]
  );

  const errorClass = error && 'text-danger';
  const labelClass =
    !focused && !placeholder ? 'top-3 text-md' : 'top-1 text-xs';

  const handleFocus = () => {
    setFocused(true);
    setShowOptions(true);
  };

  const handleBlur = () => {
    if (getIsValueEmpty() && !mouseOnOptions) {
      setFocused(false);
    }
    if (!mouseOnOptions) {
      setShowOptions(false);
    }
  };

  const handleChange = (_value: any) => {
    if (isMultiple) {
      let newValue: any[] = [];
      if (value.includes(_value)) {
        newValue = value.filter((val) => val !== _value);
      } else {
        newValue = [...value, _value];
      }
      onChange(name, newValue);
    } else {
      onChange(name, _value);
      setShowOptions(false);
    }
  };

  useEffect(() => {
    if (!getIsValueEmpty()) {
      setFocused(true);
    }
  }, [value]);

  return (
    <div
      ref={outsideClickref}
      className={twMerge('mb-4 w-full', errorClass, className)}
    >
      <div className="relative w-full">
        <input
          disabled={disabled}
          id={id}
          placeholder={placeholder}
          autoComplete="off"
          className={twMerge(
            'w-full cursor-pointer caret-transparent rounded-full hover:bg-neutral-200 appearance-none outline-none mr-3 pt-4 pb-1 px-6 bg-lightgray placeholder-neutral-500',
            rounded ? 'rounded-full' : 'rounded-sm'
          )}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={text}
        />
        {showOptions && (
          <div
            className="shadow-2xl rounded-xl absolute mt-1 w-full bg-white z-50"
            onMouseEnter={() => setMouseOnOptions(true)}
            onMouseLeave={() => setMouseOnOptions(false)}
          >
            {search && (
              <Input
                name="search"
                rounded={false}
                className="w-full px-2"
                onChange={(_: any, value: any) => setSearchValue(value)}
                value={searchValue}
              />
            )}
            <div className="max-h-48 overflow-auto">
              {searchOptions.map((option, i) => (
                <div
                  onClick={() => handleChange(option.value)}
                  className={twMerge(
                    'cursor-pointer py-3 px-3 hover:bg-neutral-100 flex justify-between items-center',
                    compareValue(option.value) && 'bg-neutral-50',
                    (i === 0 && 'rounded-t-xl') ||
                      (i === options.length - 1 && 'rounded-b-xl')
                  )}
                  key={i}
                >
                  <div className="flex gap-3 items-center">
                    {option.prefixImage && (
                      <img
                        src={option.prefixImage}
                        alt={option.label}
                        className="w-5"
                      />
                    )}
                    {option.label}
                  </div>
                  {compareValue(option.value) && (
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="w-5 h-5 text-neutral-600"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        <label
          htmlFor={id}
          className={`${labelClass} w-full absolute left-6 transition-all duration-100 font-medium cursor-pointer`}
        >
          {label} {required && '*'}
        </label>
        {!disabled && (
          <label
            htmlFor={id}
            className={`absolute right-6 top-0 h-full flex items-center transition-all duration-100 font-medium cursor-pointer`}
          >
            <FontAwesomeIcon
              icon={faChevronDown}
              className="w-5 h-5 text-neutral-600"
            />
          </label>
        )}
      </div>
      <div>
        {error && <div className="mt-2  text-sm font-medium">{error}</div>}
      </div>
    </div>
  );
}

export default Select;
