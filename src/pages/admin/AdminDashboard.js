//INTERNAL IMPORT
import { AdminNav } from "../../components";

const AdminDashboard = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>

                <div className="col-md-10">AdminDashboard</div>
            </div>
        </div>
    );
};

export default AdminDashboard;
