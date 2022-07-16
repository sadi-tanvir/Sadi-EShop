import React from 'react';
import DashboardCard from '../../components/admin/dashboard/DashboardCard';
import SidebarLayout from '../../components/admin/Sidebar/SidebarLayout';
import Breadcrumbs from '../../components/Breadcrumbs';
import HeadInfo from '../../components/HeadInfo';
import { UsersIcon } from '../../components/shared/DashboardIcon';

const index = () => {
    return (
        <>
            {/* Breadcrumbs & header */}
            <Breadcrumbs firstPath="/" firstName="Home" current="Dashboard" />
            <HeadInfo title="Admin Dashboard - Sadi EShop" />

            <SidebarLayout>
                <DashboardCard />
            </SidebarLayout>
        </>
    );
};

export default index;