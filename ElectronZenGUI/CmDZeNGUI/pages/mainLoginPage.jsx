import Waves from '../src/components/ReactLibrary/backgroundWave';
import LightRays from '../src/components/ReactLibrary/backgroundLight';
import LoginSticker from '../src/components/LogoAndThings/loginSticker'
import LoginComponent from '../src/components/LoginComponent/loginComponent';
import SignUp from '../src/components/LoginComponent/SignUp';
import { useState } from 'react';

function MainLoginPage() {
    const [showLogin, setShowLogin] = useState(true);
    return (
        <>
            {/* Background wave animation */}
            <Waves
                lineColor="#452165ff"
                backgroundColor="#000000ff"
                waveSpeedX={0.02}
                waveSpeedY={0.01}
                waveAmpX={40}
                waveAmpY={20}
                friction={0.9}
                tension={0.01}
                maxCursorMove={120}
                xGap={12}
                yGap={36}
            />

            {/* Main container */}
            <div className="absolute w-full h-screen flex justify-center items-center overflow-hidden p-4">
                <div
                    className="flex flex-col lg:flex-row w-3/5 max-w-6xl h-auto lg:h-5/6 border-2 border-violet-950 rounded-[25px] overflow-hidden"
                    style={{ backgroundColor: '#0d0017' }}
                >
                    {/* Left: Login Form */}
                    {showLogin ? (
                        <LoginComponent switchToSignUp={() => setShowLogin(false)} />
                    ) : (
                        <SignUp switchToLogin={() => setShowLogin(true)} />
                    )}

                    {/* Right: Light Rays + Welcome + SVG */}
                    <div className="hidden sm:flex w-full lg:w-7/12 h-8 lg:h-full relative overflow-hidden">
                        {/* Light Rays Background */}
                        <div className="absolute inset-0">
                            <LightRays
                                raysOrigin="top-center"
                                raysColor="#ba24a3ff"
                                raysSpeed={2.5}
                                lightSpread={0.8}
                                rayLength={1.2}
                                followMouse={true}
                                mouseInfluence={0.1}
                                noiseAmount={0.1}
                                distortion={0.05}
                                className="custom-rays"
                            />
                        </div>

                        {/* Foreground Content */}
                        <div className="relative z-10 flex flex-col w-full h-full justify-center p-6 md:p-10 border-t lg:border-t-0 lg:border-l border-[#452165ff]">
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                                Welcome to CmDZeN
                            </h1>
                            <h3 className="text-sm md:text-base">
                                {showLogin ? 'Login to access your account' : 'Create your account and join the community'}
                            </h3>
                            <div className="mt-12 md:mt-16 lg:mt-24 flex justify-center lg:justify-start">
                                <LoginSticker className="w-40 md:w-56 lg:w-72" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainLoginPage;