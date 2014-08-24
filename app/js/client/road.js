define(function (require) {
    var Core = require("core");
    var engine = require("engine"),
        Building = require("./building"),
        BuildingState = require("core/buildingstate"),
        buildingData = Core.BuildingData,
        BuildingData = buildingData,
        BuildingClassCode = require("core/buildingclasscode"),
        BuildingWaypoints = require("client/buildingwaypoints"),
        RoadNode = require("./pathfinding/roadnode"),
        RoadView = require("./roadview");
    var Terrain = Core.Terrain;

    function Road() {
        this.view = new RoadView();
        this.view.setRoad(this);
    }

    Road.prototype = Object.create(Building.prototype);

    Road.prototype.typeCode = 91111;

    Road.prototype.setData = function(data){
        this.data = data;
        this.staticData = BuildingData[data.buildingCode];
        //this.tile = vkaria.terrain.getTile(data.x, data.y).tileScript;

        if(this.node === null)
            this.node = new RoadNode(this);

        this.view.update();
        this.view.render();
    };

    Road.prototype.updateRoad = function () {
        var x = Terrain.extractX(this.data.tile),
            y = Terrain.extractY(this.data.tile),
            slopeId = vkaria.core.world.terrain.calcSlopeId(x,y),
            buildman = vkaria.buildman,
            ne = buildman.getRoad(x + 1, y),
            nw = buildman.getRoad(x, y + 1),
            sw = buildman.getRoad(x - 1, y),
            se = buildman.getRoad(x, y - 1),
            id;

        if (slopeId === 2222) {
            var a = sw !== null,
                b = se !== null,
                c = ne !== null,
                d = nw !== null;

            id = 90000 + a * 1000 + b * 100 + c * 10 + d;

            if (id === 90000) return;
        } else if (slopeId === 2233) {
            id = 1;
        } else if (slopeId === 2112) {
            id = 2;
        } else if (slopeId === 2211) {
            id = 3;
        } else if (slopeId === 2332) {
            id = 4;
        }

        this.typeCode = id;

        this.view.update();
        this.view.render();

        return id;
    };

    return Road;
});