import { Dictionary } from '@/types/interfaces';
import { formatDate } from '@/utils/helpers';
export declare type ProposalStatus =
  | 'sent'
  | 'counter'
  | 'accepted'
  | 'rejected';

interface Proposal {
  onboardingFee?: number;
  fixedMonthlyFee?: number;
  fixedAnnualFee?: number;
  orderFee?: number;
  orderFeeUnit?: string;
  kitchenMessage: string;
  status: ProposalStatus;
  sentAt: Date;
}

interface Props {
  proposal: Proposal;
  dict: Dictionary;
}

function ProposalDetails({ proposal, dict }: Props) {
  if (!proposal) {
    return null;
  }

  // display proposal fields
  return (
    <>
      <div className="h4 mb-1">
        {dict.marketplace?.brands?.application?.proposal?.title}
      </div>
      <p className="t1 max-w-lg">
        {dict.marketplace?.brands?.application?.proposal?.description}
      </p>

      <div className="flex flex-col md:flex-row md:gap-5 mt-5 text-gray">
        <div className="w-full grid grid-cols-2">
          <div className="mb-3">
            <div className="text-base font-bold">
              {dict.marketplace?.brands?.application?.proposal?.date}
            </div>
            <p className="t1">{formatDate(new Date(proposal.sentAt))}</p>
          </div>
          <div className="mb-3">
            <div className="text-base font-bold">
              {dict.marketplace?.brands?.application?.proposal?.onboardingFee}
            </div>
            <p className="t1">{proposal.onboardingFee}</p>
          </div>
          <div className="mb-3">
            <div className="text-base font-bold">
              {dict.marketplace?.brands?.application?.proposal?.fixedMonthlyFee}
            </div>
            <p className="t1">{proposal.fixedMonthlyFee}€</p>
          </div>
          <div className="mb-3">
            <div className="text-base font-bold">
              {dict.marketplace?.brands?.application?.proposal?.fixedAnnualFee}
            </div>
            <p className="t1">{proposal.fixedAnnualFee}€</p>
          </div>
          <div className="mb-3">
            <div className="text-base font-bold">
              {dict.marketplace?.brands?.application?.proposal?.orderFee}
            </div>
            <p className="t1">
              {proposal.orderFee}
              {proposal.orderFeeUnit}
            </p>
          </div>
          <div className="mb-3 col-span-2">
            <div className="text-base font-bold">
              {dict.marketplace?.brands?.application?.proposal?.kitchenMessage}
            </div>
            <p className="t1">{proposal.kitchenMessage}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProposalDetails;
