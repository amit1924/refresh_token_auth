import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:3000/login", {
      email,
      password,
    });
    if (res.data.Login === true) {
      console.log(res.data);
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };
  return (
    <div>
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card bg-dark text-white"
                style={{ borderRadius: "1rem" }}
              >
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                    <p className="text-white-50 mb-5">
                      Please enter your login and password!
                    </p>

                    <form onSubmit={handleSubmit}>
                      <div
                        data-mdb-input-init
                        className="form-outline form-white mb-4"
                      >
                        <input
                          type="email"
                          id="typeEmailX"
                          className="form-control form-control-lg"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <label className="form-label" htmlFor="typeEmailX">
                          Email
                        </label>
                      </div>

                      <div
                        data-mdb-input-init
                        className="form-outline form-white mb-4"
                      >
                        <input
                          type="password"
                          id="typePasswordX"
                          className="form-control form-control-lg"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <label className="form-label" htmlFor="typePasswordX">
                          Password
                        </label>
                      </div>

                      <button
                        data-mdb-button-init
                        data-mdb-ripple-init
                        className="btn btn-outline-light btn-lg px-5"
                        type="submit"
                      >
                        Login
                      </button>
                    </form>
                  </div>

                  <div>
                    <p className="mb-0">
                      Dont have an account
                      <br />
                      <a href="/register" className="text-white-50 fw-bold ">
                        Sign Up
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
