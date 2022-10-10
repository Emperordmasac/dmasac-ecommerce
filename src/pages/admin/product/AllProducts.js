//INTERNAL IMPORT
import { useState, useEffect } from "react";
import { getProductByCount } from "../../../utils/product";
import { AdminProductCard, AdminNav } from "../../../components";

const AllProducts = () => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        loadAllProducts(100);
    }, []);

    const loadAllProducts = (count) => {
        setLoading(true);
        getProductByCount(count)
            .then((res) => {
                setLoading(false);
                setProducts(res.data);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>

                <div className="col-md-10">
                    {loading ? (
                        <h4 className="text-danger">Loading</h4>
                    ) : (
                        <h4>All Products</h4>
                    )}
                    <div className="row">
                        {products.map((product) => (
                            <div key={product._id} className="col-md-4">
                                <AdminProductCard product={product} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllProducts;
