//INTERNAL IMPORT
import { useState, useEffect } from "react";
import { createProduct } from "../../../utils/product";
import { getCategories, getCategorySubs } from "../../../utils/category";
import ImageUpload from "./ImageUpload";

//EXTERNAL IMPORT
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Select } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const { Option } = Select;

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
    const [subOption, setSubOption] = useState([]);
    const [showSubs, setShowSubs] = useState(false);

    useEffect(() => {
        loadCategories();
        // eslint-disable-next-line
    }, []);

    const { user } = useSelector((state) => ({ ...state }));

    const loadCategories = () =>
        getCategories().then((category) =>
            SetProductValues({ ...productValues, categories: category.data })
        );

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        createProduct(productValues, user.token)
            .then((res) => {
                setLoading(false);
                //toast.success(`${res.data.title} Product Successfully Created`);\
                window.alert(`${res.data.title} Product Successfully Created`);
                window.location.reload();
            })
            .catch((error) => {
                setLoading(false);
                toast.error(error.response.data.error);
                // if (error.response.status === 400)
                //     toast.error(error.response.data);
            });
    };

    const handleChange = (e) => {
        SetProductValues({ ...productValues, [e.target.name]: e.target.value });
        // console.log(e.target.name, "------", e.target.value);
    };

    const handleCategoryChange = (e) => {
        e.preventDefault();
        SetProductValues({
            ...productValues,
            subs: [],
            category: e.target.value,
        });
        getCategorySubs(e.target.value).then((res) => {
            setSubOption(res.data);
        });
        setShowSubs(true);
    };

    return (
        <>
            {loading ? (
                <LoadingOutlined className="text-danger h1" />
            ) : (
                <h4>Create Product</h4>
            )}
            <ImageUpload
                productValues={productValues}
                SetProductValues={SetProductValues}
                setLoading={setLoading}
            />
            <br />

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
                <div className="form-group">
                    <label>Choose a Category</label>
                    <select
                        name="category"
                        className="form-control"
                        onChange={handleCategoryChange}
                    >
                        <option>select</option>
                        {productValues.categories.length > 0 &&
                            productValues.categories.map((cat) => (
                                <option key={cat._id} value={cat._id}>
                                    {cat.name}
                                </option>
                            ))}
                    </select>
                </div>
                <br />
                {showSubs && (
                    <div>
                        <label>Choose a Sub Category</label>
                        <Select
                            mode="multiple"
                            style={{ width: "100%" }}
                            placeholder="select a sub category"
                            value={productValues.subs}
                            onChange={(value) => {
                                SetProductValues({
                                    ...productValues,
                                    subs: value,
                                });
                            }}
                        >
                            {subOption.length &&
                                subOption.map((subs) => (
                                    <Option key={subs._id} value={subs._id}>
                                        {subs.name}
                                    </Option>
                                ))}
                        </Select>
                    </div>
                )}
                <br />
                <button className="btn btn-outlined-info mb-3">Create</button>
            </form>
        </>
    );
};

export default CreatProductForm;
