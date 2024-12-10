'use server'

import { makeRequest } from '@/lib/make-request'
import { EUserStatus, UserSettings } from '@/lib/types'

interface IUpdateUser {
  full_name?: string;
  current_password?: string;
  new_password?: string;
  status?: EUserStatus;
}

export async function updateUserSettings(data: UserSettings) {
  const reqData: IUpdateUser = {};
  if (data.fullName) reqData['full_name'] = data.fullName;
  if (data.currentPassword && data.newPassword) {
    reqData['current_password'] = data.currentPassword;
    reqData['new_password'] = data.newPassword;
  }
  if (data.isVendor) reqData['status'] = data.isOpen ? EUserStatus.OPEN : EUserStatus.CLOSED;

  await makeRequest('/users/me', "PUT", reqData);

  // Simulate a successful update
  return { success: true, message: 'Settings updated successfully' }
}

