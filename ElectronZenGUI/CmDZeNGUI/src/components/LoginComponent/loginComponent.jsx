import React from 'react'
import LargeButton from '../PreBuildComponts/largeButton'
import GithubLogo from '../LogoAndThings/githubLogo'
import GoogleLogo from '../LogoAndThings/googleLogo'
import GhostButton from '../PreBuildComponts/ghostButton'

function LoginComponent({ switchToSignUp }) {
    return (
        <div className="flex flex-col w-full lg:w-5/12 h-full px-6 py-8 lg:p-10">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3.5">Login</h1>
            <h2 className="text-sm md:text-base mt-2 mb-8">Enter your account details</h2>

            <input
                type="email"
                className="w-full max-w-xs h-10 rounded-md text-sm border-0 border-b border-[#4f4755ff] 
                           focus:border-b-purple-800 focus:outline-none bg-[#0d0017] text-white px-4 mt-5"
                placeholder="Email"
            />
            <input
                type="password"
                className="w-full max-w-xs h-10 rounded-md text-sm border-0 border-b border-[#4f4755ff] 
                           focus:border-b-purple-800 focus:outline-none bg-[#0d0017] text-white px-4 mt-5"
                placeholder="Password"
            />

            <h6 className="mt-8 text-xs mb-8 cursor-pointer hover:text-purple-400">
                Forgot Password?
            </h6>

            <div className="flex justify-center mt-5 w-full">
                <LargeButton label="Login" width="100%" />
            </div>

            <hr className="border-t border-gray-300 my-6 w-4/5 mx-auto" />

            <div className="flex flex-col sm:flex-row w-full sm:w-4/5 justify-between items-center gap-4 mx-auto">
                <div className="flex gap-4 items-center">
                    <GithubLogo />
                    <span className="text-gray-400">|</span>
                    <GoogleLogo />
                </div>
                <GhostButton label="Sign up" onClick={switchToSignUp} />
            </div>
        </div>
    )
}

export default LoginComponent