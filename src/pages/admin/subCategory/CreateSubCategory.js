//INTERNAL IMPORT
import AdminNav from "../../../components/navigation/AdminNav";
import CreateSubCategoryForm from "../../../components/forms/subCategory/CreateSubCategoryForm";

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
