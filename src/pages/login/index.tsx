import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
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
  
        // Login successful
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'You have successfully logged in.',
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/home');
          }
        });
      } else {
        setError('Email atau password tidak valid. Silahkan coba lagi.');
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Email atau password tidak valid. Silahkan coba lagi.',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Terjadi kesalahan. Silahkan coba lagi.');
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Email atau password tidak valid. Silahkan coba lagi.',
      });
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
                              <div className="form-outline mb-4">
                                <label className="form-label">Email address</label>
                                <input type="email" className="form-control form-control-lg"
                                  placeholder="Enter a valid email address" required value={email} onChange={(e)=> setEmail(e.target.value)}/>
                              </div>

                              {/* Password input */}
                              <div className="form-outline mb-4">
                                <label className="form-label">Password</label>
                                <input type="password" className="form-control form-control-lg"
                                  placeholder="Enter a valid Password" required value={password} onChange={(e)=> setPassword(e.target.value)}/>
                              </div>
                              {/* Remember Me & Forgot Password */}
                              <div className="d-flex justify-content-between align-items-center">
                                <div className="form-check mb-0">
                                  <input className="form-check-input me-2" type="checkbox" value=""/>
                                  <label className="form-check-label">
                                    Remember me
                                  </label>
                                </div>
                                <a href="#!" className="text-body">Forgot password?</a>
                              </div>

                              <div className="text-center text-lg-start mt-2 pt-2 mb-3">
                                <button type="submit" className="btn btn-outline-secondary btn-lg mx-3"
                                  style={{paddingLeft:'2.5rem', paddingRight:'2.5rem'}}>Login
                                </button>
                                <Link to="../register" className="">
                                <button type="submit" className="btn btn-secondary btn-lg"
                                  style={{paddingLeft:'2.5rem', paddingRight:'2.5rem'}}>Register
                                </button>
                                </Link>
                              </div>
                              {/* <div className="d-flex mb-3">
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
                              </div> */}
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
