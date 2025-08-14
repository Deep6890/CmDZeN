import React from 'react';
import NavBar from '../src/components/PreBuildComponts/navBar';
import ToolMainCard from '../src/components/PreBuildComponts/toolMainCard';
import MyTimer from '../src/components/ReactLibrary/timerNumeric';
import WebsiteBlocker from '../src/components/PreBuildComponts/websiteBlocker';
export default function HomePage() {
    return (
        <>
            <NavBar />
            <div className="w-screen h-screen flex justify-center items-center overflow-x-hidden">
                {/* Parent now has flex */}
                <div className="w-full h-full flex flex-col lg:flex-row gap-6 p-6 mt-24">

                    <div className="flex justify-evenly items-center flex-1 flex-col ">
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

                    <div className="flex justify-center items-center flex-1">
                        <ToolMainCard width="100%" height="90%">
                            <WebsiteBlocker />  
                        </ToolMainCard>
                    </div>
                </div>
            </div>
        </>
    );
}
