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
import Order_Status from "../Pages/Dashboard/Admin/Order_Status";
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
      ],
    },

    {
      path: '/dashboard',
      element: <Protected cmp={Dashboard} />,
      children: [
        { path: 'dhome', element: <DashboardHome /> },
        { path: 'takeorder', element: <TakeOrder /> },
        { path: 'invoice/', element: <Invoice /> },
        { path: 'invoice/:custid/:orderid', element: <Invoice /> },
        { path: 'work_assign', element: <OrderWorkStaffAssign /> },
        { path: 'order_approval', element: <OrderWorkApproval /> },
        { path: 'customer_orders/:custid/:orderid', element: <Orders /> },
        { path: 'orders', element: <StaffWorkTaken /> },
        { path: 'work_complete', element: <OrderWorkStaffCompletion /> },
        { path: 'completed_work', element: <OrderWorkCompleted /> },
        { path: 'order_status', element: <Order_Status /> },
        
        //staff
        { path: 'wage',element: <StaffWageCalculation/>},
        { path: 'staff_work_taken', element: <Invoice /> },
        { path: 'staff_register', element: <Staff_register /> },
        { path: 'edit_profile',element: <EditProfile/>}
      ],
    },
    { path: '*', element: <Navigate to="/" replace /> },
  ])
}
