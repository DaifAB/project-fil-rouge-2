import { Application, User } from '@/types/interfaces';

export const getSenderAndReceiver = (
  application?: Application,
  userId?: string
) => {
  const currentUser =
    userId === (application?.sender as User)?._id
      ? (application?.sender as User)
      : (application?.receiver as User);

  const otherUser =
    userId === (application?.sender as User)?._id
      ? (application?.receiver as User)
      : (application?.sender as User);

  const currentAccountType =
    (userId === (application?.sender as User)?._id && application?.branch) ||
    (userId === (application?.receiver as User)?._id &&
      application?.conceptApplication?.branch)
      ? 'branch'
      : 'brand';

  const otherAccountType = currentAccountType === 'branch' ? 'brand' : 'branch';

  return {
    currentUser,
    otherUser,
    currentAccountType,
    otherAccountType: otherAccountType as 'brand' | 'branch',
  };
};
