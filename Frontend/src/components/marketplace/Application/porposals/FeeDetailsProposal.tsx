'use client';

import Input from '@/components/form/Input';
import { Dictionary } from '@/types/interfaces';

interface Props {
  dict: Dictionary;
  register: any;
  formState: any;
  feeStructFormState: any;
  orderFeeUnit: string;
  setOrderFeeUnit: any;
}

function FeeDetailsProposal({
  dict,
  register,
  formState,
  feeStructFormState,
  orderFeeUnit,
  setOrderFeeUnit,
}: Props) {
  const handleUnitToggle = () => {
    setOrderFeeUnit((prevUnit: string) => (prevUnit === '€' ? '%' : '€'));
  };

  return (
    <div>
      <div className="h3 font-normal mb-2">
        {dict.marketplace?.brands?.application?.feeDetails}
      </div>
      <p className="t1 text-black">
        {dict.marketplace?.brands?.application?.feeDetailsDesc}
      </p>
      <div className="flex flex-col my-8 gap-5">
        {!feeStructFormState.isOnboardingFee &&
          !feeStructFormState.isOrderFee &&
          !feeStructFormState.isFixedMonthlyFee &&
          !feeStructFormState.isFixedAnnualFee &&
          dict.marketplace?.brands?.application?.noFeeStructure}
        <div className="flex gap-5">
          {feeStructFormState.isOnboardingFee && (
            <div className="w-1/2 flex flex-col">
              <div className="h5">
                {dict.marketplace?.brands?.application?.onboardingFee}
              </div>
              <p className="t2 mb-1">
                {dict.marketplace?.brands?.application?.onboardingFeeFieldDesc}
              </p>
              <Input
                {...register('onboardingFee')}
                label={dict?.common?.enterANumber}
                type="number"
                suffix={<div className="h5">€</div>}
              ></Input>
            </div>
          )}

          {feeStructFormState.isOrderFee && (
            <div className="w-1/2 flex flex-col">
              <div className="h5">
                {dict.marketplace?.brands?.application?.orderFee}
              </div>
              <p className="t2 mb-1">
                {dict.marketplace?.brands?.application?.orderFeeFieldDesc}
              </p>
              <Input
                {...register('orderFee')}
                label={dict?.common?.enterANumber}
                type="number"
                suffix={
                  <div className="h5 cursor-pointer" onClick={handleUnitToggle}>
                    {orderFeeUnit}
                  </div>
                }
              ></Input>
            </div>
          )}
        </div>
        <div className="flex gap-5">
          {feeStructFormState.isFixedMonthlyFee && (
            <div className="w-1/2 flex flex-col">
              <div className="h5">
                {dict.marketplace?.brands?.application?.fixedMonthlyFee}
              </div>
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
            </div>
          )}
          {feeStructFormState.isFixedAnnualFee && (
            <div className="w-1/2 flex flex-col">
              <div className="h5">
                {dict.marketplace?.brands?.application?.fixedAnnualFee}
              </div>
              <p className="t2 mb-1">
                {dict.marketplace?.brands?.application?.fixedAnnualFeeFieldDesc}
              </p>
              <Input
                {...register('fixedAnnualFee')}
                label={dict?.common?.enterANumber}
                type="number"
                suffix={<div className="h5">€</div>}
              ></Input>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FeeDetailsProposal;
