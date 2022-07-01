// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import ProductCard from './ProductCard';



const ProductSlider = ({products}) => {


    return (
        <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={4}
            navigation
        // pagination={{ clickable: true }} 
        // scrollbar={{ draggable: true }}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log('slide change')}
        >
            {
                Object.keys(products).map((elem, index) => {
                    return (
                        <>
                            <SwiperSlide key={index}>
                                <ProductCard
                                    product={products[elem]}
                                    colors={products[elem].color}
                                />
                            </SwiperSlide>
                        </>
                    )
                })
            }
        </Swiper>
    );
};

export default ProductSlider