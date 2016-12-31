'use strict';
require('jquery-ui/themes/base/core.css');
require('jquery-ui/themes/base/menu.css');
require('jquery-ui/themes/base/slider.css');
require('jquery-ui/themes/base/theme.css');

var $ = require('jquery');

require('jquery-ui/themes/base/slider.css');
require('jquery-ui/ui/widgets/slider');

import "../css/timeline.css";

class TimelineSlider {

    constructor(id, slide_callback) {
        this.config = {
            id_timeline1: "timeline",
            id_timeline2: "timelineLabelsContainer"
        };
        this.$container = this.setupContainer(id);
        this.slide_callback = slide_callback;
        this.$slider = this.$container.slider({
            max: 2000,
            min: -20000,
            step: 1000,
            value: 10000,
            slide: (event, ui) => this.slide_callback(event, ui)
        })
        this.setupLabels();
    }

    setupLabels() {
        var opt = this.$slider.data().uiSlider.options;
        var vals = opt.max - opt.min;
        for (var i = 0; i <= vals; i += opt.step) {
            var left = (i / vals * 100) + "%";
            var el = $('<label', { class: "timelineYearLabel", text: (i + opt.min).toString() }).css('left', left);
            $("#" + this.config.id_timeline2).append(el);
        }
    }

    setupContainer(id) {
        return $(id).empty().append($("div", { "id": this.config.id_timeline1 })).append($("div", { "id": this.config.id_timeline2 }))
    }
}

export default TimelineSlider;
