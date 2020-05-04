import Gauge from '../react-appjs/lib/reports/widgets/gauge';

$(()=> {
  $('.report-widget.gauge').each((i, e) => {
    const $widgetEl = $(".widget-content", e);

    // Get data properties from element.
    const options = {
      "value" : $widgetEl.data('value'),
      "radd" : $widgetEl.data('textradd'),
      "color" : $widgetEl.data('color'),
    };

    const gauge = new Gauge(options);
    gauge.render($widgetEl[0]);
  });
});