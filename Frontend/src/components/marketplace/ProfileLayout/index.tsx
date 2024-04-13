import { Branch, Concept } from '@/types/interfaces';
import { Fragment } from 'react';
import MarketFooter from '../MarketFooter';

interface Props {
  children: React.ReactNode;
  footer: React.ReactNode;
  lang: string;
  brand?: Concept;
  kitchen?: Branch;
}

function ProfileLayout({ children, footer, brand, lang, kitchen }: Props) {
  const name = brand?.name || kitchen?.name;
  const foodTypes = brand?.foodTypes || kitchen?.foodTypes;
  return (
    <div className="relative w-full h-full flex flex-col justify-between">
      <div className="h-full overflow-y-auto">
        <div
          className="w-full h-40 md:h-[calc(100vh_*_30_/_100)] relative bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${
              brand?.cover ||
              kitchen?.cover ||
              '/assets/images/placeholder.webp'
            })`,
          }}
        >
          <div className="flex flex-col gap-5 items-center md:flex-row md:items-end w-full md:w-fit top-1/2 md:h-full absolute md:left-5">
            <div
              className="aspect-square w-1/2 md:w-fit md:h-full border-2 bg-center bg-cover bg-no-repeat"
              style={{
                backgroundImage: `url(${
                  brand?.logo ||
                  kitchen?.logo ||
                  '/assets/images/placeholder.webp'
                })`,
              }}
            ></div>
            <div className="h-1/2 flex flex-col justify-center px-5 xs:float-right font-mono">
              <div className="font-extrabold text-3xl mb-1">{name}</div>
              <div className="flex items-center text-sm text-slate-700 uppercase">
                {foodTypes?.map((foodType, index) => (
                  <Fragment key={index}>
                    <div className="font-bold">{foodType}</div>
                    {index + 1 !== foodTypes?.length && (
                      <div className="w-1 h-1 bg-primary rounded-full mx-1"></div>
                    )}
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="relative md:top-[calc((100vh_*_30_/_100)_/_2)] py-5 px-5">
          {children}
        </div>
      </div>

      <MarketFooter>{footer}</MarketFooter>
    </div>
  );
}

export default ProfileLayout;
