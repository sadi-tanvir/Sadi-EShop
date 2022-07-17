import React from 'react';
import MenFashion from "./HomeProducts/MenFashion"
import MobilesElectronics from './HomeProducts/MobilesElectronics';
import MonitorsElectronics from './HomeProducts/MonitorsElectronics';
import WomenFashion from './HomeProducts/WomenFashion.js';


const HomeProducts = () => {
    return (
        <>
            <MenFashion />
            <WomenFashion />
            <MobilesElectronics />
            <MonitorsElectronics />
        </>
    );
};

export default HomeProducts;