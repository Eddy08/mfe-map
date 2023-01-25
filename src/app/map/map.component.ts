import { Component } from '@angular/core';
import * as Highcharts from 'highcharts/highmaps';
import * as worldMap from '@highcharts/map-collection/custom/world-highres3.topo.json';
import highchartsExporting from 'highcharts/modules/exporting';
import highchartsExportData from 'highcharts/modules/export-data';
import highchartsAccessibility from 'highcharts/modules/accessibility';

highchartsExporting(Highcharts);
highchartsExportData(Highcharts);
highchartsAccessibility(Highcharts);

Highcharts.setOptions({
  title: {
    style: {
      color: 'black',
    },
  },
});

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {
  // Add HCView to ngAfteViewInit
  chartConstructor = 'mapChart';
  mapData = [
    {
      name: 'India',
      value: 116,
    },
    {
      name: 'United States of America',
      value: 1477,
    },
  ];
  topology: Highcharts.TopoJSON = worldMap;
  Highcharts = Highcharts;

  getGraticule = () => {
    let data = [];

    // Meridians
    for (let x = -180; x <= 180; x += 15) {
      data.push({
        geometry: {
          type: 'LineString',
          coordinates:
            x % 90 === 0
              ? [
                  [x, -90],
                  [x, 0],
                  [x, 90],
                ]
              : [
                  [x, -80],
                  [x, 80],
                ],
        },
      });
      // return data;
    }

    // Latitudes
    for (let y = -90; y <= 90; y += 10) {
      const coordinates = [];
      for (let x = -180; x <= 180; x += 5) {
        coordinates.push([x, y]);
      }
      data.push({
        geometry: {
          type: 'LineString',
          coordinates,
        },
        lineWidth: y === 0 ? 2 : undefined,
      });
    }
    return data;
  };

  map: Highcharts.Options = {
    chart: {
      map: this.topology,
    },

    title: {
      text: 'World Wide Login',
      floating: true,
      align: 'left',
      style: {
        textOutline: '2px white',
      },
    },

    subtitle: {
      text:
        'Source: <a href="https://mfe-login-app.vercel.app/">Login Application</a><br>' +
        'Click and drag to rotate globe<br>',
      floating: true,
      y: 34,
      align: 'left',
    },

    legend: {
      enabled: false,
    },

    mapNavigation: {
      enabled: true,
      enableDoubleClickZoomTo: true,
      buttonOptions: {
        verticalAlign: 'bottom',
      },
    },

    mapView: {
      maxZoom: 30,
      projection: {
        name: 'Orthographic',
        rotation: [60, -30],
      },
    },

    colorAxis: {
      tickPixelInterval: 100,
      minColor: '#BFCFAD',
      maxColor: '#31784B',
      max: 1000,
    },

    tooltip: {
      formatter: function () {
        if (this.point.name && this.point.value) {
          return `${this.point.name}: ${this.point.value}`;
        } else {
          return false; // now you don't
        }
      },
    },

    plotOptions: {
      series: {
        animation: {
          duration: 750,
        },
        clip: false,
      },
    },
    series: [
      {
        id: 'graticule',
        type: 'mapline',
        data: this.getGraticule(),
        showInLegend: false,

        //Map Color where the globe is joint
        nullColor: 'rgba(0, 0, 0, 0.05)',
        accessibility: {
          enabled: false,
        },
      },
      {
        data: this.mapData,
        type: 'map',
        joinBy: 'name',
        name: 'Total Login per million km²',
        enableMouseTracking: true,
        states: {
          hover: {
            color: '#a4edba',
            borderColor: '#333333',
          },
        },
        dataLabels: {
          enabled: false,
          format: '{point.name}',
        },

        accessibility: {
          enabled: true,
        },
      },
      {
        data:[{
          name: 'London',
          lat: 51.507222,
          lon: -0.1275
      }, {
          name: 'Birmingham',
          lat: 52.483056,
          lon: -1.893611
      }, {
          name: 'Leeds',
          lat: 53.799722,
          lon: -1.549167
      }, {
          name: 'Glasgow',
          lat: 55.858,
          lon: -4.259
      }, {
          name: 'Sheffield',
          lat: 53.383611,
          lon: -1.466944
      }, {
          name: 'Liverpool',
          lat: 53.4,
          lon: -3
      }, {
          name: 'Bristol',
          lat: 51.45,
          lon: -2.583333
      }, {
          name: 'Belfast',
          lat: 54.597,
          lon: -5.93
      }, {
          name: 'Lerwick',
          lat: 60.155,
          lon: -1.145,
          dataLabels: {
              align: 'left',
              x: 5,
              verticalAlign: 'middle'
          }
      }],
      type:'mappoint'

      }
    ],
  };
  /*
  // Second Chart
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'spline',
    },
    title: {
      text: 'Monthly Average Temperature',
    },
    subtitle: {
      text: 'Source: WorldClimate.com',
    },
    xAxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
    },
    yAxis: {
      title: {
        text: 'Temperature °C',
      },
    },
    tooltip: {
      valueSuffix: ' °C',
    },
    series: [
      {
        name: 'Tokyo',
        type: 'line',
        data: [
          7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6,
        ],
      },
      {
        name: 'New York',
        type: 'line',
        data: [
          -0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5,
        ],
      },
      {
        name: 'Berlin',
        type: 'line',
        data: [
          -0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0,
        ],
      },
      {
        name: 'London',
        type: 'line',
        data: [
          3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8,
        ],
      },
    ],
  };
  */
  /*
 // Third Chart
 */
}
