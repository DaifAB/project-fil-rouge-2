import en from '@/i18n/en.json';
import { AccountType, Locale, RecursivePartial } from './types';

export interface Dictionary extends RecursivePartial<typeof en> {}
export interface Dictionaries {
  [key: string]: Dictionary;
}

export interface PagePropsParams {
  lang: Locale;
  accountType: AccountType;
  kitchenId: string | string[];
  brandId: string | string[];
  applicationId: string;
}

export interface PageProps {
  params: PagePropsParams;
  searchParams: { [key: string]: string | string[] | undefined };
}

export interface LayoutProps {
  children: any;
  params: PagePropsParams;
}

export interface AuthUser {
  uid?: string;
  user?: User & {
    accountType?: 'branch' | 'brand';
    accounts?: Account[];
  };
  name?: string | null;
  email?: string | null;
  claims?: any;
}

export interface AlertMessage {
  color: 'primary' | 'warning' | 'danger';
  message?: string;
  position?: 'left' | 'right';
}

export interface Step {
  label: string | undefined;
  content: JSX.Element;
}

export interface Timestamps {
  id?: string;
  _id?: any;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  isDeleted?: boolean;
}

// Collections

export interface Permission {
  userId: string | User;
  items: string[];
  permission: string[];
}

export interface Account extends Timestamps {
  name: string;
  owner: string | User;
  type: AccountType;
  users: string[] | User[];
  permissions: Permission[];
  concepts: string[] | Concept[];
  branches: string[] | Branch[];
}

export type MediaType = 'image' | 'video' | 'sound';

export interface Media extends Timestamps {
  name: string;
  addedBy: string | User;
  public: boolean;
  location: string;
  size: number;
  dimensions: {
    width: number;
    height: number;
  };
  url: string;
  type: MediaType;
  mimeType: string;
  extension: string;
  account?: string | Account;
  concepts?: string | Concept[];
}

export interface User extends Timestamps {
  name: string;
  email?: string;
  phone?: string;
  roles: string[];
  uid: string;
  language: string;
  avatar?: string;
  profession?: string;
  bio?: string;
  brandRegistration?: BrandRegistration;
  branchRegistration?: BranchRegistration;
}

export interface BrandRegistration {
  name: string;
  ordersPerDay: number;
  typeOfFood: string[];
  website: string;
}

export interface BranchRegistration {
  name: string;
  structure: string[];
  haveWifi: boolean;
  haveBrands: boolean;
  country: string | Country;
  city: string | City;
}

export interface ExtendedUser extends User {
  accountType?: 'branch' | 'brand' | 'supplier' | 'food7go';
  accounts?: Account[];
  selectedAccount?: Account;
  f7gAccount?: Account;
  queryFilter?: string;
  items?: string[];
  permissions?: string[];
}

export interface City extends Timestamps {
  code?: string;
  country?: string | Country;
  cityCode: string;
  geolocalisation: {
    lat: number;
    long: number;
  };
  nameEn: string;
  nameLocal: string;
  timezone: string;
}

export interface Country extends Timestamps {
  code: string;
  name: string;
}

export type BranchExperience = '1' | '2' | '5' | '5+';
export type ApplicationStatus =
  | 'draft'
  | 'sent'
  | 'reviewing'
  | 'reviewed'
  | 'rejected'
  | 'signed';
export type ApplicationType = 'brand' | 'kitchen';
export type ProposalStatus = 'sent' | 'counter' | 'accepted' | 'rejected';

export interface BranchApplication {
  concept: string | Concept;
  experience?: BranchExperience;
  ordersPerDay?: number;
  staffCount?: number;
  brandsCount?: number;
  brandsTypes?: string;
  storageCapacity?: {
    freezer?: number;
    fridge?: number;
    dry?: number;
  };
  message?: string;
  acceptTerms?: boolean;
  sendInfo?: boolean;
  beContacted?: boolean;
}

export interface ConceptApplication {
  branch?: string | Branch;
}

export interface Proposal {
  _id?: string;
  onboardingFee?: number;
  fixedMonthlyFee?: number;
  fixedAnnualFee?: number;
  orderFee?: number;
  orderFeeUnit?: string;
  kitchenMessage: string;
  status: ProposalStatus;
  sentAt: Date;
}

export interface Application extends Timestamps {
  type: ApplicationType;
  account: string | Account;
  status: ApplicationStatus;
  proposals: Proposal[];
  sender?: string | User;
  receiver?: string | User;
  concept?: string | Concept;
  branch?: string | Branch;
  branchApplication?: BranchApplication;
  conceptApplication?: ConceptApplication;
}

export interface Branch extends Timestamps {
  name: string;
  description?: string;
  type?: string;
  foodTypes?: string[];
  equipments?: string[] | Equipment[];
  cookingLimitations?: string[];
  legalNumber: string;
  logo?: string;
  cover?: string;
  address: {
    address: string;
    zipCode: string;
    city: string | City;
    geoLocation: {
      lat: number;
      long: number;
    };
  };
  account?: string | Account;
  concepts?: string[] | Concept[];
}

export interface Concept extends Timestamps {
  logo: string;
  cover: string;
  name: string;
  description: string;
  slogan: string;
  countries: string[] | Country[];
  equipments: string[] | Equipment[];
  commission: number;
  averageOrderValue: number;
  averageOrdersNumber: number;
  cogs: number;
  foodTypes?: string[];
  websiteUrl?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  twitterUrl?: string;
  account?: string;
}

export interface Ingredient extends Timestamps {
  name: string;
  unit: string;
  conceptId?: string | Concept;
  account?: string | Account;
}

export interface Equipment extends Timestamps {
  name: string;
  description: string;
}
