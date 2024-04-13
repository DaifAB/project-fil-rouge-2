'use client';

import Button from '@/components/Button';
import TransitionPageWrapper from '@/components/TransitionPageWrapper';
import Input from '@/components/form/Input';
import { emailRegex } from '@/config/regex';
import { AlertContext, AuthUserContext } from '@/contexts';
import useForm from '@/hooks/useForm';
import { dictionaries } from '@/i18n';
import { AuthService } from '@/services/client/auth';
import { PageProps } from '@/types/interfaces';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookies from 'js-cookie';
import { useRouter, useSearchParams } from 'next/navigation';
import { useContext, useState } from 'react';

const SignInPage = ({ params: { lang } }: PageProps) => {
  const dict = dictionaries[lang];

  const [showPassword, setShowPassword] = useState(false);
  const [, , handleSetAuthUser] = useContext(AuthUserContext);
  const handleShowAlert = useContext(AlertContext);
  const router = useRouter();
  const queryParams = useSearchParams();

  const { register, handleSubmit, submitting } = useForm(
    {
      email: {
        init: '',
        required: {
          value: true,
        },
        pattern: {
          value: emailRegex,
        },
      },
      password: {
        init: '',
        required: {
          value: true,
        },
        minLength: {
          value: 6,
        },
      },
    },
    {
      dict,
      async onSubmit(formState) {
        try {
          const credentials = await AuthService.signIn(
            formState.email,
            formState.password
          );
          await handleSetAuthUser(credentials.user);
          let accountType = Cookies.get('accountType');
          if (!accountType) {
            accountType = (await AuthService.getConnectedUser()).accounts[0]
              .type;
          }

          router.push(
            queryParams.get('redirect') ||
              `/${lang}/marketplace/${accountType}/home`
          );
        } catch (error: any) {
          console.error(error);
          if (error.message.includes('auth/user-not-found')) {
            handleShowAlert({
              color: 'warning',
              message: dict.errors?.auth?.userNotFound,
            });
          } else if (error.message.includes('auth/wrong-password')) {
            handleShowAlert({
              color: 'warning',
              message: dict.errors?.auth?.wrongPassword,
            });
          } else {
            handleShowAlert({
              color: 'warning',
              message: dict.errors?.default,
            });
          }
        }
      },
    }
  );

  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TransitionPageWrapper
      title={dict.pagesTitles?.signIn}
      className="w-full xl:w-3/5 2xl:w-1/2 flex flex-col justify-center"
    >
      <div className="h1 mb-1">{dict?.signin?.signinTitle}</div>
      <p className="text-base mb-6">{dict?.signin?.signinDesc}</p>
      <form onSubmit={handleSubmit}>
        <Input {...register('email')} label={dict?.common?.email}></Input>
        <Input
          {...register('password')}
          label={dict?.common?.password}
          type={showPassword ? 'text' : 'password'}
          suffix={
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className="w-5 h-5 cursor-pointer"
              onClick={handleToggleShowPassword}
            />
          }
        ></Input>
        <Button
          className="mb-3 w-full"
          type="submit"
          disabled={submitting}
          loading={submitting}
        >
          {dict?.common?.submit}
        </Button>
      </form>
    </TransitionPageWrapper>
  );
};

export default SignInPage;
