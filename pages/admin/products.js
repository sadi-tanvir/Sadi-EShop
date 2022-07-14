import React from 'react';
import SidebarLayout from '../../components/admin/Sidebar/SidebarLayout';
import Breadcrumbs from '../../components/Breadcrumbs';
import HeadInfo from '../../components/HeadInfo';

const products = () => {
    return (
        <>
            {/* Breadcrumbs & header */}
            <Breadcrumbs firstPath="/" firstName="Home" secondPath="/admin" secondName="Dashboard" current="Products" />
            <HeadInfo title="Products - Sadi EShop" />

            <SidebarLayout>
                <h1 className="font-4xl font-bold text-red-500 text-center">this is admin All products page</h1>
            </SidebarLayout>
        </>
    );
};

export default products;