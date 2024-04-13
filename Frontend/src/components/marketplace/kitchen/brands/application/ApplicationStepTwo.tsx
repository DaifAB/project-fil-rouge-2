'use client';

import Button from '@/components/Button';
import NeedHelpPopup from '@/components/NeedHelpPopup';
import Stepper from '@/components/Stepper';
import Checkbox from '@/components/form/Checkbox';
import Input from '@/components/form/Input';
import MarketFooter from '@/components/marketplace/MarketFooter';
import { AlertContext, AuthUserContext } from '@/contexts';
import useForm from '@/hooks/useForm';
import { ApplicationService } from '@/services/client/application';
import { Dictionary } from '@/types/interfaces';
import { getSenderAndReceiver } from '@/utils/getSenderAndReceiver';
import { Application, Concept } from '@/types/interfaces';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';

interface Props {
  dict: Dictionary;
  application: Application;
}
function ApplicationStepTwo({ dict, application }: Props) {
  const handleShowAlert = useContext(AlertContext);
  const router = useRouter();

  const { register, handleSubmit, submitting } = useForm(
    {
      message: {
        init: application.branchApplication?.message,
        required: {
          value: false,
        },
      },
      acceptTerms: {
        init: application.branchApplication?.acceptTerms,
        required: {
          value: true,
        },
      },
    },
    {
      dict,
      async onSubmit(formState, { redirectPath, status }) {
        try {
          await ApplicationService.updateApplication(application._id, {
            ...application,
            status,
            branchApplication: {
              ...application.branchApplication!,
              ...formState,
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
    handleSubmit(null, {
      redirectPath: `/marketplace/branch/brands/ongoing`,
      status: 'sent',
    });
  };

  const handleSubmitBack = () => {
    handleSubmit(null, {
      redirectPath: `/marketplace/branch/brands/profile/${
        (application.branchApplication!.concept as Concept)._id
      }`,
      status: 'draft',
    });
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <div>
        <div className="mb-10 max-w-md mx-auto">
          <Stepper steps={2} step={2} />
        </div>
        <div className="w-full md:w-1/2 px-5">
          <div className="mb-5">
            <div className="h4 mb-1">
              {dict.marketplace?.brands?.application?.motivationMessage}
            </div>
            <p className="t1 max-w-lg mb-2">
              {dict.marketplace?.brands?.application?.motivationMessageDesc}
            </p>
            <Input
              {...register('message')}
              label={dict.contactUs?.typeMessage}
              rows={5}
            ></Input>
          </div>
          <div className="mb-5">
            <div className="h4 mb-1">
              {dict.marketplace?.brands?.application?.oneLastStep}
            </div>
            <p className="t1 max-w-lg mb-2">
              {dict.marketplace?.brands?.application?.oneLastStepDesc}
            </p>

            <Checkbox
              {...register('acceptTerms')}
              label={
                <span>
                  {dict.marketplace?.brands?.application?.clickAcceptTerms}{' '}
                  <Link
                    className="font-bold underline"
                    href={`/${dict.lang}/terms-of-use`}
                    target="_blank"
                  >
                    {dict.marketplace?.brands?.application?.theTermsOfUse}
                  </Link>
                </span>
              }
              className="ml-4"
            />
          </div>
        </div>
      </div>
      <MarketFooter className="sticky left-0 right-0 bottom-0">
        <div className="flex flex-col md:flex-row gap-3">
          <Link
            href={`/${dict.lang}/marketplace/branch/brands/application/${application._id}/step-1`}
          >
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

export default ApplicationStepTwo;
