import * as React from 'react';
import { VENDOR_LIST_TABLE_HEADERS } from '@/lib/constants';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import CustomTable from './custom-table';

interface IVendorListProps {
}

const VendorList: React.FunctionComponent<IVendorListProps> = async () => {
  
  const getVendors = async () => {
    try {
      const response = await fetch('http://localhost:8080/users/vendors');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching vendors', error);
    }
  };

  const vendorList = await getVendors();

  return (
    <Card className="w-[300px] p-4 shadow-md bg-foreground text-background">
      <CardHeader className='p-4'>
        <CardTitle className="flex items-center justify-center gap-x-2 text-3xl">
          Vendor List
        </CardTitle>
        <CardDescription className='text-center text-lg text-background'>
          Select a vendor to see available food options.
        </CardDescription>
      </CardHeader>
      <CardContent className='p-2'>
        <CustomTable
          vendorTable={{
            tableHeaders: VENDOR_LIST_TABLE_HEADERS,
            tableData: vendorList
          }}
        />
      </CardContent>
    </Card>
  )
};

export default VendorList;
