import { NavLink, Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">Vendora</h2>

      <NavLink to="/">Dashboard</NavLink>
      <Link to="/vendor-entry">Vendor Entry</Link>
      <Link to="/vendors">Vendors</Link>
      <NavLink to="/purchase-entry">Purchase Entry</NavLink>
      <NavLink to="/purchase-history">Purchase History</NavLink>
      <NavLink to="/payments">Payments</NavLink>
      <NavLink to="/payment-history">Payment History</NavLink>
    </div>
  );
}

export default Sidebar;
