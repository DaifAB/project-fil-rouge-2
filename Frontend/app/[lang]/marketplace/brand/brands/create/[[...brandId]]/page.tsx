'use client';

import Button from '@/components/Button';
import TransitionPageWrapper from '@/components/TransitionPageWrapper';
import Input from '@/components/form/Input';
import Select from '@/components/form/Select';
import AvatarPicker from '@/components/login-page/AvatarPicker';
import { foodTypes } from '@/config/constants';
import { AlertContext } from '@/contexts';
import useFetch from '@/hooks/useFetch';
import useForm from '@/hooks/useForm';
import { dictionaries } from '@/i18n';
import { ConceptService } from '@/services/client/brands';
import { CountryService } from '@/services/client/countries';
import { EquipmentService } from '@/services/client/equipments';
import { refreshData } from '@/services/server/data';
import { Concept, Country, Equipment, PageProps } from '@/types/interfaces';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

function Page({ params: { lang, brandId } }: PageProps) {
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
      slogan: {
        init: '',
        required: {
          value: true,
        },
      },
      countries: {
        init: [],
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
      commission: {
        init: 0,
        required: {
          value: true,
        },
      },
      averageOrderValue: {
        init: 0,
        required: {
          value: true,
        },
      },
      averageOrdersNumber: {
        init: 0,
        required: {
          value: true,
        },
      },
      cogs: {
        init: 0,
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
      websiteUrl: {
        init: '',
        required: {
          value: true,
        },
      },
      instagramUrl: {
        init: '',
        required: {
          value: true,
        },
      },
      facebookUrl: {
        init: '',
        required: {
          value: true,
        },
      },
      twitterUrl: {
        init: '',
        required: {
          value: true,
        },
      },
    },
    {
      dict,
      async onSubmit(formState) {
        const concept: Concept = {
          name: formState.name,
          description: formState.description,
          slogan: formState.slogan,
          commission: formState.commission,
          averageOrderValue: formState.averageOrderValue,
          averageOrdersNumber: formState.averageOrdersNumber,
          cogs: formState.cogs,
          foodTypes: formState.foodTypes,
          websiteUrl: formState.websiteUrl,
          instagramUrl: formState.instagramUrl,
          facebookUrl: formState.facebookUrl,
          twitterUrl: formState.twitterUrl,
          countries: formState.countries,
          equipments: formState.equipments,
          logo,
          cover,
        };

        isEdit
          ? await ConceptService.updateBrand(brandId[0], concept)
          : await ConceptService.createBrand(concept);
        handleShowAlert({
          color: 'suceess',
          message: isEdit
            ? 'Brand updated successfully'
            : 'Brand created successfully',
        });
        refreshData(`/${lang}/marketplace/brand/brands`);
        router.push(`/${lang}/marketplace/brand/brands`);
      },
    }
  );

  const isEdit = !!brandId?.[0];

  useEffect(() => {
    if (isEdit) {
      ConceptService.getBrand(brandId[0]).then((concept) => {
        reset({
          name: concept.name,
          description: concept.description,
          slogan: concept.slogan,
          commission: concept.commission,
          averageOrderValue: concept.averageOrderValue,
          averageOrdersNumber: concept.averageOrdersNumber,
          cogs: concept.cogs,
          foodTypes: concept.foodTypes,
          websiteUrl: concept.websiteUrl,
          instagramUrl: concept.instagramUrl,
          facebookUrl: concept.facebookUrl,
          twitterUrl: concept.twitterUrl,
          countries: concept.countries.map(
            (country) => (country as Country)._id
          ),
          equipments: concept.equipments.map(
            (equipment) => (equipment as Equipment)._id
          ),
        });
        setLogo(concept.logo);
        setCover(concept.cover);
      });
    }
  }, [brandId]);

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
            ? dict?.marketplace?.brands?.create?.editYourBrand
            : dict?.marketplace?.brands?.create?.createYourBrand}
        </div>
        <div className="text-sm text-secondary max-w-lg">
          {dict?.marketplace?.brands?.create?.createYourBrandDesc}
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-5 px-5">
        <div className="w-full md:w-1/2 m-0">
          <div className="mb-5">
            <div className="h4 mb-1">
              {dict?.marketplace?.brands?.create?.logo}
            </div>
            <p className="t1 max-w-lg mb-2">
              {dict?.marketplace?.brands?.create?.logoDesc}
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
              {dict?.marketplace?.brands?.create?.brandName}
            </div>
            <p className="t1 max-w-lg mb-2">
              {dict?.marketplace?.brands?.create?.brandNameDesc}
            </p>
            <Input
              {...register('name')}
              label={dict?.marketplace?.brands?.create?.brandName}
            ></Input>
          </div>
          <div className="mb-5">
            <div className="h4 mb-1">
              {dict?.marketplace?.brands?.create?.brandDescription}
            </div>
            <p className="t1 max-w-lg mb-2">
              {dict?.marketplace?.brands?.create?.brandDescriptionDesc}
            </p>
            <Input
              {...register('description')}
              label={dict?.marketplace?.brands?.create?.brandDescription}
            ></Input>
          </div>
          <div className="mb-5">
            <div className="h4 mb-1">
              {dict?.marketplace?.brands?.create?.slogan}
            </div>
            <p className="t1 max-w-lg mb-2">
              {dict?.marketplace?.brands?.create?.sloganDesc}
            </p>
            <Input
              {...register('slogan')}
              label={dict?.marketplace?.brands?.create?.slogan}
            ></Input>
          </div>

          <div className="mb-5">
            <div className="h4 mb-1">
              {dict?.marketplace?.brands?.create?.commission}
            </div>
            <p className="t1 max-w-lg mb-2">
              {dict?.marketplace?.brands?.create?.commissionDesc}
            </p>
            <Input
              {...register('commission')}
              label={dict?.marketplace?.brands?.create?.commission}
              type="number"
            ></Input>
          </div>
          <div className="mb-5">
            <div className="h4 mb-1">
              {dict?.marketplace?.brands?.create?.averageOrdersNumber}
            </div>
            <p className="t1 max-w-lg mb-2">
              {dict?.marketplace?.brands?.create?.averageOrdersNumberDesc}
            </p>
            <Input
              {...register('averageOrdersNumber')}
              label={dict?.marketplace?.brands?.create?.averageOrdersNumber}
              type="number"
            ></Input>
          </div>
          <div className="mb-5">
            <div className="h4 mb-1">
              {dict?.marketplace?.brands?.create?.averageOrderValue}
            </div>
            <p className="t1 max-w-lg mb-2">
              {dict?.marketplace?.brands?.create?.averageOrderValueDesc}
            </p>
            <Input
              {...register('averageOrderValue')}
              label={dict?.marketplace?.brands?.create?.averageOrderValue}
              type="number"
            ></Input>
          </div>
          <div className="mb-5">
            <div className="h4 mb-1">
              {dict?.marketplace?.brands?.create?.cogs}
            </div>
            <p className="t1 max-w-lg mb-2">
              {dict?.marketplace?.brands?.create?.cogsDesc}
            </p>
            <Input
              {...register('cogs')}
              label={dict?.marketplace?.brands?.create?.cogs}
              type="number"
            ></Input>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <div className="mb-5">
            <div className="h4 mb-1">
              {dict?.marketplace?.brands?.create?.cover}
            </div>
            <p className="t1 max-w-lg mb-2">
              {dict?.marketplace?.brands?.create?.coverDesc}
            </p>
            <AvatarPicker
              dict={dict}
              onImageUpload={onUploadCover}
              value={cover}
              className="flex justify-start"
              from="cover"
            />
          </div>
          {countries && (
            <div className="mb-5">
              <div className="h4 mb-1">
                {dict?.marketplace?.brands?.create?.availableMarkets}
              </div>
              <p className="t1 max-w-lg mb-2">
                {dict?.marketplace?.brands?.create?.availableMarketsDesc}
              </p>
              <Select
                search
                label={dict?.marketplace?.brands?.create?.availableMarkets}
                {...register('countries')}
                options={countries.map((country: Country) => ({
                  label: country.name,
                  value: country._id,
                }))}
              />
            </div>
          )}

          {equipments && (
            <div className="mb-5">
              <div className="h4 mb-1">
                {dict?.marketplace?.brands?.create?.requiredEquipments}
              </div>
              <p className="t1 max-w-lg mb-2">
                {dict?.marketplace?.brands?.create?.requiredEquipmentsDesc}
              </p>
              <Select
                search
                label={dict?.marketplace?.brands?.create?.requiredEquipments}
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
              {dict?.marketplace?.brands?.create?.foodTypes}
            </div>
            <p className="t1 max-w-lg mb-2">
              {dict?.marketplace?.brands?.create?.foodTypesDesc}
            </p>
            <Select
              search
              label={dict?.marketplace?.brands?.create?.foodTypes}
              {...register('foodTypes')}
              options={foodTypes.map((foodType) => ({
                label: foodType,
                value: foodType,
              }))}
            />
          </div>
          <div className="mb-5">
            <div className="h4 mb-1">
              {dict?.marketplace?.brands?.create?.websiteUrl}
            </div>
            <p className="t1 max-w-lg mb-2">
              {dict?.marketplace?.brands?.create?.websiteUrlDesc}
            </p>
            <Input
              {...register('websiteUrl')}
              label={dict?.marketplace?.brands?.create?.websiteUrl}
            ></Input>
          </div>
          <div className="mb-5">
            <div className="h4 mb-1">
              {dict?.marketplace?.brands?.create?.instagramUrl}
            </div>
            <p className="t1 max-w-lg mb-2">
              {dict?.marketplace?.brands?.create?.instagramUrlDesc}
            </p>
            <Input
              {...register('instagramUrl')}
              label={dict?.marketplace?.brands?.create?.instagramUrl}
            ></Input>
          </div>
          <div className="mb-5">
            <div className="h4 mb-1">
              {dict?.marketplace?.brands?.create?.facebookUrl}
            </div>
            <p className="t1 max-w-lg mb-2">
              {dict?.marketplace?.brands?.create?.facebookUrlDesc}
            </p>
            <Input
              {...register('facebookUrl')}
              label={dict?.marketplace?.brands?.create?.facebookUrl}
            ></Input>
          </div>
          <div className="mb-5">
            <div className="h4 mb-1">
              {dict?.marketplace?.brands?.create?.twitterUrl}
            </div>
            <p className="t1 max-w-lg mb-2">
              {dict?.marketplace?.brands?.create?.twitterUrlDesc}
            </p>
            <Input
              {...register('twitterUrl')}
              label={dict?.marketplace?.brands?.create?.twitterUrl}
            ></Input>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center gap-5 pb-5 mx-5">
        <Link href={`/${dict.lang}/marketplace/brand/brands`}>
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
