import * as React from 'react';
import { VendorDetailTable } from './vendor-detail-table';
import { EUserType, IFoodData, IUser } from '@/lib/types';
import { redirect } from 'next/navigation';
import { makeRequest } from '@/lib/make-request';
import { VerificationCard } from './verification-card';

interface IVendorFoodListProps {
  id: string;
  action: 'view' | 'edit';
}

const VendorFoodList: React.FunctionComponent<IVendorFoodListProps> = async ({ id, action }) => {
  const baseUrl = process.env.NEXT_PUBLIC_SHARE_ODTU_API_URL;
  
  const getVendorFoodList = async () => {
    try {
      const response = await fetch(`${baseUrl}/foods/list/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching vendor food list', error);
    }
  };

  const getVendor = async () => {
    try {
      const response = await fetch(`${baseUrl}/users/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching vendor', error);
    }
  }

  const getMe = async () => {
    try {
      const data = await makeRequest('users/me', 'GET');
      return data;
    } catch (error) {
      console.error('Error fetching me', error);
    }
  }

  const vendorFoodList = await getVendorFoodList() as IFoodData[];
  const vendor = await getVendor() as IUser;
  const me = await getMe() as IUser;

  const isAuth = (me.user_type === EUserType.VENDOR && action !== 'view') || (me.user_type === EUserType.DEFAULT && action !== 'edit');
  if (!isAuth) {
    redirect('/vendors');
  }

  return (
    <> 
    {
      me.user_type === EUserType.VENDOR && (
        <VerificationCard foodData={vendorFoodList} />
      )
    }
      <VendorDetailTable vendorId={vendor._id} vendorName={vendor.full_name} foodData={vendorFoodList} action={action} />
    </>
  )
};

export default VendorFoodList;
