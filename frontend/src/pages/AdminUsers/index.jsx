import DashboardLayout from "../../layout/AdminLayout.jsx";
import Crud from "../../components/Crud.jsx";
import {userSchema} from "../../utils/schemas.jsx";

const AdminHome = ()=> {
    return <DashboardLayout>
        <Crud schema={userSchema} />
    </DashboardLayout>
}

export default AdminHome;