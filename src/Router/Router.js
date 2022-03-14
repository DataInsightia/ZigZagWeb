import { Navigate, useRoutes } from 'react-router-dom'
import Home from '../Pages/Home/Home'
import Login from '../Pages/Login'
import Register from '../Pages/Register'
import TakeOrder from '../Components/TakeOrder/TakeOrder'
import Invoice from '../Components/TakeOrder/Invoice/Invoice'
import Dashboard from '../Pages/Dashboard/Dashboard'
import DashboardHome from '../Pages/Dashboard/DHome'
import OrderWorkStaffAssign from '../Pages/Dashboard/Staf/OrderWorkStaffAssign'
import Protected from './PrivateRouter/PrivateRouter'
import OrderWorkApproval from '../Pages/Dashboard/Staf/OrderWorkApproval'
import OrderWorkStaffCompletion from '../Pages/Dashboard/Staf/OrderWorkStaffCompletion'
import Staff_register from '../Pages/Dashboard/Staf/Auth/StaffRegister'
import StaffWorkTaken from '../Pages/Dashboard/Staf/StaffWorkTaken'
import OrderWorkCompleted from '../Pages/Dashboard/Staf/OrderWorkCompleted'
import EditProfile from "../Pages/Dashboard/Staf/EditProfile";
import StaffWageCalculation from "../Pages/Dashboard/Staf/StaffWageCalculation";
import StaffWageGiven from "../Pages/Dashboard/Staf/StaffWageGiven";
import StaffList from '../Pages/Dashboard/Staf/WageList'
import Order_Status from "../Pages/Dashboard/Admin/Order_Status";
import InvoiceSup from "../Components/TakeOrder/Invoice/Invoice_Sup";
import OrderHistory from "../Pages/Dashboard/Admin/Order_History";
import Order_Status_Home from "../Pages/Home/Order_Status_Home";
import Orders from '../Pages/Dashboard/Customer/Orders'



// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      children: [
        { path: '/', element: <Home /> },
        { path: '*', element: <Navigate to="/" replace /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'order_status_home', element: <Order_Status_Home /> },
      ],
    },

    {
      path: '/dashboard',
      element: <Protected cmp={Dashboard} />,
      children: [
        { path: 'dhome', element: <DashboardHome /> },

        { path: 'takeorder', element: <TakeOrder /> },
        // { path: 'invoice/', element: <Invoice /> },
        { path: 'invoice/:custid/:orderid', element: <Invoice /> },
        { path: 'work_assign', element: <OrderWorkStaffAssign /> },
        { path: 'order_approval', element: <OrderWorkApproval /> },
        { path: 'customer_orders/:custid/:orderid', element: <Orders /> },
        { path: 'orders', element: <StaffWorkTaken /> },
        { path: 'work_complete', element: <OrderWorkStaffCompletion /> },
        { path: 'completed_work', element: <OrderWorkCompleted /> },
        { path: 'order_status', element: <Order_Status /> },
          //staff
        { path: 'wage/',element: <StaffList/>},
        { path: 'wage/:id',element: <StaffWageCalculation/>},
        { path: 'staff_work_taken', element: <Invoice /> },
        { path: 'staff_register', element: <Staff_register /> },
        { path: 'edit_profile',element: <EditProfile/>},
          //customer
        { path: 'invoice_sup', element: <InvoiceSup />},
        { path: 'order_status', element: <Order_Status /> },
        { path: 'order_history', element: <OrderHistory/>}

      ],
    },
    { path: '*', element: <Navigate to="/" replace /> },
  ])
}
