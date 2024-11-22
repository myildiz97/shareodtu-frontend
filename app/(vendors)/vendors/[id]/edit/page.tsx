import VendorFoodListEdit from '@/components/vendors/vendor-food-list-edit';
import * as React from 'react';

interface IParams {
  id: string;
}

interface IVendorEditPageProps {
  params: IParams;
}

const VendorEditPage: React.FunctionComponent<IVendorEditPageProps> = async ({ params }) => {
  const { id } = await params;

  return (
    <VendorFoodListEdit id={id} />
  );
};

export default VendorEditPage;
