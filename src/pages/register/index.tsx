import React, { useState } from 'react';
import axios from 'axios';
import './index.css';
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
        navigate('/');
      } else {
        alert('Email or User already registered. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container-fluid">
        <div className="row">
            <section className="left col-lg-8">
                <div className="overlap">
                    <p className="book-is-a-window-to d-sm-none d-lg-block">Book is a window <br />to the world</p>
                </div>
            </section>
            <section className="right col-lg-4">
                <div className="">
                    <div className="overlap-group">
                        <img className="bookshelf position-sticky" src='src/assets/bookshelf2x.png'/>
                        <div className="d-grid justify-content-center">
                            <div className="text-wrapper-2">Register</div>
                            <p className="welcome-back-please">
                                Welcome Back, Please Login<br />
                                to your account
                            </p>
                            <form onSubmit={handleRegister}>
                              {/* Username input */}
                              <div className="field-fullname mb-3">
                                <div className="overlap-group-2">
                                  <div className="text-wrapper-3">Username</div>
                                  <input type="text" className="text-wrapper-4" name="text" id="fullname-input"
                                    placeholder="Your username here..." required value={username} onChange={(e)=> setFullName(e.target.value)}
                                  />
                                </div>
                              </div>
                              {/* Email input */}
                              <div className="field-email mb-3">
                                <div className="overlap-group-2">
                                  <div className="text-wrapper-3">Email Address</div>
                                  <input type="email" className="text-wrapper-4" name="email" id="email-input"
                                    placeholder="Your email here..." required value={email} onChange={(e)=> setEmail(e.target.value)}
                                  />
                                </div>
                              </div>

                              {/* Password input */}
                              <div className="password mb-3">
                                <div className="overlap-2">
                                  <div className="text-wrapper-3">Password</div>
                                  <input type="password" className="text-wrapper-4" name="password" id="password-input"
                                    placeholder="Your password here..." required value={password} onChange={(e)=> setPassword(e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="d-flex mb-3">
                                <button className="login-button border-0 rounded" id="login-button" type="submit">
                                  <div className="div-wrapper">
                                    <div className="text-wrapper-7 mx-3">Register</div>
                                  </div>
                                </button>
                              </div>
                              <div className="d-flex mb-3">
                                  <div className="text-wrapper-6 pointer w-100">Already Have Account? <Link to="/">Login Here</Link></div> 
                                </div>
                            </form>
                            <p className="by-signing-up-you">
                                <span className="span">By signing up, you agree to Book’s<br /></span>
                                <span className="text-wrapper-9">Terms and Conditions </span>
                                <span className="span">&amp;</span>
                                <span className="text-wrapper-9"> Privacy Policy</span>
                            </p>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    </div>
  );
};

export default Register;
