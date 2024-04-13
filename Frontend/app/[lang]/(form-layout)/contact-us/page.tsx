'use client';

import Button from '@/components/Button';
import TransitionPageWrapper from '@/components/TransitionPageWrapper';
import Input from '@/components/form/Input';
import { emailRegex, nameRegex } from '@/config/regex';
import { AlertContext, AuthUserContext } from '@/contexts';
import useForm from '@/hooks/useForm';
import { dictionaries } from '@/i18n';
import { MessageService } from '@/services/client/message';
import { PageProps } from '@/types/interfaces';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';

function ContactUs({ params: { lang } }: PageProps) {
  const dict = dictionaries[lang];
  const router = useRouter();

  const handleShowAlert = useContext(AlertContext);
  const [authUser] = useContext(AuthUserContext);

  const { register, handleSubmit, submitting } = useForm(
    {
      name: {
        init: '',
        required: {
          value: true,
        },
        pattern: {
          value: nameRegex,
        },
      },
      email: {
        init: '',
        required: {
          value: true,
        },
        pattern: {
          value: emailRegex,
        },
      },
      companyName: {
        init: '',
        required: {
          value: true,
        },
        pattern: {
          value: nameRegex,
        },
      },
      subject: {
        init: '',
        required: {
          value: true,
        },
      },
      message: {
        init: '',
        required: {
          value: true,
        },
      },
    },
    {
      dict,
      async onSubmit(formState) {
        try {
          await MessageService.sendMessageContactUs({
            topic: 'contact-form',
            contactFormMessage: {
              name: formState.name,
              email: formState.email,
              companyName: formState.companyName,
              subject: formState.subject,
              message: formState.message,
            },
          });

          router.push(`/${lang}/success?type=messageSent`);
        } catch (error) {
          console.error(error);
          handleShowAlert({
            color: 'danger',
            message: dict.errors?.default,
          });
        }
      },
    }
  );

  return (
    <TransitionPageWrapper
      title={dict.pagesTitles?.contactUs}
      className="w-full xl:w-3/5 2xl:w-1/2"
    >
      <div className="h1 mb-1">{dict?.contactUs?.getInTouch}</div>
      <p className="text-base mb-6">{dict?.contactUs?.getInTouchDesc}</p>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="h3 mb-3">{dict?.contactUs?.information}</div>
        <Input {...register('name')} label={dict?.contactUs?.name}></Input>
        <Input {...register('email')} label={dict?.contactUs?.email}></Input>
        <Input
          {...register('companyName')}
          label={dict?.contactUs?.companyName}
        ></Input>

        <div className="h3 mb-3 mt-8">{dict?.contactUs?.message}</div>
        <Input
          {...register('subject')}
          label={dict?.contactUs?.subject}
        ></Input>
        <Input
          {...register('message')}
          label={dict?.contactUs?.typeMessage}
          rows={5}
        ></Input>

        <Button className="w-full" type="submit" loading={submitting}>
          {dict?.common?.submit}
        </Button>
      </form>
    </TransitionPageWrapper>
  );
}

export default ContactUs;
