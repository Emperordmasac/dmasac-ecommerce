//INTERNAL IMPORT
import { useEffect, useState } from "react";
import { getCategories } from "../../../utils/category";
import {
    createSubCategory,
    getSubCategories,
    removeSubCategory,
} from "../../../utils/subCategory";
import LocalSearch from "../../../utils/LocalSearch";

//EXTERNAL IMPORT
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const CreateSubCategoryForm = () => {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [query, setQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    let { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadCategories();
        loadSubCategories();

        // eslint-disable-next-line
    }, []);

    const loadCategories = () =>
        getCategories().then((category) => setCategories(category.data));

    const loadSubCategories = () =>
        getSubCategories().then((subCategory) =>
            setSubCategories(subCategory.data)
        );

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        createSubCategory({ name, parent: selectedCategory }, user.token)
            .then((res) => {
                setLoading(false);
                setName("");
                toast.success(
                    `${res.data.name} SubCategory Successfully Created`
                );
                loadSubCategories();
            })
            .catch((error) => {
                setLoading(false);
                if (error.response.status === 400)
                    toast.error(error.response.data);
            });
    };

    const handleSubCategoryDelete = (slug) => {
        if (window.confirm(`Delete? ${slug}`)) {
            setLoading(true);
            removeSubCategory(slug, user.token)
                .then((res) => {
                    setLoading(false);
                    toast.error(`${res.data.name} SubCategory Deleted`);
                    loadSubCategories();
                })
                .catch((error) => {
                    if (error.response.status === 400) {
                        setLoading(false);
                        toast.error(error.response.data);
                    }
                });
        }
    };

    const search = (query) => (result) =>
        result.name.toLowerCase().includes(query);

    return (
        <>
            {loading ? (
                <h4 className="text-danger">Loading...</h4>
            ) : (
                <h4>Create SubCategory</h4>
            )}

            <div className="form-group">
                <label>Choose a Category</label>
                <select
                    name="category"
                    className="form-control"
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option>select</option>
                    {categories.length > 0 &&
                        categories.map((cat) => (
                            <option key={cat._id} value={cat._id}>
                                {cat.name}
                            </option>
                        ))}
                </select>
            </div>
            <br />

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-control"
                        type="text"
                        autoFocus
                        required
                    />
                    <br />
                    <button className="btn btn-outlined-primary">Create</button>
                    <hr />
                    <LocalSearch query={query} setQuery={setQuery} />
                    {subCategories.filter(search(query)).map((subCategory) => (
                        <div
                            className="alert alert-secondary"
                            key={subCategory._id}
                        >
                            {subCategory.name}
                            <Link to={`/admin/sub/${subCategory.slug}`}>
                                <span className="btn btn-sm float-right">
                                    <EditOutlined className="text-warning" />
                                </span>
                            </Link>

                            <span className="btn btn-sm float-right">
                                <DeleteOutlined
                                    onClick={() =>
                                        handleSubCategoryDelete(
                                            subCategory.slug
                                        )
                                    }
                                    className="text-danger"
                                />
                            </span>
                        </div>
                    ))}
                </div>
            </form>
        </>
    );
};

export default CreateSubCategoryForm;
