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


// ----------------------------------------------------------------------

export default function Router() {
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
        //Admin
        { path: 'dhome', element: <DashboardHome /> },
        { path: 'takeorder', element: <TakeOrder /> },
        { path: 'invoice', element: <Invoice /> },
        { path: 'work_assign', element: <OrderWorkStaffAssign /> },
        { path: 'order_approval', element: <OrderWorkApproval /> },
        { path: 'orders', element: <StaffWorkTaken /> },
        { path: 'work_complete', element: <OrderWorkStaffCompletion /> },
        { path: 'completed_work', element: <OrderWorkCompleted /> },
      ],
    },
    { path: '*', element: <Navigate to="/" replace /> },
  ])
}
