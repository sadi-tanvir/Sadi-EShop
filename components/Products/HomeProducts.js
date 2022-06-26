import React from 'react';
import FruitSlider from './productSlider/FruitSlider';
import VegetableSlider from './productSlider/VegetableSlider';

const HomeProducts = () => {
    return (
        <>
            <VegetableSlider />
            <FruitSlider />
        </>
    );
};

export default HomeProducts;