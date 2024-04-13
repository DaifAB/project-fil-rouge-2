'use client';

import Button from '@/components/Button';
import Popup from '@/components/Popup';
import Input from '@/components/form/Input';
import { AlertContext, AuthUserContext } from '@/contexts';
import useForm from '@/hooks/useForm';
import { ApplicationService } from '@/services/client/application';
import { Dictionary } from '@/types/interfaces';
import { getSenderAndReceiver } from '@/utils/getSenderAndReceiver';
import { Application } from '@/types/interfaces';
import { useContext, useState } from 'react';

interface Props {
  open: boolean;
  onClose: any;
  application: Application;
  dict: Dictionary;
  refetchApplication: any;
}
function RejectApplicationPopup({
  open,
  onClose,
  dict,
  application,
  refetchApplication,
}: Props) {
  const [authUser] = useContext(AuthUserContext);
  const handleShowAlert = useContext(AlertContext);
  const [loading, setLoading] = useState(false);

  const { otherUser, otherAccountType } = getSenderAndReceiver(
    application,
    authUser?.user?._id
  );

  const { register, handleSubmit } = useForm(
    {
      confirmReject: {
        init: '',
        required: {
          value: true,
        },
        custom: {
          value: (value: string) => value === 'REJECT',
          message: dict.marketplace?.brands?.application?.typeReject?.replace(
            '{r}',
            'REJECT'
          ),
        },
      },
    },
    {
      dict,
      async onSubmit() {
        try {
          setLoading(true);
          await ApplicationService.updateApplication(application._id, {
            status: 'rejected',
          });

          refetchApplication();
        } catch (error) {
          console.error(error);
          handleShowAlert({
            color: 'danger',
            message: dict.errors?.default,
          });
        } finally {
          setLoading(false);
          onClose();
        }
      },
    }
  );
  return (
    <Popup
      open={open}
      onClose={onClose}
      outsideClick={false}
      title={dict.marketplace?.brands?.application?.rejectApplicationPopupTitle}
      description={
        dict.marketplace?.brands?.application?.rejectApplicationPopupDesc
      }
    >
      <p className="t2 font-bold mb-1">
        {dict.marketplace?.brands?.application?.typeReject?.replace(
          '{r}',
          'REJECT'
        )}
      </p>
      <form onSubmit={handleSubmit}>
        <Input
          {...register('confirmReject')}
          label={dict?.common?.typeHere}
        ></Input>
        <div className="flex justify-between mt-6">
          <Button
            className="bg-heavy-gray"
            onClick={onClose}
            disabled={loading}
            loading={loading}
          >
            {dict.common?.close}
          </Button>
          <Button className="bg-danger" disabled={loading}>
            {dict.marketplace?.brands?.application?.confirmReject}
          </Button>
        </div>
      </form>
    </Popup>
  );
}

export default RejectApplicationPopup;
