//INTERNAL IMPORT
import AdminNav from "../../../components/navigation/AdminNav";
import CreatProductForm from "../../../components/forms/product/CreateProductForm";

const CreateProduct = () => (
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <AdminNav />
            </div>
            <div className="col">
                <CreatProductForm />
            </div>
        </div>
    </div>
);

export default CreateProduct;
