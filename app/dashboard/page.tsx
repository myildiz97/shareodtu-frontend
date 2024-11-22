import * as React from 'react';
import DashboardCard from '@/components/dashboard/dashboard-card';

export default function Dashboard() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <DashboardCard />
    </div>
  );
}