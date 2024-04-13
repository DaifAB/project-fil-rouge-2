'use client';

import Button from '@/components/Button';
import GeolocationSelector from '@/components/GeolocationSelector';
import TransitionPageWrapper from '@/components/TransitionPageWrapper';
import Input from '@/components/form/Input';
import Select from '@/components/form/Select';
import AvatarPicker from '@/components/login-page/AvatarPicker';
import {
  cookingLimitations,
  foodTypes,
  kitchenTypes,
} from '@/config/constants';
import { AlertContext } from '@/contexts';
import useFetch from '@/hooks/useFetch';
import useForm from '@/hooks/useForm';
import { dictionaries } from '@/i18n';
import { CityService } from '@/services/client/cities';
import { CountryService } from '@/services/client/countries';
import { EquipmentService } from '@/services/client/equipments';
import { KitchenService } from '@/services/client/kitchen';
import { refreshData } from '@/services/server/data';
import {
  Branch,
  City,
  Country,
  Equipment,
  PageProps,
} from '@/types/interfaces';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

function Page({ params: { lang, kitchenId } }: PageProps) {
  const dict = dictionaries[lang];
  const { data: countries } = useFetch(null, {
    async fetch() {
      return await CountryService.getCountries();
    },
  });

  const { data: equipments } = useFetch(null, {
    async fetch() {
      return await EquipmentService.getEquipment();
    },
  });

  const [logo, setLogo] = useState('');
  const [cover, setCover] = useState('');
  const [country, setCountry] = useState('');
  const [cities, setCities] = useState<City[] | null>(null);
  const [geoLocation, setGeoLocation] = useState<{
    long: number;
    lat: number;
  } | null>(null);

  const [loading, setLoading] = useState(false);

  const handleShowAlert = useContext(AlertContext);

  const router = useRouter();

  const { register, handleSubmit, reset, submitting } = useForm(
    {
      name: {
        init: '',
        required: {
          value: true,
        },
      },
      description: {
        init: '',
        required: {
          value: true,
        },
      },
      legalNumber: {
        init: '',
        required: {
          value: true,
        },
      },
      equipments: {
        init: [],
        required: {
          value: true,
        },
      },
      foodTypes: {
        init: [],
        required: {
          value: true,
        },
      },
      type: {
        init: '',
        required: {
          value: true,
        },
      },
      cookingLimitations: {
        init: [],
        required: {
          value: true,
        },
      },
      adress: {
        init: '',
        required: {
          value: true,
        },
      },
      zipCode: {
        init: '',
        required: {
          value: true,
        },
      },
      city: {
        init: '',
        required: {
          value: true,
        },
      },
    },
    {
      dict,
      async onSubmit(formState) {
        const kitchen: Branch = {
          name: formState.name,
          description: formState.description,
          legalNumber: formState.legalNumber,
          logo,
          cover,
          type: formState.type,
          foodTypes: formState.foodTypes,
          equipments: formState.equipments,
          cookingLimitations: formState.cookingLimitations,
          address: {
            address: formState.adress,
            zipCode: formState.zipCode,
            city: formState.city,
            geoLocation: geoLocation!,
          },
          concepts: [],
        };
        isEdit
          ? await KitchenService.updateKitchen(kitchenId[0], kitchen)
          : await KitchenService.createKitchen(kitchen);
        handleShowAlert({
          color: 'suceess',
          message: isEdit
            ? 'Kitchen updated successfully'
            : 'Kitchen created successfully',
        });
        refreshData(`/${lang}/marketplace/branch/kitchens`);
        router.push(`/${lang}/marketplace/branch/kitchens`);
      },
    }
  );

  const handleCountryChange = async (_: any, value: string) => {
    setCountry(value);
    const cities = await CityService.getCities(value);
    setCities(cities);
  };

  const handleMapClick = ({ lat, long }: { lat: number; long: number }) => {
    setGeoLocation({ lat, long });
  };

  const isEdit = !!kitchenId?.[0];

  useEffect(() => {
    if (isEdit) {
      setLoading(true);
      KitchenService.getKitchen(kitchenId[0]).then((kitchen) => {
        reset({
          name: kitchen.name,
          description: kitchen.description,
          legalNumber: kitchen.legalNumber,
          type: kitchen.type,
          foodTypes: kitchen.foodTypes,
          equipments: kitchen?.equipments?.map(
            (equipment: any) => equipment._id
          ),
          cookingLimitations: kitchen.cookingLimitations,
          adress: kitchen.address.address,
          zipCode: kitchen.address.zipCode,
          city: (kitchen.address.city as City)._id,
        });
        handleCountryChange(
          null,
          (kitchen.address.city as City).country as string
        );
        setLogo(kitchen?.logo || '');
        setCover(kitchen.cover || '');
        setGeoLocation(kitchen.address.geoLocation);
        setLoading(false);
      });
    }
  }, [kitchenId]);

  const onUploadLogo = (logo: string) => {
    setLogo(logo);
  };

  const onUploadCover = (cover: string) => {
    setCover(cover);
  };

  return (
    <TransitionPageWrapper
      title={dict.pagesTitles?.createBrand}
      className="overflow-x-hidden"
    >
      <div className="w-full flex justify-center items-center text-center flex-col my-10">
        <div className="h3 mb-2">
          {isEdit
            ? dict?.marketplace?.kitchens?.create?.createYourKitchen
            : dict?.marketplace?.kitchens?.create?.editYourKitchen}
        </div>
        <div className="text-sm text-secondary max-w-lg">
          {dict?.marketplace?.kitchens?.create?.createYourKitchenDesc}
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-5 px-5">
        <div className="w-full md:w-1/2 m-0">
          <div className="mb-5">
            <div className="h4 mb-1">
              {dict?.marketplace?.kitchens?.create?.logo}
            </div>
            <p className="t1 max-w-lg mb-2">
              {dict?.marketplace?.kitchens?.create?.logoDesc}
            </p>
            <AvatarPicker
              dict={dict}
              onImageUpload={onUploadLogo}
              value={logo}
              className="flex justify-start"
              from="logo"
            />
          </div>
          <div className="mb-5">
            <div className="h4 mb-1">
              {dict?.marketplace?.kitchens?.create?.kitchenName}
            </div>
            <p className="t1 max-w-lg mb-2">
              {dict?.marketplace?.kitchens?.create?.kitchenNameDesc}
            </p>
            <Input
              {...register('name')}
              label={dict?.marketplace?.kitchens?.create?.kitchenName}
            ></Input>
          </div>
          <div className="mb-5">
            <div className="h4 mb-1">
              {dict?.marketplace?.kitchens?.create?.kitchenDescription}
            </div>
            <p className="t1 max-w-lg mb-2">
              {dict?.marketplace?.kitchens?.create?.kitchenDescriptionDesc}
            </p>
            <Input
              {...register('description')}
              label={dict?.marketplace?.kitchens?.create?.kitchenDescription}
            ></Input>
          </div>
          <div className="mb-5">
            <div className="h4 mb-1">
              {dict?.marketplace?.kitchens?.create?.legalNumber}
            </div>
            <p className="t1 max-w-lg mb-2">
              {dict?.marketplace?.kitchens?.create?.legalNumberDesc}
            </p>
            <Input
              {...register('legalNumber')}
              label={dict?.marketplace?.kitchens?.create?.legalNumber}
            ></Input>
          </div>
          <div className="mb-5">
            <div className="h4 mb-1">
              {dict?.marketplace?.kitchens?.create?.type}
            </div>
            <p className="t1 max-w-lg mb-2">
              {dict?.marketplace?.kitchens?.create?.typeDesc}
            </p>
            <Select
              search
              label={dict?.marketplace?.kitchens?.create?.type}
              {...register('type')}
              options={kitchenTypes.map((type) => ({
                label: type,
                value: type,
              }))}
            />
          </div>
          <div className="mb-5">
            <div className="h4 mb-1">
              {dict?.marketplace?.kitchens?.create?.cookingLimitations}
            </div>
            <p className="t1 max-w-lg mb-2">
              {dict?.marketplace?.kitchens?.create?.cookingLimitationsDesc}
            </p>
            <Select
              search
              label={dict?.marketplace?.kitchens?.create?.cookingLimitations}
              {...register('cookingLimitations')}
              options={cookingLimitations.map((limitation) => ({
                label: limitation,
                value: limitation,
              }))}
            />
          </div>
          {equipments && (
            <div className="mb-5">
              <div className="h4 mb-1">
                {dict?.marketplace?.kitchens?.create?.availableEquipments}
              </div>
              <p className="t1 max-w-lg mb-2">
                {dict?.marketplace?.kitchens?.create?.availableEquipmentsDesc}
              </p>
              <Select
                search
                label={dict?.marketplace?.kitchens?.create?.availableEquipments}
                {...register('equipments')}
                options={equipments.map((equipment: Equipment) => ({
                  label: equipment.name,
                  value: equipment._id,
                }))}
              />
            </div>
          )}

          <div className="mb-5">
            <div className="h4 mb-1">
              {dict?.marketplace?.kitchens?.create?.foodTypes}
            </div>
            <p className="t1 max-w-lg mb-2">
              {dict?.marketplace?.kitchens?.create?.foodTypesDesc}
            </p>
            <Select
              search
              label={dict?.marketplace?.kitchens?.create?.foodTypes}
              {...register('foodTypes')}
              options={foodTypes.map((foodType) => ({
                label: foodType,
                value: foodType,
              }))}
            />
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <div className="mb-5">
            <div className="h4 mb-1">
              {dict?.marketplace?.kitchens?.create?.cover}
            </div>
            <p className="t1 max-w-lg mb-2">
              {dict?.marketplace?.kitchens?.create?.coverDesc}
            </p>
            <AvatarPicker
              dict={dict}
              onImageUpload={onUploadCover}
              value={cover}
              className="flex justify-start"
              from="cover"
            />
          </div>

          <div className="mb-5">
            <div className="h4 mb-1">
              {dict?.marketplace?.kitchens?.create?.adress}
            </div>
            <p className="t1 max-w-lg mb-2">
              {dict?.marketplace?.kitchens?.create?.adressDesc}
            </p>
            <Input
              {...register('adress')}
              label={dict?.marketplace?.kitchens?.create?.adress}
            ></Input>
          </div>
          <div className="mb-5">
            <div className="h4 mb-1">
              {dict?.marketplace?.kitchens?.create?.zipCode}
            </div>
            <p className="t1 max-w-lg mb-2">
              {dict?.marketplace?.kitchens?.create?.zipCodeDesc}
            </p>
            <Input
              {...register('zipCode')}
              label={dict?.marketplace?.kitchens?.create?.zipCode}
            ></Input>
          </div>
          {countries && (
            <div className="mb-5">
              <div className="h4 mb-1">
                {dict?.marketplace?.kitchens?.create?.country}
              </div>
              <p className="t1 max-w-lg mb-2">
                {dict?.marketplace?.kitchens?.create?.countryDesc}
              </p>
              <Select
                search
                name="country"
                onChange={handleCountryChange}
                value={country}
                label={dict?.marketplace?.kitchens?.create?.country}
                options={countries.map((country: Country) => ({
                  label: country.name,
                  value: country._id,
                }))}
              />
            </div>
          )}
          {cities && (
            <div className="mb-5">
              <div className="h4 mb-1">
                {dict?.marketplace?.kitchens?.create?.city}
              </div>
              <p className="t1 max-w-lg mb-2">
                {dict?.marketplace?.kitchens?.create?.cityDesc}
              </p>
              <Select
                search
                {...register('city')}
                label={dict?.marketplace?.kitchens?.create?.city}
                options={cities!.map((city: City) => ({
                  label: city.nameEn,
                  value: city._id,
                }))}
              />
            </div>
          )}
          {!loading && (
            <GeolocationSelector
              initialLong={geoLocation?.long}
              initialLat={geoLocation?.lat}
              onMapClick={handleMapClick}
            />
          )}
        </div>
      </div>
      <div className="flex justify-between items-center gap-5 pb-5 mx-5">
        <Link href={`/${dict.lang}/marketplace/branch/kitchens`}>
          <Button className="bg-heavy-gray w-full">{dict.common?.back}</Button>
        </Link>
        <Button loading={submitting} onClick={handleSubmit}>
          {dict.common?.confirm}
        </Button>
      </div>
    </TransitionPageWrapper>
  );
}

export default Page;
