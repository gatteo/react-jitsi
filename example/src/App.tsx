import React, { useState } from 'react'
import Loader from './components/Loader'
import Jitsi from 'react-jitsi'

import './App.css'

const App: React.FC = (): React.ReactElement => {

    const [displayName, setDisplayName] = useState('')
    const [roomName, setRoomName] = useState('')
    const [password, setPassword] = useState('')
    const [onCall, setOnCall] = useState(false)

    return (
        <div>

            <div className='header'>
                <h1>Jitsi Meet React Demo</h1>
                <p><i> An example usage of the  <a href='https://www.npmjs.com/package/react-jitsi'>Jitsi Meet React </a> component.</i></p>
            </div>

            <div className='main'>
                {onCall
                    ? (
                        <Jitsi
                            roomName={roomName}
                            displayName={displayName}
                            password={password}
                            loadingComponent={Loader}
                            containerStyle={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            config={{prejoinPageEnabled: false}}
                        />)
                    : (
                        <>
                            <h2>Create your Meeting</h2>
                            <input type='text' placeholder='Room name' value={roomName} onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setRoomName(e.target.value)} />
                            <input type='text' placeholder='Your name' value={displayName} onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setDisplayName(e.target.value)} />
                            <input type='text' placeholder='Password' value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setPassword(e.target.value)} />
                            <button onClick={(): void => setOnCall(true)} type='submit'> Let&apos;s start! </button>
                        </>
                    )}
            </div>

            <div className='footer'>
                <p><i> 🔥 Happy Coding! by <a href='https://github.com/gatteo'>Matteo Giardino</a> @ <a href='https://westudents.it'>Westudents </a>🔥</i></p>
            </div>

        </div>

    )
}

export default App
