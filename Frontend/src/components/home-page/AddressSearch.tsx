import { Dictionary } from '@/types/interfaces';
import Button from '../Button';
import Link from 'next/link';

interface Props {
  dict: Dictionary;
}

function AddressSearch({ dict }: Props) {
  return (
    <div className="flex flex-col w-full items-center mt-10 px-5">
      <div className={`h1 font-medium	text-center	max-w-xl`}>
        {dict?.home?.fillYourKitchen}
      </div>
      <div className="flex gap-5 mt-3">
        <Link href={`/${dict.lang}/sign-up/branch`}>
          <Button>{dict.common?.registerYourKitchen}</Button>
        </Link>
        <Link href={`/${dict.lang}/sign-up/brand`}>
          <Button>{dict.common?.registerYourBrand}</Button>
        </Link>
      </div>
    </div>
  );
}

export default AddressSearch;
