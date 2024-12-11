import * as React from 'react';
import { VendorListTable } from './vendor-list-table';
import { makeRequest } from '@/lib/make-request';
import { EUserType, IUser } from '@/lib/types';
import { redirect } from 'next/navigation';

interface IVendorListProps {
}

const VendorList: React.FunctionComponent<IVendorListProps> = async () => {
  
  const getVendors = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_SHARE_ODTU_API_URL;
    try {
      const response = await fetch(`${baseUrl}/users/vendors`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching vendors', error);
    }
  };

  const me = await makeRequest('users/me', 'GET') as IUser;
  if (me.user_type === EUserType.VENDOR) {
    redirect(`vendors/${me._id}/edit`);
  }

  const vendorList = await getVendors();

  return (
    <VendorListTable vendorsData={vendorList} />
  )
};

export default VendorList;
