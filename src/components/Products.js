import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { MdEditSquare,MdDelete  } from "react-icons/md";

export default function Products() {

    useEffect(() => {
        getProducts();
    }, [])

    const [productData, setProductData] = useState([]);

    const getProducts = async (e) => {

        try {
            const res = await fetch("http://localhost:4000/products", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();

            if (res.status === 201) {
                console.log("Data Retrieved.");
                setProductData(data);
            }
            else {
                console.log("Something went wrong. Please try again.");
            }
        } catch (err) {
            console.log(err);
        }
    }

    const deleteProduct = async (id) => {

        const response = await fetch(`https://crud-task-s8b4.onrender.com/deleteproduct/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const deletedata = await response.json();
        console.log(deletedata);

        if (response.status === 422 || !deletedata) {
            console.log("Error");
        } else {
            console.log("Product deleted");
            getProducts();
        }

    }

    return (
        <div className='h-[100vh] flex justify-center items-center'>
            <div className='w-11/12 bg-black text-white h-[60vh] p-4 rounded-xl shadow-2xl shadow-blue-700'>
                <h1 className='text-4xl font-serif'>Products Inventory</h1>
                <div className='flex justify-end'>
                    <NavLink to="/insertproduct" className='bg-blue-500 p-2 text-white rounded-md '> + Add New Product</NavLink>
                </div>
                <div className="mt-7">
                    <table className='w-full'>
                        <thead className=' h-[40px] text-white'>
                            <tr className='w-[100%] text-left'>
                                <th className='w-[10%] px-2'>#</th>
                                <th className='w-[20%] uppercase'>Product Name</th>
                                <th className='w-[20%] uppercase'>Product Price</th>
                                <th className='w-[20%] uppercase'>Product Barcode</th>
                                <th className='w-[10%] uppercase'>Update</th>
                                <th className='w-[10%] uppercase'>Delete</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                productData.map((element, id) => {
                                    return (
                                        <>
                                            <tr className='bg-white border h-[40px] hover:bg-blue-100 text-black'>
                                                <td className='w-[10%] px-2'>{id + 1}</td>
                                                <td className='w-[20%]'>{element.ProductName}</td>
                                                <td className='w-[20%]'>{element.ProductPrice}</td>
                                                <td className='w-[20%]'>{element.ProductBarcode}</td>
                                                <td className='w-[10%]'>
                                                    <NavLink className='text-blue-500 text-2xl cursor-pointer' to={`/updateproduct/${element._id}`}>
                                                        <MdEditSquare/>
                                                    </NavLink>
                                                </td>
                                                <td className='w-[10%]'>
                                                    <button className="text-red-500 text-2xl" onClick={() => deleteProduct(element._id)}>
                                                        <MdDelete/>
                                                    </button>
                                                </td>

                                            </tr>
                                        </>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}