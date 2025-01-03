import VendorFoodList from '@/components/pages/vendors/vendor-food-list/vendor-food-list';
import * as React from 'react';

interface IParams {
  id: string;
}

interface IVendorPageProps {
  params: Promise<any> | undefined;
}

const VendorPage: React.FunctionComponent<IVendorPageProps> = async ({ params }) => {
  const resolvedParams = params ? await Promise.resolve(params) : {};
  const { id } = resolvedParams as IParams;

  return <VendorFoodList id={id} action='view' />;
};

export default VendorPage;
