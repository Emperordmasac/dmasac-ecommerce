//INTERNAL IMPORT
import AdminNav from "../../../components/navigation/AdminNav";
import UpdateCategoryForm from "../../../components/forms/category/UpdateCategoryForm";

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
