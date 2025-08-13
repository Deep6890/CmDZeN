import Waves from './components/backgroundWave';
import LightRays from './components/backgroundLight';
import LargeButton from './components/largeButton';
import GithubLogo from './components/githubLogo';
import GoogleLogo from './components/googleLogo';
import GhostButton from './components/ghostButton';
import LoginSticker from './components/loginSticker'

function MainLoginPage() {
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
                    className="flex flex-col lg:flex-row w-full w-3/5 max-w-6xl h-auto lg:h-5/6 border-2 border-violet-950 rounded-[25px] overflow-hidden"
                    style={{ backgroundColor: '#0d0017' }}
                >
                    {/* Left: Login Form */}
                    <div
                        className="flex flex-col w-full lg:w-5/12 h-full px-6 py-8 lg:p-10"
                    >
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3.5">Login</h1>
                        <h2 className="text-sm md:text-base mt-2 mb-8">Enter your account details</h2>

                        <input
                            type="email"
                            className="w-full max-w-xs h-10 rounded-md text-sm border-0 border-b border-[#4f4755ff] 
                                       focus:border-b-purple-800 focus:outline-none bg-[#0d0017] px-4 mt-5"
                            placeholder="Email"
                        />
                        <input
                            type="password"
                            className="w-full max-w-xs h-10 rounded-md text-sm border-0 border-b border-[#4f4755ff] 
                                       focus:border-b-purple-800 focus:outline-none bg-[#0d0017] px-4 mt-5"
                            placeholder="Password"
                        />

                        <h6 className="mt-8 text-xs mb-8 cursor-pointer hover:text-purple-400">
                            Forgot Password?
                        </h6>

                        <div className="flex justify-center mt-5 w-full">
                            <LargeButton lable="Login" width="100%" />
                        </div>

                        <hr className="border-t border-gray-300 my-6 w-4/5 mx-auto" />

                        <div className="flex flex-col sm:flex-row w-full sm:w-4/5 justify-between items-center gap-4 mx-auto">
                            <div className="flex gap-4 items-center">
                                <GithubLogo />
                                <span className="text-gray-400">|</span>
                                <GoogleLogo />
                            </div>
                            <GhostButton label="Sign up" />
                        </div>
                    </div>

                    {/* Right: Light Rays + Welcome + SVG */}
                    <div
                        className="hidden sm:flex w-full lg:w-7/12 h-8 lg:h-full relative overflow-hidden"
                    >
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
                        <div
                            className="relative z-10 flex flex-col w-full h-full justify-center p-6 md:p-10 border-t lg:border-t-0 lg:border-l border-[#452165ff]"
                        >
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                                Welcome to CmDZeN
                            </h1>
                            <h3 className="text-sm md:text-base">
                                Login to access your account
                            </h3>
                            <div className="mt-12 ml-64 md:mt-16 lg:mt-24 flex justify-center lg:justify-start">
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
