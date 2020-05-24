import React, { useState, useEffect, useRef } from 'react'
import { Props, JitsiMeetAPIOptions } from './types'
import * as Default from './defaults'

const Jitsi: React.FC<Props> = (props: Props) => {
    const {
        containerStyle,
        frameStyle,
        loadingComponent,
        onAPILoad,
        onIframeLoad,
        domain,
        roomName,
        password,
        displayName,
        config,
        interfaceConfig,
        noSSL,
        jwt,
        devices,
        userInfo,
    } = { ...Default.Props, ...props }

    const [loading, setLoading] = useState(true)
    const ref = useRef<HTMLDivElement | null>(null)

    const Loader = loadingComponent || Default.Loader

    const startConference = (): void => {

        try {

            const options: JitsiMeetAPIOptions = {
                roomName,
                parentNode: ref.current,
                configOverwrite: config,
                interfaceConfigOverwrite: interfaceConfig,
                noSSL,
                jwt,
                onLoad: onIframeLoad,
                devices,
                userInfo,
            }

            const api = new window.JitsiMeetExternalAPI(domain, options)

            if (!api) throw new Error('Failed to create JitsiMeetExternalAPI istance')

            if (onAPILoad) onAPILoad(api)

            api.addEventListener('videoConferenceJoined', () => {

                setLoading(false)

                api.executeCommand('displayName', displayName)

                if (password) api.executeCommand('password', password)

            })


        } catch (error) { console.error('Failed to start the conference', error) }

    }

    useEffect(() => {

        if (window.JitsiMeetExternalAPI) startConference()
        else console.error('Jitsi Meet API library not loaded. Did you include it in the html body?')

    }, [])

    return (
        <div id='react-jitsi-container' style={{ ...Default.ContainerStyle, ...containerStyle }}>
            {loading && <Loader />}

            <div id='react-jitsi-frame' style={{ ...Default.FrameStyle(loading), ...frameStyle }} ref={ref} />
        </div>
    )
}

export default Jitsi
