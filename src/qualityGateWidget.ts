export class QualityGateWidget {
    constructor(
        public WidgetHelpers ) { }

    public load(widgetSettings) {
        return this.showWidget(widgetSettings);
    }

    public reload(widgetSettings) {
        return this.showWidget(widgetSettings);
    }

    private showWidget(widgetSettings) {
        const $title = $("h2.title");
        $title.text(widgetSettings.name);

        // Extract settings from widgetSettings.customSettings and ask user to configure one if none is found
        let settings = JSON.parse(widgetSettings.customSettings.data);
        if (!settings || !settings.projectKey || !settings.sonarUrl  ) {
            const $container = $("#quality-info-container");
            $container.empty();
            $container.text("Sorry nothing to show, please configure the settings");
            return this.WidgetHelpers.WidgetStatusHelper.Success();
        }

        try {
            return $.getJSON( settings.sonarUrl + settings.projectKey, (data) => {
                const $span = $("<div>");
                if (data.projectStatus.status === "OK") {
                    $span.text("passed");
                    $span.addClass("level levelOk");
                }
                else {
                    $span.text("failed");
                    $span.addClass("level levelFailed");
                }
                const $container = $("#quality-info-container");
                $container.empty();
                $container.append($span);
                return this.WidgetHelpers.WidgetStatusHelper.Success();
            });

        } catch (e) {
            console.log(e);
        }
    }
}