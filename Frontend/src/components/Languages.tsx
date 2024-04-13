'use client';

import { languages } from '@/config/languages';
import usePath from '@/hooks/usePath';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  lang: string;
}

function Languages({ lang }: Props) {
  const path = usePath();

  return (
    <div className="flex gap-3">
      {languages.map((_lang) => (
        <Link key={_lang.id} passHref href={`/${_lang.id}/${path}`}>
          <div>
            <Image
              src={_lang.image}
              width={20}
              height={20}
              alt={_lang.id}
              className={_lang.id === lang ? 'opacity-100' : 'opacity-50'}
            />
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Languages;
