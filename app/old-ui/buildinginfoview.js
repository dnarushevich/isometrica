//TODO add production,demand,maintenance cost
//TODO add taken area indicator or smth

define(function (require) {
    var Backbone = require("backbone");
    var Core = require("core");
    var template = require("text!templates/buildinginfoview.html"),
        BuildingData = Core.BuildingData,
        ResourcesBarView = require("./views/resourcesbarview"),
        ToolCode = require("../tools/toolcode");

    var BuildingInfoView = Backbone.View.extend({
        events: {
            "click .button1": function () {
                vkaria.tools.selectTool(ToolCode.builder).setBuilding(this.buildingData.buildingCode);
                this.mainView.window.remove();
            }
        },
        initialize: function (options) {
            this.mainView = options.mainView;

            this.ccost = new ResourcesBarView({
                hideZeros: true
            });

            this.produce = new ResourcesBarView({
                hideZeros: true
            });

            this.demand = new ResourcesBarView({
                hideZeros: true
            });

            this.gather = new ResourcesBarView({
                hideZeros: true
            });

            this.render();
        },
        render: function () {
            this.setElement($.parseHTML(template));
            $(".ccost .value", this.$el).append(this.ccost.$el);
            $(".produce .value", this.$el).append(this.produce.$el);
            $(".demand .value", this.$el).append(this.demand.$el);
            $(".gather .value", this.$el).append(this.gather.$el);
        },
        remove: function () {
            clearInterval(this.interval);
            Backbone.View.prototype.remove.call(this);
        },
        setBuilding: function (buildingCode) {
            this.buildingData = BuildingData[buildingCode];

            $(".name", this.el).text(this.buildingData.name);
            $(".size .value", this.el).text(this.buildingData.sizeX + "x" + this.buildingData.sizeY);
            $(".ctime .value", this.el).text(this.buildingData.constructionTime / 1000 + "s");

            this.ccost.setResources(this.buildingData.constructionCost);
            this.demand.setResources(this.buildingData.demanding);
            this.produce.setResources(this.buildingData.producing);

            return this;
        }
    });

    return BuildingInfoView
});