'use client';

import Button from '@/components/Button';
import usePopup from '@/hooks/usePopup';
import { Dictionary } from '@/types/interfaces';
import { Application } from '@/types/interfaces';
import ProposalPopup from '../Application/ProposalPopup';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Props {
  application: Application;
  dict: Dictionary;
  refetchApplication: any;
}
function KitchenApplicationNextSteps({
  application,
  refetchApplication,
  dict,
}: Props) {
  const [openProposalPopup, handleToggleProposalPopup] = usePopup();
  const queryParams = useSearchParams();
  const proposalId = queryParams.get('proposalId');

  const paramProposal = application.proposals?.find(
    (proposal) => proposal._id === proposalId
  );
  const lastProposal = application.proposals?.[0];

  const [proposal, setProposal] = useState(paramProposal || lastProposal);

  useEffect(() => {
    if (proposalId && paramProposal) {
      setProposal(paramProposal || lastProposal);
      handleToggleProposalPopup();
    }
  }, [paramProposal]);

  const handleCloseProposalPopup = () => {
    handleToggleProposalPopup();
    setProposal(application.proposals?.[0]);
  };

  return (
    <>
      {application.status === 'reviewed' ? (
        application.proposals?.[0]?.status === 'rejected' ? (
          <p className="text-base font-bold italic text-gray">
            {
              dict.marketplace?.brands?.application?.statusText
                ?.proposalRejectedKitchen
            }
          </p>
        ) : application.proposals?.[0]?.status === 'counter' ? (
          <p className="text-base font-bold italic text-gray">
            {
              dict.marketplace?.brands?.application?.statusText
                ?.proposalcounteredKitchen
            }
          </p>
        ) : (
          <Button className="bg-primary" onClick={handleToggleProposalPopup}>
            {
              dict.marketplace?.brands?.application?.statusText?.[
                application.status
              ]
            }
          </Button>
        )
      ) : (
        <p className="text-base font-bold italic text-gray">
          {
            dict.marketplace?.brands?.application?.statusText?.[
              application.status
            ]
          }
        </p>
      )}

      <ProposalPopup
        open={openProposalPopup}
        onClose={handleCloseProposalPopup}
        dict={dict}
        proposal={proposal}
        application={application}
        refetchApplication={refetchApplication}
      />
    </>
  );
}

export default KitchenApplicationNextSteps;
