import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEnvelope,
  faUser,
  faSpinner,
  faPen,
} from "@fortawesome/free-solid-svg-icons";

function initIcons() {
  return library.add(faEnvelope, faUser, faSpinner, faPen);
}

export default initIcons;
