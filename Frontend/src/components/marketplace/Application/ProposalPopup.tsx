import Button from '@/components/Button';
import Popup from '@/components/Popup';
import Input from '@/components/form/Input';
import { AlertContext, AuthUserContext } from '@/contexts';
import useForm from '@/hooks/useForm';
import usePath from '@/hooks/usePath';
import { ApplicationService } from '@/services/client/application';
import { Application, Dictionary, Proposal } from '@/types/interfaces';
import { getSenderAndReceiver } from '@/utils/getSenderAndReceiver';
import { useContext, useState } from 'react';

interface Props {
  open: boolean;
  onClose: any;
  dict: Dictionary;
  proposal: Proposal | undefined;
  application: Application;
  refetchApplication: any;
}
function ProposalPopup({
  open,
  onClose,
  dict,
  proposal,
  application,
  refetchApplication,
}: Props) {
  const path = usePath();
  const isBrand = 'brand' === path.split('/')[1];
  const [authUser] = useContext(AuthUserContext);
  const handleShowAlert = useContext(AlertContext);

  const [isCounter, setIsCounter] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm(
    {
      onboardingFee: {
        init: proposal?.onboardingFee,
        required: {
          value: !!proposal?.onboardingFee,
        },
      },
      orderFee: {
        init: proposal?.orderFee,
        required: {
          value: !!proposal?.orderFee,
        },
      },
      fixedMonthlyFee: {
        init: proposal?.fixedMonthlyFee,
        required: {
          value: !!proposal?.fixedMonthlyFee,
        },
      },
      fixedAnnualFee: {
        init: proposal?.fixedAnnualFee,
        required: {
          value: !!proposal?.fixedAnnualFee,
        },
      },
      kitchenMessage: {
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
          setLoading(true);
          const _proposal = {
            onboardingFee: +formState.onboardingFee,
            orderFee: +formState.orderFee,
            fixedMonthlyFee: +formState.fixedMonthlyFee,
            fixedAnnualFee: +formState.fixedAnnualFee,
            kitchenMessage: formState.kitchenMessage,
            orderFeeUnit: proposal?.orderFeeUnit,
            status: 'counter' as const,
            sentAt: new Date(),
          };
          await ApplicationService.updateApplication(application._id, {
            proposals: [_proposal, ...(application.proposals || [])],
          });
          refetchApplication();
        } catch (error) {
          console.error(error);
          handleShowAlert({
            color: 'danger',
            message: dict.errors?.default,
          });
        } finally {
          onClose();
          setLoading(false);
        }
      },
    }
  );

  const handleAccept = async () => {
    try {
      setLoading(true);
      await ApplicationService.updateApplication(application._id, {
        status: 'signed',
      });

      refetchApplication();
    } catch (error) {
      console.error(error);
      handleShowAlert({
        color: 'danger',
        message: dict.errors?.default,
      });
    } finally {
      onClose();
      setLoading(false);
    }
  };

  const handleReject = async () => {
    try {
      setLoading(true);
      if (isBrand) {
        await ApplicationService.updateApplication(application._id, {
          status: 'rejected',
        });
      } else {
        const proposals = application.proposals.map((p) => {
          if (p._id === proposal?._id) {
            return { ...p, status: 'rejected' } as Proposal;
          } else {
            return p as Proposal;
          }
        }) as Proposal[];
        await ApplicationService.updateApplication(application._id, {
          proposals: proposals,
        });

        const proposal = proposals.find(
          (_proposal) => _proposal._id === proposal?._id
        ) as Proposal;
      }
      refetchApplication();
    } catch (error) {
      console.error(error);
      handleShowAlert({
        color: 'danger',
        message: dict.errors?.default,
      });
    } finally {
      onClose();
      setLoading(false);
    }
  };
  return (
    <Popup
      open={open}
      onClose={onClose}
      outsideClick={false}
      title={dict.marketplace?.brands?.application?.proposalPopupTitle}
      description={
        isBrand
          ? dict.marketplace?.brands?.application?.proposalPopupDescForBrand
          : dict.marketplace?.brands?.application?.proposalPopupDescForKitchen
      }
    >
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col my-8 gap-5">
          {!proposal?.onboardingFee &&
            !proposal?.orderFee &&
            !proposal?.fixedMonthlyFee &&
            !proposal?.fixedAnnualFee &&
            dict.marketplace?.brands?.application?.noFeeStructure}
          <div className="flex gap-5">
            {!!proposal?.onboardingFee && (
              <div className="w-1/2 flex flex-col">
                <div className="h5">
                  {dict.marketplace?.brands?.application?.onboardingFee}
                </div>
                {isCounter ? (
                  <>
                    <p className="t2 mb-1">
                      {
                        dict.marketplace?.brands?.application
                          ?.onboardingFeeFieldDesc
                      }
                    </p>
                    <Input
                      {...register('onboardingFee')}
                      label={dict?.common?.enterANumber}
                      type="number"
                      suffix={<div className="h5">€</div>}
                    ></Input>
                  </>
                ) : (
                  <p className="t2 mb-1">{proposal.onboardingFee}€</p>
                )}
              </div>
            )}

            {!!proposal?.orderFee && (
              <div className="w-1/2 flex flex-col">
                <div className="h5">
                  {dict.marketplace?.brands?.application?.orderFee}
                </div>

                {isCounter ? (
                  <>
                    <p className="t2 mb-1">
                      {dict.marketplace?.brands?.application?.orderFeeFieldDesc}
                    </p>
                    <Input
                      {...register('orderFee')}
                      label={dict?.common?.enterANumber}
                      type="number"
                      suffix={<div className="h5">{proposal.orderFeeUnit}</div>}
                    ></Input>
                  </>
                ) : (
                  <p className="t2 mb-1">
                    {proposal.orderFee}
                    {proposal.orderFeeUnit}
                  </p>
                )}
              </div>
            )}
          </div>
          <div className="flex gap-5">
            {!!proposal?.fixedMonthlyFee && (
              <div className="w-1/2 flex flex-col">
                <div className="h5">
                  {dict.marketplace?.brands?.application?.fixedMonthlyFee}
                </div>
                {isCounter ? (
                  <>
                    <p className="t2 mb-1">
                      {
                        dict.marketplace?.brands?.application
                          ?.fixedMonthlyFeeFieldDesc
                      }
                    </p>
                    <Input
                      {...register('fixedMonthlyFee')}
                      label={dict?.common?.enterANumber}
                      type="number"
                      suffix={<div className="h5">€</div>}
                    ></Input>
                  </>
                ) : (
                  <p className="t2 mb-1">{proposal.fixedMonthlyFee}€</p>
                )}
              </div>
            )}
            {!!proposal?.fixedAnnualFee && (
              <div className="w-1/2 flex flex-col">
                <div className="h5">
                  {dict.marketplace?.brands?.application?.fixedAnnualFee}
                </div>
                {isCounter ? (
                  <>
                    <p className="t2 mb-1">
                      {
                        dict.marketplace?.brands?.application
                          ?.fixedAnnualFeeFieldDesc
                      }
                    </p>
                    <Input
                      {...register('fixedAnnualFee')}
                      label={dict?.common?.enterANumber}
                      type="number"
                      suffix={<div className="h5">€</div>}
                    ></Input>
                  </>
                ) : (
                  <p className="t2 mb-1">{proposal.fixedAnnualFee}€</p>
                )}
              </div>
            )}
          </div>
          <div className="flex gap-5">
            <div className="w-full flex flex-col">
              <div className="h5">
                {dict.marketplace?.brands?.application?.message}
              </div>
              {isCounter ? (
                <>
                  <p className="t1 text-black mb-1">
                    {
                      dict.marketplace?.brands?.application
                        ?.messageToKitchenDesc
                    }
                  </p>
                  <Input
                    {...register('kitchenMessage')}
                    label={dict?.contactUs?.typeMessage}
                    rows={5}
                  ></Input>
                </>
              ) : (
                <p className="t2 mb-1">{proposal?.kitchenMessage}</p>
              )}
            </div>
          </div>
        </div>
        {isCounter ? (
          <div className="flex justify-between">
            <div className="flex gap-3">
              <Button
                className="bg-heavy-gray"
                onClick={() => setIsCounter(false)}
              >
                {dict.common?.back}
              </Button>
              <Button className="bg-heavy-gray" onClick={onClose}>
                {dict.common?.close}
              </Button>
            </div>
            <Button type="submit" className="bg-primary">
              {dict.common?.send}
            </Button>
          </div>
        ) : (
          <div className="flex justify-between">
            <Button className="bg-heavy-gray" onClick={onClose}>
              {dict.common?.close}
            </Button>
            <div className="flex gap-3">
              <Button
                className="bg-primary"
                disabled={loading}
                loading={loading}
                onClick={handleAccept}
              >
                {dict.common?.accept}
              </Button>
              <Button
                className="bg-heavy-gray"
                disabled={loading}
                loading={loading}
                onClick={handleReject}
              >
                {dict.common?.reject}
              </Button>

              {!isBrand && (
                <Button
                  className="bg-primary"
                  disabled={loading}
                  onClick={() => setIsCounter(true)}
                >
                  {dict.common?.counterProposal}
                </Button>
              )}
            </div>
          </div>
        )}
      </form>
    </Popup>
  );
}

export default ProposalPopup;
