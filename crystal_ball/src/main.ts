import * as ex from "excalibur";
import * as _ from "lodash";

var game = new ex.Engine({
  width: 800,
  height: 600,
})

game.start()
console.log(_.padStart("Hello TypeScript!", 20, ">"));
