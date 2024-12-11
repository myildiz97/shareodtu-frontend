import VendorList from '@/components/pages/vendors/vendor-list/vendor-list';
import * as React from 'react';

interface IVendorsPageProps {
}

export const dynamic = 'force-dynamic';

const VendorsPage: React.FunctionComponent<IVendorsPageProps> = async () => {
  return <VendorList />;
};

export default VendorsPage;
