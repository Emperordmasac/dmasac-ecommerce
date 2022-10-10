//INTERNAL IMPORT
import { CreateSubCategoryForm, AdminNav } from "../../../components";

const CreateSubCategory = () => (
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <AdminNav />
            </div>
            <div className="col">
                <CreateSubCategoryForm />
            </div>
        </div>
    </div>
);

export default CreateSubCategory;
