import { JitsiMeetAPI } from 'types';
import * as Default from './defaults'

const injectJitsiApiScript = (domain = Default.Props.domain): Promise<JitsiMeetAPI> =>
    new Promise((resolve, reject) => {
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
                    reject(`Jitsi API script failed to load from ${url}`);
                }
            }

            head.addEventListener("load", onLoad, true);
            head.addEventListener("error", onError, true);
            head.appendChild(script);
        }
    });

export const importJitsiApi = (domain?: string): Promise<JitsiMeetAPI> => {
    if (domain && domain !== Default.Props.domain) {
        // Fall back to default domain when script loading fails on custom domain
        return injectJitsiApiScript(domain).catch(() => injectJitsiApiScript());
    }
    return injectJitsiApiScript();
};
