import "./common-scripts";
import { menuToggle } from "../../components/menu/index";

// Importing all svg files from '../img/svg-sprite/' and make the external sprite
const requireAll = r => r.keys().forEach(r);
requireAll(require.context("../img/svg-sprite/", true, /\.svg$/));

// Make APP.menuToggle() available from the console
export { menuToggle };
