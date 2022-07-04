import React from 'react';
import Link from "next/link"


const Breadcrumbs = ({firstPath, firstName, secondPath, secondName, thirdPath, thirdName, current}) => {
    return (
        <>
            <div className="text-sm breadcrumbs ml-5">
                <ul>
                    {firstPath && <Link href={firstPath}><li><a className='text-primary font-semibold'>{firstName}</a></li></Link>}
                    {secondPath && <Link href={secondPath}><li><a className='text-primary font-semibold'>{secondName}</a></li></Link>}
                    {thirdPath && <Link href={thirdPath}><li><a className='text-primary font-semibold'>{thirdName}</a></li></Link>}
                    <li className='text-secondary font-semibold'>{current}</li>
                </ul>
            </div>
        </>
    );
};

export default Breadcrumbs;