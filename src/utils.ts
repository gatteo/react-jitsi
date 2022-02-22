import * as Default from './defaults'

export const importJitsiApi = (domain = Default.Props.domain): Promise<void> => new Promise((resolve, reject) => {
    if(window.JitsiMeetExternalAPI) {
        resolve(window.JitsiMeetExternalAPI)
    } else {
        const head = document.getElementsByTagName("head")[0];
        const script = document.createElement("script");
        const url = `https://${domain}/external_api.js`;

        script.setAttribute("type", "text/javascript");
        script.setAttribute("src", url);

        const onLoad = (event: any) => {
            if (event.target === script) {
                head.removeEventListener("load", onLoad);
                resolve(window.JitsiMeetExternalAPI);
            }
        };

        const onError = (event: any) => {
            if (event.target === script) {
                head.removeEventListener("error", onError);
                head.removeChild(script);
                reject('Jitsi API script failed to load');
            }
        }

        head.addEventListener("load", onLoad, true);
        head.addEventListener("error", onError, true);
        head.appendChild(script);
    }
})
