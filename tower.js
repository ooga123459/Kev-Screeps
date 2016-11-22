/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('tower');
 * mod.thing == 'a thing'; // true
 */

var tower = {

    /** @param {Creep} creep **/
    run: function(curTower) {
       var hostile = curTower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
       curTower.attack(hostile)
    }
};

module.exports = tower;

/*

        towers.forEach(tower => tower.attack(hostiles[0]));
function defendRoom(roomName) {
    
    var hostiles = Game.rooms[roomName].find(FIND_HOSTILE_CREEPS);
    
    if(hostiles.length > 0) {
        var username = hostiles[0].owner.username;
        Game.notify(`User ${username} spotted in room ${roomName}`);
        var towers = Game.rooms[roomName].find(
            FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
        towers.forEach(tower => tower.attack(hostiles[0]));
    }
}
*/