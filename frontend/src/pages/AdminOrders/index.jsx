import DashboardLayout from "../../layout/AdminLayout.jsx";
import Crud from "../../components/Crud.jsx";
import {orderSchema} from "../../utils/schemas.jsx";

const AdminHome = ()=> {
    return <DashboardLayout>
        <Crud schema={orderSchema} enableCreate={false} enableDelete={false} enableEdit={false} enableRead={true} />
    </DashboardLayout>
}

export default AdminHome;