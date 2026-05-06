import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NavyDashboard.css";

// ─── Data ────────────────────────────────────────────────────────────────────
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

const unitData = {
  "main-battle-tank":     { deployed: 42, status: "Operational", base: "Karachi Armour Base",     desc: "The Main Battle Tank is the backbone of armored warfare, combining firepower, protection, and mobility for front-line combat operations." },
  "light-tank":           { deployed: 28, status: "Operational", base: "Lahore Tank Division",    desc: "The Light Tank provides rapid deployment capabilities in terrain unsuitable for heavier armored vehicles, ideal for reconnaissance missions." },
  "amphibious-tank":      { deployed: 15, status: "Operational", base: "PNS Coastal Command",     desc: "The Amphibious Tank operates seamlessly on land and water, crucial for amphibious assault and coastal defense operations." },
  "tank-destroyer":       { deployed: 20, status: "Operational", base: "Rawalpindi Base",          desc: "The Tank Destroyer is a highly mobile anti-armor vehicle, specialized for engaging and neutralizing enemy armored threats at range." },
  "reconnaissance-tank":  { deployed: 18, status: "Active",      base: "ISI Forward Base",         desc: "The Reconnaissance Tank gathers critical battlefield intelligence, utilizing advanced sensors to support strategic decision-making." },
  "armored-personnel":    { deployed: 55, status: "Operational", base: "Multan Infantry Division", desc: "The Armored Personnel Carrier transports infantry safely across contested terrain, providing protection against small arms and shell fragments." },
  "infantry-fighting":    { deployed: 38, status: "Operational", base: "Quetta Base",              desc: "The Infantry Fighting Vehicle combines troop transport with direct fire support, enabling infantry to fight from within the vehicle." },
  "mine-resistant":       { deployed: 22, status: "Active",      base: "Peshawar Forward Base",    desc: "The Mine-Resistant vehicle is purpose-built to withstand improvised explosive devices and mine blasts, protecting personnel in high-threat environments." },
  "command-vehicle":      { deployed: 14, status: "Operational", base: "GHQ Rawalpindi",           desc: "The Command Vehicle serves as a mobile battlefield headquarters, equipped with advanced communications and command systems." },
  "ambulance-apc":        { deployed: 10, status: "Active",      base: "CMH Lahore",               desc: "The Ambulance APC provides armored medical evacuation, transporting wounded personnel safely from the battlefield to field hospitals." },
  "attack-sub":           { deployed: 4,  status: "Operational", base: "PNS Mehran, Karachi",      desc: "The Attack Submarine conducts offensive operations against enemy surface ships and submarines, using torpedoes and anti-ship missiles." },
  "ballistic-missile-sub":{ deployed: 2,  status: "Operational", base: "Classified Naval Base",    desc: "The Ballistic Missile Submarine serves as a strategic nuclear deterrent, capable of launching ballistic missiles from submerged positions." },
  "cruise-missile-sub":   { deployed: 2,  status: "Active",      base: "PNS Iqbal, Karachi",       desc: "The Cruise Missile Submarine launches precision cruise missiles against land and sea targets while remaining concealed beneath the surface." },
  "research-sub":         { deployed: 1,  status: "Active",      base: "NRL Karachi",              desc: "The Research Submarine supports naval scientific operations including seabed mapping, hydrographic surveys, and underwater intelligence gathering." },
  "midget-sub":           { deployed: 3,  status: "Operational", base: "Special Operations Base",  desc: "The Midget Submarine is a compact covert vessel used for special operations, deploying combat divers and conducting shallow-water intelligence missions." },
  "surface-drone":        { deployed: 25, status: "Operational", base: "PNS Qasim, Karachi",       desc: "The Surface Drone is an unmanned surface vessel conducting surveillance, mine countermeasures, and force protection tasks without risking human crew." },
  "underwater-drone":     { deployed: 18, status: "Active",      base: "PNS Mehran, Karachi",      desc: "The Underwater Drone operates beneath the surface for mine detection, hull inspection, and covert intelligence-gathering in denied environments." },
  "aerial-sea-drone":     { deployed: 12, status: "Operational", base: "PNS Siddiqui",             desc: "The Aerial Sea Drone provides persistent maritime surveillance, ISR support, and over-the-horizon targeting for naval strike packages." },
  "swarm-drone":          { deployed: 30, status: "Active",      base: "PNS Iqbal, Karachi",       desc: "The Swarm Drone system deploys multiple autonomous drones simultaneously, overwhelming enemy defenses through coordinated multi-vector attacks." },
  "recon-drone":          { deployed: 15, status: "Operational", base: "Naval Air Base Mehran",    desc: "The Recon Drone conducts long-range maritime reconnaissance, tracking enemy vessel movements and providing real-time intelligence to fleet commanders." },
  "aircraft-carrier":     { deployed: 1,  status: "Operational", base: "PNS Habib, Karachi",       desc: "The Aircraft Carrier is the centerpiece of naval power projection, deploying fixed-wing aircraft and helicopters for strike and defensive operations." },
  "destroyer":            { deployed: 8,  status: "Operational", base: "PNS Qasim, Karachi",       desc: "The Destroyer is a fast, maneuverable warship providing anti-air, anti-surface, and anti-submarine warfare capabilities as fleet escort." },
  "frigate":              { deployed: 12, status: "Operational", base: "PNS Jinnah, Karachi",      desc: "The Frigate is a versatile multi-mission warship conducting anti-submarine warfare, surface combat, and fleet protection duties." },
  "corvette":             { deployed: 10, status: "Active",      base: "PNS Karachi",              desc: "The Corvette is a small, fast patrol warship used for coastal defense, anti-piracy operations, and supporting larger fleet elements." },
  "patrol-vessel":        { deployed: 18, status: "Operational", base: "Multiple Coastal Bases",   desc: "The Patrol Vessel conducts coastal surveillance, fisheries protection, anti-smuggling operations, and rapid response across Pakistan's maritime borders." },
};

