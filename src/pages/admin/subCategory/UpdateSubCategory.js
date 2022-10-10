//INTERNAL IMPORT
import { UpdateSubCategoryForm, AdminNav } from "../../../components";

const UpdateSubCategory = () => (
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <AdminNav />
            </div>
            <div className="col">
                <UpdateSubCategoryForm />
            </div>
        </div>
    </div>
);

export default UpdateSubCategory;
