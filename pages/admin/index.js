import React from 'react';
import SidebarLayout from '../../components/admin/Sidebar/SidebarLayout';
import Breadcrumbs from '../../components/Breadcrumbs';
import HeadInfo from '../../components/HeadInfo';

const index = () => {
    return (
        <>
            {/* Breadcrumbs & header */}
            <Breadcrumbs firstPath="/" firstName="Home" current="Dashboard" />
            <HeadInfo title="Admin Dashboard - Sadi EShop" />

            <SidebarLayout>
                <h1 className="font-4xl font-bold text-red-500 text-center">this is admin home page</h1>
            </SidebarLayout>
        </>
    );
};

export default index;