// ─── Page Components ─────────────────────────────────────────────────────────

function HomePage() {
  const [openId, setOpenId] = useState(null);
  const toggle = (id) => setOpenId(prev => prev === id ? null : id);

  return (
    <>
      <div className="nd-crumb">Dashboard / Home</div>
      <div className="nd-title">Welcome to Navy Dashboard</div>
      <div className="nd-subtitle">Select a sub-unit from the sidebar to view details.</div>
      <div className="nd-home-cards">
        {menuItems.map(item => (
          <div key={item.id} className="nd-home-card" onClick={() => toggle(item.id)}>
            <div className="nd-card-title">{item.label}</div>
            <div className="nd-card-sub">{item.subs.length} unit types</div>
          </div>
        ))}
      </div>
    </>
  );
}

function SubPage({ catId, subId }) {
  const cat = menuItems.find(m => m.id === catId);
  const sub = cat?.subs.find(s => s.id === subId);
  const d   = unitData[subId] || { deployed: 10, status: "Operational", base: "PNS Headquarters", desc: "Detailed information about this unit is classified." };

  return (
    <>
      <div className="nd-crumb">Dashboard / {cat?.label} / {sub?.label}</div>
      <div className="nd-title">{sub?.label}</div>
      <div className="nd-subtitle">Unit details and deployment status.</div>
      <div className="nd-detail-grid">
        {[
          { label: "Unit Name",      val: sub?.label },
          { label: "Category",       val: cat?.label },
          { label: "Status",         val: "● " + d.status, color: "#22c55e" },
          { label: "Last Updated",   val: "May 2026" },
          { label: "Units Deployed", val: d.deployed },
          { label: "Base Location",  val: d.base },
        ].map(item => (
          <div key={item.label} className="nd-detail-card">
            <div className="nd-detail-label">{item.label}</div>
            <div className="nd-detail-val" style={{ color: item.color || "#c8e6f0" }}>{item.val}</div>
          </div>
        ))}
      </div>
      <div className="nd-info-box">
        <div className="nd-info-title">About {sub?.label}</div>
        <div className="nd-info-text">{d.desc}</div>
      </div>
    </>
  );
}

function ProfilePage() {
  return (
    <>
      <div className="nd-crumb">Dashboard / Profile</div>
      <div className="nd-title">Profile</div>
      <div className="nd-subtitle">Your account information and naval credentials.</div>
      <div className="nd-detail-grid">
        {[
          { label: "Name",       val: "Commodore Ahmed" },
          { label: "Rank",       val: "Commodore" },
          { label: "Division",   val: "Naval Command" },
          { label: "Status",     val: "● Active", color: "#22c55e" },
          { label: "Service ID", val: "PN-2204-CMD" },
          { label: "Clearance",  val: "Top Secret" },
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

function SecurityPage() {
  return (
    <>
      <div className="nd-crumb">Dashboard / Security</div>
      <div className="nd-title">Security</div>
      <div className="nd-subtitle">Manage your account security and access logs.</div>
      <div className="nd-detail-grid">
        {[
          { label: "Last Login",      val: "May 05, 2026" },
          { label: "2FA",             val: "● Enabled", color: "#22c55e" },
          { label: "Session",         val: "Active" },
          { label: "Clearance Level", val: "Top Secret" },
          { label: "Failed Attempts", val: "0" },
          { label: "IP Address",      val: "192.168.1.1" },
        ].map(item => (
          <div key={item.label} className="nd-detail-card">
            <div className="nd-detail-label">{item.label}</div>
            <div className="nd-detail-val" style={{ color: item.color || "#c8e6f0" }}>{item.val}</div>
          </div>
        ))}
      </div>
      <div className="nd-info-box">
        <div className="nd-info-title">Security Notice</div>
        <div className="nd-info-text">
          Your account is secured with two-factor authentication. All access attempts are
          logged and monitored by naval intelligence systems.
        </div>
      </div>
    </>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function NavyDashboard() {
  const navigate  = useNavigate();
  const [route, setRoute]   = useState({ view: "home" });
  const [openId, setOpenId] = useState(null);

  // Pure toggle — clicking open parent closes it, clicking closed opens it
  const toggle = (id) => setOpenId(prev => prev === id ? null : id);

  const renderContent = () => {
    const { view, catId, subId } = route;
    if (view === "sub")      return <SubPage catId={catId} subId={subId} />;
    if (view === "profile")  return <ProfilePage />;
    if (view === "security") return <SecurityPage />;
    return <HomePage />;
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
                  ? navigate("/")
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
