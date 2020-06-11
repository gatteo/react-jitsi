# Jitsi Meet React Component

[![license](https://badgen.now.sh/badge/license/MIT)](./LICENSE)
[![built with typescript](https://camo.githubusercontent.com/21132e0838961fbecb75077042aa9b15bc0bf6f9/68747470733a2f2f62616467656e2e6e65742f62616467652f4275696c74253230576974682f547970655363726970742f626c7565)](https://www.typescriptlang.org/)

An **_unofficial_** React component which wraps the standard [Jitsi Meet JS API](https://github.com/jitsi/jitsi-meet/blob/master/doc/api.md).
It is written in Typescript to help you configure the library with ease, and get _your super important meetings_ up and going, in a blink of an eye🌪.

> ## [Live Demo](https://gatteo.github.io/react-jitsi/)

### Install

```bash
npm install react-jitsi --save
```

## Usage

### Basic

The easiest way for you to create a meeting is by simply including the React Jitsi component in your app.

```jsx
import React, { useState } from 'react'
import Jitsi from 'react-jitsi'

export const App = () => (
  <>
    <h2>My First Meeting!</h2>
    <Jitsi />
  </>
)
```

> However, this is **not recommended**, as it will create and join a random room (ex. `hp6y791054a`), which is possibly not unique.

### Basic, but better

We advise you to create a meeting specifying at least a room name (that you know is unique) and the user's display name.

```jsx
import React, { useState } from 'react'
import Jitsi from 'react-jitsi'

const roomName = 'my-super-secret-meeting-123e4567-e89b-12d3-a456-426655440000'
const userFullName = 'Joseph Strawberry'

export const App = () => (
  <>
    <h2>My First Meeting!</h2>
    <Jitsi roomName={roomName} displayName={userFullName} />
  </>
)
```

### A more complete example

```jsx
import React, { useState } from 'react'
import Jitsi from 'react-jitsi'
import Loader from './components/Loader'

export const App = () => {

  const [displayName, setDisplayName] = useState('')
  const [roomName, setRoomName] = useState('')
  const [password, setPassword] = useState('')
  const [onCall, setOnCall] = useState(false)

  return onCall
    ? (
      <Jitsi
        roomName={roomName}
        displayName={displayName}
        password={password}
        loadingComponent={Loader}
        onAPILoad={JitsiMeetAPI => console.log('Good Morning everyone!')}
      />)
    : (
      <>
        <h1>Crate a Meeting</h1>
        <input type='text' placeholder='Room name' value={roomName} onChange={e => setRoomName(e.target.value)} />
        <input type='text' placeholder='Your name' value={displayName} onChange={e => setDisplayName(e.target.value)} />
        <button onClick={() => setOnCall(true)}> Let&apos;s start!</button>
      </>
    )

}

```

## Custom styles

The Jitsi Meet conference iframe is wrapped by two containers

```jsx
<div id='react-jitsi-container' style={...}>
  <Loader/>
  <div id='react-jitsi-frame' style={...}>
    <iframe>
  </div>
</div>
```

You can specify custom styles for each container in two ways:

- Using CSS, through the `#react-jitsi-container` and `#react-jitsi-frame` selectors
- Using inline styling, through the `containerStyle` and `frameStyle` props

For example

```jsx
<Jitsi containerStyle={{ width: '1200px', height: '800px' }}>
```

## Conference Configuration

Configuration over both the conference [core settings](https://github.com/jitsi/jitsi-meet/blob/master/config.js) (such as `startAudioOnly` option) and the [interface settings](https://github.com/jitsi/jitsi-meet/blob/master/interface_config.js) (such as `filmStripOnly` option) can be passed through the `config` and `interfaceConfig` props.

For example

```jsx
<Jitsi
  config={{ startAudioOnly: true }}
  interfaceConfig={{ filmStripOnly: true }}>
```

## Available props

| Prop             | Required | Description                                                                           | Default                                                              |
| ---------------- | -------- | ------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| containerStyle   | no       | Object containing main container styles (see above for details)                       | `{ width:'800px', height: '400px' }`                                 |
| frameStyle       | no       | Object containing frame container styles (see above for details)                      | `{ display: loading?'none' : 'block',width: '100%',height: '100% }'` |
| loadingComponent | no       | Component shown until the Jitsi Meet video conference is not started                  | `<div>Loading meeting...</div>`                                      |
| onAPILoad        | no       | Callback function invoked with Jitsi Meet API object when the library is loaded       |
| onIframeLoad     | no       | Callback function invoked when the conference iframe is loaded                        |
| domain           | no       | Domain used to build the conference URL                                               | meet.jit.si                                                          |
| roomName         | no       | Name of the room to join                                                              | A random string                                                      |
| password         | no       | Password to set for the meeting room                                                  |
| displayName      | no       | Participant's name                                                                    |
| config           | no       | Overrides for the default meeting settings                                            |
| interfaceConfig  | no       | Overrides for default meeting interface options                                       |
| noSSL            | no       | Boolean indicating if the server should be contacted using HTTP or HTTPS              | true                                                                 |
| jwt              | no       | JWT token to pass to the domain                                                       |
| devices          | no       | A map containing information about the initial devices that will be used in the call. |
| userInfo         | no       | Object containing information about the participant opening the meeting               |

## Controlling the Conference

The Jitsi Meet API exposes [several methods](https://github.com/jitsi/jitsi-meet/blob/master/doc/api.md#controlling-the-embedded-jitsi-meet-conference) which allow great control over the conference. Such methods can be accessed through the `api` object passed as an argument to the callback specified in the `onAPILoad` prop.

For example, to retrieve the device list:

```jsx
import React, { useState } from 'react'
import Jitsi from 'react-jitsi'

const handleAPI = (JitsiMeetAPI) => {
  JitsiMeetAPI.executeCommand('toggleVideo')
}

export const App = () => (
  <>
    <h2>My First Meeting!</h2>
    <Jitsi onAPILoad={handleAPI} password={password} />
  </>
)
```

## Contributing

We love contributions from everyone.
If you have any bug to report, open an issue.
If want to submit a fix, or any kind of improvement, create a pull request here on Github.

## Organizations and projects using this component

|                                                                                                                                                                                                                                            |                                                                                                                                                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [<img src="https://firebasestorage.googleapis.com/v0/b/da-scuola.appspot.com/o/da-round.png?alt=media&token=babeb13a-0aee-4aed-a69d-60add2fc07e8" width="100px;"/><br/><sub><p align="center">Dascuola.it</p></sub>](https://dascuola.it/) | [<img src="https://firebasestorage.googleapis.com/v0/b/da-scuola.appspot.com/o/ws-round.png?alt=media&token=468eed8b-628e-4415-87d2-3a4dadbc87f4" width="100px;"/><br/><sub><p align="center">Westudents.it</p></sub>](https://westudents.it/) |

If you are using this component in your organization/project and would like to be shown in the above list, [send us an email](mailto:mat.gia.dev@gmail.com)!

---

[MIT License.](./LICENSE)
