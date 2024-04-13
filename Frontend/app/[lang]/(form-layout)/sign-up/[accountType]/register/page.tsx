'use client';

import Stepper from '@/components/Stepper';
import TransitionPageWrapper from '@/components/TransitionPageWrapper';
import RegistrationStepOne from '@/components/login-page/RegistrationStepOne';
import RegistrationStepTwo from '@/components/login-page/RegistrationStepTwo';
import { auth } from '@/config/firebase-config';
import { AlertContext, AuthUserContext } from '@/contexts';
import { dictionaries } from '@/i18n';
import { AuthService } from '@/services/client/auth';
import { PageProps, Step } from '@/types/interfaces';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';

function Page({ params: { lang, accountType } }: PageProps) {
  const dict = dictionaries[lang];

  const [authUser, , handleSetAuthUser] = useContext(AuthUserContext);
  const handleShowAlert = useContext(AlertContext);

  const [registrationData, setRegistrationData] = useState<any>(null);
  const [step, setStep] = useState(1);
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const onSubmitStepOne = (data: any) => {
    setRegistrationData(data);
    setStep(step + 1);
  };

  const onSubmitStepTwo = async (data: any) => {
    try {
      setLoading(true);

      const user = {
        ...registrationData,
        ...data,
        language: lang,
        uid: authUser?.uid,
        email: authUser?.email,
        name: `${registrationData?.firstName} ${registrationData?.lastName}`,
        accountType,
      };

      await AuthService.register(user);

      await AuthService.refreshToken();

      if (auth.currentUser) {
        await handleSetAuthUser(
          {
            ...auth.currentUser,
            displayName: `${registrationData?.firstName} ${registrationData?.lastName}`,
          },
          true
        );
      }

      router.push(`/${lang}/marketplace/${accountType}/home`);
    } catch (error) {
      console.error(error);
      handleShowAlert({
        color: 'danger',
        message: dict.errors?.default,
      });
    } finally {
      setLoading(false);
    }
  };

  function handleBack() {
    setStep(step - 1);
  }

  const steps: Step[] = [
    {
      label: dict?.register?.personalInformations,
      content: (
        <RegistrationStepOne
          dict={dict}
          onSubmit={onSubmitStepOne}
          values={registrationData}
        />
      ),
    },
    {
      label: dict?.register?.accountInformations,
      content: (
        <RegistrationStepTwo
          dict={dict}
          onSubmit={onSubmitStepTwo}
          handleBack={handleBack}
          loading={loading}
        />
      ),
    },
  ];

  return (
    <TransitionPageWrapper
      title={dict.pagesTitles?.register}
      className="w-full xl:w-3/5 2xl:w-1/2 flex flex-col justify-center"
    >
      <div className="h1 mb-1">{dict?.register?.welcome}</div>
      <p className="text-base">{dict?.register?.registerDesc}</p>
      <Stepper steps={steps} step={step} />
    </TransitionPageWrapper>
  );
}

export default Page;
