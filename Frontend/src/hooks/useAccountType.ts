import { AccountType } from '@/types/interfaces';
import usePath from './usePath';

function useAccountType() {
  const path = usePath();
  return path.split('/')[1] as AccountType;
}

export default useAccountType;
