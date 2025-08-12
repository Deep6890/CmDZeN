

import Waves from './components/backgroundWave';
function MainLoginPage() {
    return (
        <>
            <Waves
                lineColor="#452165ff"
                backgroundColor="#0A0F1C"
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
        </>
    )
}
export default MainLoginPage;