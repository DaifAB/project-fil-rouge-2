'use client';

import Button from '@/components/Button';
import NeedHelpPopup from '@/components/NeedHelpPopup';
import Stepper from '@/components/Stepper';
import Input from '@/components/form/Input';
import Select from '@/components/form/Select';
import MarketFooter from '@/components/marketplace/MarketFooter';
import { experiences } from '@/config/constants';
import { AlertContext } from '@/contexts';
import useForm from '@/hooks/useForm';
import { Dictionary } from '@/types/interfaces';
import { Application, Branch, Concept } from '@/types/interfaces';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { ApplicationService } from '@/services/client/application';

interface Props {
  dict: Dictionary;
  application: Application;
  branches: Branch[];
}

function ApplicationStepOne({ dict, application, branches }: Props) {
  const handleShowAlert = useContext(AlertContext);

  const router = useRouter();

  const { register, handleSubmit, formState, submitting } = useForm(
    {
      branchId: {
        init: (application.branch as Branch)?._id,
        required: {
          value: true,
        },
      },
      ordersPerDay: {
        init: application.branchApplication?.ordersPerDay,
        required: {
          value: true,
        },
      },
      staffCount: {
        init: application.branchApplication?.staffCount,
        required: {
          value: true,
        },
      },
      experience: {
        init: application.branchApplication?.experience,
        required: {
          value: true,
        },
      },
      brandsCount: {
        init: application.branchApplication?.brandsCount,
        required: {
          value: true,
        },
      },
      brandsTypes: {
        init: application.branchApplication?.brandsTypes,
      },
      freezerStorageCapacity: {
        init: application.branchApplication?.storageCapacity?.freezer,
        required: {
          value: true,
        },
      },
      fridgeStorageCapacity: {
        init: application.branchApplication?.storageCapacity?.fridge,
        required: {
          value: true,
        },
      },
      dryStorageCapacity: {
        init: application.branchApplication?.storageCapacity?.dry,
        required: {
          value: true,
        },
      },
    },
    {
      dict,
      async onSubmit(formState, redirectPath) {
        try {
          await ApplicationService.updateApplication(application._id, {
            ...application,
            branch: formState.branchId,
            branchApplication: {
              ...application.branchApplication!,
              concept: application.branchApplication!.concept,
              brandsCount: formState.brandsCount,
              brandsTypes: formState.brandsTypes,
              experience: formState.experience,
              ordersPerDay: formState.ordersPerDay,
              staffCount: formState.staffCount,
              storageCapacity: {
                freezer: formState.freezerStorageCapacity,
                fridge: formState.fridgeStorageCapacity,
                dry: formState.dryStorageCapacity,
              },
            },
          });

          router.push(redirectPath);
        } catch (error) {
          console.error(error);
          handleShowAlert({
            color: 'warning',
            message: dict.errors?.default,
          });
        }
      },
    }
  );

  const handleSubmitNext = () => {
    handleSubmit(
      null,
      `/marketplace/branch/brands/application/${application._id}/step-2`
    );
  };

  const handleSubmitBack = () => {
    handleSubmit(null, `/marketplace/branch/brands/ongoing`);
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <div>
        <div className="mb-10 max-w-md mx-auto">
          <Stepper steps={2} step={1} />
        </div>
        <div className="flex flex-col md:flex-row gap-5 px-5">
          <div className="w-full md:w-1/2 m-0">
            <div className="mb-5">
              <div className="h4 mb-1">
                {dict.marketplace?.brands?.application?.kitchenApplying}
              </div>
              <p className="t1 max-w-lg mb-2">
                {dict.marketplace?.brands?.application?.kitchenApplyingDesc}
              </p>
              <Select
                label={dict.common?.selectYourKitchen}
                {...register('branchId')}
                options={branches.map((branch) => ({
                  label: branch.name,
                  value: branch._id,
                }))}
              />
            </div>
            <div className="mb-5">
              <div className="h4 mb-1">
                {dict.marketplace?.brands?.application?.ordersPerDay}
              </div>
              <p className="t1 max-w-lg mb-2">
                {dict.marketplace?.brands?.application?.ordersPerDayDesc}
              </p>
              <Input
                {...register('ordersPerDay')}
                label={
                  dict.marketplace?.brands?.application?.enterNumberOfOrders
                }
                type="number"
              ></Input>
            </div>
            <div className="mb-5">
              <div className="h4 mb-1">
                {dict.marketplace?.brands?.application?.staffCount}
              </div>
              <p className="t1 max-w-lg mb-2">
                {dict.marketplace?.brands?.application?.staffCountDesc}
              </p>
              <Input
                {...register('staffCount')}
                label={
                  dict.marketplace?.brands?.application?.enterNumberOfStaff
                }
                type="number"
              ></Input>
            </div>
            <div className="mb-5">
              <div className="h4 mb-1">
                {dict.marketplace?.brands?.application?.experience}
              </div>
              <p className="t1 max-w-lg mb-2">
                {dict.marketplace?.brands?.application?.experienceDesc}
              </p>
              <Select
                label={dict.marketplace?.brands?.application?.selectExp}
                {...register('experience')}
                options={experiences.map((exp) => ({
                  label: dict.marketplace?.brands?.application?.[exp.display],
                  value: exp.value,
                }))}
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="mb-5">
              <div className="h4 mb-1">
                {dict.marketplace?.brands?.application?.brandsCount}
              </div>
              <p className="t1 max-w-lg mb-2">
                {dict.marketplace?.brands?.application?.brandsCountDesc}
              </p>
              <Input
                {...register('brandsCount')}
                label={
                  dict.marketplace?.brands?.application?.enterNumberOfBrands
                }
                type="number"
              ></Input>
            </div>

            {formState.brandsCount > 0 && (
              <div className="mb-5">
                <div className="h4 mb-1">
                  {dict.marketplace?.brands?.application?.brandsTypes}
                </div>
                <p className="t1 max-w-lg mb-2">
                  {dict.marketplace?.brands?.application?.brandsTypesDesc}
                </p>
                <Input
                  {...register('brandsTypes')}
                  label={dict.marketplace?.brands?.application?.enterBrandType}
                ></Input>
              </div>
            )}

            <div className="mb-5">
              <div className="h4 mb-1">
                {dict.marketplace?.brands?.application?.storageCapacity}
              </div>
              <p className="t1 max-w-lg mb-2">
                {dict.marketplace?.brands?.application?.storageCapacityDesc}
              </p>
              <Input
                {...register('freezerStorageCapacity')}
                label={dict.marketplace?.brands?.application?.freezer}
                type="number"
                suffix={'liter'}
              ></Input>
              <Input
                {...register('fridgeStorageCapacity')}
                label={dict.marketplace?.brands?.application?.refrigirator}
                type="number"
                suffix={'liter'}
              ></Input>
              <Input
                {...register('dryStorageCapacity')}
                label={dict.marketplace?.brands?.application?.dryStorage}
                type="number"
                suffix={'liter'}
              ></Input>
            </div>
          </div>
        </div>
      </div>

      <MarketFooter className="sticky left-0 right-0 bottom-0">
        <div className="flex flex-col md:flex-row gap-3">
          <Link href={`/${dict.lang}/marketplace/branch/brands/ongoing`}>
            <Button className="bg-heavy-gray w-full">
              {dict.common?.back}
            </Button>
          </Link>
          <Link
            href={`/${dict.lang}/marketplace/branch/brands/profile/${
              (application.branchApplication!.concept as Concept)._id
            }`}
            target="_blank"
          >
            <Button className="bg-primary w-full">
              {dict.marketplace?.brands?.application?.toBrand}
            </Button>
          </Link>
          <NeedHelpPopup dict={dict} />
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <Button loading={submitting} onClick={handleSubmitBack}>
            {dict.marketplace?.brands?.application?.saveAndFinishLater}
          </Button>
          <Button loading={submitting} onClick={handleSubmitNext}>
            {dict.common?.next}
          </Button>
        </div>
      </MarketFooter>
    </div>
  );
}

export default ApplicationStepOne;
