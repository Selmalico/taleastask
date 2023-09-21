import React, { useState } from "react";
import "bootstrap";
import axiosInstance from '../../axiosInstance'
import "../styles/Footer.css"

const Footer = () => {
  const [email, setEmail] = useState("");
  const sendEmail = async (e) => {
    e.preventDefault();
    const res = await axiosInstance.post("/subscribe", { email: email });
    console.log(res);
    setEmail("");
  };

  return (
    <div className="footer">
      <footer className="text-white p-4" style={{ backgroundColor: "#0056b3", height:"153px"}}>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h4>Subscribe to our Newsletter</h4>
              <p>Stay up-to-date with our latest news and offers.</p>
            </div>
            <div className="col-md-6">
              <form>
                <div className="form-row align-items-center">
                  <div className="col-sm">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      style={{ width: "100%" }}
                      placeholder="Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="col-sm">
                    <button
                        style={{backgroundColor: "black",marginTop: "-10px",
                        height: "46px"}}
                      type="submit"
                      className="btn btn-outline-light"
                      onClick={sendEmail}
                    >
                      Subscribe
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </footer>

      <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    </div>
  );
};

export default Footer;
