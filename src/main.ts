
        VSS.require(["TFS/Dashboards/WidgetHelpers", "TFS/WorkItemTracking/RestClient"], function (WidgetHelpers, TFS_Wit_WebApi) {
            WidgetHelpers.IncludeWidgetStyles();
            VSS.register("QualityGateWidget", function () {
                const getQueryInfo = function (widgetSettings) {
                    // Extract settings from widgetSettings.customSettings and ask user to configure one if none is found
                    const settings = JSON.parse(widgetSettings.customSettings.data);
                    if (!settings || !settings.projectKey || !settings.sonarUrl  ) {
                        const $container = $("#query-info-container");
                        $container.empty();
                        $container.text("Sorry nothing to show, please configure the settings");
                        return WidgetHelpers.WidgetStatusHelper.Success();
                    }

                    // https://localhost/api/qualitygates/project_status?projectKey=Demo:quality-gate-dem
                    // {"projectStatus":{"status":"OK","conditions":[],"periods":[],"ignoredConditions":false}}

                    return $.getJSON( settings.sonarUrl + settings.projectKey, function(data) {
                        const $span = $("<div>");

                        if (data.projectStatus.status === "OK") {
                            $span.text("passed");
                            $span.addClass("level levelOk");
                        }
                        else {
                            $span.text("failed");
                            $span.addClass("level levelFailed");
                        }

                        const $container = $("#query-info-container");
                        $container.empty();
                        $container.append($span);

                        return WidgetHelpers.WidgetStatusHelper.Success();
                        })
                        .fail(function(error) {
                            console.log(error);
                            return WidgetHelpers.WidgetStatusHelper.Failure("Error occurred");
                        });
                };
                return {
                    load: function (widgetSettings) {
                        // Set your title
                        const $title = $("h2.title");
                        $title.text(widgetSettings.name);
                        return getQueryInfo(widgetSettings);
                    },
                    reload: function (widgetSettings) {
                        const $title = $("h2.title");
                        $title.text(widgetSettings.name);
                        return getQueryInfo(widgetSettings);
                    }
                };
            });
            VSS.notifyLoadSucceeded();
        });