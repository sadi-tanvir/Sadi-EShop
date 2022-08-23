import React, { useState } from 'react';

const Pagination = ({ count, page, setPage, setSize }) => {

    // const [next, setNext] = useState(page)

    return (
        <>
            <div className="flex justify-center">
                {
                    [...Array(count)?.keys()].length > 5 ?
                        <div className="btn-group block">
                            <button onClick={() => setPage(page === 0 ? 0 : page - 1)} className="btn btn-sm">«</button>
                            {
                                [...Array(count)?.keys()]?.splice(page, 3)?.map(num => {
                                    return <button
                                        onClick={() => setPage(num)}
                                        key={num}
                                        className={`${num === page && "btn-active"} btn btn-sm`}>{num + 1}
                                    </button>
                                })
                            }
                            <button className="btn btn-sm btn-disabled">...</button>
                            {
                                [...Array(count)?.keys()]?.splice(-3)?.map(num => {
                                    return <button
                                        onClick={() => setPage(num)}
                                        key={num}
                                        className={`${num === page && "btn-active"} btn btn-sm`}>{num + 1}
                                    </button>
                                })
                            }
                            <button onClick={() => setPage(page === [...Array(count)?.keys()].length - 1 ? [...Array(count)?.keys()].length - 1 :  page + 1)} className="btn btn-sm">»</button>
                        </div>
                        :
                        <div className="btn-group block">
                            {
                                [...Array(count)?.keys()].map(num => {
                                    return <button
                                        onClick={() => setPage(num)}
                                        key={num}
                                        className={`${num === page && "btn-active"} btn btn-sm`}>{num + 1}
                                    </button>
                                })
                            }
                        </div>
                }
                <select onChange={(e) => setSize(e.target.value)} style={{ width: '60px' }} className="form-select ml-5 border-2 border-primary rounded-lg" aria-label="Default select example">
                    <option value="5" selected>5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20 ">20</option>
                </select>
            </div>
        </>
    );
};

export default Pagination;