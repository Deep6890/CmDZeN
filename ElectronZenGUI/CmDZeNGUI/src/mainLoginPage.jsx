import Waves from './components/backgroundWave';
import LightRays from './components/backgroundLight';
import ProblemSolving from './components/problemSvg';
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
            <div className="absolute w-full h-screen flex justify-center items-center overflow-hidden">
                <div
                    className="flex w-3/5 h-5/6 border-2 border-violet-950 rounded-[25px]"
                    style={{ backgroundColor: '#0d0017' }}
                >
                    {/* Left: Login Form */}
                    <div
                        className="flex flex-col w-5/12 h-full"
                        style={{ borderRadius: '25px 0 0 25px', margin: '7% 0px 10px 50px' }}
                    >
                        <h1 className="text-4xl font-bold mb-3.5">Login</h1>
                        <h2 className="text-base mt-2 mb-8">Enter your account details</h2>

                        <input
                            type="text"
                            className="w-64 h-9 rounded-md text-xs border-0 border-b border-[#4f4755ff] focus:border-b-purple-800 focus:outline-none bg-[#0d0017] px-5 mt-5"
                            placeholder="Username"
                        />
                        <input
                            type="password"
                            className="w-64 h-9 rounded-md text-xs border-0 border-b border-[#4f4755ff] focus:border-b-purple-800 focus:outline-none bg-[#0d0017] px-5 mt-5"
                            placeholder="Password"
                        />

                        <h6 className="mt-8 ml-4 text-xs mb-8 cursor-pointer hover:text-purple-400">
                            Forgot Password?
                        </h6>

                        <div className="flex justify-center mt-5 w-5/6">
                            <LargeButton lable="Login" width="250px" />
                        </div>

                        <hr className="border-t border-gray-300 my-4 w-4/5 mt-9" />

                        <div className="flex w-4/5 justify-around mt-5">
                            <div className='flex w-1/2 justify-around'>
                                <GithubLogo />
                                |
                                <GoogleLogo />
                            </div>
                            <div className='flex w-1/2 justify-around' >
                                <GhostButton label="Sign up" />
                            </div>
                        </div>
                    </div>

                    {/* Right: Light Rays + Welcome + SVG */}
                    <div
                        className="flex w-7/12 h-full relative rounded-r-[25px] overflow-hidden"
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
                        <div className="relative z-10 flex flex-col w-full h-full flex justify-center p-10" style={{ borderLeft: "1px solid #452165ff" }}>
                            <h1 className="text-4xl font-bold">
                                Welcome to CmDZeN
                            </h1>
                            <h3>
                                Login to access you account
                            </h3>
                            <div className='mt-24 ml-24'>
                                <LoginSticker />
                            </div>
                            {/* <div className="flex justify-center items-end flex-grow mb-10">
                                <ProblemSolving />
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainLoginPage;
