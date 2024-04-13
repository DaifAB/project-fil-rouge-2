import { dictionaries } from '@/i18n';
import { ApplicationService } from '@/services/server/application';
import { AuthService } from '@/services/server/auth';
import { Branch, LayoutProps } from '@/types/interfaces';

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

  const kitchen = application?.branch as Branch;

  return (
    <div className="h-full flex-col">
      <div className="w-full flex justify-center items-center text-center flex-col my-10">
        <div className="h5 text-secondary uppercase">
          {dict.marketplace?.brands?.application?.receivedApplicationFrom}
        </div>
        <div className="h3 mb-2">{kitchen.name}</div>
        <div className="text-sm text-secondary max-w-lg">
          {dict.marketplace?.brands?.application?.receivedApplicationFromDesc}
        </div>
      </div>
      {children}
    </div>
  );
}

export default Layout;
