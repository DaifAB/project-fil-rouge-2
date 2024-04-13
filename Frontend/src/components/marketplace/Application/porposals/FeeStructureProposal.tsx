'use client';

import Checkbox from '@/components/form/Checkbox';
import { Dictionary } from '@/types/interfaces';

interface Props {
  dict: Dictionary;
  register: any;
}
function FeeStructureProposal({ dict, register }: Props) {
  return (
    <div>
      <div className="h3 font-normal mb-2">
        {dict.marketplace?.brands?.application?.feeStructure}
      </div>
      <p className="t1 text-black">
        {dict.marketplace?.brands?.application?.feeStructureDesc}
      </p>
      <div className="flex flex-col my-8 gap-5">
        <div className="flex gap-5">
          <div className="w-1/2 flex gap-1">
            <div>
              <Checkbox {...register('isOnboardingFee')} />
            </div>
            <div className="flex flex-col">
              <p className="t1 font-bold">
                {dict.marketplace?.brands?.application?.onboardingFee}
              </p>
              <p className="t2">
                {dict.marketplace?.brands?.application?.onboardingFeeDesc}
              </p>
            </div>
          </div>
          <div className="w-1/2 flex gap-1">
            <div>
              <Checkbox {...register('isOrderFee')} />
            </div>
            <div className="flex flex-col">
              <p className="t1 font-bold">
                {dict.marketplace?.brands?.application?.orderFee}
              </p>
              <p className="t2">
                {dict.marketplace?.brands?.application?.orderFeeDesc}
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-5">
          <div className="w-1/2 flex gap-1">
            <div>
              <Checkbox {...register('isFixedMonthlyFee')} />
            </div>
            <div className="flex flex-col">
              <p className="t1 font-bold">
                {dict.marketplace?.brands?.application?.fixedMonthlyFee}
              </p>
              <p className="t2">
                {dict.marketplace?.brands?.application?.fixedMonthlyFeeDesc}
              </p>
            </div>
          </div>
          <div className="w-1/2 flex gap-1">
            <div>
              <Checkbox {...register('isFixedAnnualFee')} />
            </div>
            <div className="flex flex-col">
              <p className="t1 font-bold">
                {dict.marketplace?.brands?.application?.fixedAnnualFee}
              </p>
              <p className="t2">
                {dict.marketplace?.brands?.application?.fixedAnnualFeeDesc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeeStructureProposal;
