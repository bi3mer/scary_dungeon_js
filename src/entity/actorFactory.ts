import { PlayerBehavior } from "../behavior/playerBehavior";
import { Actor } from "./actor";

let actorFactory: {[name: string]: Actor} = {};

actorFactory.player = new Actor();
actorFactory.player.char = '@';
actorFactory.player.behavior = new PlayerBehavior();

export default actorFactory;