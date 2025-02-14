import CollisionFlagMap from '#rsmod/collision/CollisionFlagMap.js';
import CollisionFlag from '#rsmod/flag/CollisionFlag.js';

import LocAngle from '#lostcity/engine/collision/LocAngle.js';

export default class WallStraightCollider {
    private readonly flags: CollisionFlagMap;

    constructor(flags: CollisionFlagMap) {
        this.flags = flags;
    }

    change(
        x: number,
        z: number,
        level: number,
        angle: number,
        blockrange: boolean,
        add: boolean
    ): void {
        const west = blockrange ? CollisionFlag.WALL_WEST_PROJ_BLOCKER : CollisionFlag.WALL_WEST;
        const east = blockrange ? CollisionFlag.WALL_EAST_PROJ_BLOCKER : CollisionFlag.WALL_EAST;
        const north = blockrange ? CollisionFlag.WALL_NORTH_PROJ_BLOCKER : CollisionFlag.WALL_NORTH;
        const south = blockrange ? CollisionFlag.WALL_SOUTH_PROJ_BLOCKER : CollisionFlag.WALL_SOUTH;
        switch (angle) {
            case LocAngle.WEST:
                if (add) {
                    this.flags.add(x, z, level, west);
                    this.flags.add(x - 1, z, level, east);
                } else {
                    this.flags.remove(x, z, level, west);
                    this.flags.remove(x - 1, z, level, east);
                }
                break;
            case LocAngle.NORTH:
                if (add) {
                    this.flags.add(x, z, level, north);
                    this.flags.add(x, z + 1, level, south);
                } else {
                    this.flags.remove(x, z, level, north);
                    this.flags.remove(x, z + 1, level, south);
                }
                break;
            case LocAngle.EAST:
                if (add) {
                    this.flags.add(x, z, level, east);
                    this.flags.add(x + 1, z, level, west);
                } else {
                    this.flags.remove(x, z, level, east);
                    this.flags.remove(x + 1, z, level, west);
                }
                break;
            case LocAngle.SOUTH:
                if (add) {
                    this.flags.add(x, z, level, south);
                    this.flags.add(x, z - 1, level, north);
                } else {
                    this.flags.remove(x, z, level, south);
                    this.flags.remove(x, z - 1, level, north);
                }
                break;
        }
        if (blockrange) {
            // If just blocked projectiles, then block normally next.
            return this.change(x, z, level, angle, false, add);
        }
    }
}
