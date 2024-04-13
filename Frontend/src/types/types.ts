import { i18n } from '../../i18n';

export type AccountType = 'brand' | 'branch';
export type Locale = (typeof i18n.locales)[number];
export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};
export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
