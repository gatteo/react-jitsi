export const importJitsiApi = (domain?: string) =>
  new Promise(async (resolve) => {
    if (window.JitsiMeetExternalAPI) {
      resolve(window.JitsiMeetExternalAPI);
    } else {
      const head = document.getElementsByTagName("head")[0];
      const script = document.createElement("script");

      script.setAttribute("type", "text/javascript");
      if (!domain) {
        script.setAttribute("src", `https://ivicos-meet.app/external_api.js`);
      } else {
        script.setAttribute(
          "src",
          `https://${domain}/external_api.js`
        );
      }

      head.addEventListener(
        "load",
        function (event: any) {
          if (event.target.nodeName === "SCRIPT") {
            resolve(window.JitsiMeetExternalAPI);
          }
        },
        true
      );

      head.appendChild(script);
    }
  });
