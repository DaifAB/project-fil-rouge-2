import { KitchenService } from '@/services/server/kitchen';
import { Concept, Country, Dictionary, Media } from '@/types/interfaces';
import Image from 'next/image';
import Link from 'next/link';
import ProfileLayout from './ProfileLayout';
import StatisticCard from './StatisticCard';
import RevenueSimulatorPopup from './kitchen/brands/RevenueSimulatorPopup';

interface Porps {
  brand: Concept;
  lang: string;
  dict: Dictionary;
  footer: React.ReactNode;
}

async function BrandProfile({ brand, lang, dict, footer }: Porps) {
  const cookingTime = Math.floor(Math.random() * (16 - 12) + 12);
  // const liveLocations = await KitchenService.getBrandKitchens(brand._id!);
  const liveLocations = [];

  return (
    <ProfileLayout lang={lang} brand={brand} footer={footer}>
      <div className="flex flex-col md:flex-row gap-4 mt-64 md:mt-0">
        <div className="w-full lg:w-2/3">
          <div className="h4 mb-1">{dict.common?.description}</div>
          <p className="t1 text-gray">{brand.description}</p>
          <div className="h4 mb-1">
            {dict?.marketplace?.brands?.create?.slogan}
          </div>
          <p className="t1 text-gray">{brand.slogan}</p>
          <div className="flex gap-4 my-5">
            {brand.facebookUrl && (
              <Link href={brand.facebookUrl} target="_blank">
                <Image
                  width={32}
                  height={32}
                  src={'/assets/images/socials/fb.png'}
                  alt="fb"
                />
              </Link>
            )}
            {brand.twitterUrl && (
              <Link href={brand.twitterUrl} target="_blank">
                <Image
                  width={32}
                  height={32}
                  src={'/assets/images/socials/twitter.png'}
                  alt="fb"
                />
              </Link>
            )}
            {brand.instagramUrl && (
              <Link href={brand.instagramUrl} target="_blank">
                <Image
                  width={32}
                  height={32}
                  src={'/assets/images/socials/ig.png'}
                  alt="fb"
                />
              </Link>
            )}
            {brand.websiteUrl && (
              <Link href={brand.websiteUrl} target="_blank">
                <Image
                  width={32}
                  height={32}
                  src={'/assets/images/socials/web.png'}
                  alt="fb"
                />
              </Link>
            )}
          </div>

          <div className="h4 mb-1">
            {dict.marketplace?.brands?.profile?.cooking} {brand?.name}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
            <StatisticCard
              width="w-full"
              title={dict.marketplace?.brands?.profile?.averageOrdersNumber}
              value={brand.averageOrdersNumber || 0}
              lang={dict.lang!}
            />
            <StatisticCard
              width="w-full"
              title={dict.marketplace?.brands?.profile?.averageOrderValue}
              value={(brand.averageOrderValue || 0) + '€'}
              lang={dict.lang!}
            />
            <StatisticCard
              width="w-full"
              title={dict.marketplace?.brands?.profile?.cogs}
              value={(brand.cogs || 0) + '%'}
              lang={dict.lang!}
            />
            <StatisticCard
              width="w-full"
              title={dict.marketplace?.brands?.profile?.cookingTime + ' (min)'}
              value={`~${cookingTime}`}
              lang={dict.lang!}
            />
            <StatisticCard
              width="w-full"
              title={dict.marketplace?.brands?.profile?.liveLocations}
              value={liveLocations?.length || 0}
              lang={dict.lang!}
            />
            <StatisticCard
              width="w-full"
              title={dict.marketplace?.brands?.profile?.royalty}
              value={(brand.commission || 0) + '%'}
              lang={dict.lang!}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4 text-gray mb-4">
            <div className="w-full  md:w-1/2 ">
              <div className="h4 mb-1">
                {dict.marketplace?.brands?.profile?.requiredEquipments}
              </div>
              <ul className="list-disc ml-10">
                {brand.equipments.map((equipment: any, index: number) => (
                  <li key={index}>{equipment.name}</li>
                ))}
              </ul>
              {!brand.equipments.length &&
                dict?.marketplace?.kitchens?.profile?.noEquipment}
            </div>
            <div className="w-full  md:w-1/2 ">
              <div className="h4 mb-1">
                {dict.marketplace?.brands?.profile?.brandConditions}
              </div>
              <div>
                <p>
                  {dict.marketplace?.brands?.profile?.marketOfInterest}:{' '}
                  {(brand.countries as Country[])
                    .map((country) => country.name)
                    .join(', ')}
                </p>
                <RevenueSimulatorPopup
                  dict={dict}
                  commission={brand.commission}
                  cogs={brand.cogs}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
}

export default BrandProfile;
