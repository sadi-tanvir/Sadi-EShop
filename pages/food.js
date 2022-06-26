import React from 'react';
import FruitSlider from '../components/Products/productSlider/FruitSlider';
import VegetableSlider from '../components/Products/productSlider/VegetableSlider';

const Food = () => {
    return (
        <>
        <div className="my-14">
            <VegetableSlider />
            <FruitSlider />
        </div>
        </>
    );
};

export default Food;