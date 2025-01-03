"use client";

import { useCallback, useEffect, useState } from "react"
import { NumberInput } from '@mantine/core';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Check, Edit, Loader, Plus, SortAsc, SortDesc, Trash2, X } from 'lucide-react'
import { IFoodData, IUpdateFoodData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Input } from '@/components/ui/input';
import { addNewFood, deleteFood, updateFood } from '@/lib/actions/vendors/food-actions';
import { makeRequest } from '@/lib/make-request';
import toast from 'react-hot-toast';
import { CollectDialog } from './collect-dialog';

interface IVendorDetailTable {
  vendorId: string;
  vendorName: string;
  foodData: IFoodData[];
  action: 'view' | 'edit';
}

export function VendorDetailTable({ vendorId, vendorName, foodData, action }: IVendorDetailTable) {
  const [saving, setSaving] = useState<boolean>(false)
  const [adding, setAdding] = useState<boolean>(false)
  const [deleting, setDeleting] = useState<boolean>(false)

  const [data, setData] = useState(foodData)
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null)

  const [selectedFood, setSelectedFood] = useState<string | null>(null)
  const [editingFood, setEditingFood] = useState<string | null>(null)
  const [editValue, setEditValue] = useState<number>(0)
  const [editFoodName, setEditFoodName] = useState<string>("")

  const [collectionCode, setCollectionCode] = useState<string>("")
  const [open, setOpen] = useState<boolean>(false)

  const [newFood, setNewFood] = useState<IFoodData>({ food_type: "", count: 0, vendor_name: vendorName })

  const handleSort = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc"
    setSortOrder(newOrder)
    setData([...data].sort((a, b) => 
      newOrder === "asc" ? a.count - b.count : b.count - a.count
    ))
  }

  const handleEdit = useCallback((foodName: string, currentValue: number) => {
    setEditingFood(foodName)
    setEditValue(currentValue)
    setEditFoodName(foodName)
  }, [])

  const handleSave = useCallback(async (foodName: string) => {
    setSaving(true)
    const updatedData = data.find(food => food.food_type === foodName)
    if (!updatedData) return;
    const updatedFood: IUpdateFoodData = {}
    if (editFoodName && foodName !== editFoodName) updatedFood.food_name = editFoodName
    if (editValue >= 0 && updatedData.count !== editValue) updatedFood.count = editValue
    if (Object.keys(updatedFood).length === 0) return;
    await updateFood(foodName, updatedFood);
    toast.success(`${foodName} updated successfully`);
    setSaving(false)
    window.location.reload();
    setEditingFood(null)
  }, [editValue, editFoodName])

  const handleCancel = useCallback(async () => {
    setEditingFood(null)
  }, [])

  const handleDelete = useCallback(async (foodName: string) => {
    setDeleting(true)
    await deleteFood(foodName);
    toast.success(`${foodName} deleted successfully`);
    setDeleting(false)
    window.location.reload();
  }, [])

  const handleAddNewFood = useCallback(async () => {
    setAdding(true)
    if (!(newFood.food_type && newFood.count > 0)) {
      toast.error('Please provide a valid food name and count');
      setAdding(false);
      return;
    }
    await addNewFood(newFood);
    toast.success(`${newFood.food_type} added successfully`);
    setAdding(false);
    window.location.reload();
    setEditingFood(null)
    setEditValue(0)
    setEditFoodName("")
  }, [newFood])

  useEffect(() => {
    collectionCode && setOpen(true)
  }, [collectionCode])
    

  const handleTakeFood = useCallback(async (foodName: string) => {
    setSelectedFood(foodName);
    try {
      const data = await makeRequest('/foods/collect', 'POST', { food_type: foodName, vendor_id: vendorId }) as any;
      setCollectionCode(data.collection_code);
      toast.success('Show this code to the vendor to take your food');
    } catch (error) {
      console.error('Error taking food', error);
      toast.error('Error taking food');
    }
  }, [])

  return (
    <div className="w-[96%] xl:w-full mx-auto bg-foreground shadow-2xl rounded-lg overflow-hidden mt-4 p-4">
      {
        selectedFood && (
          <CollectDialog 
            open={open} 
            setOpen={setOpen} 
            foodName={selectedFood} 
            onTake={handleTakeFood}
            code={collectionCode}
          />
        )
      }
      <div className="pb-4 border-b sm:flex sm:flex-col sm:items-start sm:gap-x-4">
        <h1 className="text-3xl font-bold text-center sm:text-start text-background">
          {
            action === 'edit' ? `Edit your Food List` : `Suspended Food List for ${vendorName}`
          } 
        </h1>
        <h2 className="text-lg text-background text-center sm:text-start">
          {
            action === 'edit' ? 'Update the food list.' : 'You can take a suspended food from the list below.'
          }
        </h2>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="font-semibold text-background">
              Food Type
            </TableHead>
            <TableHead className="font-semibold text-background">
              <div className="flex items-center cursor-pointer" onClick={handleSort}>
                Quantity
                {sortOrder === "asc" ? <SortAsc size={16} className="ml-1" /> : <SortDesc size={16} className="ml-1" />}
              </div>
            </TableHead>
            <TableHead className="font-semibold text-background">Actions</TableHead>
          </TableRow>
        </TableHeader>
        {
          action === 'edit' ? (
            <TableBody>
              {
                data.map((food, _) => (
                  <TableRow key={food.food_type + _} className="hover:bg-gray-50 transition-colors text-background">
                    <TableCell className="font-medium">
                      {
                        editingFood === food.food_type ? (
                          <Input
                            type="text"
                            value={editFoodName}
                            onChange={(e) => setEditFoodName(e.target.value)}
                          />
                        ) : food.food_type
                      }
                    </TableCell>
                    <TableCell>
                      {editingFood === food.food_type ? (
                        <div className="flex items-center space-x-2">
                          <NumberInput
                            allowNegative={false}
                            value={editValue}
                            onChange={(value) => setEditValue(Number(value))}
                            className="h-9 w-fit rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          />

                          {/* <Input
                            type="number"
                            value={editValue}
                            onChange={(e) => setEditValue(Number(e.target.value))}
                            className="w-20"
                          /> */}
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  onClick={() => handleSave(food.food_type)}
                                  className="h-8 w-8"
                                  disabled={saving}
                                >
                                  {
                                    saving ? (
                                      <Loader className="h-4 w-4 animate-spin" />
                                    ) : (
                                      <Check className="h-4 w-4" />
                                    )
                                  }
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Save</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  onClick={handleCancel}
                                  className="h-8 w-8"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Cancel</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      ) : (
                        food.count
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:border-blue-700"
                                onClick={() => handleEdit(food.food_type, food.count)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Edit</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 text-red-600 hover:text-red-700 hover:border-red-700"
                                onClick={() => handleDelete(food.food_type)}
                                disabled={deleting}
                              >
                                {
                                  deleting ? (
                                    <Loader className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <Trash2 className="h-4 w-4" />
                                  )
                                }
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Delete</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              }
              <TableRow className="hover:bg-gray-50 transition-colors text-background">
                <TableCell>
                  <Input
                    placeholder="Food name"
                    value={newFood.food_type}
                    onChange={(e) => setNewFood({ ...newFood, food_type: e.target.value })}
                  />
                </TableCell>
                <TableCell>
                  <NumberInput
                    allowNegative={false}
                    value={newFood.count}
                    onChange={(value) => setNewFood({ ...newFood, count: Number(value) })}
                    className="h-9 w-fit rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  {/* <Input
                    type="number"
                    placeholder="Food count"
                    value={newFood.count}
                    onChange={(e) => setNewFood({ ...newFood, count: Number(e.target.value) })}
                  /> */}
                </TableCell>
                <TableCell>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 text-green-600 hover:text-green-700 hover:border-green-700"
                          onClick={handleAddNewFood}
                          disabled={adding}
                        >
                          {
                            adding ? (
                              <Loader className="h-4 w-4 animate-spin" />
                            ) : (
                              <Plus className="h-4 w-4" />
                            )
                          }
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Add New Food</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                </TableRow>
              </TableBody>
          ) : (
            <TableBody>
              {
                data.map((food) => (
                  <TableRow key={food.food_type} className="hover:bg-gray-50 transition-colors text-background">
                    <TableCell className="font-medium">
                      {food.food_type}
                    </TableCell>
                    <TableCell>
                      {food.count}
                    </TableCell>
                    <TableCell>
                      <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-foreground hover:bg-accent" 
                      onClick={() => handleTakeFood(food.food_type)}
                      disabled={food.count === 0}
                    >
                        Take
                      </Button>                    
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          )
        }
      </Table>
    </div>
  )
}

