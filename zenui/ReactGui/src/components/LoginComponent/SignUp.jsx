import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GithubLogo from '../LogoAndThings/githubLogo'
import GoogleLogo from '../LogoAndThings/googleLogo'
import { auth } from '../../utils/auth'

function SignUp({ switchToLogin }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            auth.login(formData.email, formData.password);
            navigate('/home');
        }, 1500);
    };

    const handleSocialSignUp = (provider) => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            auth.login(`user@${provider}.com`, 'social_signup');
            navigate('/home');
        }, 1000);
    };

    return (
        <div className="flex flex-col w-full lg:w-5/12 h-full px-6 py-8 lg:p-10 bg-white">
            <h1 className="text-2xl md:text-3xl lg:text-4xl mb-3.5 text-gray-800">Sign Up</h1>
            <h2 className="text-sm md:text-base mt-2 mb-8 text-gray-600">Create a new account</h2>

            <form onSubmit={handleSignUp}>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full max-w-xs h-10 rounded-2xl text-sm border border-gray-300 
                               focus:border-indigo-500 focus:outline-none bg-white text-gray-800 px-4 mt-5"
                    placeholder="Username"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full max-w-xs h-10 rounded-2xl text-sm border border-gray-300 
                               focus:border-indigo-500 focus:outline-none bg-white text-gray-800 px-4 mt-5"
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full max-w-xs h-10 rounded-2xl text-sm border border-gray-300 
                               focus:border-indigo-500 focus:outline-none bg-white text-gray-800 px-4 mt-5"
                    placeholder="Password"
                    required
                />

                <div className="flex justify-center mt-5 w-full">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full max-w-xs h-10 bg-purple-600 text-white rounded-2xl font-normal hover:bg-purple-700 hover:scale-105 transition-all duration-300 disabled:opacity-50 shadow-md hover:shadow-lg"
                    >
                        {isLoading ? "Creating Account..." : "Sign Up"}
                    </button>
                </div>
            </form>

            <hr className="border-t border-gray-300 my-6 w-4/5 mx-auto" />

            <div className="flex flex-col sm:flex-row w-full sm:w-4/5 justify-between items-center gap-4 mx-auto">
                <div className="flex gap-4 items-center">
                    <button
                        onClick={() => handleSocialSignUp('github')}
                        disabled
                        className="cursor-not-allowed p-3 bg-gray-100 border border-gray-300 rounded-2xl hover:bg-gray-200 hover:scale-105 transition-all duration-300 disabled:opacity-50 shadow-md hover:shadow-lg"
                    >
                        <GithubLogo />
                    </button>
                    <button
                        onClick={() => handleSocialSignUp('google')}
                        disabled
                        className="cursor-not-allowed p-3 bg-gray-100 border border-gray-300 rounded-2xl hover:bg-gray-200 hover:scale-105 transition-all duration-300 disabled:opacity-50 shadow-md hover:shadow-lg"
                    >
                        <GoogleLogo />
                    </button>
                </div>
                <button
                    onClick={switchToLogin}
                    className="px-6 py-2 bg-transparent border border-gray-300 text-black rounded-2xl transition-all duration-300 hover:bg-purple-900 hover:text-white hover:scale-105 active:scale-95 shadow-md hover:shadow-lg font-normal"
                >
                    Login
                </button>
            </div>
        </div>
    )
}

export default SignUp