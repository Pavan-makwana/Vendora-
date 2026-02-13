import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">Vendora</h2>

      <NavLink to="/" className="nav-item">Dashboard</NavLink>

      <div className="section-title">Vendors</div>
      <NavLink to="/vendors" className="nav-item">Vendor List</NavLink>
      <NavLink to="/vendor-entry" className="nav-item">Add Vendor</NavLink>

      <div className="section-title">Catalog</div>
      <NavLink to="/products" className="nav-item">Manage Products</NavLink>

      <div className="section-title">Purchases</div>
      <NavLink to="/purchase-history" className="nav-item">History</NavLink>
      <NavLink to="/purchase-entry" className="nav-item">New Purchase</NavLink>

      <div className="section-title">Payments</div>
      <NavLink to="/payment-history" className="nav-item">History</NavLink>
      <NavLink to="/payments" className="nav-item">Record Payment</NavLink>
    </div>
  );
}

export default Sidebar;