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

interface IVendorFoodListEditProps {
  id: string;
}

const VendorFoodListEdit: React.FunctionComponent<IVendorFoodListEditProps> = async ({ id }) => {
  
  const getVendorFoodList = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_SHARE_ODTU_API_URL;
      const response = await fetch(`${baseUrl}/foods/list/${id}`);
      const data = await response.json();
      data.push({ food_type: 'New', count: 0 });
      return data;
    } catch (error) {
      console.error('Error fetching vendor food list', error);
    }
  };

  const vendorFoodList = await getVendorFoodList();

  return (
    <Card className="w-[300px] p-2 shadow-md bg-foreground text-background">
      <CardHeader className='w-full'>
        <CardTitle className="text-center text-3xl">
          Food List
        </CardTitle>
        <CardDescription className='text-center text-lg text-background'>
          Update or delete food items from your menu.
        </CardDescription>
      </CardHeader>
      <CardContent className='p-2'>
        <CustomTable
          vendorFoodTable={{
            tableHeaders: VENDOR_FOOD_TABLE_HEADERS,
            tableData: vendorFoodList,
          }}
          action='edit'
        />
      </CardContent>
    </Card>
  )
};

export default VendorFoodListEdit;
