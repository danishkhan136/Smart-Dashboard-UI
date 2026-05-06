import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginSignup.css";
import PakFlag from "./assets/Flag_of_Pakistan.svg";

export default function LoginSignup() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("login");
  const formInnerRef = useRef(null);
  const titleTextRef = useRef(null);

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginErrors, setLoginErrors] = useState({});

  // Signup state
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirm, setSignupConfirm] = useState("");
  const [signupErrors, setSignupErrors] = useState({});

  const goToSignup = () => {
    setActiveTab("signup");
    if (formInnerRef.current) formInnerRef.current.style.marginLeft = "-100%";
    if (titleTextRef.current) titleTextRef.current.style.marginLeft = "-100%";
  };

  const goToLogin = () => {
    setActiveTab("login");
    if (formInnerRef.current) formInnerRef.current.style.marginLeft = "0%";
    if (titleTextRef.current) titleTextRef.current.style.marginLeft = "0%";
  };

  const handleLoginSubmit = async () => {
    const errors = {};
    if (!loginEmail) errors.email = true;
    if (!loginPassword) errors.password = true;
    setLoginErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const params = new URLSearchParams();
        params.append("username", loginEmail);
        params.append("password", loginPassword);

        const response = await axios.post("http://127.0.0.1:8000/auth/login", params);
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("username", loginEmail);
        navigate("/dashboard");
      } catch (err) {
        alert(err.response?.data?.detail || "Login failed");
      }
    }
  };

  const handleSignupSubmit = async () => {
    const errors = {};
    if (!signupEmail) errors.email = true;
    if (!signupPassword) errors.password = true;
    if (!signupConfirm || signupConfirm !== signupPassword) errors.confirm = true;
    setSignupErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        await axios.post("http://127.0.0.1:8000/auth/signup", {
          username: signupEmail,
          password: signupPassword,
          role: "user" // Default role
        });
        alert("Signed up successfully! Now please login.");
        goToLogin();
      } catch (err) {
        alert(err.response?.data?.detail || "Signup failed");
      }
    }
  };

  const isLogin = activeTab === "login";

  return (
    <div className="ls-body">

      {/* Header */}
      <header className="custom-header">
        <div className="header-left">
          <h1>Pakistan Zindabad</h1>
        </div>
        <div className="header-right">
          <img src={PakFlag} alt="Flag of Pakistan" />
        </div>
      </header>

      {/* Form Area */}
      <div className="ls-form-area">
        <div className="ls-wrapper">

          {/* Sliding Title */}
          <div className="ls-title-outer">
            <div className="ls-title-text" ref={titleTextRef}>
              <div className="ls-title">Login Form</div>
              <div className="ls-title">Signup Form</div>
            </div>
          </div>

          {/* Tab Toggle */}
          <div className="ls-slide-controls">
            <div
              className="ls-slide"
              style={{ color: isLogin ? "#fff" : "#000" }}
              onClick={goToLogin}
            >
              Login
            </div>
            <div
              className="ls-slide"
              style={{ color: !isLogin ? "#fff" : "#000" }}
              onClick={goToSignup}
            >
              Signup
            </div>
            <div
              className="ls-slider-tab"
              style={{ left: isLogin ? "0" : "50%" }}
            />
          </div>

          {/* Forms */}
          <div className="ls-form-container">
            <div className="ls-form-inner" ref={formInnerRef}>

              {/* Login Form */}
              <div className="ls-form">
                <div className="ls-field">
                  <input
                    type="text"
                    placeholder="Email Address"
                    value={loginEmail}
                    className={loginErrors.email ? "ls-error" : ""}
                    onChange={(e) => {
                      setLoginEmail(e.target.value);
                      setLoginErrors((p) => ({ ...p, email: false }));
                    }}
                  />
                </div>
                <div className="ls-field">
                  <input
                    type="password"
                    placeholder="Password"
                    value={loginPassword}
                    className={loginErrors.password ? "ls-error" : ""}
                    onChange={(e) => {
                      setLoginPassword(e.target.value);
                      setLoginErrors((p) => ({ ...p, password: false }));
                    }}
                  />
                </div>
                <div className="ls-pass-link">
                  <a href="#">Forgot password?</a>
                </div>
                <div className="ls-field ls-btn">
                  <div className="ls-btn-layer" />
                  <button className="ls-submit-btn" onClick={handleLoginSubmit}>
                    Login
                  </button>
                </div>
                <div className="ls-signup-link">
                  Not a member?{" "}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      goToSignup();
                    }}
                  >
                    Signup now
                  </a>
                </div>
              </div>

              {/* Signup Form */}
              <div className="ls-form">
                <div className="ls-field">
                  <input
                    type="text"
                    placeholder="Email Address"
                    value={signupEmail}
                    className={signupErrors.email ? "ls-error" : ""}
                    onChange={(e) => {
                      setSignupEmail(e.target.value);
                      setSignupErrors((p) => ({ ...p, email: false }));
                    }}
                  />
                </div>
                <div className="ls-field">
                  <input
                    type="password"
                    placeholder="Password"
                    value={signupPassword}
                    className={signupErrors.password ? "ls-error" : ""}
                    onChange={(e) => {
                      setSignupPassword(e.target.value);
                      setSignupErrors((p) => ({ ...p, password: false }));
                    }}
                  />
                </div>
                <div className="ls-field">
                  <input
                    type="password"
                    placeholder="Confirm password"
                    value={signupConfirm}
                    className={signupErrors.confirm ? "ls-error" : ""}
                    onChange={(e) => {
                      setSignupConfirm(e.target.value);
                      setSignupErrors((p) => ({ ...p, confirm: false }));
                    }}
                  />
                </div>
                <div className="ls-field ls-btn">
                  <div className="ls-btn-layer" />
                  <button className="ls-submit-btn" onClick={handleSignupSubmit}>
                    Signup
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
