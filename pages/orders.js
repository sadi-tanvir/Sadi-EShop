import React from 'react';


const Orders = () => {
    return (
        <div className="w-10/12 mx-auto my-20 min-h-[60vh]">
            <h1 className="font-bold text-2xl uppercase my-5">My Orders</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr className="hover">
                            <th>
                                <div className="avatar">
                                    <div className="bg-neutral-focus border-2 border-slate-400 text-neutral-content rounded-full w-8  shadow-2xl">
                                        <img
                                            src="https://i.ibb.co/jgDtzL8/empty-avatar.jpg" alt=""
                                        />
                                    </div>
                                </div>
                            </th>
                            <td>Hart Hagerty</td>
                            <td>Desktop Support Technician</td>
                            <td>Purple</td>
                            <td>Purple</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};


// export async function getServerSideProps(context) {

//     const orders = await Product.find({})



//     // Pass data to the page via props
//     return { props: { orders: orders } }
// }

export default Orders;