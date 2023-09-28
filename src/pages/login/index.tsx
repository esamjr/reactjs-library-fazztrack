import React, { useState } from 'react';
import axios from 'axios';

import classes from './Login.module.css';
import { Link, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };

    try {
      const response = await axios.post('http://localhost:9090/users/login', JSON.stringify(user), {
        headers: {
          'Content-Type': 'application/json',
        },
        
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('email', response.data.data.email);
        navigate("/home");
      } else {
        setError('Email atau password tidak valid. Silahkan coba lagi.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Terjadi kesalahan. Silahkan coba lagi.');
    }
  };

  return (
    <div className="container-fluid" style={{ paddingLeft: 0, paddingRight: 0 }}>
        <div className={classes.row}>
            <section className={`${classes.left} col-lg-8`}>
                <div className={classes.overlap}>
                    <p className={`${classes.bookisawindowto} d-sm-none d-lg-block`}>Book is a window <br />to the world</p>
                </div>
            </section>
            <section className={`${classes.right} col-lg-4`}>
                    <div className={classes.overlapgroup}>
                        <img className={`${classes.bookshelf} position-sticky`} src='/src/assets/bookshelf2x.png'/>
                        <div className="d-grid justify-content-center">
                            <div className={classes.textwrapper2}>Login</div>
                            <p className={classes.welcomebackplease}>
                                Welcome Back, Please Login<br />
                                to your account
                            </p>
                            <form onSubmit={handleLogin}>
                              {/* Email input */}
                              <div className={`${classes.fieldemail} mb-3`}>
                                <div className={classes.overlapgroup2}>
                                  <div className={classes.textwrapper3}>Email Address</div>
                                  <input type="email" className={classes.textwrapper4} name="email" id="email-input"
                                    placeholder="Your email here..." required value={email} onChange={(e)=> setEmail(e.target.value)}
                                  />
                                </div>
                              </div>

                              {/* Password input */}
                              <div className={`${classes.password} mb-3`}>
                                <div className={classes.overlap2}>
                                  <div className={classes.textwrapper3}>Password</div>
                                  <input type="password" className={classes.textwrapper4} name="password" id="password-input"
                                    placeholder="Your password here..." required value={password} onChange={(e)=> setPassword(e.target.value)}
                                  />
                                </div>
                              </div>

                              <div className="d-flex mb-3">
                                <input type="checkbox" id="remember-me-checkbox" className={`${classes.rectangle4} mx-2`}/>
                                <label htmlFor="remember-me-checkbox" className={classes.textwrapper5}>Remember me</label>
                                <div className={`${classes.textwrapper6} pointer`}>Forgot Password</div>
                              </div>

                              <div className="d-flex mb-3">
                                <button className={`${classes.loginbutton} border-0 rounded`} id="login-button" type="submit">
                                  <div className={classes.divwrapper}>
                                    <div className={`${classes.textwrapper7} mx-3`}>Login</div>
                                  </div>
                                </button>
                                <button className={classes.signupbutton}>
                                    <Link to="../register">
                                        <div className={classes.overlap3}>
                                            <div className={`${classes.textwrapper8} mx-3`}>Sign up</div>
                                        </div>
                                    </Link>
                                </button>
                              </div>
                            </form>
                            {error && (
                              <div className="alert alert-danger" role="alert">
                                {error}
                              </div>
                            )}
                            <p className={classes.bysigningupyou}>
                                <span className={classes.span} style={{marginLeft:0}}>By signing up, you agree to Book’s<br /></span>
                                <span className={classes.textwrapper9}style={{marginLeft:0, padding:0}}>Terms and Conditions </span>
                                <span className={classes.span}style={{marginLeft:0, padding:0}}>&amp;</span>
                                <span className={classes.textwrapper9}style={{marginLeft:0,padding:0}}> Privacy Policy</span>
                            </p>
                        </div>

                    </div>
            </section>
        </div>
    </div>
  );
};

export default Login;
