import { dictionaries } from '@/i18n';
import { ApplicationService } from '@/services/server/application';
import { AuthService } from '@/services/server/auth';
import { Concept, LayoutProps } from '@/types/interfaces';
import { headers } from 'next/headers';

async function Layout({
  children,
  params: { lang, applicationId },
}: LayoutProps) {
  const dict = dictionaries[lang];
  const user = await AuthService.getConnectedUser();
  const [account] = user.accounts;
  const application = await ApplicationService.getApplication(
    applicationId,
    account._id
  );

  const brand = application?.branchApplication?.concept as Concept;

  const headersList = headers();
  const activePath = headersList.get('x-invoke-path');

  const isInSteps = activePath?.includes('step');

  return (
    <div className="h-full flex-col">
      <div className="w-full flex justify-center items-center text-center flex-col my-10">
        <div className="h5 text-secondary uppercase">
          {dict.marketplace?.brands?.application?.yourApplicationTo}
        </div>
        <div className="h3 mb-2">{brand.name}</div>
        <div className="text-sm text-secondary max-w-lg">
          {isInSteps
            ? dict.marketplace?.brands?.application?.yourApplicationToDesc
            : dict.marketplace?.brands?.application?.yourApplicationToDesc2}
        </div>
      </div>
      {children}
    </div>
  );
}

export default Layout;
