module.exports = {
	maxEnergy: function(curRoom){
		try
		{
            var targets = curRoom.find(FIND_STRUCTURES, { filter: (structure) => { return (structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION ); } });
            var total = 0
            for (i = 0; i < targets.length; i++) {
                total += targets[i].energyCapacity
            }
			return total;
		}
		catch(e)
		{
			return false;
		}
	},
	curEnergy: function(curRoom){
		try
		{
            var targets = curRoom.find(FIND_STRUCTURES, { filter: (structure) => { return (structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION ); } });
            var total = 0
            for (i = 0; i < targets.length; i++) {
                total += targets[i].energy
            }
			return total;
		}
		catch(e)
		{
			return false;
		}
	},
	calcBody: function(curRoom, role){
		try
		{
		    // lvl 1:  300
	        // lvl 2:  550
	        // lvl 3:  800
	        // lvl 4: 1300
	        // lvl 5: 1800
	        // lvl 6: 2300
	        // lvl 7: 3100
	        // lvl 8: 3900
	        var bodyParts = ''
	        var curMaxEnergy = this.maxEnergy(curRoom);
	        console.log('Energy: ' +curMaxEnergy)
	        var roleBodys = [
                	            ['role.multi',300,[MOVE,MOVE,WORK,CARRY,CARRY]],
                	            ['role.multi',550,[MOVE,MOVE,MOVE,WORK,WORK,WORK,CARRY,CARRY]],
                	            ['role.multi',800,[MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY]],
                	            ['role.multi',1300,[MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]],
                	            ['role.multi',1800,[MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]],
                	            ['role.multi',2300,[MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]],
                	            ['role.multi',3100,[MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]],
                	            ['role.multi',3900,[MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]],
                	            
                	            ['role.harvester',300,[MOVE,MOVE,WORK,CARRY,CARRY]],
                	            ['role.harvester',550,[MOVE,MOVE,MOVE,WORK,WORK,WORK,CARRY,CARRY]],
                	            ['role.harvester',800,[MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY]],
                	            ['role.harvester',1300,[MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]],
                	            ['role.harvester',1800,[MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]],
                	            ['role.harvester',2300,[MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]],
                	            ['role.harvester',3100,[MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]],
                	            ['role.harvester',3900,[MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]],
                	            
                	            ['role.repair',300,[MOVE,MOVE,WORK,CARRY,CARRY]],
                	            ['role.repair',550,[MOVE,MOVE,MOVE,WORK,WORK,WORK,CARRY,CARRY]],
                	            ['role.repair',800,[MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]],
                	            ['role.repair',1300,[MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]],
                	            ['role.repair',1800,[MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]],
                	            ['role.repair',2300,[MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]],
                	            ['role.repair',3100,[MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]],
                	            ['role.repair',3900,[MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]],
                	            
                	            ['role.upgrader',300,[MOVE,MOVE,WORK,CARRY,CARRY]],
                	            ['role.upgrader',550,[MOVE,MOVE,MOVE,WORK,WORK,WORK,CARRY,CARRY]],
                	            ['role.upgrader',800,[MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]],
                	            ['role.upgrader',1300,[MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]],
                	            ['role.upgrader',1800,[MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]],
                	            ['role.upgrader',2300,[MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]],
                	            ['role.upgrader',3100,[MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]],
                	            ['role.upgrader',3900,[MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]]
	                        ];
            var upgradeRow = 0;
            switch (true) {
                case (curMaxEnergy >= 300 && curMaxEnergy < 550):
                    upgradeRow = 300;
                    break;
                case (curMaxEnergy >= 550 && curMaxEnergy < 800):
                    upgradeRow = 550;
                    break;
                case (curMaxEnergy >= 800 && curMaxEnergy < 1300):
                    upgradeRow = 800;
                    break;
                case (curMaxEnergy >= 1300 && curMaxEnergy < 1800):
                    upgradeRow = 1300;
                    break;
                case (curMaxEnergy >= 1800 && curMaxEnergy < 2300):
                    upgradeRow = 1800;
                    break;
                case (curMaxEnergy >= 2300 && curMaxEnergy < 3100):
                    upgradeRow = 2300;
                    break;
                case (curMaxEnergy >= 3100 && curMaxEnergy < 3900):
                    upgradeRow = 3100;
                    break;
                case (curMaxEnergy >= 3900):
                    upgradeRow = 3900;
                    break;
                default:
                    bodyParts = [MOVE,WORK,CARRY];
                    break;
            }
            
            if (bodyParts == '') {
                for (i = 0; i < roleBodys.length; i++) {
                    
                    if (roleBodys[i][0]==role && roleBodys[i][1]==upgradeRow) {
                        bodyParts = roleBodys[i][2]
                        break;
                    }
                }
            }
                      
	        return bodyParts;
	    }
		catch(e)
		{
			return false;
		}
	},
    	
    routeCreep: function(creep, dest) {
        if(creep.fatigue>0){ return -1; }
        if(typeof dest == "undefined"){ return -1; }
    
        var locStr = creep.room.name+"."+creep.pos.x+"."+creep.pos.y;
        var path = false;
    
        if(typeof Memory.routeCache !== "object"){ Memory.routeCache = {}; }
    
        if(typeof Memory.routeCache[locStr] === "undefined"){ Memory.routeCache[locStr] = {'dests':{},'established':Game.time}; }
        
        if(typeof Memory.routeCache[locStr]['dests'][''+dest.id] === "undefined"){    
            Memory.routeCache[locStr]['dests'][dest.id] = {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0};
            path = creep.room.findPath(creep.pos,dest.pos,{maxOps:500,heuristicWeight:2})
            if(typeof path[0] !== "undefined") {
                Memory.routeCache[locStr]['dests'][''+dest.id][path[0].direction]+=1;
        
                for(var i =0;i<path.length-1;i++) {
                    var step = path[i];
                    var stepStr = creep.room.name+"."+step.x+"."+step.y;
                    if(typeof Memory.routeCache[stepStr] === "undefined"){
                        Memory.routeCache[stepStr] = {'dests':{},'established':Game.time,'usefreq':0.0};
                    }
                    if(typeof Memory.routeCache[stepStr]['dests'][''+dest.id] === "undefined"){
                       Memory.routeCache[stepStr]['dests'][''+dest.id] = {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0};
                    }
                    Memory.routeCache[stepStr]['dests'][''+dest.id][path[i+1].direction]+=1;
                }
            } else {
                dir = Math.floor(Math.random()*8);
                var error = creep.move(dir);
                return error;
            }
        }
    
        for(var k in Memory.routeCache[locStr]['dests']){
            if(Game.getObjectById(k)==null){//clean out invalid routes
                delete  Memory.routeCache[locStr]['dests'][k];
            }
        }
    
        var total = 0.0//pick from the weighted list of steps
        for(var d in Memory.routeCache[locStr]['dests'][''+dest.id]){
            total+=Memory.routeCache[locStr]['dests'][''+dest.id][d];
        }
        
        var total=total*Math.random();
        var dir = 0;
        
        for(var d in Memory.routeCache[locStr]['dests'][''+dest.id]){
            total-=Memory.routeCache[locStr]['dests'][''+dest.id][d];
            if (total<0) {
                dir = d;
                break;
            }
        }
    
        if(creep.pos.getRangeTo(dest)>1 && this.pathisBlocked(creep.pos,dir)){
            dir = Math.floor(Math.random()*8);
        }
    
        var error = creep.move(dir);
        return error;
    },
    
    pathisBlocked: function(position,dir){
        switch (dir) {
            case (1)://top
                position.y-=1;
                break;
            case (2)://top right
                position.x+=1;
                position.y-=1;
                break;
            case (3)://right
                position.x+=1;
                break;
            case (4)://bottom right
                position.x+=1;
                position.y+=1;
                break;
            case (5)://bottom
                position.y+=1;
                break;
            case (6)://bottom left
                position.x-=1;
                position.y+=1;
                break;
            case (7)://left
                position.x-=1;
                break;
            case (8)://top left
                position.x-=1;
                position.y-=1;
                break;
            default://???
                break;
        }
        
        if (this.isEnterable(position)){
            return true;
        } else {
            return false;
        }
        
    },
    
    isEnterable: function (pos) {
            var atPos = pos.look();
            var SWAMP = "swamp";
            var PLAIN = "plain";
            for ( var i = 0 ; i < atPos.length ; i++ )
            {
                switch (atPos[i].type) {
                    case LOOK_TERRAIN:
                        if (atPos[i].terrain != PLAIN && atPos[i].terrain != SWAMP)
                            return false;
                        break;
                    case LOOK_STRUCTURES:
                        if (OBSTACLE_OBJECT_TYPES.includes(atPos[i].structure.structureType))
                            return false;
                        break;
                    case LOOK_CREEPS:
                        return false;
                        break;
                    case LOOK_SOURCES:
                    case LOOK_MINERALS:
                    case LOOK_NUKES:
                    case LOOK_ENERGY:
                    case LOOK_RESOURCES:
                    case LOOK_FLAGS:
                    case LOOK_CONSTRUCTION_SITES:
                    default:
                }
            }
            return true;
    }
};