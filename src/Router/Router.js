import { Navigate, useRoutes } from 'react-router-dom'
import Home from '../Pages/Home/Home'
import Login from '../Pages/Login'
import Register from '../Pages/Register'
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
import StaffList from '../Pages/Dashboard/Staf/WageList'
import Order_Status from "../Pages/Dashboard/Admin/Order_Status";
import CustomerOrderStatus from "../Pages/Dashboard/Customer/CustomerOrderStatus";
import InvoiceSup from "../Components/TakeOrder/Invoice/Invoice_Sup";
import OrderHistory from "../Pages/Dashboard/Admin/Order_History";
import Order_Status_Home from "../Pages/Home/Order_Status_Home";
import Orders from '../Pages/Dashboard/Customer/Orders'
import WorkForm from '../Pages/Dashboard/Admin/Form/WorkForm'
import MaterialForm from '../Pages/Dashboard/Admin/Form/MaterialForm'
import Staff from '../Pages/Dashboard/Admin/StaffLists'
import Customer from '../Pages/Dashboard/Admin/CustomerLists'
import CustomerOrderHistory from '../Pages/Dashboard/Customer/Order_History';
import Product from '../Pages/Dashboard/Admin/Product'
import Product_Home from "../Pages/Product/Product_Home"
import Delivery from '../Pages/Dashboard/Admin/Delivery'
import React from 'react';
import OtherPickup from "../Pages/Dashboard/Admin/OtherPickup";
import PayAdvance from "../Pages/Dashboard/Admin/PayAdvance";
import NewTakeOrder from "../Components/TakeOrder/NewTakeOrder";
import DisplayList from '../Pages/Dashboard/DisplayList'
import CustomerMeasurement from "../Pages/Dashboard/Admin/CustomerMeasurement";
import TakeOrderMod from "../Components/TakeOrder/TakeOrderMod";
import InvoiceMob from "../Components/TakeOrder/Invoice/InvoiceMob";
import ViewInvoice from "../Components/TakeOrder/Invoice/ViewInvoice";
import SearchInvoice from "../Components/TakeOrder/Invoice/SearchInvoice";
import EditTakeOrder from "../Components/TakeOrder/EditTakeOrder";
import Contact_Us from "../Pages/Home/Contact_Us";
import UrgentDelivery from '../Pages/Dashboard/Admin/UrgentOrder'


// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      children: [
        { path: '/', element: <Home /> },
        // { path: '*', element: <Navigate to="/" replace /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'product_home', element: <Product_Home /> },
        { path: 'order_status_home', element: <Order_Status_Home /> },
        { path: 'contact_us',element: <Contact_Us/>}

      ],
    },

    {
      path: '/dashboard',
      element: <Dashboard />,
      children: [
        { path: 'dhome', element: <DashboardHome /> },
        { path: 'work', element: <WorkForm/>},
        { path: 'material', element: <MaterialForm/>},
        { path: 'takeorder', element: <NewTakeOrder /> },
        { path: 'takeordermod', element: <TakeOrderMod /> },
        { path: 'edit_order/:custid/:orderid', element: <EditTakeOrder /> },
        { path: 'search_invoice', element: <SearchInvoice /> },
        { path: 'invoice/:custid/:orderid', element: <Invoice /> },
        { path: 'view_invoice/:custid/:orderid', element: <ViewInvoice /> },
        { path: 'invoice/:custid/:orderid/:current_amount/:pending_amount', element: <Invoice /> },
        { path: 'invoicemob/:custid/:orderid', element: <InvoiceMob /> },
        { path: 'customer_orders/:custid', element: <Orders /> },
        { path: 'work_assign', element: <OrderWorkStaffAssign /> },
        { path: 'order_approval', element: <OrderWorkApproval /> },
        { path: 'customer_orders/:custid/:orderid', element: <Orders /> },
        { path: 'customer_order_history/:custid', element: <CustomerOrderHistory /> },
        { path: 'orders', element: <StaffWorkTaken /> },
        { path: 'work_complete', element: <OrderWorkStaffCompletion /> },
        { path: 'completed_work', element: <OrderWorkCompleted /> },
        { path: 'order_status', element: <Order_Status /> },
        { path: 'staffs/',element: <Staff/>},
        { path: 'customers/',element: <Customer/>},
         //staff
        { path: 'wage/',element: <StaffList/>},
        { path: 'wage/:id',element: <StaffWageCalculation/>},
        { path: 'staff_work_taken', element: <Invoice /> },
        { path: 'staff_register', element: <Staff_register /> },
        { path: 'edit_profile',element: <EditProfile/>},
          //customer
        { path: 'invoice_sup', element: <InvoiceSup />},
        // { path: 'order_status', element: <Order_Status /> },
        { path: 'customer_order_status', element: <CustomerOrderStatus /> },
        { path: 'order_history', element: <OrderHistory/>},
        { path: 'products', element: <Product />},

        // DELIVERY
        { path: 'delivery', element: <Delivery />},

        // URGENT DELIVERY
        { path: 'urgent_delivery', element: <UrgentDelivery />},

        // PAY ADVANCE
        {path : 'pay_advance', element: <PayAdvance />},

        // OTHER DELIVERY
        {path : 'other_pickup', element: <OtherPickup />},

        //DISPLAY DASHBOARD ITEM LISTS
        { path: 'lists/:state', element: <DisplayList /> },
        { path: 'customer_measurement', element: <CustomerMeasurement /> },
      ],
    },
    { path: '*', element: <Navigate to="/" replace /> },
  ])
}
