import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import classes from './Register.module.css';
import { Link, useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [username, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const navigate = useNavigate();
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = {
      username,
      email,
      password,
    };

    try {
      const response = await axios.post('http://localhost:9090/users', JSON.stringify(user), {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: 'You have successfully registered.',
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/');
          }
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: 'Email or User already registered. Please try again.',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: 'An error occurred during registration. Please try again later.',
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
                            <div className={classes.textwrapper2}>Register</div>
                            <p className={classes.welcomebackplease}>
                                Welcome, Please Register<br />
                                to your account
                            </p>
                            <form onSubmit={handleRegister}>
                              {/* Username Input */}
                              <div className="form-outline mb-2">
                                <label className="form-label">Username</label>
                                <input type="text" className="form-control form-control-lg"
                                  placeholder="Enter a username" required value={username} onChange={(e)=> setFullName(e.target.value)}/>
                              </div>
                              {/* Email input */} 
                              <div className="form-outline mb-2">
                                <label className="form-label">Email address</label>
                                <input type="email" className="form-control form-control-lg"
                                  placeholder="Enter a email address" required value={email} onChange={(e)=> setEmail(e.target.value)}/>
                              </div>

                              {/* Password input */}
                              <div className="form-outline mb-2">
                                <label className="form-label">Password</label>
                                <input type="password" className="form-control form-control-lg"
                                  placeholder="Enter a Password" required value={password} onChange={(e)=> setPassword(e.target.value)}/>
                              </div>
                              {/* Register Button */}
                              <div className="text-center text-lg-start mt-4 mb-4">
                                <button type="submit" className="btn btn-outline-secondary btn-lg mx-0"
                                  style={{paddingLeft:'2.5rem', paddingRight:'2.5rem'}}>Register
                                </button>
                                
                              </div>
                              <div className="d-flex mb-3">
                                  <div className={`${classes.textwrapper6} pointer w-100`}>Already Have Account? <Link to="/">Login Here</Link></div> 
                                </div>
                            </form>
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

export default Register;
