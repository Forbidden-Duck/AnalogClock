import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as battery from "./battery.js";
import * as clockHours from "./clockHours.js";
import * as util from "../common/utils";
import * as themeLoader from "./themeLoader.js";
import * as Config from "../common/config.js";
import * as messaging from "messaging";

clock.granularity = "seconds";

initConfig();

const hourHand = document.getElementById("hours");
const minHand = document.getElementById("mins");
const secHand = document.getElementById("secs");

clock.ontick = (event) => {
  const date = event.date;
  secHand.groupTransform.rotate.angle = util.secsToAngle(date.getSeconds());
  minHand.groupTransform.rotate.angle = util.minsToAngle(date.getMinutes());
  hourHand.groupTransform.rotate.angle = util.hoursToAngle(date.getHours() % 12, date.getMinutes());
  battery.setLevel();
}

messaging.peerSocket.onmessage = function (event) {
  if (event.data.key === "theme") {
    const theme = themeLoader.findTheme(event.data.value.values[0].name);
    themeLoader.loadTheme(theme.info.id);
    Config.set("theme", theme);
    Config.save();
  }
}

function initConfig() {
  themeLoader.loadDocument(document);
  if (Config.load()) {
    const theme = Config.get("theme");
    if (theme) {
      themeLoader.loadTheme(theme.info.id);
      return;
    }
  }
  themeLoader.loadTheme("default");
}