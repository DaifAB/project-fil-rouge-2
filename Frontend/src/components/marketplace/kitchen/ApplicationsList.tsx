'use client';

import Button from '@/components/Button';
import { Dictionary } from '@/types/interfaces';
import { AccountType, Locale } from '@/types/types';
import { Application, Branch, Concept } from '@/types/interfaces';
import {
  faChevronDown,
  faChevronUp,
  faExternalLink,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useState } from 'react';
import MarketplaceCard from '../MarketplaceCard';
import { config } from '@/config';
import usePopup from '@/hooks/usePopup';
import { useRouter } from 'next/navigation';
import ShouldReviewPopup from '../Application/ShouldReviewPopup';

interface Props {
  title?: string;
  applications: Application[];
  dict: Dictionary;
  lang: Locale;
  type?: string;
  from?: AccountType;
}
function ApplicationsList({
  applications,
  dict,
  lang,
  type,
  title,
  from = 'branch',
}: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const handleToggleOpen = () => {
    setOpen(!open);
  };

  const isRejected = type === 'rejected';

  return (
    <>
      <div className="h4 mb-5">
        {title}
        {isRejected && (
          <button
            className="ml-3 text-sm text-gray-500 hover:text-gray-700"
            onClick={handleToggleOpen}
          >
            <FontAwesomeIcon
              icon={open ? faChevronDown : faChevronUp}
              className="w-5 h-5 cursor-pointer"
            />
          </button>
        )}
      </div>
      {open && (
        <div className="flex gap-6 flex-wrap">
          {applications.length === 0 && (
            <div>
              <p className="t1">
                {dict.marketplace?.brands?.noApplicationFound}
              </p>
              {!isRejected && from === 'branch' && (
                <Link
                  href={`/${lang}/marketplace/branch/brands/search`}
                  className="flex items-center text-primary mt-1"
                >
                  <FontAwesomeIcon
                    icon={faExternalLink}
                    className="w-3 h-3 mr-1 ml-5"
                  />
                  <div className="italic underline capitalize text-sm">
                    {dict.marketplaceNavigation?.searchNewBrands}
                  </div>
                </Link>
              )}
            </div>
          )}
          {applications.map((application) => (
            <MarketplaceCard
              key={application._id}
              brand={
                from === 'branch'
                  ? (application.branchApplication?.concept as Concept)
                  : undefined
              }
              kitchen={
                from === 'brand' ? (application.branch as Branch) : undefined
              }
              lang={lang}
              status={application.status}
              dict={dict}
            >
              <div className="flex gap-2 flex-wrap">
                <Link
                  href={
                    application.status === 'draft' && from === 'branch'
                      ? `/${lang}/marketplace/branch/brands/application/${application._id}/step-1`
                      : `/${lang}/marketplace/${from}/${
                          from === 'brand' ? 'kitchens' : 'brands'
                        }/application/${application._id}`
                  }
                >
                  <Button className="py-1 px-4 text-xs bg-primary">
                    {dict.marketplace?.brands?.seeApplication}
                  </Button>
                </Link>

                <Link
                  href={`/${lang}/marketplace/${from}/${
                    from === 'brand' ? 'kitchens' : 'brands'
                  }/profile/${
                    from === 'branch'
                      ? (application.branchApplication?.concept as Concept)._id
                      : (application.branch as Branch)._id
                  }`}
                  target="_blank"
                >
                  <Button className="py-1 px-4 text-xs bg-primary">
                    {from === 'branch'
                      ? dict.marketplace?.brands?.toBrand
                      : dict.marketplace?.kitchens?.toKitchen}
                  </Button>
                </Link>
              </div>
            </MarketplaceCard>
          ))}
        </div>
      )}
    </>
  );
}

export default ApplicationsList;
