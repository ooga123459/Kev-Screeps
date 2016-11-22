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
	}
};