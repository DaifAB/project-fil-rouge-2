import TransitionPageWrapper from '@/components/TransitionPageWrapper';
import MarketHome from '@/components/marketplace/MarketHome';
import { dictionaries } from '@/i18n';
import { ApplicationService } from '@/services/server/application';
import { AuthService } from '@/services/server/auth';
import { PageProps } from '@/types/interfaces';

async function Page({ params: { lang } }: PageProps) {
  const dict = dictionaries[lang];

  const user = await AuthService.getConnectedUser();
  const [account] = user.accounts;

  const [brandsSigned, brandsAppliedTo] = await Promise.all([
    ApplicationService.getApplications(null, ['signed'], account._id),
    ApplicationService.getApplications(
      null,
      ['sent', 'reviewing', 'reviewed'],
      account._id
    ),
  ]);

  return (
    <TransitionPageWrapper title={dict.pagesTitles?.marketPlace}>
      <MarketHome
        type="branch"
        dict={dict}
        userName={user.name}
        branchesCount={account.branches.length}
        signedBrandsCount={brandsSigned.length}
        appliedBrandsCount={brandsAppliedTo.length}
        welcomeDesc={dict?.marketplace?.home?.welcomeDescKitchen}
      />
    </TransitionPageWrapper>
  );
}

export default Page;
