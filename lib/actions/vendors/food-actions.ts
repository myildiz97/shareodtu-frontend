"use server";

import { makeRequest } from '@/lib/make-request';
import { IFoodData, IUpdateFoodData } from '@/lib/types';

export const addNewFood = async (newFood: IFoodData) => {
  try {
    await makeRequest('/foods/create', 'POST', newFood);
  } catch (error) {
    console.error('Error adding new food', error);
  }
}

export const updateFood = async (foodType: string, updatedFood: IUpdateFoodData) => {
  try {
    await makeRequest(`/foods/update/${foodType}`, 'PUT', updatedFood);
  } catch (error) {
    console.error('Error updating food', error);
  }
}

export const deleteFood = async (foodType: string) => {
  try {
    await makeRequest(`/foods/delete/${foodType}`, 'DELETE');
  } catch (error) {
    console.error('Error deleting food', error);
  }
}