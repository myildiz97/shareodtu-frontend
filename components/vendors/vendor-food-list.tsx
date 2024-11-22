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
  
  const getVendorFoodList = async () => {
    try {
      const response = await fetch(`http://localhost:8080/foods/list/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching vendor food list', error);
    }
  };

  const getVendor = async () => {
    try {
      const response = await fetch(`http://localhost:8080/users/${id}`);
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
