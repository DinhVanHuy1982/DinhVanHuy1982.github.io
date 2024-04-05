(function (window) {
    window.__env = window.__env || {};


    /*================================================================================================================*/


    // var DOMAIN = 'http://103.214.9.130:8240';
    // var DOMAIN = 'http://192.168.1.143:8080';
    var DOMAIN = 'http://localhost:8080';
    // var DOMAIN = 'http://192.168.1.143:8080';
    // var DOMAIN = 'http://localhost:8080';


    var SCHOOL_CODE = 'MEDIA';
    var DOMAIN_FILE = 'https://cdn-migi-2.laosedu.la/f';
    var DOMAIN_FILE_LOCAL = 'http://localhost:4211';
    var DOMAIN_DELETE_FILE = 'https://cdn-migi-2.laosedu.la/d';
    var DOMAIN_ULEARN = 'https://ulearn.laosedu.la/seller';
    var DOMAIN_SOCKET = 'http://localhost:8080';
    var DOMAIN_SOCKET_RX = 'ws://localhost:8080/websocket';
    // var DOMAIN_SOCKET_RX = 'ws://103.214.9.130:8240/websocket';
    var CONNECT_SOCKET_USER = false;
    var TIME_RECONNECT_SOCKET = 10000;

    window.__env.DOMAIN = DOMAIN;
    window.__env.DOMAIN_SOCKET = DOMAIN_SOCKET;
    window.__env.DOMAIN_SOCKET_RX = DOMAIN_SOCKET_RX;
    window.__env.SCHOOL_CODE = SCHOOL_CODE;
    window.__env.DOMAIN_FILE = DOMAIN_FILE;
    window.__env.DOMAIN_FILE_LOCAL = DOMAIN_FILE_LOCAL;
    window.__env.DOMAIN_DELETE_FILE = DOMAIN_DELETE_FILE;
    window.__env.DOMAIN_ULEARN = DOMAIN_ULEARN;
    window.__env.CONNECT_SOCKET_SELLER = CONNECT_SOCKET_USER;
    window.__env.TIME_RECONNECT_SOCKET = TIME_RECONNECT_SOCKET;

    console.log("DOMAIN: " + window.__env.DOMAIN);
    console.log("SCHOOL_CODE: " + window.__env.SCHOOL_CODE);

    // Whether or not to enable production mode
    // Setting this to production will disable console output
    window.__env.production = true;
}(this));
