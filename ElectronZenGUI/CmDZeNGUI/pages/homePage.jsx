import React from 'react';
import NavBar from '../src/components/PreBuildComponts/navBar';
import ToolMainCard from '../src/components/PreBuildComponts/toolMainCard';
import MyTimer from '../src/components/ReactLibrary/timerNumeric';
import WebsiteBlocker from '../src/components/PreBuildComponts/websiteBlocker';
import LenisScroll from '../src/components/ReactLibrary/lenisScroll'
import Calendar from '../src/components/ReactLibrary/activityCalander'
export default function HomePage() {
    return (
        <>
            <div className="min-h-screen w-full overflow-x-hidden">
                <LenisScroll>
                    <NavBar />
                    <div className="w-full min-h-screen flex justify-center items-center">
                        {/* Parent now has flex */}
                        <div className="w-full max-w-full h-full flex flex-col lg:flex-row gap-6 p-6 pt-32">
                            <div className="flex justify-evenly items-center flex-1 flex-col min-h-0">
                                <ToolMainCard width="70%" height="50%">
                                    <MyTimer />
                                </ToolMainCard>
                                <ToolMainCard width="70%" height="40%">
                                    <div className='w-4/5 flex flex-col'>
                                        <div className='flex justify-start text-2xl'>
                                            Screen Time ⏳
                                        </div>
                                        <div className='flex justify-start font-mono text-5xl font-extrabold text-purple-500 mt-4'>
                                            3:41 h
                                        </div>
                                    </div>
                                </ToolMainCard>
                            </div>
                            <div className="flex justify-center items-center flex-1 h-full min-h-0">
                                <ToolMainCard width="100%" height="100%">
                                    <WebsiteBlocker />
                                </ToolMainCard>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center mt-8 mb-8 items-center w-full h-5/6'>
                        <ToolMainCard width="90%" height="100%">
                            <Calendar />
                        </ToolMainCard>
                    </div>
                </LenisScroll >
            </div>

        </>
    );
}