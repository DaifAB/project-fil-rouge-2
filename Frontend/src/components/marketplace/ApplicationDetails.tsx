import { experiences } from '@/config/constants';
import { Application, Branch, Dictionary } from '@/types/interfaces';
import Stepper from '../Stepper';
import NextSteps from './NextSteps';
import KitchenApplicationNextSteps from './kitchen/KitchenApplicationNextSteps';
import BrandApplicationNextSteps from './brand/BrandApplicationNextSteps';
import { AccountType } from '@/types/types';
import ProposalDetails from './ProposalDetails';

interface Props {
  application: Application;
  dict: Dictionary;
  mode: AccountType;
  refetchApplication?: any;
}
function ApplicationDetails({
  application,
  dict,
  mode,
  refetchApplication,
}: Props) {
  const getExpDisplay = (exp: string) => {
    return experiences.find((e) => e.value === exp)!.display;
  };
  const steps = [
    'sent',
    'reviewing',
    'reviewed',
    'signed',
    'rejected',
    'draft',
  ] as const;
  const translatedSTeps = steps.map(
    (step) => dict.common?.applicationStatuses?.[step]
  ) as string[];
  translatedSTeps.splice(-2);

  const currentStep = steps.indexOf(application.status) + 1;

  return (
    <div className="px-5">
      <div className="mb-5">
        <Stepper
          steps={translatedSTeps}
          step={currentStep > 4 ? 0 : currentStep}
        />
      </div>

      {application && (
        <NextSteps dict={dict}>
          {mode === 'branch' ? (
            <KitchenApplicationNextSteps
              application={application}
              dict={dict}
              refetchApplication={refetchApplication}
            />
          ) : (
            <BrandApplicationNextSteps
              application={application}
              dict={dict}
              refetchApplication={refetchApplication}
            />
          )}
        </NextSteps>
      )}

      {application.status === 'signed' && (
        <ProposalDetails proposal={application.proposals[0]} dict={dict} />
      )}

      <div className="h4 mb-1">
        {dict.marketplace?.brands?.application?.applicationDetails}
      </div>
      <p className="t1 max-w-lg">
        {dict.marketplace?.brands?.application?.applicationDetailsDesc}
      </p>

      <div className="flex flex-col md:flex-row md:gap-5 mt-5 text-gray">
        <div className="w-full md:w-1/2">
          <div className="mb-3">
            <div className="text-base font-bold">
              {dict.marketplace?.brands?.application?.kitchenName}
            </div>
            <p className="t1">{(application.branch as Branch).name}</p>
          </div>
          <div className="mb-3">
            <div className="text-base font-bold">
              {dict.marketplace?.brands?.application?.ordersPerDay}
            </div>
            <p className="t1">{application.branchApplication?.ordersPerDay}</p>
          </div>
          <div className="mb-3">
            <div className="text-base font-bold">
              {dict.marketplace?.brands?.application?.staffCount}
            </div>
            <p className="t1">{application.branchApplication?.staffCount}</p>
          </div>
          <div className="mb-3">
            <div className="text-base font-bold">
              {dict.marketplace?.brands?.application?.brandsCount}
            </div>
            <p className="t1">{application.branchApplication?.brandsCount}</p>
          </div>
          {application.branchApplication?.brandsCount ? (
            <div className="mb-3">
              <div className="text-base font-bold">
                {dict.marketplace?.brands?.application?.brandsTypes}
              </div>
              <p className="t1">{application.branchApplication?.brandsTypes}</p>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="w-full md:w-1/2">
          <div className="mb-3">
            <div className="text-base font-bold">
              {dict.marketplace?.brands?.application?.experience}
            </div>
            <p className="t1">
              {
                dict.marketplace?.brands?.application?.[
                  getExpDisplay(
                    application.branchApplication?.experience as string
                  )
                ]
              }
            </p>
          </div>
          <div className="mb-3">
            <div className="text-base font-bold">
              {dict.marketplace?.brands?.application?.storageCapacity}
            </div>
            <p className="t1">
              {dict.marketplace?.brands?.application?.freezer}:{' '}
              {application.branchApplication?.storageCapacity?.freezer}{' '}
              {dict.marketplace?.brands?.application?.liter}
            </p>
            <p className="t1">
              {dict.marketplace?.brands?.application?.refrigirator}:{' '}
              {application.branchApplication?.storageCapacity?.fridge}{' '}
              {dict.marketplace?.brands?.application?.liter}
            </p>
            <p className="t1">
              {dict.marketplace?.brands?.application?.dryStorage}:{' '}
              {application.branchApplication?.storageCapacity?.dry}{' '}
              {dict.marketplace?.brands?.application?.liter}
            </p>
          </div>
        </div>
      </div>

      <div className="text-gray">
        <div className="mb-3">
          <div className="text-base font-bold">
            {dict.marketplace?.brands?.application?.motivationMessage}
          </div>
          <p className="t1">{application.branchApplication?.message}</p>
        </div>
      </div>
    </div>
  );
}

export default ApplicationDetails;
