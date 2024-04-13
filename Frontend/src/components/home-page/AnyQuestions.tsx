import { Dictionary } from '@/types/interfaces';
import Link from 'next/link';
import Button from '../Button';

interface Props {
  dict: Dictionary;
}

function AnyQuestions({ dict }: Props) {
  return (
    <div
      className={`flex flex-col w-full items-center mt-10 mb-20 text-center`}
    >
      <div className="text-sm text-primary font-bold mb-1">
        {dict?.home?.anyQuestions}
      </div>
      <div className={`h3 font-medium max-w-2xl mb-5`}>
        {dict?.home?.anyQuestionsDesc}
      </div>
      <div className="flex justify-between w-full max-w-xs">
        <Button>
          <Link href="https://wa.me/212632056086" target="_blank">
            whatsapp
          </Link>
        </Button>
        <Link href={`/${dict.lang}/contact-us`}>
          <Button>{dict?.home?.onlineForm}</Button>
        </Link>
      </div>
    </div>
  );
}

export default AnyQuestions;
