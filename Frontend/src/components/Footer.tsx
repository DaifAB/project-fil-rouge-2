import { Dictionary } from '@/types/interfaces';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  dict?: Dictionary;
}

function Footer({ dict }: Props) {
  const links = [
    { name: dict?.pagesTitles?.home, url: '' },
    { name: dict?.common?.registerYourBrand, url: 'sign-up/brand' },
    { name: dict?.common?.registerYourKitchen, url: 'sign-up/branch' },
    {
      name: dict?.privacyTerms?.privacyPolicy?.tabTitle,
      url: 'privacy-policy',
    },
    { name: dict?.privacyTerms?.termsOfUse?.tabTitle, url: 'terms-of-use' },
  ] as const;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black">
      <div className="container mx-auto px-5">
        <div className="pt-20 pb-10 px-5 lg:px-0 text-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-10">
            <div>
              <div className="h-12">
                <Link href={`/${dict?.lang}`} className="mx-auto pb-2">
                  <Image
                    src="/assets/images/logo.png"
                    height="50"
                    width="250"
                    alt="english"
                  />
                </Link>
              </div>
              <p className="text-sm">{dict?.footer?.companyDesc}</p>
            </div>

            <div>
              <div className="font-bold h-12">{dict?.footer?.navigation}</div>
              <ul>
                {links.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={`/${dict?.lang}/${link.url}`}
                      className="text-base animated-bottom-border"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="font-bold h-12">{dict?.footer?.getInTouch}</div>
              contact@tastybridge.com <br />
              Rue des Ait Ba Amrane, appt. n° 1203, <br />
              Casablanca <br />
              Morocco
            </div>
          </div>
          <div className="text-center mt-10">© Tasty Bridge - {year}</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
