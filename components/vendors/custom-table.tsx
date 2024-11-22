"use client";
import * as React from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { IFoodData, IVendorData } from '@/lib/types';
import Link from 'next/link';
import CustomButton from './custom-button';
import { Input } from '../ui/input';

interface IVendorTableProps {
  tableHeaders: string[];
  tableData: IVendorData[];
}

interface IVendorFoodTableProps {
  tableHeaders: string[];
  tableData: IFoodData[];
}

interface ICustomTableProps {
  vendorTable?: IVendorTableProps;
  vendorFoodTable?: IVendorFoodTableProps;
  action?: 'view' | 'edit';
}

const CustomTable: React.FunctionComponent<ICustomTableProps> = (props) => {
  const { vendorTable, vendorFoodTable, action } = props;

  const tableHeaders = vendorTable?.tableHeaders || vendorFoodTable?.tableHeaders;
  const tableData = vendorTable?.tableData || vendorFoodTable?.tableData;

  const [newFoodType, setNewFoodType] = React.useState('');
  const [newFoodCount, setNewFoodCount] = React.useState(0);

  const handleNewFood = () => {
    console.log(newFoodType, newFoodCount);
  }

  const body = vendorTable ? (
    <TableBody>
      {tableData?.map((data) => (
        <TableRow key={(data as IVendorData).vendor._id}>
          <TableCell className='text-background font-medium text-base text-wrap'>
            <Link href={`/vendors/${(data as IVendorData).vendor._id}`} className='text-primary'>
              {(data as IVendorData).vendor.full_name}
            </Link>
          </TableCell>
          <TableCell className='text-background font-medium text-base text-wrap'>{(data as IVendorData).total_count || 0}</TableCell>
          <TableCell className='text-background font-medium text-base text-wrap'>{(data as IVendorData).vendor.status}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  ) : (
    <TableBody>
      {tableData?.map((data, _) => (
        action === 'edit' && _ === tableData.length - 1 ? (
          <TableRow key={(data as IFoodData).food_type}>
            <TableCell className='text-background font-medium text-base text-wrap'>
              <Input
                type='text'
                placeholder='Enter food type'
                className='w-full p-2'
                defaultValue={(data as IFoodData).food_type}
                onChange={(e) => setNewFoodType(e.target.value)}
              />
            </TableCell>
            <TableCell className='text-background font-medium text-base text-wrap'>
              <Input
                type='number'
                placeholder='Enter food count'
                className='w-full p-2'
                defaultValue={(data as IFoodData).count}
                onChange={(e) => setNewFoodCount(parseInt(e.target.value))}
                onInput={(e) => {
                  const target = e.target as HTMLInputElement;
                  if (target.value.includes('-')) {
                    target.value = target.value.replace('-', '');
                  } 
                }}
                min={0}
              />
            </TableCell>
            <TableCell className='text-background font-medium text-base text-wrap'>
              <CustomButton label='Add' variant='add' onClick={handleNewFood} />
            </TableCell>
          </TableRow>
        ): (
          <TableRow key={(data as IFoodData).food_type}>
            <TableCell className='text-background font-medium text-base text-wrap'>
                {(data as IFoodData).food_type}
            </TableCell>
            <TableCell className='text-background font-medium text-base text-wrap'>
              {(data as IFoodData).count}
            </TableCell>
            {
              action && (
                <TableCell className='text-background font-medium text-base text-wrap'>
                  {
                    action === 'view' ? (
                      <CustomButton label='Reserve' variant='take' />
                    ) : (
                      <div className='flex items-center justify-center gap-x-1'>
                        <CustomButton label='Edit' variant='edit' />
                        <CustomButton label='Remove' variant='remove' />
                      </div>
                    )
                  }
                </TableCell>
              )
            }
          </TableRow>
        )
      ))}
    </TableBody>
  );

  return (
    <Table className='shadow-lg border'>
      <TableHeader className='bg-secondary'>
        <TableRow>
          {tableHeaders?.map((header) => (
            <TableHead className={`text-background font-bold ${header === 'Actions' && 'text-center'}`} key={header}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      {body}
    </Table>
  )
};

export default CustomTable;