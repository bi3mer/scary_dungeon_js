import { Actor } from "./actor";
import { Entity } from "./entity";

let entityFactory: {[name: string]: Entity} = {};

entityFactory.player = new Actor();
entityFactory.player.char = '@';


export default entityFactory;