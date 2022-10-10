//INTERNAL IMPORT
import { CreatProductForm, AdminNav } from "../../../components";

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
