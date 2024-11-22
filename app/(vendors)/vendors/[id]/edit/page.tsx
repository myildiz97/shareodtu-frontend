import VendorFoodListEdit from '@/components/vendors/vendor-food-list-edit';
import * as React from 'react';

interface IParams {
  id: string;
}
interface IVendorEditPageProps {
  params: Promise<any> | undefined;
}

const VendorEditPage: React.FunctionComponent<IVendorEditPageProps> = async ({ params }) => {
  const resolvedParams = params ? await Promise.resolve(params) : {};
  const { id } = resolvedParams as IParams;

  return <VendorFoodListEdit id={id} />;
};

export default VendorEditPage;

