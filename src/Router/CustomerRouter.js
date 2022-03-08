import { Navigate, useRoutes } from 'react-router-dom'
import Home from '../Pages/Home/Home'
import Login from '../Pages/Login'
import Register from '../Pages/Register'
import TakeOrder from '../Components/TakeOrder/TakeOrder'
import Invoice from '../Components/TakeOrder/Invoice'
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
import NewInvoice from '../Components/TakeOrder/NewInvoice'


// ----------------------------------------------------------------------

export default function CustomerRouter() {
  return useRoutes([
    {
      path: '/',
      children: [
        { path: '/', element: <Home /> },
        { path: '*', element: <Navigate to="/" replace /> },
        { path: 'login', element: <Login /> },
      ],
    },

    {
      path: '/dashboard',
      element: <Protected cmp={Dashboard} />,
      children: [
        { path: 'dhome', element: <DashboardHome /> },
        { path: 'invoice', element: <Invoice /> },
        {path: 'new_invoice', element: <NewInvoice />},
        { path: 'order_status', element: <Order_Status /> },
      ],
    },
    { path: '*', element: <Navigate to="/" replace /> },
  ])
}
