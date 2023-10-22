import DashboardLayout from "../../layout/AdminLayout.jsx";
import Crud from "../../components/Crud.jsx";
import {productSchema} from "../../utils/schemas.jsx";

const AdminHome = () => {
    return <DashboardLayout>
        <Crud schema={productSchema}/>
    </DashboardLayout>
}

export default AdminHome;