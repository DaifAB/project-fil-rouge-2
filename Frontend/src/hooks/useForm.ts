import { Dictionary } from '@/types/interfaces';
import { fillString } from '@/utils/helpers';
import { useMemo, useState } from 'react';

type ValidationOption =
  | 'required'
  | 'minLength'
  | 'maxLength'
  | 'pattern'
  | 'confirmation'
  | 'custom';

type NonValidationOption = {
  init?: string | string[] | number | number[] | boolean | null;
};

type Key<T> = keyof T;

type Option = ValidationOption | keyof NonValidationOption;
type FieldOptions = NonValidationOption & {
  [key in ValidationOption]?: {
    value: any;
    message?: string;
  };
};

type Fields<T> = {
  [key in Key<T>]?: FieldOptions;
};

type UseKeysOf<Obj, Value> = { [key in keyof Obj]?: Value };

type Config<T> = {
  dict?: Dictionary;
  onSubmit?: (formState: UseKeysOf<T, any>, data?: any) => void | Promise<void>;
  onError?: (errors: UseKeysOf<T, string>, data?: any) => void | Promise<void>;
};

function useForm<T>(
  fields: Fields<T>,
  { dict, onError, onSubmit }: Config<T> = {}
) {
  const initState = useMemo(
    () =>
      Object.keys(fields).reduce((acc, name) => {
        acc[name as Key<T>] = fields[name as Key<T>]?.init || null;
        return acc;
      }, {} as UseKeysOf<T, any>),
    [fields]
  );

  const [state, setState] = useState<UseKeysOf<T, any>>(initState);
  const [errors, setErrors] = useState<UseKeysOf<T, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (name: Key<T>, value: any) => {
    const newState = { ...state, [name]: value };
    setState(newState);
    handleError(newState, name);
  };

  const validate = (value: any, rules: FieldOptions) => {
    if (!rules) {
      return;
    }

    for (let _rule in rules) {
      const rule = _rule as Option;

      if (!rules[rule]) {
        continue;
      }
      if (rule === 'required') {
        const required = rules[rule]?.value as boolean;
        if (
          required &&
          ((Array.isArray(value) && value.length === 0) || !value)
        ) {
          return rules[rule]?.message || dict?.errors?.formValidation?.required;
        }
      } else if (rule === 'minLength') {
        const minLength = rules[rule]?.value as number;
        if (value < minLength) {
          return (
            rules[rule]?.message ||
            fillString(dict?.errors?.formValidation?.minLength, minLength)
          );
        }
      } else if (rule === 'maxLength') {
        const maxLength = rules[rule]?.value as number;
        if (value < maxLength) {
          return (
            rules[rule]?.message ||
            fillString(dict?.errors?.formValidation?.maxLength, maxLength)
          );
        }
      } else if (rule === 'pattern') {
        const pattern = rules[rule]?.value as RegExp;
        if (!pattern.test(value)) {
          return rules[rule]?.message || dict?.errors?.formValidation?.pattern;
        }
      } else if (rule === 'confirmation') {
        const confirmationField = rules[rule]?.value as Key<T>;
        if (value !== state[confirmationField]) {
          return (
            rules[rule]?.message || dict?.errors?.formValidation?.confirmation
          );
        }
      } else if (rule === 'custom') {
        const customValidation = rules[rule]?.value as (value: any) => boolean;

        if (!customValidation(value)) {
          return rules[rule]?.message || dict?.errors?.formValidation?.custom;
        }
      }
    }
  };

  const handleError = (state: UseKeysOf<T, any>, name: Key<T>) => {
    const validation = fields[name as Key<T>];
    if (!validation) {
      return;
    }
    const error = validate(state[name], validation);
    setErrors({ ...errors, [name]: error });
  };

  const handleErrors = (state: UseKeysOf<T, any>) => {
    let isError = false;
    const newErrors: UseKeysOf<T, string> = {};
    for (const name in state) {
      const validation = fields[name as Key<T>];
      if (!validation) {
        continue;
      }
      const error = validate(state[name], validation);
      newErrors[name as Key<T>] = error;
      isError = !!error;
    }
    setErrors(newErrors);
    return isError;
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement> | null,
    data?: any
  ) => {
    try {
      setSubmitting(true);

      event?.preventDefault();
      const isError = handleErrors(state);
      if (isError) {
        await onError?.(errors, data);
      } else {
        await onSubmit?.(state, data);
      }
    } catch (error: any) {
      throw new Error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const register = (name: Key<T>) => ({
    name,
    onChange: handleChange,
    value: state[name],
    error: errors[name],
    required: fields[name]?.required?.value,
    // ref: refs[name],
  });

  const reset = (values?: UseKeysOf<T, any>) => {
    setState(values || initState);
    const errors = Object.keys(fields).reduce(
      (acc: UseKeysOf<T, string>, name) => {
        acc[name as Key<T>] = '';
        return acc;
      },
      {}
    );
    setErrors(errors);
  };

  return {
    formState: state,
    formErrors: errors,
    handleChange,
    handleSubmit,
    submitting,
    register,
    // refs,
    reset,
  };
}

export default useForm;
