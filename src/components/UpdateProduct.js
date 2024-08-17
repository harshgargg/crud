import React, { useEffect, useState } from 'react'
import { NavLink, useParams, useNavigate } from 'react-router-dom';

export default function InsertProduct() {
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState();
    const [productBarcode, setProductBarcode] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate("");

    const setName = (e) => {
        setProductName(e.target.value);
      };
    
      const setPrice = (e) => {
        setProductPrice(e.target.value);
      };
    
      const setBarcode = (e) => {
        const value = e.target.value.slice(0, 12);
        setProductBarcode(value);
    };

    const {id} = useParams("");

    useEffect(() => {
        const getProduct = async () => {
          try {
            const res = await fetch(`https://crud-task-s8b4.onrender.com/products/${id}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json"
              }
            });
      
            const data = await res.json();
      
            if (res.status === 201) {
              console.log("Data Retrieved.");
              setProductName(data.ProductName);
              setProductPrice(data.ProductPrice);
              setProductBarcode(data.ProductBarcode);
            } else {
              console.log("Something went wrong. Please try again.");
            }
          } catch (err) {
            console.log(err);
          }
        };
      
        getProduct();
    }, [id]);

    const updateProduct = async (e) => {
        e.preventDefault();

        if (!productName || !productPrice || !productBarcode) {
            setError("*Please fill in all the required fields.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch(`https://crud-task-s8b4.onrender.com/updateproduct/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ "ProductName": productName, "ProductPrice": productPrice, "ProductBarcode": productBarcode })
            });

            await response.json();

            if (response.status === 201) {
                alert("Data Updated");
                navigate('/products');
            }
            else {
                setError("Something went wrong. Please try again.");
            }
        } catch (err) {
            setError("An error occurred. Please try again later.");
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='h-[100vh] flex flex-col justify-center items-center'>
            <div className='w-11/12 bg-black text-white h-[60vh] p-4 rounded-xl shadow-2xl shadow-blue-700'>
                <h1 className='text-4xl mb-12 font-serif'>Enter Product Information</h1>
                
                <div className='w-[60%]'>
                    <div className='p-2 flex flex-col gap-2'>
                        <label htmlFor="product_name" className='font-semibold'>Product Name</label>
                        <input type="text" className='border text-black p-1 rounded-md' onChange={setName} value={productName} id="product_name" placeholder="Enter Product Name" required />
                    </div>
                    <div className='p-2 flex flex-col gap-2'>
                        <label htmlFor="product_price" className='font-semibold'>Product Price</label>
                        <input type="text" className='border text-black p-1 rounded-md' onChange={setPrice} value={productPrice} id="product_price" placeholder="Enter Product Price" required />
                    </div>
                    <div className='p-2 flex flex-col gap-2'>
                        <label htmlFor="product_barcode" className='font-semibold'>Product Barcode</label>
                        <input type="text" className='border text-black p-1 rounded-md' onChange={setBarcode} value={productBarcode} maxLength={12} id="product_barcode" placeholder="Enter Product Barcode" required />
                    </div>
                    <div className='flex gap-5 mt-5 justify-center'>
                        <NavLink to="/products" className='bg-blue-500 px-4 py-2 rounded-md text-white' >Cancel</NavLink>
                        <button type="submit" className='bg-blue-500 px-4 py-2 rounded-md text-white' onClick={updateProduct} disabled={loading}>{loading ? 'Updating...' : 'Update'}</button>
                    </div>
                </div>
            </div>
            <div className="text-red-500 text-xl font-semibold pt-12">
                {error && <div className="text-danger mt-3 fs-5 fw-bold">{error}</div>}
            </div>
        </div>
    )
}