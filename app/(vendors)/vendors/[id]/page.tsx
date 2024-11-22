import VendorFoodList from '@/components/vendors/vendor-food-list';
import * as React from 'react';

interface IParams {
  id: string;
}

interface IVendorPageProps {
  params: IParams;
}

const VendorPage: React.FunctionComponent<IVendorPageProps> = async ({ params }) => {
  const { id } = await params;

  return (
    <VendorFoodList id={id} />
  );
};

export default VendorPage;
