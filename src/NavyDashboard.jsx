import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./NavyDashboard.css";

const API_URL = "http://127.0.0.1:8000";

// --- Menu Configuration (Static) ---
const menuItems = [
  {
    id: "tanks", label: "Tanks",
    subs: [
      { id: "main-battle-tank",    label: "Main Battle Tank" },
      { id: "light-tank",          label: "Light Tank" },
      { id: "amphibious-tank",     label: "Amphibious Tank" },
      { id: "tank-destroyer",      label: "Tank Destroyer" },
      { id: "reconnaissance-tank", label: "Reconnaissance Tank" },
    ],
  },
  {
    id: "apcs", label: "APCS",
    subs: [
      { id: "armored-personnel", label: "Armored Personnel" },
      { id: "infantry-fighting", label: "Infantry Fighting" },
      { id: "mine-resistant",    label: "Mine-Resistant" },
      { id: "command-vehicle",   label: "Command Vehicle" },
      { id: "ambulance-apc",     label: "Ambulance APC" },
    ],
  },
  {
    id: "submarine", label: "Submarine",
    subs: [
      { id: "attack-sub",            label: "Attack Sub" },
      { id: "ballistic-missile-sub", label: "Ballistic Missile Sub" },
      { id: "cruise-missile-sub",    label: "Cruise Missile Sub" },
      { id: "research-sub",          label: "Research Sub" },
      { id: "midget-sub",            label: "Midget Sub" },
    ],
  },
  {
    id: "seadrone", label: "Sea Drone",
    subs: [
      { id: "surface-drone",    label: "Surface Drone" },
      { id: "underwater-drone", label: "Underwater Drone" },
      { id: "aerial-sea-drone", label: "Aerial Sea Drone" },
      { id: "swarm-drone",      label: "Swarm Drone" },
      { id: "recon-drone",      label: "Recon Drone" },
    ],
  },
  {
    id: "warships", label: "Warships",
    subs: [
      { id: "aircraft-carrier", label: "Aircraft Carrier" },
      { id: "destroyer",        label: "Destroyer" },
      { id: "frigate",          label: "Frigate" },
      { id: "corvette",         label: "Corvette" },
      { id: "patrol-vessel",    label: "Patrol Vessel" },
    ],
  },
];

// --- Dashboard Component ---
export default function NavyDashboard() {
  const navigate = useNavigate();
  const [route, setRoute] = useState({ view: "home" });
  const [openId, setOpenId] = useState(null);
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from API
  useEffect(() => {
    const fetchUnits = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/units`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUnits(response.data);
      } catch (err) {
        console.error("Failed to fetch units", err);
        if (err.response?.status === 401) {
          localStorage.clear();
          navigate("/");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUnits();
  }, [navigate]);

  const toggle = (id) => setOpenId(prev => prev === id ? null : id);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // Helper to get unit details (Fallback to static description if not in DB)
  const getUnitDetail = (subId) => {
    const found = units.find(u => u.name === subId); // We'll use 'name' as the ID key for now
    if (found) return found;
    return { name: subId, type: "Unknown", status: "N/A", owner: "N/A" };
  };

  const renderContent = () => {
    const { view, catId, subId } = route;
    if (loading) return <div className="nd-title">Loading Secure Data...</div>;

    if (view === "sub") {
      const cat = menuItems.find(m => m.id === catId);
      const sub = cat?.subs.find(s => s.id === subId);
      const data = getUnitDetail(subId);

      return (
        <>
          <div className="nd-crumb">Dashboard / {cat?.label} / {sub?.label}</div>
          <div className="nd-title">{sub?.label}</div>
          <div className="nd-subtitle">Unit details and deployment status from Live Server.</div>
          <div className="nd-detail-grid">
            {[
              { label: "Unit ID",        val: data.id || "Pending" },
              { label: "Category",       val: cat?.label },
              { label: "Status",         val: "● " + (data.status || "Inactive"), color: data.status === "Active" ? "#22c55e" : "#ef4444" },
              { label: "Deployment Type", val: data.type || "Classified" },
              { label: "Commanding Officer", val: data.owner || "Unauthorized" },
              { label: "Last Sync",      val: new Date().toLocaleTimeString() },
            ].map(item => (
              <div key={item.label} className="nd-detail-card">
                <div className="nd-detail-label">{item.label}</div>
                <div className="nd-detail-val" style={{ color: item.color || "#c8e6f0" }}>{item.val}</div>
              </div>
            ))}
          </div>
        </>
      );
    }

    if (view === "profile") return (
      <>
        <div className="nd-crumb">Dashboard / Profile</div>
        <div className="nd-title">Profile: {localStorage.getItem("username")}</div>
        <div className="nd-detail-card">
          <div className="nd-detail-label">Current Session User</div>
          <div className="nd-detail-val">{localStorage.getItem("username")}</div>
        </div>
      </>
    );

    return (
      <>
        <div className="nd-crumb">Dashboard / Home</div>
        <div className="nd-title">Naval Command Center</div>
        <div className="nd-subtitle">Welcome, {localStorage.getItem("username")}. Live unit tracking is active.</div>
        <div className="nd-home-cards">
          {menuItems.map(item => (
            <div key={item.id} className="nd-home-card" onClick={() => toggle(item.id)}>
              <div className="nd-card-title">{item.label}</div>
              <div className="nd-card-sub">{item.subs.length} unit types available</div>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="nd-page">

      {/* ── Sidebar ── */}
      <aside className="nd-sidebar">
        <div className="nd-header">⚓ Navy Dashboard</div>

        <nav className="nd-nav">
          {menuItems.map(item => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id}>
                {/* Parent — only toggles, no page change */}
                <div
                  className={`nd-item-hdr ${isOpen ? "open" : ""}`}
                  onClick={() => toggle(item.id)}
                >
                  <span className={`nd-arrow ${isOpen ? "open" : ""}`} />
                  {item.label}
                </div>

                {/* Sub-items */}
                <div className={`nd-subnav ${isOpen ? "open" : ""}`}>
                  {item.subs.map(sub => {
                    const isActive =
                      route.view === "sub" &&
                      route.catId === item.id &&
                      route.subId === sub.id;
                    return (
                      <div
                        key={sub.id}
                        className={`nd-sub-item ${isActive ? "active" : ""}`}
                        onClick={() => setRoute({ view: "sub", catId: item.id, subId: sub.id })}
                      >
                        <span className="nd-sub-dot" />
                        {sub.label}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>

        <hr className="nd-divider" />

        {/* Bottom Items */}
        <div className="nd-bottom">
          {[
            { id: "profile",  label: "Profile",  color: "#22c55e" },
            { id: "security", label: "Security", color: "#f59e0b" },
            { id: "logout",   label: "Logout",   color: "#ef4444" },
          ].map(item => (
            <div
              key={item.id}
              className={`nd-bot-item ${route.view === item.id ? "active" : ""}`}
              onClick={() =>
                item.id === "logout"
                  ? handleLogout()
                  : setRoute({ view: item.id })
              }
            >
              <span className="nd-dot" style={{ background: item.color }} />
              {item.label}
            </div>
          ))}
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="nd-main">
        {renderContent()}
      </main>

    </div>
  );
}
