import DashboardLayout from "../../layout/AdminLayout.jsx";
import Crud from "../../components/Crud.jsx";
import {productCategoriesSchema} from "../../utils/schemas.jsx";

const AdminHome = () => {
    return <DashboardLayout>
        <Crud schema={productCategoriesSchema}/>
    </DashboardLayout>
}

export default AdminHome;