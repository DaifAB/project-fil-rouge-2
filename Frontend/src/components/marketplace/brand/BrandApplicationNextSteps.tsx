'use client';

import Button from '@/components/Button';
import usePopup from '@/hooks/usePopup';
import { Dictionary } from '@/types/interfaces';
import { Application } from '@/types/interfaces';
import RejectApplicationPopup from '../Application/RejectApplicationPopup';
import { useContext, useEffect, useState } from 'react';
import { ApplicationService } from '@/services/client/application';
import { AlertContext, AuthUserContext } from '@/contexts';
import MakeProposalPopup from '../Application/MakeProposalPopup';
import ProposalPopup from '../Application/ProposalPopup';
import { getSenderAndReceiver } from '@/utils/getSenderAndReceiver';
import { useSearchParams } from 'next/navigation';

interface Props {
  application: Application;
  dict: Dictionary;
  refetchApplication: any;
}

function BrandApplicationNextSteps({
  application,
  dict,
  refetchApplication,
}: Props) {
  const [openRejectApplicationPopup, handleToggleRejectApplicationPopup] =
    usePopup();
  const [openMakeProposalPopup, handleToggleMakeProposalPopup] = usePopup();
  const [openProposalPopup, handleToggleProposalPopup] = usePopup();

  const queryParams = useSearchParams();
  const proposalId = queryParams.get('proposalId');

  const [loading, setLoading] = useState(false);
  const [authUser] = useContext(AuthUserContext);
  const handleShowAlert = useContext(AlertContext);

  const { otherUser, otherAccountType } = getSenderAndReceiver(
    application,
    authUser?.user?._id
  );

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

  const handleContinueReviewing = async () => {
    try {
      setLoading(true);
      await ApplicationService.updateApplication(application._id, {
        status: 'reviewing',
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
    }
  };

  const childrenByStatus = {
    draft: <></>,
    sent: (
      <div className="flex gap-6 w-full">
        <Button
          className="bg-danger"
          onClick={handleToggleRejectApplicationPopup}
          disabled={loading}
        >
          {dict.marketplace?.brands?.application?.rejectAplication}
        </Button>
        <Button
          className="bg-primary"
          disabled={loading}
          loading={loading}
          onClick={handleContinueReviewing}
        >
          {dict.marketplace?.brands?.application?.continueReviewing}
        </Button>
      </div>
    ),
    reviewing: (
      <div className="flex gap-6 w-full">
        <Button
          className="bg-danger"
          onClick={handleToggleRejectApplicationPopup}
        >
          {dict.marketplace?.brands?.application?.cancelReviewing}
        </Button>
        <Button className="bg-primary" onClick={handleToggleMakeProposalPopup}>
          {dict.marketplace?.brands?.application?.proposeConditions}
        </Button>
      </div>
    ),
    reviewed:
      application.proposals?.[0]?.status === 'rejected' ? (
        <>
          <p className="text-base font-bold italic text-gray mb-5">
            {
              dict.marketplace?.brands?.application?.statusText
                ?.proposalRejectedBrand
            }
          </p>
          <div className="flex gap-6 w-full">
            <Button
              className="bg-danger"
              onClick={handleToggleRejectApplicationPopup}
            >
              {dict.marketplace?.brands?.application?.cancelReviewing}
            </Button>
            <Button
              className="bg-primary"
              onClick={handleToggleMakeProposalPopup}
            >
              {dict.marketplace?.brands?.application?.proposeConditions}
            </Button>
          </div>
        </>
      ) : application.proposals?.[0]?.status === 'counter' ? (
        <>
          <p className="text-base font-bold italic text-gray mb-5">
            {
              dict.marketplace?.brands?.application?.statusText
                ?.proposalcounteredBrand
            }
          </p>
          <Button className="bg-primary" onClick={handleToggleProposalPopup}>
            {dict.marketplace?.brands?.application?.statusText?.reviewed}
          </Button>
        </>
      ) : (
        <p className="text-base font-bold italic text-gray">
          {dict.marketplace?.brands?.application?.porpositionSent}
        </p>
      ),
    signed: (
      <p className="text-base font-bold italic text-gray">
        {dict.marketplace?.brands?.application?.porpositionAccepted}
      </p>
    ),
    rejected: (
      <p className="text-base font-bold italic text-gray">
        {dict.marketplace?.brands?.application?.applicationRejected}
      </p>
    ),
  };

  return (
    <>
      {childrenByStatus[application.status]}
      <RejectApplicationPopup
        open={openRejectApplicationPopup}
        onClose={handleToggleRejectApplicationPopup}
        application={application}
        dict={dict}
        refetchApplication={refetchApplication}
      />
      <MakeProposalPopup
        open={openMakeProposalPopup}
        onClose={handleToggleMakeProposalPopup}
        application={application}
        dict={dict}
        refetchApplication={refetchApplication}
      />
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

export default BrandApplicationNextSteps;
