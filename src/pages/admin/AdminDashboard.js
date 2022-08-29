//INTERNAL IMPORT
import AdminNav from "../../components/navigation/AdminNav";

const AdminDashboard = () => (
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <AdminNav />
            </div>
            <div className="col">Admin Dashboard Page</div>
        </div>
    </div>
);

export default AdminDashboard;
