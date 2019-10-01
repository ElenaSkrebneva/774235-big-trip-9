import {Component} from './abstractComponent.js';
import {Chart} from 'chart.js';
// import {ChartDataLabels} from 'chartjs-plugin-datalabels';

export class Stats extends Component {
  constructor(arr) {
    super();
    this.getCharts(arr);
  }
  getTemplate() {
    return `<section class="statistics" style="display: block">
      <h2 class="visually-hidden">Trip statistics</h2>

      <div class="statistics__item statistics__item--money">
        <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--transport">
        <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--time-spend">
        <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
      </div>
    </section>`;
  }
  getCharts(arr) {

    // moneyEvent chart
    const moneyEventCtx = new Chart(this.getElement().querySelector(`.statistics__chart--money`), {
      //    plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: arr.map((item) => item.destination),
        datasets: [{
          backgroundColor: `orange`,
          data: arr.map((item) => item.price),
        }],
      },
      options: {
        scales: {
            yAxes: [{
                ticks: {
                    fontColor: 'white'
                },
            }],
          xAxes: [{
                ticks: {
                    fontColor: 'white'
                },
            }]
        },
        legend: {
          display: false
        },
        title: {
          text: `Money-Event Chart`,
          display: true,
          position: `top`,
          fontColor: `yellow`,
          fontSize: 26
        }
      }
    });

    // transport chart
    const arrTransport = {
      bus: 0,
      drive: 0,
      flight: 0,
      taxi: 0,
      train: 0,
      ship: 0
    };

    Object.keys(arrTransport).forEach((key) => {
      arr.forEach((point) => {
        if (point.type === key) {
          arrTransport[key]++;
        }
      });
    });
    const transportCtx = new Chart(this.getElement().querySelector(`.statistics__chart--transport`), {
      //    plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: Object.keys(arrTransport),
        datasets: [{
          backgroundColor: `orange`,
          borderColor: `blue`,
          data: Object.values(arrTransport),
        }],
      },
      options: {
        scales: {
            yAxes: [{
                ticks: {
                    fontColor: 'white'
                },
            }],
          xAxes: [{
                ticks: {
                    fontColor: 'white'
                },
            }]
        },
        legend: {
          display: false
        },
        title: {
          text: `Money-Event Chart`,
          display: true,
          position: `top`,
          fontColor: `yellow`,
          fontSize: 26
        }
      }
    });
/*
    // type-time spent chart
    const typeSet = new Set(arr.map(point => point.type));
    const typeArr = Array.from(typeSet);
    let typeCount = {};
    typeArr.forEach(type => typeCount[type] = 0);
    Object.keys(typeCount).forEach(key => {
      arr.forEach(point => {
        if (point.type === key) {
          typeCount[key] += Math.floor((point.endingTime - point.beginningTime) / 3600000);
        }
      });
    });
    const timeCtx = new Chart(this.getElement().querySelector(`.statistics__chart--time`), {
      //    plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: Object.keys(typeCount),
        datasets: [{
          backgroundColor: `green`,
          borderColor: `blue`,
          data: Object.values(typeCount),
        }],
      },
      options: {
        scales: {
            yAxes: [{
                ticks: {
                    fontColor: 'white'
                },
            }],
          xAxes: [{
                ticks: {
                    fontColor: 'white'
                },
            }]
        },
        legend: {
          display: false
        },
        title: {
          text: `Money-Event Chart`,
          display: true,
          position: `top`,
          fontColor: `yellow`,
          fontSize: 26
        }
      }
    });
  */
  }
}
