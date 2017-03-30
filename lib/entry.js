import Game from "./game";
import View from "./view";

$( () => {
  console.log("inside entry");
  const rootEl = $(".seek");
  const game = new Game();
  new View(game, rootEl);
});
