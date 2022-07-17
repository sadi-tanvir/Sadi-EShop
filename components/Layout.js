import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Layout = ({ className, children }) => {
    // redux
    const dispatch = useDispatch()
    const { menuDropDown, userDropDown, fashionDropDown, electronicsDropDown } = useSelector(state => state.globalReducer)

    const handleClick = () => {
        if (menuDropDown || userDropDown || fashionDropDown || electronicsDropDown) {
            dispatch({ type: 'closeDropDown' })
        }
    }

    return (
        <div onClick={handleClick} className={className}>
            {children}
        </div>
    );
};

export default Layout;