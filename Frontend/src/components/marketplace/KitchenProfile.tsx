'use client';

import {
  Branch,
  City,
  Concept,
  Dictionary,
  Equipment,
} from '@/types/interfaces';
import ProfileLayout from './ProfileLayout';
import StatisticCard from './StatisticCard';
import DeliveryRangeMap from './kitchen/brands/profile/DeliveryRangeMap';

interface Props {
  kitchen: Branch;
  lang: string;
  dict: Dictionary;
  footer: React.ReactNode;
}

function KitchenProfile({ kitchen, lang, dict, footer }: Props) {
  console.log('kitchen', kitchen);

  return (
    <ProfileLayout lang={lang} kitchen={kitchen} footer={footer}>
      <div className="flex flex-col md:flex-row gap-4 mt-52 md:mt-0 mb-10">
        <div className="w-full md:w-2/3">
          <div className="h4 mb-1">{dict.common?.description}</div>
          <p className="t1 max-w-xl text-gray">{kitchen.description}</p>
          <div className="flex flex-col md:flex-row gap-4 mt-4 mb-2">
            <div className="w-full md:w-1/2">
              <div className="h4 mb-1">
                {dict.marketplace?.kitchens?.profile?.address}
              </div>
              <p className="t1 max-w-xl text-gray">{kitchen.address.address}</p>
              <p className="t1 max-w-xl text-gray">{kitchen.address.zipCode}</p>
              <p className="t1 max-w-xl text-gray">
                {(kitchen.address.city as City).nameEn}
              </p>
              <div className="h4 my-1">
                {dict.marketplace?.kitchens?.profile?.type}
              </div>
              <p className="t1 max-w-xl text-gray capitalize">{kitchen.type}</p>
              <div className="h4 my-1">
                {dict.marketplace?.kitchens?.profile?.cookingLimitation}
              </div>
              <ul className="list-disc ml-10 text-gray">
                {kitchen.cookingLimitations?.map(
                  (limitation: any, index: number) => (
                    <li className="capitalize" key={index}>
                      {limitation}
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className="w-full md:w-1/2">
              <div className="h4 mb-1">
                {dict.marketplace?.kitchens?.profile?.approximateDeliveryZone}
              </div>

              <DeliveryRangeMap
                long={kitchen.address.geoLocation?.long}
                lat={kitchen.address.geoLocation?.lat}
              ></DeliveryRangeMap>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between">
            <div className="w-full md:w-1/2 mb-4">
              <div className="h4">
                {dict.marketplace?.kitchens?.profile?.availableEquipments}
              </div>
              {kitchen.equipments?.length === 0 && (
                <div className="text-gray">
                  {dict.marketplace?.kitchens?.profile?.noEquipment}
                </div>
              )}
              <ul className="list-disc ml-10">
                {kitchen.equipments?.map((equipement: any, index: number) => (
                  <li key={index}>{(equipement as Equipment).name}</li>
                ))}
              </ul>
            </div>
            <div className="w-full md:w-1/2 mb-4">
              <div className="h4">
                {dict.marketplace?.kitchens?.profile?.brandsCooked}
              </div>
              {kitchen.concepts?.length === 0 && (
                <div className="text-gray">
                  {dict.marketplace?.kitchens?.profile?.noBrand}
                </div>
              )}
              <ul className="list-disc ml-10">
                {kitchen.concepts?.map((concept: any, index: number) => (
                  <li key={index}>{(concept as Concept).name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
}

export default KitchenProfile;
