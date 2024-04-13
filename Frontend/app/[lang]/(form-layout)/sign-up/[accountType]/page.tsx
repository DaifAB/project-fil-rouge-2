'use client';

import Button from '@/components/Button';
import TransitionPageWrapper from '@/components/TransitionPageWrapper';
import Input from '@/components/form/Input';
import { auth } from '@/config/firebase-config';
import { emailRegex } from '@/config/regex';
import { AlertContext, AuthUserContext } from '@/contexts';
import useForm from '@/hooks/useForm';
import { dictionaries } from '@/i18n';
import { AuthService } from '@/services/client/auth';
import { PageProps } from '@/types/interfaces';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';

function Signup({ params: { lang, accountType } }: PageProps) {
  const dict = dictionaries[lang];

  const capitalizedAccountType = accountType === 'branch' ? 'Kitchen' : 'Brand';
  const [, , handleSetAuthUser] = useContext(AuthUserContext);
  const handleShowAlert = useContext(AlertContext);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();

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
      passwordConfirmation: {
        init: '',
        required: {
          value: true,
        },
        confirmation: {
          value: 'password',
          message: 'Your passwords do no match',
        },
      },
    },
    {
      dict,
      async onSubmit(formState) {
        try {
          const credentials = await AuthService.signUp(
            formState.email,
            formState.password
          );
          await AuthService.setUserClaims(credentials.user.uid, accountType);
          Cookies.set('accountType', accountType);

          await handleSetAuthUser(auth.currentUser, true);

          router.push(`/${lang}/sign-up/${accountType}/register`);
        } catch (error) {
          console.error(error);

          const isEmailAlreadyInUse = [
            'auth/email-already-in-use',
            'auth/email-already-exists',
          ].some((err) => (error as any).message.includes(err));

          handleShowAlert({
            color: isEmailAlreadyInUse ? 'warning' : 'danger',
            message: isEmailAlreadyInUse
              ? dict.errors?.auth?.emailAlreadyExist
              : dict.errors?.default,
          });
        }
      },
    }
  );

  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <TransitionPageWrapper
      title={dict.pagesTitles?.signUp}
      className="w-full xl:w-3/5 2xl:w-1/2 flex flex-col justify-center"
    >
      <div className="h1 mb-1">
        {dict?.common?.[`registerYour${capitalizedAccountType}`]}
      </div>
      <p className="text-base mb-6">
        {
          dict?.signup?.[
            `${accountType === 'branch' ? 'kitchen' : 'brand'}SignupDesc`
          ]
        }
      </p>
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
        <Input
          {...register('passwordConfirmation')}
          label={dict?.common?.confirmPassword}
          type={showConfirmPassword ? 'text' : 'password'}
          suffix={
            <FontAwesomeIcon
              icon={showConfirmPassword ? faEyeSlash : faEye}
              className="w-5 h-5 cursor-pointer"
              onClick={handleToggleShowConfirmPassword}
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
}

export default Signup;
