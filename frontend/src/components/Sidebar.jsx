import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">FinanceSys</h2>

      <NavLink to="/">Dashboard</NavLink>
      <NavLink to="/vendors">Vendors</NavLink>
      <NavLink to="/purchase-entry">Purchase Entry</NavLink>
      <NavLink to="/purchase-history">Purchase History</NavLink>
      <NavLink to="/payments">Payments</NavLink>
      <NavLink to="/payment-history">Payment History</NavLink>
    </div>
  );
}

export default Sidebar;
