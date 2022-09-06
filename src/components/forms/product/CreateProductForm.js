//INTERNAL IMPORT
import { useState } from "react";
import { createProduct } from "../../../utils/product";

//EXTERNAL IMPORT
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const productInitials = {
    title: "",
    description: "",
    price: "",
    categories: [],
    subs: [],
    category: "",
    shipping: "",
    quantity: "",
    images: [],
    colors: ["Black", "White", "Blue", "Silver", "Brown"],
    brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
    color: "",
    brand: "",
};

const CreatProductForm = () => {
    const [productValues, SetProductValues] = useState(productInitials);
    const [loading, setLoading] = useState(false);

    const { user } = useSelector((state) => ({ ...state }));

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        createProduct(productValues, user.token)
            .then((res) => {
                setLoading(false);
                toast.success(`${res.data.title} Product Successfully Created`);
            })
            .catch((error) => {
                setLoading(false);
                if (error.response.status === 400)
                    toast.error(error.response.data);
            });
    };

    const handleChange = (e) => {
        SetProductValues({ ...productValues, [e.target.name]: e.target.value });
        // console.log(e.target.name, "------", e.target.value);
    };

    return (
        <>
            {loading ? (
                <h4 className="text-danger">Loading...</h4>
            ) : (
                <h4>Create Product</h4>
            )}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        className="form-control"
                        type="text"
                        name="title"
                        value={productValues.title}
                        onChange={handleChange}
                    />
                </div>
                <br />
                <div className="form-group">
                    <label>Dscription</label>
                    <input
                        className="form-control"
                        type="text"
                        name="description"
                        value={productValues.description}
                        onChange={handleChange}
                    />
                </div>
                <br />
                <div className="form-group">
                    <label>Price</label>
                    <input
                        className="form-control"
                        type="number"
                        name="price"
                        value={productValues.price}
                        onChange={handleChange}
                    />
                </div>
                <br />
                <div className="form-group">
                    <label>Shipping</label>
                    <br />
                    <select
                        name="shipping"
                        className="form-coontrol"
                        onChange={handleChange}
                    >
                        <option>Select</option>
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                    </select>
                </div>
                <br />
                <div className="form-group">
                    <label>Quantity</label>
                    <input
                        className="form-control"
                        type="number"
                        name="quantity"
                        value={productValues.quantity}
                        onChange={handleChange}
                    />
                </div>
                <br />
                <div className="form-group">
                    <label>Color</label>
                    <br />
                    <select
                        name="color"
                        className="form-coontrol"
                        onChange={handleChange}
                    >
                        <option>Select</option>
                        {productInitials.colors.map((color) => (
                            <option key={color} value={color}>
                                {color}
                            </option>
                        ))}
                    </select>
                </div>
                <br />
                <div className="form-group">
                    <label>Brands</label>
                    <br />
                    <select
                        name="brand"
                        className="form-coontrol"
                        onChange={handleChange}
                    >
                        <option>Select</option>
                        {productInitials.brands.map((brand) => (
                            <option key={brand} value={brand}>
                                {brand}
                            </option>
                        ))}
                    </select>
                </div>

                <br />
                <button className="btn btn-outlined-info mb-3">Create</button>
            </form>
        </>
    );
};

export default CreatProductForm;
