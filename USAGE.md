# Ivicos specific changes to React Jitsi

## Adapting available custom API commands

In order to use API commands from the custom Jitsi Meet implementation (https://github.com/ivicos-GmbH/jitsi-meet), the external API file from the custom implementation needs to be used instead of the official sources. 

This step is performed in `src/utils.ts` : The files used to import external API endpoints are loaded depending on the environment (staging/production). This corresponds to these lines :
```
script.setAttribute("src", "https://ivicos-meet.app/external_api.js");
script.setAttribute("src", "https://test.ivicos-meet.app/external_api.js");
```
These files are replacing the official external API files that was taken before by custom ones, used to access the custom Jitsi Meet implementation from Ivicos.

If the DNS name or the file(s) are moved, these references will need to be adapted.

## Adapting available toolbar options and other customization

The file `src/types.tsx` gathers all the types used by the client to access the Jitsi implementation. Any change in the configuration options will need to be applied in the file. This includes for example new toolbar buttons. Each available toolbar button needs to be present in TOOLBAR_BUTTONS in order to be accessed via the client.

In general, changes in types for a configuration parameter or new configuration variables will need to be adapted here as well.

## Accessing the package via the client

In the `package.json` dependencies from the client, the current package can be imported via the following reference :
```
"@samuelp-mw/react-jitsi": "1.0.2"
```
The version needs of course to be adapted to match the desired version.

## Publishing new version

Publishing new version can simply be done by bumping the version entry in package.json and by running the command :
```
npm publish
```
The process is not automatized yet but it could be something worth implementing in the future.

## Tracking changes via CHANGELOG

A CHANGELOG has been introduced to track the changes made and the corresponding versions.