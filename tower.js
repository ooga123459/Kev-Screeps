var tower = {

    /** @param {Creep} creep **/
    run: function(curTower) {
       var hostile = curTower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
       curTower.attack(hostile)
    }
};

module.exports = tower;