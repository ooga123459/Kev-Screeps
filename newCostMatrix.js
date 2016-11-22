var newCostMatrix = {

    run: function (rm) {
            
        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        //Set roads to cost 1 to prefer road pathfinding        
        var targets = rm.room.find(FIND_STRUCTURES, { filter: (structure) => { return (structure.structureType == STRUCTURE_ROAD); } });
        let costs = new PathFinder.CostMatrix;
        
        for (i = 0; i < targets.length; i++) {
            var curPos = targets[i].pos
            costs.set(curPos.x,curPos.y,1)
        }
    }
};

module.exports = newCostMatrix;