import QualityGateWidget = require("./qualityGateWidget");

VSS.require(["TFS/Dashboards/WidgetHelpers"], (WidgetHelpers) => {
    WidgetHelpers.IncludeWidgetStyles();
    VSS.register("QualityGateWidget", () => {
        const qualityGateWidget = new QualityGateWidget.QualityGateWidget(WidgetHelpers);
        return qualityGateWidget;
    });
    VSS.notifyLoadSucceeded();
});