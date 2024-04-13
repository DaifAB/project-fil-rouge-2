import { faArrowRight, faNavicon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface Props {
  children: React.ReactNode;
  lang: string;
}

function MobileSidebar({ children, lang }: Props) {
  const [showSidebar, setShowSidebar] = useState(false);

  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      <div className="relative md:hidden">
        <FontAwesomeIcon
          icon={faNavicon}
          className="w-5 h-5 text-white"
          onClick={handleToggleSidebar}
        />
      </div>

      {showSidebar && (
        <div className="z-50 md:hidden fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center overflow-auto">
          <div className="fixed top-0 right-0 bg-white p-5 flex flex-col gap-5 text-gray w-2/3 h-screen">
            <div className="flex justify-between items-center">
              <Link href={`/${lang}`} className="pb-2 ">
                <Image
                  src="/assets/images/logo-dark.png"
                  height="50"
                  width="250"
                  alt="Logo Tasty Bridge"
                />
              </Link>
              <FontAwesomeIcon
                icon={faArrowRight}
                className="w-5 h-5"
                onClick={handleToggleSidebar}
              />
            </div>

            {children}
          </div>
        </div>
      )}
    </>
  );
}

export default MobileSidebar;
