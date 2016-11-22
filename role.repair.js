var helper = require('helper');

var roleRepair = {
    
run: function(creep) {

        if(creep.carry.energy == 0){
            creep.memory.working = false;
        }
        if(creep.carry.energy < creep.carryCapacity && creep.memory.working == false) {
            //init vars
            var sources = creep.room.find(FIND_SOURCES);
            var creepCount = new Array()
            
            /////////////////////////////////////////////////////////////////////////////////////////////////////////
            //Has harvesting source been determined? Check
            if (creep.memory.harSource = -1) {
                /////////////////////////////////////////////////////////////////////////////////////////////////////////
                //add up creepCount for each source
                for (i = 0; i < sources.length; i++) {
                    if (!creepCount[i]) {
                        creepCount[i] = 0;
                    }
                }
                for (i = 0; i < sources.length; i++) {
                    for(var cName in Game.creeps) {
                        var cre = Game.creeps[cName];
                        if (cre.memory.harSource != -1) {
                            creepCount[cre.memory.harSource] += 1;
                            //console.log('CreepCount for Source ' + i + ': ' + creepCount[cre.memory.harSource])
                        }
                    }
                }
                
                //console.log('CreepCount[0]: ' + creepCount[0] + ' CreepCount[1]: ' + creepCount[1])
                /////////////////////////////////////////////////////////////////////////////////////////////////////////
                //Determine best source to send creep to
                var lowestCreepSource = 0
                for (i = 0; i < sources.length; i++) {
                    if (sources[i].energy > 0) {
                        if (creepCount[i] <= creepCount[lowestCreepSource]) {
                            lowestCreepSource = i
                        }
                    }
                }
                //console.log('LowestCreepSource: ' +lowestCreepSource)
                creep.memory.harSource = lowestCreepSource;
            }
            /////////////////////////////////////////////////////////////////////////////////////////////////////////
            //Send creep to source
            if(creep.harvest(sources[creep.memory.harSource]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.harSource]);
            }
            
        } else {
            /////////////////////////////////////////////////////////////////////////////////////////////////////////
            //Harvesting complete.  Reinit and distribute to task
            creep.memory.working = true;
            creep.memory.harSource = -1;
            
            /////////////////////////////////////////////////////////////////////////////////////////////////////////
            //Search for structure with less then max energy
            //////pos.findClosestByPath //creep.room.find  //structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_CONTAINER ||
            //structure.structureType == STRUCTURE_ROAD &&
            var percent = 0;
            if (creep.room.find(FIND_CONSTRUCTION_SITES) != null) {
                percent=0.5;
            } else {
                percent=0.9;
            }
            var target = creep.pos.findClosestByRange(FIND_STRUCTURES, { filter: (structure) => 
                                                                {
                                                                    return (structure.hits < (structure.hitsMax * percent));
                                                                }
                                                            });
            if(target != null) {
                /////////////////////////////////////////////////////////////////////////////////////////////////////////
                //Damaged structure found, move and repair
                var resp = creep.repair(target)
                if(resp == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                } else if (resp == OK) {
                    creep.say('Repairing')
                }
            } else {
                /////////////////////////////////////////////////////////////////////////////////////////////////////////
                //Damaged structure not found, try to build, and as last resort, move to spawn point
                var targetTwo = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
                if (targetTwo == null) {
                    var moveToConsSpawn = ""
                    for(var rm in Game.rooms){
                        var curRoom = Game.rooms[rm]
                        var spawn = Game.rooms[rm].find(FIND_CONSTRUCTION_SITES, { filter: (structure) => { return (structure.structureType == STRUCTURE_SPAWN); } })
                        if (spawn[0] != null) {
                            moveToConsSpawn = spawn[0]
                        }
                    }
                    if (moveToConsSpawn != ""){
                        creep.moveTo(moveToConsSpawn);
                    } else {
                        var target = creep.pos.findClosestByRange(FIND_STRUCTURES, { filter: (structure) => { return (structure.structureType == STRUCTURE_SPAWN); } });
                        creep.moveTo(target);
                    }
                } else {
                    creep.say('building')
                    if(creep.build(targetTwo) == ERR_NOT_IN_RANGE)
                    {
                        /////////////////////////////////////////////////////////////////////////////////////////////////////////
                        //Buildable structures found, deploy
                        creep.moveTo(targetTwo);
                    }
                }
            }
        }
    }
};

module.exports = roleRepair;