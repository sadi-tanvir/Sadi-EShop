import React from 'react';

const Pagination = ({ count, page, setPage, setSize }) => {
    return (
        <>
            <div className="flex justify-center">
                <div className="btn-group block">
                    {
                        [...Array(count)?.keys()].length > 5 ?
                            [...Array(count)?.keys()]?.splice(0, 5)?.map(num => {
                                return <button
                                    onClick={() => setPage(num)}
                                    key={num}
                                    className={`${num === page && "btn-active"} btn btn-sm`}>{num + 1}
                                </button>
                            })

                            : [...Array(count)?.keys()].map(num => {
                                return <button
                                    onClick={() => setPage(num)}
                                    key={num}
                                    className={`${num === page && "btn-active"} btn btn-sm`}>{num + 1}
                                </button>
                            })
                    }
                </div>
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