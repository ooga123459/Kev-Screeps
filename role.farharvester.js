var helper = require('helper');

var roleMulti = {

    /** @param {Creep} creep **/
    run: function(creep) {
        /*var exits = Game.map.describeExits(creep.room.name)
        var totExits = 4;
        console.log('Exits: ' + totExits)
        for (var x in exits){
            for (var r in Game.rooms) {
                if (Game.rooms[r].name == exits[x]) {
                    delete exits[x];
                    totExits -= 1;
                    break;
                }
            }
        }
        console.log(creep.room.name + ' Exits: ' + totExits)*/
        
        /*for (var i = 0; i < 50; i++) {
            var ter = Game.map.getTerrainAt(0,i,creep.room.name);
            if (ter == plain || ter == swamp) {
                
            }
        }*/
        
        
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
                var lowestCreepSource = 0;
                for (i = 0; i < sources.length; i++) {
                    if (sources[i].energy > 0) {
                        if (creepCount[i] <= creepCount[lowestCreepSource]) {
                            lowestCreepSource = i;
                        }
                    }
                }
                //console.log('LowestCreepSource: ' +lowestCreepSource)
                if(creep.memory.harSource == -1 || sources[creep.memory.harSource].energy==0){
                    creep.memory.harSource = lowestCreepSource;
                }
                var sourceFound = false;
                for (i = 0; i < sources.length; i++) {
                    if (sources[i].energy > 0) {
                        sourceFound = true;
                        break;
                    }
                }
            }
            
            //check for dropped energy
            var dropenergy = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY, { filter: (d) => {return (d.resourceType == RESOURCE_ENERGY)} });
            if (dropenergy) {
                if (creep.pickup(dropenergy) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(dropenergy);
                }
            } else {
                /////////////////////////////////////////////////////////////////////////////////////////////////////////
                //Send creep to source
                if(sourceFound == true) {
                    if(creep.harvest(sources[creep.memory.harSource]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[creep.memory.harSource]);
                    }
                } else if (creep.carry.energy == 0) {
                    //move to bored flag
                    //console.log(creep.room.name + ' Harvester moving to bored')
                    for (var flag in Game.flags){
                        if (Game.flags[flag].pos.roomName == creep.room.name && creep.room.name.substring(0,5) == 'Bored') {
                            creep.moveTo(Game.flags[flag]);
                            break;
                        }
                    }
                } else {
                    //No source energy avail, attempt to work
                    creep.memory.working = true;
                    creep.memory.harSource = -1;
                }
            }
        } else {
            /////////////////////////////////////////////////////////////////////////////////////////////////////////
            //Harvesting complete.  Reinit and distribute to task
            creep.memory.working = true;
            creep.memory.harSource = -1;
            
            /////////////////////////////////////////////////////////////////////////////////////////////////////////
            //Search for structure with less then max energy
            //////pos.findClosestByPath //creep.room.find
            var target = creep.pos.findClosestByRange(FIND_STRUCTURES, { filter: (structure) => 
                                                                {
                                                                    return ( structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_TOWER ) &&
                                                                    (structure.energy < structure.energyCapacity);
                                                                }
                                                            });
                                                            
                                                            //structure.store[RESOURCE_ENERGY] < structure.storeCapacity
            if(target == null) {
                target = creep.pos.findClosestByRange(FIND_STRUCTURES, { filter: (structure) => { return structure.structureType == STRUCTURE_STORAGE && _.sum(structure.store) < structure.storeCapacity; } });
            }
            if(target != null) {
                /////////////////////////////////////////////////////////////////////////////////////////////////////////
                //Structures found, deposit energy
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        }
    }
};

module.exports = roleMulti;