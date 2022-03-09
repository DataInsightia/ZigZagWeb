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
import Order_Status from "../Pages/Dashboard/Admin/Order_Status";
import NewInvoice from '../Components/TakeOrder/NewInvoice'
import InvoiceSup from "../Components/TakeOrder/Invoice/Invoice_Sup";



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

        {path: 'new_invoice', element: <NewInvoice />},
        { path: 'order_status', element: <Order_Status /> },
      ],
    },
    { path: '*', element: <Navigate to="/" replace /> },
  ])
}
