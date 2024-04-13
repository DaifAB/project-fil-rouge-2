import {
  faCircleCheck,
  faCircleXmark,
  faWarning,
} from '@fortawesome/free-solid-svg-icons';

export const config = {
  baseUrl: process.env.NEXT_PUBLIC_MARKET_SERVER_URL as string,
  marketApiUrl: process.env.NEXT_PUBLIC_MARKET_API_URL as string,
  mapboxToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string,
};

export const alertIcons = {
  primary: faCircleCheck,
  warning: faWarning,
  danger: faCircleXmark,
};
