import VendorFoodList from '@/components/vendors/vendor-food-list';
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

  return <VendorFoodList id={id} />;
};

export default VendorPage;
