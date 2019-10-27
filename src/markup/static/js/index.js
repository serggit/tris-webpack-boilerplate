require("offline-plugin/runtime").install();

// import './fonts/libre-baskerville-v5-latin-regular.woff';
// import './fonts/libre-baskerville-v5-latin-regular.woff2';

// import './index.html';
//import "../styles/index.scss";
// import './scripts/script.js';

const requireAll = r => r.keys().forEach(r);
requireAll(require.context("../img/svg-sprite/", true, /\.svg$/));
