import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import CustomTable from './custom-table';
import { VENDOR_FOOD_TABLE_HEADERS } from '@/lib/constants';

interface IVendorFoodListProps {
  id: string;
}

const VendorFoodList: React.FunctionComponent<IVendorFoodListProps> = async ({ id }) => {
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

  const vendorFoodList = await getVendorFoodList();
  const vendor = await getVendor();

  return (
    <Card className="w-[300px] p-2 shadow-md bg-foreground text-background">
      <CardHeader className='w-full'>
        <CardTitle className="text-center text-3xl">
        {vendor.full_name} Food List
        </CardTitle>
        <CardDescription className='text-center text-lg text-background'>
          You can take a suspended food from the list below.
        </CardDescription>
      </CardHeader>
      <CardContent className='p-2'>
        <CustomTable
          vendorFoodTable={{
            tableHeaders: VENDOR_FOOD_TABLE_HEADERS,
            tableData: vendorFoodList
          }}
          action='view'
        />
      </CardContent>
    </Card>
  )
};

export default VendorFoodList;
