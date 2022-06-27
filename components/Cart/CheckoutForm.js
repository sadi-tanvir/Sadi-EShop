import React from 'react';

const CheckoutForm = () => {
    return (
        <>
            {/* shipping information */}
            <div className="max-w-md py-12 mx-auto bg-white rounded-lg md:max-w-xl">
                <div className="md:flex ">
                    <div className="w-full p-4 px-5 py-5">
                        <h1 className="font-bold text-secondary">Customer Information</h1>
                        <div className="relative pb-5">
                            <input type="text" name="mail" className="border rounded h-10 w-full focus:outline-none focus:border-primary px-2 mt-2 text-sm" placeholder="E-mail" />
                        </div>
                        <h1 className="font-bold text-secondary">Shipping Address</h1>
                        <div className="grid md:grid-cols-2 md:gap-2">
                            <input type="text" name="mail" className="border rounded h-10 w-full focus:outline-none focus:border-primary px-2 mt-2 text-sm" placeholder="First name*" />
                            <input type="text" name="mail" className="border rounded h-10 w-full focus:outline-none focus:border-primary px-2 mt-2 text-sm" placeholder="Last name*" />
                        </div>
                        <input type="text" name="mail" className="border rounded h-10 w-full focus:outline-none focus:border-primary px-2 mt-2 text-sm" placeholder="Company (optional)" />
                        <input type="text" name="mail" className="border rounded h-10 w-full focus:outline-none focus:border-primary px-2 mt-2 text-sm" placeholder="Address*" />
                        <input type="text" name="mail" className="border rounded h-10 w-full focus:outline-none focus:border-primary px-2 mt-2 text-sm" placeholder="Apartment, suite, etc. (optional)" />
                        <div className="grid md:grid-cols-3 md:gap-2">
                            <input type="text" name="mail" className="border rounded h-10 w-full focus:outline-none focus:border-primary px-2 mt-2 text-sm" placeholder="Zipcode*" />
                            <input type="text" name="mail" className="border rounded h-10 w-full focus:outline-none focus:border-primary px-2 mt-2 text-sm" placeholder="City*" />
                            <input type="text" name="mail" className="border rounded h-10 w-full focus:outline-none focus:border-primary px-2 mt-2 text-sm" placeholder="State*" />
                        </div>
                        <input type="text" name="mail" className="border rounded h-10 w-full focus:outline-none focus:border-primary px-2 mt-2 text-sm" placeholder="Country*" />
                        <input type="text" name="mail" className="border rounded h-10 w-full focus:outline-none focus:border-primary px-2 mt-2 text-sm" placeholder="Phone Number*" />
                        <button type="button" className="bg-primary style_btn mt-5 h-12 w-full rounded font-medium text-xs text-white">
                            Continue to Shipping
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CheckoutForm;