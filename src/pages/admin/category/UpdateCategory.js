//INTERNAL IMPORT
import { UpdateCategoryForm, AdminNav } from "../../../components";

const UpdateCategory = () => (
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <AdminNav />
            </div>
            <div className="col">
                <UpdateCategoryForm />
            </div>
        </div>
    </div>
);

export default UpdateCategory;
