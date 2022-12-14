import { Component, Input, OnInit, ViewChild } from '@angular/core';
declare const $: any;

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexMarkers,
  ApexFill,
  ApexYAxis,
  ApexTooltip
} from "ng-apexcharts";
import { StorageService } from 'src/app/services/storage.service';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ShareDataService } from 'src/app/services/share-data.service';
export type ChartOptions = {
  series?: ApexAxisChartSeries |any;
  chart?: ApexChart | any ;
  xaxis?: ApexXAxis | any;
  yaxis?:ApexYAxis| any;
  dataLabels?: any | any;
  grid?: ApexGrid | any;
  stroke?: ApexStroke | any;
  title?: ApexTitleSubtitle | any;
  markers?: ApexMarkers | any;
  colors?: any;
  fill?: ApexFill | any;
  tooltip?: ApexTooltip | any;
  plotOptions?:any
};
@Component({
  selector: 'post-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  @ViewChild("chart") chart !: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;
  @Input() carDetail:any
  @Input() bidList:any
  value !:''
  graphList: any;
  graphPrice: any;
  params: any;
  categoriesArray: any
  graphData: any;
  fetchingData = false;
  userInfo: any;
  constructor(private storageService: StorageService , 
    private httpService:HttpService,
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private shareDataService: ShareDataService,) {
      this.params = this.activatedRoute.snapshot.params;
  }

  ngOnInit(): void {
    this.userInfo = this.storageService.getFromLocalStorage('userInfo');
    this.getGraphData();
  }

  getGraphData() {
    this.fetchingData = true;
    let endpoint:any = '';
    if(!this.userInfo) {
    let  email:any =this.shareDataService.currentEmail;
      endpoint =  `seller/graph/list/${this.params.id}/?email=${email}`;
    
  } else {
      endpoint = `seller/graph/list/${this.params.id}/`
    }
    this.httpService.get(endpoint).subscribe((res:any) => {
      res.data = res.data.sort((a:any, b:any) => {
        return a.x - b.x;
      });
      this.graphList = res.data|| [];
      this.graphList = this.graphList.map((element: any) => {
        element.x = element.x.toLocaleString();
        return element;
      });
      this.chartOptions = {
        plotOptions: {
          bar: {
             borderRadius: 3,
             distributed: false,
             columnWidth: this.getPercentWidth( this.graphList.length ),
             dataLabels: {
              position: 'top',
              maxItems: 10,
            },
          }
        },
        series: [{
          data: this.graphList
        }],
        chart: {
          height: 250,
          type: "bar",
          zoom: {
            enabled: false
          },
          toolbar: {
            show: true,
            tools: {
              download: false
            }
          },
        },
        fill: {
          colors: ["#46C7C2" ,"#46C7C2"],
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          //type: "number",
          
          tickAmount: (this.graphList.length - 1),
          labels: {
            show: true,
            formatter: function (value:any) {
              return parseInt(value).toLocaleString()
            },
           
            style: {
              fontWeight: 500,
              fontSize: '12px',
              cssClass: 'apexcharts-xaxis-label',
              colors: '#8d8d8d',
            }, 
          }
        },
        yaxis: {
          opposite: true,
          show: true,
          min: 0,
          max: 100,
          tickAmount: 5,
          reversed: false,
          showAlways: true,
          labels:{
           // show: true,
           offsetX:-12,
            
             align: 'right',
            formatter: function (val:any) {
              return `${val} %`;
            },
            
            style: {
              fontFamily: 'Gotham',
              fontWeight: 500,
              fontSize: '14px',
              colors: '#8d8d8d',
              cssClass: 'apexcharts-yaxis-label',
            },
          },
        },
        tooltip: {
          custom: (series:any, seriesIndex:any, dataPointIndex:any, w:any) => {
            var data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
            if(data.count > 1){
              return '<ul class="tooltip-ui">' +
              '<li><b>Win Rate</b>:  ' + data.y + '%</li>' +
              '<li ><b>Offers</b>: ' + data.count + '</li>' +
              '</ul>';
            }
            else{
              return '<ul class="tooltip-ui">' +
              '<li><b>Win Rate</b>:  ' + data.y + '%</li>' +
              '<li ><b>Offer</b>: ' + data.count + '</li>' +
              '</ul>';
            }
           
          }
        }  
      };
      this.fetchingData = false;
    }, (err:any) => {
      this.fetchingData = false;
    });
  }

  getPercentWidth(n:any):any {
    // const percentWidth = Math.round((x / (w / n)) * 100);
    if (n === 10) return '60%';
    if(n >= 9) return '55%';
    if(n >= 5) return '40%';
    if(n === 4) return '30%';
    if(n === 3) return '20%';
    if(n === 2) return '15%';
    if(n === 1) return '10px';
    // return `${percentWidth}%`
  }

  getXAxisValue(value: any) {
    const graphItem = this.graphList.find((item: any) => {
      return item.x === value && item.count;
    });
    if(!graphItem) {
      return '';
    } else {
      return parseInt(value).toLocaleString();
    }
  }
}
