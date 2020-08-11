import { ReactNode } from "react";

declare global {
  interface Window {
    JitsiMeetExternalAPI: any;
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface JitsiMeetAPI {
  // TODO, add definitions
}

export interface JitsiMeetAPIOptions {
  roomName?: string;

  width?: number;

  height?: number;

  parentNode?: ReactNode;

  configOverwrite?: ConfigOptions;

  interfaceConfigOverwrite?: InterfaceConfigOptions;

  noSSL?: boolean;

  jwt?: string;

  onLoad?: () => void;

  invitees?: {};

  devices?: {
    audioInput?: string;
    audioOutput?: string;
    videoInput?: string;
  };

  userInfo?: {
    email?: string;
  };
}

export interface ConfigOptions {
  // ---- Connection

  hosts?: {
    // XMPP domain.
    domain?: string;

    // When using authentication, domain for guest users.
    anonymousdomain?: string;

    // Domain for authenticated users. Defaults to <domain>.
    authdomain?: string;

    // Jirecon recording component domain.
    jirecon?: string;

    // Call control component (Jigasi).
    call_control?: string;

    // Focus component domain. Defaults to focus.<domain>.
    focus?: string;

    // XMPP MUC domain. FIXME: use XEP-0030 to discover it.
    muc?: string;
  };

  // BOSH URL. FIXME: use XEP-0156 to discover it.
  bosh?: string;

  // Websocket URL
  websocket?: string;

  // The name of client node advertised in XEP-0115 'c' stanza
  clientNode?: string;

  // The real JID of focus participant - can be overridden here
  // Do not change username - FIXME: Make focus username configurable
  // https://github.com/jitsi/jitsi-meet/issues/7376
  focusUserJid?: string;

  // Testing / experimental features.
  //

  testing?: {
    // Disables the End to End Encryption feature. Useful for debugging
    // issues related to insertable streams.
    disableE2EE?: boolean;

    // P2P test mode disables automatic switching to P2P when there are 2
    // participants in the conference.
    p2pTestMode?: boolean;

    // Enables the test specific features consumed by jitsi-meet-torture
    testMode?: boolean;

    // Disables the auto-play behavior of *all* newly created video element.
    // This is useful when the client runs on a host with limited resources.
    noAutoPlayVideo?: boolean;

    // Enable / disable 500 Kbps bitrate cap on desktop tracks. When enabled,
    // simulcast is turned off for the desktop share. If presenter is turned
    // on while screensharing is in progress, the max bitrate is automatically
    // adjusted to 2.5 Mbps. This takes a value between 0 and 1 which determines
    // the probability for this to be enabled.
    capScreenshareBitrate?: 1 | 0; // 0 to disable
  };

  // Disables ICE/UDP by filtering out local and remote UDP candidates in
  // signalling.
  webrtcIceUdpDisable?: boolean;

  // Disables ICE/TCP by filtering out local and remote TCP candidates in
  // signalling.
  webrtcIceTcpDisable?: boolean;

  // Media
  //

  // Audio

  // Disable measuring of audio levels.
  disableAudioLevels?: boolean;
  audioLevelsInterval?: number;

  // Enabling this will run the lib-jitsi-meet no audio detection module which
  // will notify the user if the current selected microphone has no audio
  // input and will suggest another valid device if one is present.
  enableNoAudioDetection?: boolean;

  // Enabling this will run the lib-jitsi-meet noise detection module which will
  // notify the user if there is noise, other than voice, coming from the current
  // selected microphone. The purpose it to let the user know that the input could
  // be potentially unpleasant for other meeting participants.
  enableNoisyMicDetection?: boolean;

  // Start the conference in audio only mode (no video is being received nor
  // sent).
  startAudioOnly?: boolean;

  // Every participant after the Nth will start audio muted.
  startAudioMuted?: number;

  // Start calls with audio muted. Unlike the option above, this one is only
  // applied locally. FIXME: having these 2 options is confusing.
  startWithAudioMuted?: boolean;

  // Enabling it (with #params) will disable local audio output of remote
  // participants and to enable it back a reload is needed.
  startSilent?: boolean;

  // Sets the preferred target bitrate for the Opus audio codec by setting its
  // 'maxaveragebitrate' parameter. Currently not available in p2p mode.
  // Valid values are in the range 6000 to 510000
  opusMaxAverageBitrate?: number;

  // Video

  // Sets the preferred resolution (height) for local video. Defaults to 720.
  resolution?: number;

  // How many participants while in the tile view mode, before the receiving video quality is reduced from HD to SD.
  // Use -1 to disable.
  maxFullResolutionParticipants?: number;

  // w3c spec-compliant video constraints to use for video capture. Currently
  // used by browsers that return true from lib-jitsi-meet's
  // util#browser#usesNewGumFlow. The constraints are independent from
  // this config's resolution value. Defaults to requesting an ideal
  // resolution of 720p.
  constraints?: {
    video?: {
      height?: {
        ideal?: number;
        max?: number;
        min?: number;
      };
    };
  };

  // Enable / disable simulcast support.
  disableSimulcast?: boolean;

  // Enable / disable layer suspension.  If enabled, endpoints whose HD
  // layers are not in use will be suspended (no longer sent) until they
  // are requested again.
  enableLayerSuspension?: boolean;

  // Every participant after the Nth will start video muted.
  startVideoMuted?: number;

  // Start calls with video muted. Unlike the option above, this one is only
  // applied locally. FIXME: having these 2 options is confusing.
  startWithVideoMuted?: boolean;

  // If set to true, prefer to use the H.264 video codec (if supported).
  // Note that it's not recommended to do this because simulcast is not
  // supported when  using H.264. For 1-to-1 calls this setting is enabled by
  // default and can be toggled in the p2p section.
  preferH264?: boolean;

  // If set to true, disable H.264 video codec by stripping it out of the
  // SDP.
  disableH264?: boolean;

  // Desktop sharing

  // Optional desktop sharing frame rate options. Default value: min:5, max:5.
  desktopSharingFrameRate?: {
    min?: number;
    max?: number;
  };

  // Try to start calls with screen-sharing instead of camera video.
  startScreenSharing?: boolean;

  // Recording

  // Whether to enable file recording or not.
  fileRecordingsEnabled?: boolean;
  // Enable the dropbox integration.
  dropbox?: {
    appKey?: string; // Specify your app key here.
    // A URL to redirect the user to, after authenticating
    // by default uses:
    // 'https://jitsi-meet.example.com/static/oauth.html'
    redirectURI?: string;
  };
  // When integrations like dropbox are enabled only that will be shown,
  // by enabling fileRecordingsServiceEnabled, we show both the integrations
  // and the generic recording service (its configuration and storage type
  // depends on jibri configuration)
  fileRecordingsServiceEnabled?: boolean;
  // Whether to show the possibility to share file recording with other people
  // (e.g. meeting participants), based on the actual implementation
  // on the backend.
  fileRecordingsServiceSharingEnabled?: boolean;

  // Whether to enable live streaming or not.
  liveStreamingEnabled?: boolean;

  // Transcription (in interface_config,
  // subtitles and buttons can be configured)
  transcribingEnabled?: boolean;

  // Enables automatic turning on captions when recording is started
  autoCaptionOnRecord?: boolean;

  // Misc

  // Default value for the channel "last N" attribute. -1 for unlimited.
  channelLastN?: number;

  // Provides a way to use different "last N" values based on the number of participants in the conference.
  // The keys in an Object represent number of participants and the values are "last N" to be used when number of
  // participants gets to or above the number.
  //
  // For the given example mapping, "last N" will be set to 20 as long as there are at least 5, but less than
  // 29 participants in the call and it will be lowered to 15 when the 30th participant joins. The 'channelLastN'
  // will be used as default until the first threshold is reached.
  //
  lastNLimits?: {
    [index: number]: number;
  };

  // Specify the settings for video quality optimizations on the client.
  videoQuality?: {
    // Provides a way to configure the maximum bitrates that will be enforced on the simulcast streams for
    // video tracks. The keys in the object represent the type of the stream (LD, SD or HD) and the values
    // are the max.bitrates to be set on that particular type of stream. The actual send may vary based on
    // the available bandwidth calculated by the browser, but it will be capped by the values specified here.
    // This is currently not implemented on app based clients on mobile.
    maxBitratesVideo?: {
      low?: number;
      standard?: number;
      high?: number;
    };
  };

  // // Options for the recording limit notification.
  recordingLimit?: {
    // The recording limit in minutes. Note: This number appears in the notification text
    // but doesn't enforce the actual recording time limit. This should be configured in
    // jibri!
    limit?: number;

    // The name of the app with unlimited recordings.
    appName?: string;

    // The URL of the app with unlimited recordings.
    appURL?: string;
  };

  // Disables or enables RTX (RFC 4588) (defaults to false).
  disableRtx?: boolean;

  // Disables or enables TCC (the default is in Jicofo and set to true)
  // (draft-holmer-rmcat-transport-wide-cc-extensions-01). This setting
  // affects congestion control, it practically enables send-side bandwidth
  // estimations.
  enableTcc?: boolean;

  // Disables or enables REMB (the default is in Jicofo and set to false)
  // (draft-alvestrand-rmcat-remb-03). This setting affects congestion
  // control, it practically enables recv-side bandwidth estimations. When
  // both TCC and REMB are enabled, TCC takes precedence. When both are
  // disabled, then bandwidth estimations are disabled.
  enableRemb?: boolean;

  // Enables ICE restart logic in LJM and displays the page reload overlay on
  // ICE failure. Current disabled by default because it's causing issues with
  // signaling when Octo is enabled. Also when we do an "ICE restart"(which is
  // not a real ICE restart), the client maintains the TCC sequence number
  // counter, but the bridge resets it. The bridge sends media packets with
  // TCC sequence numbers starting from 0.
  enableIceRestart?: boolean;

  // Defines the minimum number of participants to start a call (the default
  // is set in Jicofo and set to 2).
  minParticipants?: number;

  // Use the TURN servers discovered via XEP-0215 for the jitsi-videobridge
  // connection
  useStunTurn?: boolean;

  // Use TURN/UDP servers for the jitsi-videobridge connection (by default
  // we filter out TURN/UDP because it is usually not needed since the
  // bridge itself is reachable via UDP)
  useTurnUdp?: boolean;

  // Enables / disables a data communication channel with the Videobridge.
  // Values can be 'datachannel', 'websocket', true (treat it as
  // 'datachannel'), undefined (treat it as 'datachannel') and false (don't
  // open any channel).
  openBridgeChannel?: boolean;

  // UI
  //

  // Require users to always specify a display name.
  // requireDisplayName: true,

  // Whether to use a welcome page or not. In case it's false a random room
  // will be joined when no room is specified.
  enableWelcomePage?: boolean;

  // Enabling the close page will ignore the welcome page redirection when
  // a call is hangup.
  enableClosePage?: boolean;

  // Disable hiding of remote thumbnails when in a 1-on-1 conference call.
  disable1On1Mode?: boolean;

  // Default language for the user interface.
  defaultLanguage?: string;

  // If true all users without a token will be considered guests and all users
  // with token will be considered non-guests. Only guests will be allowed to
  // edit their profile.
  enableUserRolesBasedOnToken?: boolean;

  // Whether or not some features are checked based on token.
  enableFeaturesBasedOnToken?: boolean;

  // Enable lock room for all moderators, even when userRolesBasedOnToken is enabled and participants are guests.
  lockRoomGuestEnabled?: boolean;

  // When enabled the password used for locking a room is restricted to up to the number of digits specified
  roomPasswordNumberOfDigits?: false | number;
  // default: roomPasswordNumberOfDigits: false,

  // Message to show the users. Example: 'The service will be down for
  // maintenance at 01:00 AM GMT,
  noticeMessage?: string;

  // Enables calendar integration, depends on googleApiApplicationClientID
  // and microsoftApiApplicationClientID
  enableCalendarIntegration?: boolean;

  // When 'true', it shows an intermediate page before joining, where the user can configure their devices.
  prejoinPageEnabled?: boolean;

  // If true, shows the unsafe room name warning label when a room name is
  // deemed unsafe (due to the simplicity in the name) and a password is not
  // set or the lobby is not enabled.
  enableInsecureRoomNameWarning?: boolean;

  // Stats
  //

  // Whether to enable stats collection or not in the TraceablePeerConnection.
  // This can be useful for debugging purposes (post-processing/analysis of
  // the webrtc stats) as it is done in the jitsi-meet-torture bandwidth
  // estimation tests.
  gatherStats?: boolean;

  // The interval at which PeerConnection.getStats() is called. Defaults to 10000
  pcStatsInterval?: number;

  // To enable sending statistics to callstats.io you must provide the
  // Application ID and Secret.
  callStatsID?: string;
  callStatsSecret?: string;

  // Enables sending participants' display names to callstats
  enableDisplayNameInStats?: boolean;

  // Enables sending participants' emails (if available) to callstats and other analytics
  enableEmailInStats?: boolean;

  // Privacy
  //

  // If third party requests are disabled, no other server will be contacted.
  // This means avatars will be locally generated and callstats integration
  // will not function.
  disableThirdPartyRequests?: boolean;

  // Peer-To-Peer mode: used (if enabled) when there are just 2 participants.
  //

  p2p?: {
    // Enables peer to peer mode. When enabled the system will try to
    // establish a direct connection when there are exactly 2 participants
    // in the room. If that succeeds the conference will stop sending data
    // through the JVB and use the peer to peer connection instead. When a
    // 3rd participant joins the conference will be moved back to the JVB
    // connection.
    enabled?: boolean;

    // Use XEP-0215 to fetch STUN and TURN servers.
    useStunTurn?: boolean;

    // The STUN servers that will be used in the peer to peer connections
    stunServers?: [
      // { urls: 'stun:jitsi-meet.example.com:3478' },
      { urls: string }
    ];

    // Sets the ICE transport policy for the p2p connection. At the time
    // of this writing the list of possible values are 'all' and 'relay',
    // but that is subject to change in the future. The enum is defined in
    // the WebRTC standard:
    // https://www.w3.org/TR/webrtc/#rtcicetransportpolicy-enum.
    // If not set, the effective value is 'all'.
    iceTransportPolicy?: "all" | "relay";

    // If set to true, it will prefer to use H.264 for P2P calls (if H.264
    // is supported).
    preferH264?: boolean;

    // If set to true, disable H.264 video codec by stripping it out of the
    // SDP.
    disableH264?: boolean;

    // How long we're going to wait, before going back to P2P after the 3rd
    // participant has left the conference (to filter out page reload).
    backToP2PDelay?: number;
  };

  analytics?: {
    // The Google Analytics Tracking ID:
    googleAnalyticsTrackingId?: string;
    // Matomo configuration:
    matomoEndpoint?: string;
    matomoSiteID?: string;
    // The Amplitude APP Key:
    amplitudeAPPKey?: string;
    // Configuration for the rtcstats server:
    // In order to enable rtcstats one needs to provide a endpoint url.
    // rtcstatsEndpoint: wss://rtcstats-server-pilot.jitsi.net/,
    // The interval at which rtcstats will poll getStats, defaults to 1000ms.
    // If the value is set to 0 getStats won't be polled and the rtcstats client
    // will only send data related to RTCPeerConnection events.
    // rtcstatsPolIInterval: 1000
    // Array of script URLs to load as lib-jitsi-meet "analytics handlers".
    scriptURLs?: [string];
  };

  // Information about the jitsi-meet instance we are connecting to, including
  // the user region as seen by the server.
  deploymentInfo?: {
    shard?: string;
    region?: string;
    userRegion?: string;
  };

  // Decides whether the start/stop recording audio notifications should play on record.
  disableRecordAudioNotification?: boolean;

  // Information for the chrome extension banner
  chromeExtensionBanner?: {
    // The chrome extension to be installed address
    url?: string;

    // Extensions info which allows checking if they are installed or not
    chromeExtensionsInfo?: [
      {
        id?: string;
        path?: string;
      }
    ];
  };

  // Local Recording
  //

  localRecording?: {
    // Enables local recording.
    // Additionally, 'localrecording' (all lowercase) needs to be added to
    // TOOLBAR_BUTTONS in interface_config.js for the Local Recording
    // button to show up on the toolbar.
    //
    enabled?: boolean;
    //

    // The recording format, can be one of 'ogg', 'flac' or 'wav'.
    format?: string;
    //
  };

  // Options related to end-to-end (participant to participant) ping.
  e2eping?: {
    // The interval in milliseconds at which pings will be sent.
    // Defaults to 10000, set to <= 0 to disable.
    pingInterval?: number;

    // The interval in milliseconds at which analytics events
    // with the measured RTT will be sent. Defaults to 60000, set
    // to <= 0 to disable.
    analyticsInterval?: number;
  };

  // If set, will attempt to use the provided video input device label when
  // triggering a screenshare, instead of proceeding through the normal flow
  // for obtaining a desktop stream.
  // NOTE: This option is experimental and is currently intended for internal
  // use only.
  _desktopSharingSourceDevice?: string;

  // If true, any checks to handoff to another application will be prevented
  // and instead the app will continue to display in the current browser.
  disableDeepLinking?: boolean;

  // A property to disable the right click context menu for localVideo
  // the menu has option to flip the locally seen video for local presentations
  disableLocalVideoFlip?: boolean;

  // Mainly privacy related settings

  // Disables all invite functions from the app (share, invite, dial out...etc)
  disableInviteFunctions?: boolean;

  // Disables storing the room name to the recents list
  doNotStoreRoom?: boolean;

  // Deployment specific URLs.
  deploymentUrls?: {
    // If specified a 'Help' button will be displayed in the overflow menu with a link to the specified URL for
    // user documentation.
    userDocumentationURL?: string;
    // If specified a 'Download our apps' button will be displayed in the overflow menu with a link
    // to the specified URL for an app download page.
    downloadAppsUrl?: string;
  };

  // Options related to the remote participant menu.
  remoteVideoMenu?: {
    // If set to true the 'Kick out' button will be disabled.
    disableKick?: boolean;
  };

  // If set to true all muting operations of remote participants will be disabled.
  disableRemoteMute?: boolean;

  /**
     External API url used to receive branding specific information.
     If there is no url set or there are missing fields, the defaults are applied.
     None of the fields are mandatory and the response must have the shape:
     {
         // The hex value for the colour used as background
         backgroundColor: '#fff',
         // The url for the image used as background
         backgroundImageUrl: 'https://example.com/background-img.png',
         // The anchor url used when clicking the logo image
         logoClickUrl: 'https://example-company.org',
         // The url used for the image used as logo
         logoImageUrl: 'https://example.com/logo-img.png'
     }
    */
  brandingDataUrl?: string;

  // The URL of the moderated rooms microservice, if available. If it
  // is present, a link to the service will be rendered on the welcome page,
  // otherwise the app doesn't render it.
  moderatedRoomServiceUrl?: string;

  // List of undocumented settings used in jitsi-meet
  /**
     _immediateReloadThreshold
     autoRecord
     autoRecordToken
     debug
     debugAudioLevels
     deploymentInfo
     dialInConfCodeUrl
     dialInNumbersUrl
     dialOutAuthUrl
     dialOutCodesUrl
     disableRemoteControl
     displayJids
     etherpad_base
     externalConnectUrl
     firefox_fake_device
     googleApiApplicationClientID
     iAmRecorder
     iAmSipGateway
     microsoftApiApplicationClientID
     peopleSearchQueryTypes
     peopleSearchUrl
     requireDisplayName
     tokenAuthUrl
     */

  // List of undocumented settings used in lib-jitsi-meet
  /**
     _peerConnStatusOutOfLastNTimeout
     _peerConnStatusRtcMuteTimeout
     abTesting
     avgRtpStatsN
     callStatsConfIDNamespace
     callStatsCustomScriptUrl
     desktopSharingSources
     disableAEC
     disableAGC
     disableAP
     disableHPF
     disableNS
     enableLipSync
     enableTalkWhileMuted
     forceJVB121Ratio
     hiddenDomain
     ignoreStartMuted
     nick
     startBitrate
     */

  // Allow all above example options to include a trailing comma and
  // prevent fear when commenting out the last value.
  makeJsonParserHappy?: "even if last key had a trailing comma";

  // no configuration value should follow this line.
}

export interface InterfaceConfigOptions {
  APP_NAME?: string;
  AUDIO_LEVEL_PRIMARY_COLOR?: string;
  AUDIO_LEVEL_SECONDARY_COLOR?: string;

  /**
   * A UX mode where the last screen share participant is automatically
   * pinned. Valid values are the string "remote-only" so remote participants
   * get pinned but not local, otherwise any truthy value for all participants,
   * and any falsy value to disable the feature.
   *
   * Note: this mode is experimental and subject to breakage.
   */
  AUTO_PIN_LATEST_SCREEN_SHARE?: string;
  BRAND_WATERMARK_LINK?: string;

  CLOSE_PAGE_GUEST_HINT?: boolean; // A html text to be shown to guests on the close page, false disables it
  /**
   * Whether the connection indicator icon should hide itself based on
   * connection strength. If true, the connection indicator will remain
   * displayed while the participant has a weak connection and will hide
   * itself after the CONNECTION_INDICATOR_HIDE_TIMEOUT when the connection is
   * strong.
   *
   * @type {boolean}
   */
  CONNECTION_INDICATOR_AUTO_HIDE_ENABLED?: boolean;

  /**
   * How long the connection indicator should remain displayed before hiding.
   * Used in conjunction with CONNECTION_INDICATOR_AUTOHIDE_ENABLED.
   *
   * @type {number}
   */
  CONNECTION_INDICATOR_AUTO_HIDE_TIMEOUT?: number;

  /**
   * If true, hides the connection indicators completely.
   *
   * @type {boolean}
   */
  CONNECTION_INDICATOR_DISABLED?: boolean;

  DEFAULT_BACKGROUND?: string;
  DEFAULT_LOCAL_DISPLAY_NAME?: string;
  DEFAULT_LOGO_URL?: string;
  DEFAULT_REMOTE_DISPLAY_NAME?: string;

  DISABLE_DOMINANT_SPEAKER_INDICATOR?: boolean;

  DISABLE_FOCUS_INDICATOR?: boolean;

  /**
   * If true, notifications regarding joining/leaving are no longer displayed.
   */
  DISABLE_JOIN_LEAVE_NOTIFICATIONS?: boolean;

  /**
   * If true, presence status: busy, calling, connected etc. is not displayed.
   */
  DISABLE_PRESENCE_STATUS?: boolean;

  /**
   * Whether the ringing sound in the call/ring overlay is disabled. If
   * {@code undefined}, defaults to {@code false}.
   *
   * @type {boolean}
   */
  DISABLE_RINGING?: boolean;

  /**
   * Whether the speech to text transcription subtitles panel is disabled.
   * If {@code undefined}, defaults to {@code false}.
   *
   * @type {boolean}
   */
  DISABLE_TRANSCRIPTION_SUBTITLES?: boolean;

  /**
   * Whether or not the blurred video background for large video should be
   * displayed on browsers that can support it.
   */
  DISABLE_VIDEO_BACKGROUND?: boolean;

  DISPLAY_WELCOME_PAGE_CONTENT?: boolean;
  DISPLAY_WELCOME_PAGE_TOOLBAR_ADDITIONAL_CONTENT?: boolean;

  ENABLE_DIAL_OUT?: boolean;

  ENABLE_FEEDBACK_ANIMATION?: boolean; // Enables feedback star animation.

  FILM_STRIP_MAX_HEIGHT?: number;

  /**
   * Whether to only show the filmstrip (and hide the toolbar).
   */
  filmStripOnly?: boolean;

  GENERATE_ROOMNAMES_ON_WELCOME_PAGE?: boolean;

  /**
   * Hide the logo on the deep linking pages.
   */
  HIDE_DEEP_LINKING_LOGO?: boolean;

  /**
   * Hide the invite prompt in the header when alone in the meeting.
   */
  HIDE_INVITE_MORE_HEADER?: boolean;

  INITIAL_TOOLBAR_TIMEOUT?: number;
  JITSI_WATERMARK_LINK?: string;

  LANG_DETECTION?: boolean; // Allow i18n to detect the system language
  LIVE_STREAMING_HELP_LINK?: string; // Documentation reference for the live streaming feature.
  LOCAL_THUMBNAIL_RATIO?: number; // 16:9

  /**
   * Maximum coefficient of the ratio of the large video to the visible area
   * after the large video is scaled to fit the window.
   *
   * @type {number}
   */
  MAXIMUM_ZOOMING_COEFFICIENT?: number;

  /**
   * Whether the mobile app Jitsi Meet is to be promoted to participants
   * attempting to join a conference in a mobile Web browser. If
   * {@code undefined}, defaults to {@code true}.
   *
   * @type {boolean}
   */
  MOBILE_APP_PROMO?: boolean;

  NATIVE_APP_NAME?: string;

  // Names of browsers which should show a warning stating the current browser
  // has a suboptimal experience. Browsers which are not listed as optimal or
  // unsupported are considered suboptimal. Valid values are:
  // chrome, chromium, edge, electron, firefox, nwjs, opera, safari
  OPTIMAL_BROWSERS?: [
    "chrome" | "chromium" | "firefox" | "nwjs" | "electron" | "safari"
  ];

  POLICY_LOGO?: null;
  PROVIDER_NAME?: string;

  /**
   * If true, will display recent list
   *
   * @type {boolean}
   */
  RECENT_LIST_ENABLED?: boolean;
  REMOTE_THUMBNAIL_RATIO?: number; // 1:1

  SETTINGS_SECTIONS?: [
    "devices" | "language" | "moderator" | "profile" | "calendar"
  ];
  SHOW_BRAND_WATERMARK?: boolean;

  /**
   * Decides whether the chrome extension banner should be rendered on the landing page and during the meeting.
   * If this is set to false, the banner will not be rendered at all. If set to true, the check for extension(s)
   * being already installed is done before rendering.
   */
  SHOW_CHROME_EXTENSION_BANNER?: boolean;

  SHOW_DEEP_LINKING_IMAGE?: boolean;
  SHOW_JITSI_WATERMARK?: boolean;
  SHOW_POWERED_BY?: boolean;
  SHOW_PROMOTIONAL_CLOSE_PAGE?: boolean;
  SHOW_WATERMARK_FOR_GUESTS?: boolean; // if watermark is disabled by default, it can be shown only for guests

  /*
   * If indicated some of the error dialogs may point to the support URL for
   * help.
   */
  SUPPORT_URL?: string;

  TOOLBAR_ALWAYS_VISIBLE?: boolean;

  /**
   * The name of the toolbar buttons to display in the toolbar, including the
   * "More actions" menu. If present, the button will display. Exceptions are
   * "livestreaming" and "recording" which also require being a moderator and
   * some values in config.js to be enabled. Also, the "profile" button will
   * not display for users with a JWT.
   * Notes:
   * - it's impossible to choose which buttons go in the "More actions" menu
   * - it's impossible to control the placement of buttons
   * - 'desktop' controls the "Share your screen" button
   */
  TOOLBAR_BUTTONS?: [
    | "microphone"
    | "camera"
    | "closedcaptions"
    | "desktop"
    | "embedmeeting"
    | "fullscreen"
    | "fodeviceselection"
    | "hangup"
    | "profile"
    | "chat"
    | "recording"
    | "livestreaming"
    | "etherpad"
    | "sharedvideo"
    | "settings"
    | "raisehand"
    | "videoquality"
    | "filmstrip"
    | "invite"
    | "feedback"
    | "stats"
    | "shortcuts"
    | "tileview"
    | "videobackgroundblur"
    | "download"
    | "help"
    | "mute-everyone"
    | "security"
  ];

  TOOLBAR_TIMEOUT?: number;

  // Browsers, in addition to those which do not fully support WebRTC, that
  // are not supported and should show the unsupported browser page.
  UNSUPPORTED_BROWSERS?: [string];

  /**
   * Whether to show thumbnails in filmstrip as a column instead of as a row.
   */
  VERTICAL_FILMSTRIP?: boolean;

  // Determines how the video would fit the screen. 'both' would fit the whole
  // screen, 'height' would fit the original video height to the height of the
  // screen, 'width' would fit the original video width to the width of the
  // screen respecting ratio.
  VIDEO_LAYOUT_FIT?: "both" | "height" | "width";

  /**
   * If true, hides the video quality label indicating the resolution status
   * of the current large video.
   *
   * @type {boolean}
   */
  VIDEO_QUALITY_LABEL_DISABLED?: boolean;

  /**
   * When enabled, the kick participant button will not be presented for users without a JWT
   */
  HIDE_KICK_BUTTON_FOR_GUESTS?: boolean;

  /**
   * How many columns the tile view can expand to. The respected range is
   * between 1 and 5.
   */
  TILE_VIEW_MAX_COLUMNS?: number;

  /**
   * Specify custom URL for downloading android mobile app.
   */
  MOBILE_DOWNLOAD_LINK_ANDROID?: string;

  /**
   * Specify URL for downloading ios mobile app.
   */
  MOBILE_DOWNLOAD_LINK_IOS?: string;

  /**
   * Specify Firebase dynamic link properties for the mobile apps.
   */
  MOBILE_DYNAMIC_LINK?: {
    APN?: string;
    APP_CODE?: string;
    CUSTOM_DOMAIN?: undefined | string;
    IBI?: string;
    ISI?: string;
  };

  /**
   * Specify mobile app scheme for opening the app from the mobile browser.
   */
  APP_SCHEME?: string;

  /**
   * Specify the Android app package name.
   */
  ANDROID_APP_PACKAGE?: string;

  /**
   * Override the behavior of some notifications to remain displayed until
   * explicitly dismissed through a user action. The value is how long, in
   * milliseconds, those notifications should remain displayed.
   */
  ENFORCE_NOTIFICATION_AUTO_DISMISS_TIMEOUT?: number;

  // List of undocumented settings
  /**
     INDICATOR_FONT_SIZES
     PHONE_NUMBER_REGEX
    */

  // Allow all above example options to include a trailing comma and
  // prevent fear when commenting out the last value.
  // eslint-disable-next-line sort-keys
  makeJsonParserHappy?: "even if last key had a trailing comma";

  // No configuration value should follow this line.
}

export interface Props {
  /**
   * Main container styles
   */
  containerStyle?: React.CSSProperties;

  /**
   * Jitsi iframe container styles
   */
  frameStyle?: React.CSSProperties;

  /**
   * Component shown until JitsiMeet video conference is not started
   */
  loadingComponent?: React.ComponentType;

  /**
   * Callback function invoked with JitsiMeetExternalAPI object when it is loaded
   */
  onAPILoad?: (api: JitsiMeetAPI) => void;

  /**
   * Callback function invoked when JitsiMeet iframe is loaded
   */
  onIframeLoad?: () => void;

  /**
   * Domain used to build the conference URL, 'meet.jit.si' for example.
   */
  domain?: string;

  /**
   * Name of the room to join
   */
  roomName?: string;

  /**
   * Password to set for the meeting room
   */
  password?: string;

  /**
   * Participant's name
   */
  displayName?: string;

  // Options passed to JitsiMeetExternalAPI

  /**
   * Overrides for the default meeting options
   */
  config?: ConfigOptions;

  /**
   * Overrides for default meeting interface options
   */
  interfaceConfig?: InterfaceConfigOptions;

  /**
   * Boolean indicating if the server should be contacted using HTTP or HTTPS
   */
  noSSL?: boolean;

  /**
   * JWT token to pass to the domain
   */
  jwt?: string;

  /**
   * A map containing information about the initial devices that will be used in the call.
   */
  devices?: {
    audioInput?: string;
    audioOutput?: string;
    videoInput?: string;
  };

  /**
   * Object containing information about the participant opening the meeting, such as email
   */
  userInfo?: {
    email?: string;
  };
}
