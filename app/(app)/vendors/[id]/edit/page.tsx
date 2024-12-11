import VendorFoodList from '@/components/pages/vendors/vendor-food-list/vendor-food-list';
import * as React from 'react';

interface IParams {
  id: string;
}
interface IVendorEditPageProps {
  params: Promise<any> | undefined;
}

export const dynamic = 'force-dynamic';


const VendorEditPage: React.FunctionComponent<IVendorEditPageProps> = async ({ params }) => {
  const resolvedParams = params ? await Promise.resolve(params) : {};
  const { id } = resolvedParams as IParams;

  return <VendorFoodList id={id} action='edit' />;
};

export default VendorEditPage;

