import { statusColor } from '@/config/constants';
import {
  ApplicationStatus,
  Branch,
  Concept,
  Dictionary,
} from '@/types/interfaces';
import { Locale } from '@/types/types';
import { twMerge } from 'tailwind-merge';
import Chip from '../Chip';

interface Props {
  lang: Locale;
  kitchen?: Branch;
  brand?: Concept;
  status?: ApplicationStatus;
  dict?: Dictionary;
  children?: React.ReactNode;
}

function MarketplaceCard({
  brand,
  kitchen,
  lang,
  dict,
  status,
  children,
}: Props) {
  const name = brand?.name || kitchen?.name;
  const description = brand?.description || kitchen?.description;
  const foodTypes = brand?.foodTypes || kitchen?.foodTypes;
  const descriptionMaxLength = 150;

  return (
    <div className="border border-zinc-400 w-full md:w-72 min-w-[288px]">
      <div
        className="h-24 bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${
            brand?.logo || kitchen?.logo || '/assets/images/placeholder.webp'
          })`,
        }}
      >
        {status && (
          <div
            className={twMerge(
              't5 rounded-full absolute text-white px-10 italic right-1 top-2',
              `bg-${statusColor[status]}`
            )}
          >
            {dict?.common?.applicationStatuses?.[status]}
          </div>
        )}
      </div>
      <div className="p-2">
        <div className="font-bold text-base text-gray">{name}</div>
        <div className="flex gap-2 flex-wrap">
          {foodTypes?.map((foodType, index) => (
            <Chip key={index}>{foodType}</Chip>
          ))}
        </div>
        <p className="t3 py-2">
          {(description?.length || 0) > descriptionMaxLength
            ? `${description?.slice(0, descriptionMaxLength)}...`
            : description}
        </p>
        {children}
      </div>
    </div>
  );
}

export default MarketplaceCard;
