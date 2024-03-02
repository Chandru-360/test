import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import CompanyService from '../services/CompanyService';

const USER_REGEX = /^[A-Za-z][a-zA-Z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$]).{8,24}$/;

export const RegistrationComponent = () => {
    const userRef = useRef();
    const emailRef = useRef();
    const pwdRef = useRef();
    const confirmPwdRef = useRef();
    const errorRef = useRef();

    const [user, setUser] = useState('');
    const [validUser, setValidUser] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState('');
    const [validConfirmPassword, setValidConfirmPassword] = useState(false);
    const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        const isValid = USER_REGEX.test(user);
        setValidUser(isValid);
    }, [user]);

    useEffect(() => {
        const isValid = EMAIL_REGEX.test(email);
        setValidEmail(isValid);
    }, [email]);

    useEffect(() => {
        const isValid = PWD_REGEX.test(password);
        setValidPassword(isValid);
    }, [password]);

    useEffect(() => {
        setErrMsg('');
    }, [user, email, password, confirmPassword]);

    const saveUserRegistration = (e) => {
        e.preventDefault();
        const userData = { username: user, email: email, password: password };
        CompanyService.saveUserRegistration(userData)
            .then((response) => {
                setSuccess(true);
            })
            .catch((error) => {
                if (!error?.response) {
                    setErrMsg('No server response');
                } else if (error.response?.status === 500) {
                    setErrMsg('Username taken');
                } else {
                    setErrMsg('Registration failed...');
                }
            });
    };

    return (
        (success) ? (
            <section>
                <h1>Success!!</h1>
                <p><Link to='/login'>Login</Link></p>
            </section>
        ) : (
            <div id="background">
                <section>
                    <p ref={errorRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">{errMsg}</p>
                    <h1>Register User</h1>
                    <form>
                        {/* Username */}
                        <label htmlFor="username">
                            Username:
                            <span className={validUser ? 'valid' : 'hide'}>
                                <FontAwesomeIcon icon={faCheck}/>
                            </span>
                            <span className={!validUser && user ? 'invalid' : 'hide'}>
                                <FontAwesomeIcon icon={faTimes}/>
                            </span>
                        </label>
                        <input
                            type="text"
                            id="username"
                            autoComplete="off"
                            ref={userRef}
                            onChange={(e) => setUser(e.target.value)}
                            required
                            aria-invalid={validUser ? 'false' : 'true'}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p id="uidnote" className={userFocus && !validUser ? 'instructions' : 'offscreen'}>
                            <FontAwesomeIcon icon={faInfoCircle}/>
                            4 to 24 chars. Must begin with a letter. Letters, Numbers, underscore, hyphen allowed
                        </p>
                        
                        {/* Email */}
                        <label htmlFor="email">
                            Email:
                            <span className={validEmail ? 'valid' : 'hide'}>
                                <FontAwesomeIcon icon={faCheck}/>
                            </span>
                            <span className={!validEmail && email ? 'invalid' : 'hide'}>
                                <FontAwesomeIcon icon={faTimes}/>
                            </span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            autoComplete="off"
                            ref={emailRef}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            aria-invalid={validEmail ? 'false' : 'true'}
                            aria-describedby="emailnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                        />
                        <p id="emailnote" className={emailFocus && !validEmail ? 'instructions' : 'offscreen'}>
                            <FontAwesomeIcon icon={faInfoCircle}/>
                            Enter a valid email address.
                        </p>
                        
                        {/* Password */}
                        <label htmlFor="password">
                            Password:
                            <span className={validPassword ? 'valid' : 'hide'}>
                                <FontAwesomeIcon icon={faCheck}/>
                            </span>
                            <span className={!validPassword && password ? 'invalid' : 'hide'}>
                                <FontAwesomeIcon icon={faTimes}/>
                            </span>
                        </label>
                        <input
                            type="password"
                            id="password"
                            ref={pwdRef}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            aria-invalid={validPassword ? 'false' : 'true'}
                            aria-describedby="passwordnote"
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={() => setPasswordFocus(false)}
                        />
                        <p id="passwordnote" className={passwordFocus && !validPassword ? 'instructions' : 'offscreen'}>
                            <FontAwesomeIcon icon={faInfoCircle}/>
                            8 to 24 chars. Must include uppercase & lowercase letters, a number, & a special symbol
                        </p>
                        
                        {/* Confirm Password */}
                        <label htmlFor="confirm-password">
                            Confirm Password:
                            <span className={validConfirmPassword ? 'valid' : 'hide'}>
                                <FontAwesomeIcon icon={faCheck}/>
                            </span>
                            <span className={!validConfirmPassword && confirmPassword ? 'invalid' : 'hide'}>
                                <FontAwesomeIcon icon={faTimes}/>
                            </span>
                        </label>
                        <input
                            type="password"
                            id="confirm-password"
                            ref={confirmPwdRef}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            aria-invalid={validConfirmPassword ? 'false' : 'true'}
                            aria-describedby="confirmPasswordnote"
                            onFocus={() => setConfirmPasswordFocus(true)}
                            onBlur={() => setConfirmPasswordFocus(false)}
                        />
                        <p id="confirmPasswordnote" className={confirmPasswordFocus && !validConfirmPassword ? 'instructions' : 'offscreen'}>
                            <FontAwesomeIcon icon={faInfoCircle}/>
                            Confirm password must match with the password
                        </p>
                        
                        <button onClick={saveUserRegistration}>Sign Up</button>
                        <p>Already Registered?<br/><Link to="/login">Sign In</Link></p>
                    </form>
                </section>
            </div>
        )
    );
};
