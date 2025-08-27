import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GithubLogo from '../LogoAndThings/githubLogo'
import GoogleLogo from '../LogoAndThings/googleLogo'
import { auth } from '../../utils/auth'

function LoginComponent({ switchToSignUp }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate login process
        setTimeout(() => {
            setIsLoading(false);
            // Use auth utility to login
            auth.login(formData.email, formData.password);
            // Redirect to home page
            navigate('/home');
        }, 1500);
    };

    const handleSocialLogin = (provider) => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            // Use auth utility for social login
            auth.login(`user@${provider}.com`, 'social_login');
            navigate('/home');
        }, 1000);
    };

    return (
        <div className="flex flex-col w-full lg:w-5/12 h-full px-6 py-8 lg:p-10 bg-white">
            <h1 className="text-2xl md:text-3xl lg:text-4xl mb-3.5 text-gray-800">Login</h1>
            <h2 className="text-sm md:text-base mt-2 mb-8 text-gray-600">Enter your account details</h2>

            <form onSubmit={handleLogin} className="space-y-4">
                <div className="relative">
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full max-w-xs h-10 rounded-2xl text-sm border border-gray-300 
                                   focus:border-indigo-500 focus:outline-none bg-white text-gray-800 px-4"
                        placeholder="Email"
                        required
                    />
                </div>

                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full max-w-xs h-10 rounded-2xl text-sm border  border-gray-300 
           focus:border-indigo-500 focus:outline-none bg-white text-gray-800 px-4 pr-10"

                        placeholder="Password"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-2 text-gray-400 hover:text-white "
                    >
                        {showPassword ? "🙈" : "👁️"}
                    </button>
                </div>

                <div className="flex items-center justify-between text-xs">
                    <label className="flex items-center cursor-pointer">
                        <input type="checkbox" className="mr-2" />
                        Remember me
                    </label>
                    <span className="cursor-pointer hover:text-purple-400">
                        Forgot Password?
                    </span>
                </div>

                <div className="flex justify-center mt-5 w-full">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full max-w-xs h-10 mt-10 bg-purple-600 text-white rounded-2xl font-normal hover:bg-purple-700 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                </div>
            </form>

            <hr className="border-t border-gray-300 my-6 w-4/5 mx-auto" />

            <div className="flex flex-col sm:flex-row w-full sm:w-4/5 justify-between items-center gap-4 mx-auto">
                <div className="flex gap-4 items-center">
                    <button
                        onClick={() => handleSocialLogin('github')}
                        disabled
                        className="cursor-not-allowed p-3 bg-purple-100 border border-gray-300 rounded-2xl hover:bg-gray-200 hover:scale-105 transition-all duration-300 disabled:opacity-50 shadow-md hover:shadow-lg"
                    >
                        <GithubLogo />
                    </button>
                    <button
                        onClick={() => handleSocialLogin('google')}
                        disabled
                        className="cursor-not-allowed p-3 bg-purple-100 border border-gray-300 rounded-2xl hover:bg-gray-200 hover:scale-105 transition-all duration-300 disabled:opacity-50 shadow-md hover:shadow-lg"
                    >
                        <GoogleLogo />
                    </button>
                </div>
                <button
                    onClick={switchToSignUp}
                    className="px-6 py-2 bg-transparent border border-gray-300 text-black rounded-2xl transition-all duration-300 hover:bg-purple-900 hover:text-white hover:scale-105 active:scale-95 shadow-md hover:shadow-lg font-normal"
                >
                    Sign up
                </button>
            </div>


        </div>
    )
}

export default LoginComponent