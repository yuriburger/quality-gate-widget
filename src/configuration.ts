VSS.require("TFS/Dashboards/WidgetHelpers", function (WidgetHelpers) {
    WidgetHelpers.IncludeWidgetConfigurationStyles();
    VSS.register("QualityGateWidget-Configuration", function () {
        const $projectKey = $("#project-picker-input");
        const $sonarUrl = $("#sonar-url-input");
        const $sonarApiKey = $("#sonar-api-key-input");

        return {
            load: function (widgetSettings, widgetConfigurationContext) {
                const settings = JSON.parse(widgetSettings.customSettings.data);

                function configurationChange() {
                    const customSettings = {
                        data: JSON.stringify({
                            projectKey: $projectKey.val(),
                            sonarUrl: $sonarUrl.val(),
                            sonarApiKey: $sonarApiKey.val()
                        })
                    };
                    const eventName = WidgetHelpers.WidgetEvent.ConfigurationChange;
                    const eventArgs = WidgetHelpers.WidgetEvent.Args(customSettings);
                    widgetConfigurationContext.notify(eventName, eventArgs);
                }

                if (settings) {
                    if (settings.projectKey) {
                        $projectKey.val(settings.projectKey);
                    }
                    if (settings.sonarUrl) {
                        $sonarUrl.val(settings.sonarUrl);
                    }
                    if (settings.sonarApiKey) {
                        $sonarApiKey.val(settings.sonarApiKey);
                    }
                }
                $projectKey.on("change", function () {
                    configurationChange();
                });
                $sonarUrl.on("change", function () {
                    configurationChange();
                });
                $sonarApiKey.on("change", function () {
                    configurationChange();
                });

                return WidgetHelpers.WidgetStatusHelper.Success();
            },
            onSave: function () {
                const customSettings = {
                    data: JSON.stringify({
                        projectKey: $projectKey.val(),
                        sonarUrl: $sonarUrl.val(),
                        sonarApiKey: $sonarApiKey.val()
                    })
                };
                return WidgetHelpers.WidgetConfigurationSave.Valid(customSettings);
            }
        };
    });
    VSS.notifyLoadSucceeded();
});
