//INTERNAL IMPORT
import AdminNav from "../../../components/navigation/AdminNav";
import CreatProductForm from "../../../components/forms/product/CreateProductForm";
import ImageUpload from "../../../components/forms/product/ImageUpload";

const CreateProduct = () => (
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <AdminNav />
            </div>
            <div className="col">
                <ImageUpload />
                <CreatProductForm />
            </div>
        </div>
    </div>
);

export default CreateProduct;
