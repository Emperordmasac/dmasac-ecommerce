//INTERNAL IMPORT
import AdminNav from "../../../components/navigation/AdminNav";
import CreateCategoryForm from "../../../components/forms/category/CreateCategoryForm";

const CreateCategory = () => (
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <AdminNav />
            </div>
            <div className="col">
                <CreateCategoryForm />
            </div>
        </div>
    </div>
);

export default CreateCategory;
