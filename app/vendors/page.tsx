import VendorList from '@/components/pages/vendors/vendor-list';
import * as React from 'react';

interface IVendorsPageProps {
}

const VendorsPage: React.FunctionComponent<IVendorsPageProps> = (props) => {
  return <VendorList />;
};

export default VendorsPage;
