'use client';

import Button from '@/components/Button';
import Popup from '@/components/Popup';
import Stepper from '@/components/Stepper';
import { Dictionary, Step } from '@/types/interfaces';
import { useContext, useState } from 'react';
import FeeStructureProposal from './porposals/FeeStructureProposal';
import FeeDetailsProposal from './porposals/FeeDetailsProposal';
import MessageProposal from './porposals/MessageProposal';
import useForm from '@/hooks/useForm';
import { AlertContext, AuthUserContext } from '@/contexts';
import { hasNonUndefinedValue } from '@/utils/helpers';
import { Application, Branch, Proposal } from '@/types/interfaces';
import { ApplicationService } from '@/services/client/application';
import { MessageService } from '@/services/client/message';
import { getSenderAndReceiver } from '@/utils/getSenderAndReceiver';

interface Props {
  open: boolean;
  onClose: any;
  application: Application;
  refetchApplication: any;
  dict: Dictionary;
}

function MakeProposalPopup({
  open,
  onClose,
  dict,
  application,
  refetchApplication,
}: Props) {
  const handleShowAlert = useContext(AlertContext);
  const [authUser] = useContext(AuthUserContext);

  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [orderFeeUnit, setOrderFeeUnit] = useState('€');

  const { currentUser, otherUser } = getSenderAndReceiver(
    application,
    authUser?.user?._id
  );

  const { register: feeStructRegister, formState: feeStructFormState } =
    useForm({
      isOnboardingFee: {
        init: false,
        required: {
          value: false,
        },
      },
      isOrderFee: {
        init: false,
        required: {
          value: false,
        },
      },
      isFixedMonthlyFee: {
        init: false,
        required: {
          value: false,
        },
      },
      isFixedAnnualFee: {
        init: false,
        required: {
          value: false,
        },
      },
    });

  const {
    register: feeDetailsRegister,
    formState: feeDetailsFormState,
    handleSubmit,
    formErrors,
  } = useForm(
    {
      onboardingFee: {
        init: null,
        required: {
          value: feeStructFormState.isOnboardingFee,
        },
      },
      orderFee: {
        init: null,
        required: {
          value: feeStructFormState.isOrderFee,
        },
      },
      fixedMonthlyFee: {
        init: null,
        required: {
          value: feeStructFormState.isFixedMonthlyFee,
        },
      },
      fixedAnnualFee: {
        init: null,
        required: {
          value: feeStructFormState.isFixedAnnualFee,
        },
      },
      kitchenMessage: {
        init: '',
        required: {
          value: currentStep === 3,
        },
      },
    },
    {
      dict,
      async onSubmit(formState) {
        try {
          if (hasNonUndefinedValue(formErrors) && currentStep === 2) {
            return;
          }
          if (currentStep === 3) {
            setLoading(true);
            const proposal = {
              onboardingFee: +formState.onboardingFee,
              orderFee: +formState.orderFee,
              fixedMonthlyFee: +formState.fixedMonthlyFee,
              fixedAnnualFee: +formState.fixedAnnualFee,
              kitchenMessage: formState.kitchenMessage,
              orderFeeUnit,
              status: 'sent' as const,
              sentAt: new Date(),
            };
            const updatedApplication =
              await ApplicationService.updateApplication(application._id, {
                status: 'reviewed',
                proposals: [proposal, ...(application.proposals || [])],
              });

            refetchApplication();
          } else {
            setCurrentStep(currentStep + 1);
          }
        } catch (error) {
          console.error(error);
          handleShowAlert({
            color: 'danger',
            message: dict.errors?.default,
          });
        } finally {
          setLoading(false);
        }
      },
    }
  );

  const steps: Step[] = [
    {
      label: dict.marketplace?.brands?.application?.feeStructure,
      content: (
        <FeeStructureProposal dict={dict} register={feeStructRegister} />
      ),
    },
    {
      label: dict.marketplace?.brands?.application?.feeDetails,
      content: (
        <FeeDetailsProposal
          dict={dict}
          register={feeDetailsRegister}
          formState={feeDetailsFormState}
          feeStructFormState={feeStructFormState}
          orderFeeUnit={orderFeeUnit}
          setOrderFeeUnit={setOrderFeeUnit}
        />
      ),
    },
    {
      label: dict.marketplace?.brands?.application?.messageToKitchen,
      content: <MessageProposal dict={dict} register={feeDetailsRegister} />,
    },
  ];

  const handleBack = () => {
    if (currentStep === 1) {
      onClose();
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Popup
      open={open}
      onClose={onClose}
      outsideClick={false}
      title={dict.marketplace?.brands?.application?.makeProposalPopupTitle}
      description={dict.marketplace?.brands?.application?.makeProposalPopupDesc?.replace(
        '{kitchenName}',
        (application?.branch as Branch).name
      )}
    >
      <form onSubmit={handleSubmit}>
        <Stepper steps={steps} step={currentStep} />
        <div className="flex justify-between mt-6">
          <Button
            className="bg-heavy-gray"
            onClick={handleBack}
            type="button"
            disabled={loading}
          >
            {currentStep === 1 ? dict.common?.close : dict.common?.back}
          </Button>
          <Button
            className="bg-primary"
            type="submit"
            disabled={loading}
            loading={loading}
          >
            {currentStep === 3 ? dict.common?.send : dict.common?.next}
          </Button>
        </div>
      </form>
    </Popup>
  );
}

export default MakeProposalPopup;
