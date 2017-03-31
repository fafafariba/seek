import Game from "./game";
import View from "./view";

$( () => {
  const rootEl = $(".seek");
  const game = new Game();
  new View(game, rootEl);
});
