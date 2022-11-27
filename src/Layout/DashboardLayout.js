import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthProvider';
import useAdmin from '../Hooks/UseAdmin';
import useBuyers  from '../Hooks/UseBuyers';
import Navbar from '../Pages/Shared/Navbar/Navbar';


const DashboardLayout = () => {
    const {user} = useContext(AuthContext)
    const [isAdmin] = useAdmin(user?.email)
    const [isBuyers] = useBuyers(user?.email)
    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile">
  <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content ">
    <Outlet></Outlet>
    
  
  </div> 
  <div className="drawer-side">
    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label> 
    <ul className="menu p-4 w-80  text-base-content">
      {
        isBuyers && <>
         <li><Link to="/dashboard/myOrders">My Orders</Link></li>
         </>
      }
      
      { isAdmin && <>
        <li><Link to="/dashboard/allSellers">All Sellers</Link></li>
        <li><Link to="/dashboard/allBuyers">All Buyers</Link></li>
        <li><Link to="/dashboard/reportedItems">Reported Items</Link></li>
      </>
        
      }
    </ul>
  
  </div>
</div>
        </div>
    );
};

export default DashboardLayout;