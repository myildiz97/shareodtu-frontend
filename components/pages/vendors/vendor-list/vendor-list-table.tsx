"use client";

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { SortAsc, SortDesc } from 'lucide-react'
import Link from 'next/link';
import { EUserStatus, IVendorData } from '@/lib/types';

interface IVendorListTable {
  vendorsData: IVendorData[];
}

export function VendorListTable({ vendorsData }: IVendorListTable) {
  const [data, setData] = useState(vendorsData)
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null)

  const handleSort = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc"
    setSortOrder(newOrder)
    setData([...data].sort((a, b) => 
      newOrder === "asc" ? a.total_count - b.total_count : b.total_count - a.total_count
    ))
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return "bg-green-500"
      case "closed":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="w-[96%] xl:w-full mx-auto bg-foreground shadow-2xl rounded-lg overflow-hidden mt-4 p-4">
      <div className="pb-4 border-b sm:flex sm:flex-col sm:w-full sm:items-start sm:gap-x-4">
        <h1 className="text-3xl font-bold text-center sm:text-start text-background">
          Vendor List
        </h1>
        <h2 className="text-lg text-background text-center sm:text-start">
          Select a vendor to see available food options.
        </h2>

      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="font-semibold text-background">Name</TableHead>
            <TableHead className="font-semibold text-background">
              <div className="flex items-center cursor-pointer" onClick={handleSort}>
                Food Count
                {sortOrder === "asc" ? <SortAsc size={16} className="ml-1" /> : <SortDesc size={16} className="ml-1" />}
              </div>
            </TableHead>
            <TableHead className="font-semibold text-background">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.vendor._id} className="hover:bg-gray-50 transition-colors text-background">
              <TableCell className="font-medium">
                {
                  row.total_count > 0 && row.vendor.status === EUserStatus.OPEN ? (
                    <Link href={`/vendors/${row.vendor._id}`} className="text-blue-500">
                      {row.vendor.full_name}
                    </Link>
                  ) : row.vendor.full_name
                }
              </TableCell>
              <TableCell>
                {row.total_count || 0}
              </TableCell>
              <TableCell>
                <Badge variant='outline' className={`${getStatusColor(row.vendor.status)} text-white select-none`}>
                  {row.vendor.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

