var helper = require('helper');

var roleMulti = require('role.multi');
var roleRepair = require('role.repair');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var newCostMatrix = require('newCostMatrix');
var roleClaimer = require('role.claimer');

var tower = require('tower');

module.exports.loop = function () {
    for(var name in Memory.creeps) { if(!Game.creeps[name]) { delete Memory.creeps[name]; } }
    
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Loop rooms
    for(var rm in Game.rooms){
        var curRoom = Game.rooms[rm]
        var spawn = curRoom.find(FIND_STRUCTURES, {filter: { structureType: STRUCTURE_SPAWN } })
        helper.buildRoads(curRoom);
        var multi = _.filter(Game.creeps, (creep) => creep.memory.role == 'multi' && curRoom.name == creep.room.name);
        var repair = _.filter(Game.creeps, (creep) => creep.memory.role == 'repair' && curRoom.name == creep.room.name);
        var harvester = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && curRoom.name == creep.room.name);
        var upgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && curRoom.name == creep.room.name);
        var claimer = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer' && curRoom.name == creep.room.name);
        if (spawn[0] != null) {
            newCostMatrix.run(spawn[0]);
            if (multi.length<helper.maxCreep(curRoom,'multi') || repair.length<helper.maxCreep(curRoom,'repair') || harvester.length<helper.maxCreep(curRoom,'harvester') || upgrader.length<helper.maxCreep(curRoom,'upgrader') || claimer.length<helper.maxCreep(curRoom,'claimer')) {
                console.log(rm + '-- Multi:' + multi.length + '/' + helper.maxCreep(curRoom,'multi') + ', Harvester:' + harvester.length + '/' + helper.maxCreep(curRoom,'harvester') + ', Repair:' + repair.length + '/' + helper.maxCreep(curRoom,'repair') + ', Upgrader:' + upgrader.length + '/' + helper.maxCreep(curRoom,'upgrader') + ', Claimer:' + claimer.length + '/' + helper.maxCreep(curRoom,'claimer') +', Total Creeps:' + _.filter(Game.creeps, (creep) => curRoom.name == creep.room.name).length);
            }
            if(multi.length < helper.maxCreep(curRoom,'multi')) {
                var cnt = multi.length; cnt += 1;
                var newName = spawn[0].createCreep(helper.calcBody(curRoom,'role.multi'), curRoom.name + '.Multi' + String(cnt), {role: 'multi', home: curRoom.name});
                if (_.isString(newName)) { console.log('Spawning new multi in '+ curRoom.name +': ' + newName); }
            } else if(harvester.length < helper.maxCreep(curRoom,'harvester')) {
                var cnt = harvester.length; cnt += 1;
                var newName = spawn[0].createCreep(helper.calcBody(curRoom,'role.harvester'), curRoom.name + '.Harvester' + String(cnt), {role: 'harvester', home: curRoom.name});
                if (_.isString(newName)) { console.log('Spawning new harvester in '+ curRoom.name +': ' + newName); }
            } else if(repair.length < helper.maxCreep(curRoom,'repair')) {
                var cnt = repair.length; cnt += 1;
                var newName = spawn[0].createCreep(helper.calcBody(curRoom,'role.repair'), curRoom.name + '.Repair' + String(cnt), {role: 'repair', home: curRoom.name});
                if (_.isString(newName)) {console.log('Spawning new repair in '+ curRoom.name +': ' + newName); }
            } else if(upgrader.length < helper.maxCreep(curRoom,'upgrader')) {
                var cnt = upgrader.length; cnt += 1;
                var newName = spawn[0].createCreep(helper.calcBody(curRoom,'role.upgrader'), curRoom.name + '.Upgrader' + String(cnt), {role: 'upgrader', home: curRoom.name});
                if (_.isString(newName)) { console.log('Spawning new upgrader in '+ curRoom.name +': ' + newName); }
            } else if(claimer.length < helper.maxCreep(curRoom,'claimer')) {
                var cnt = claimer.length; cnt += 1;
                var newName = spawn[0].createCreep([CLAIM,CLAIM,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], curRoom.name + 'Claimer' + claimer.length+1, {role: 'claimer'});
                if (_.isString(newName)) { console.log('Spawning new claimer: ' + newName); }
            }
            
            //if all creeps died, spawn the worst possible one to get things going again
            //console.log(_.filter(Game.creeps, (c) => curRoom.name==creep.room.name))
            if(_.filter(Game.creeps, (creep) => curRoom.name == creep.room.name).length == 0) {
                var cnt = multi.length; cnt += 1;
                var newName = spawn[0].createCreep([MOVE,MOVE,WORK,CARRY,CARRY], curRoom.name + '.Multi' + String(cnt), {role: 'multi'});
                if (_.isString(newName)) { console.log('Spawning new multi in '+ curRoom.name +': ' + newName); }
            }
        }
        var towers = curRoom.find(FIND_MY_STRUCTURES, { filter: {structureType: STRUCTURE_TOWER } });
        if (towers != undefined){
            for (i = 0; i < towers.length; i++) {
                tower.run(towers[i]);
            }
        }
    }
    
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Loop Creeps    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'multi') {
            roleMulti.run(creep);
        } else if (creep.memory.role == 'repair') {
            roleRepair.run(creep);
        } else if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        } else if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        } else if (creep.memory.role == 'claimer') {
            roleClaimer.run(creep);
        }
    }
    
    
}