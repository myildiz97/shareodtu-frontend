import { makeRequest } from '@/lib/make-request';
import { UserSettingsForm } from './user-settings-form';
import { EUserStatus, EUserType, IUser, UserSettings } from '@/lib/types';

export default async function Settings() {

  const getMe = async () => {
    try {
      const data = await makeRequest('/users/me', 'GET');
      return data;
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  const me = await getMe() as IUser;

  const userSettings: UserSettings = {
    fullName: me.full_name,
    isVendor: me.user_type === EUserType.VENDOR,
    isOpen: me.status === EUserStatus.OPEN,
  }

  return (
    <div className='w-full flex flex-col gap-y-4 px-4 xl:px-0'>
      <h1 className="text-3xl font-bold text-foreground mt-4">Settings</h1>
      <UserSettingsForm initialData={userSettings}  />
    </div>
  );
}