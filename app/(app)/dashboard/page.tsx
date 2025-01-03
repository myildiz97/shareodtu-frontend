import SelectionScreen from '@/components/custom/selection-screen';
import { makeRequest } from '@/lib/make-request';
import { EUserType, IUser } from '@/lib/types';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  const me = await makeRequest('users/me', 'GET') as IUser;
  if (me.user_type === EUserType.VENDOR) {
    redirect(`vendors/${me._id}/edit`);
  }

  return (
    <SelectionScreen />
  );
}