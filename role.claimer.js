var helper = require('helper');

var roleClaimer = {
    
    run: function(creep) {
        for(var flag in Game.flags){
            if (flag == "newController") {
                if (Game.flags[flag].pos.roomName != creep.room.name) {
                    //PathFinder.use(false);
                    //creep.moveTo(Game.flags[flag], {avoid: helper.getAvoidedArea(creep.room)});    
                } else {
                    var cont = creep.pos.findClosestByRange(FIND_STRUCTURES, { filter: (structure) => { return structure.structureType == STRUCTURE_CONTROLLER; } });
                    if (creep.claimController(cont) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(cont);
                    }
                }
            }
        }
    }
};

module.exports = roleClaimer;