import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
@Component({
  selector: 'app-admin-board',
  templateUrl: './admin-board.component.html',
  styleUrls: ['./admin-board.component.css']
})
export class AdminBoardComponent implements OnInit {
    svg: any;
    margin = 50;
    width = 750 - (this.margin * 2);
    height = 400 - (this.margin * 2);
    start = "";
    end = "";

    update_stacked_chart(start: string, end: string){
      this.start = start;
      this.end = end;
      //const api_url = 'http://localhost:8092/predicted_values/fromDate/' + start + '/toDate/' + end;
      //d3.json(api_url).then(data => this.process_log_data(data));
      this.process_log_data('');
    }

    addDays(currentDate: Date) { 
      let date = new Date(currentDate);
      date.setDate(date.getDate() + 1);
      return date;
    }

    getDaysArray(startDate: Date, endDate: Date) {
      let dates: string[] = [];
      let currentDate: Date = startDate;
      while (currentDate <= endDate) {
        let res: string = currentDate.toISOString().slice(0,10);
        dates.push(res);
        currentDate = this.addDays(currentDate);
    }
      return dates;
  };

    process_log_data(data: any): void {
      //const api_data = data['_embedded']['data']

      var api_data = [{"id":"E6IGswsM6pw=","userId":"0","movieId":"1","comment":"this wa an awesome movie.","status":"normal","commentDate":"2021-10-29"},{"id":"q8dA0JfFtoI=","userId":"0","movieId":"1","comment":"this wa an awesome movie.","status":"normal","commentDate":"2021-10-29"},{"id":"Fy5f7lw24kw=","userId":"0","movieId":"1","comment":"select * from tablename where column=\\\\\"5\\\\\"","status":"anomolous","commentDate":"2021-10-29"},{"id":"fLQ1U21foxo=","userId":"0","movieId":"1","comment":"select * from tablename where column=\\\\\"5\\\\\"","status":"anomolous","commentDate":"2021-10-28"},{"id":"IwnmAPhh1+Q=","userId":"0","movieId":"1","comment":"this wa an awesome movie.","status":"normal","commentDate":"2021-10-28"},{"id":"V6YMPu/Lbjo=","userId":"0","movieId":"1","comment":"this wa an awesome movie.","status":"normal","commentDate":"2021-10-28"},{"id":"GMBTn1FC3tE=","userId":"0","movieId":"1","comment":"this wa an awesome movie.","status":"normal","commentDate":"2021-10-28"},{"id":"4YYQKp7+BlM=","userId":"0","movieId":"1","comment":"this wa an awesome movie.","status":"normal","commentDate":"2021-10-28"},{"id":"ENwmAggM/dU=","userId":"0","movieId":"1","comment":"this wa an awesome movie.","status":"normal","commentDate":"2021-10-30"},{"id":"fKoSNvZrPWA=","userId":"0","movieId":"1","comment":"this wa an awesome movie.","status":"normal","commentDate":"2021-10-30"},{"id":"f8Sn51Vmd+g=","userId":"0","movieId":"1","comment":"this wa an awesome movie.","status":"normal","commentDate":"2021-10-30"},{"id":"lZZqdkRCa9c=","userId":"0","movieId":"1","comment":"this wa an awesome movie.","status":"normal","commentDate":"2021-10-30"},{"id":"wAaVFxiISxg=","userId":"0","movieId":"1","comment":"select * from tablename where column=\\\\\"5\\\\\"","status":"anomolous","commentDate":"2021-10-30"},{"id":"nHuVOZXBnEM=","userId":"0","movieId":"1","comment":"select * from tablename where column=\\\\\"5\\\\\"","status":"anomolous","commentDate":"2021-10-30"},{"id":"VkRPSVNlRZs=","userId":"0","movieId":"1","comment":"select * from tablename where column=\\\\\"5\\\\\"","status":"anomolous","commentDate":"2021-10-31"},{"id":"n9nXR3GA7gM=","userId":"0","movieId":"1","comment":"select * from tablename where column=\\\\\"5\\\\\"","status":"anomolous","commentDate":"2021-10-31"},{"id":"bpk6agC33p4=","userId":"0","movieId":"1","comment":"select * from tablename where column=\\\\\"5\\\\\"","status":"anomolous","commentDate":"2021-10-31"},{"id":"G/LIBio5xnE=","userId":"0","movieId":"1","comment":"this wa an awesome movie.","status":"normal","commentDate":"2021-10-31"},{"id":"QxhUaYZIKnA=","userId":"0","movieId":"1","comment":"this wa an awesome movie.","status":"normal","commentDate":"2021-10-31"},{"id":"9npy/qKpmxk=","userId":"0","movieId":"1","comment":"this wa an awesome movie.","status":"normal","commentDate":"2021-10-31"},{"id":"St9R8KlVAVY=","userId":"0","movieId":"1","comment":"this wa an awesome movie.","status":"normal","commentDate":"2021-10-31"}]
      
      let dates_list = this.getDaysArray(new Date(this.start), new Date(this.end));

      interface log_values {
        normal: string;
        anomalous: string;
      }
      var dates_dictionary: { [id: string] : log_values; } = {};
      for (var date of dates_list) {
        dates_dictionary[date] = { normal: "0", anomalous: "0" };
      }
      
      for (var log of api_data) {
        let date = log['commentDate'];
        
        if (log['status'] == "normal") {
          dates_dictionary[date].normal = String(Number(dates_dictionary[date].normal) + 1);
        }
        else if (log['status'] == "anomolous") {
          dates_dictionary[date].anomalous = String(Number(dates_dictionary[date].anomalous) + 1);
        }
      }

      let viz_data: { Date: string, Normal: string, Anomalous: string }[]
      viz_data = []
      
      for (let key in dates_dictionary) {
        let value = dates_dictionary[key];
        let data_for_one_day = {"Date": key, "Normal": value.normal, "Anomalous": value.anomalous};
        viz_data.push(data_for_one_day);
      }

      d3.selectAll("svg").remove();
      d3.selectAll("figure").remove();
      this.createSvg();
      this.drawBars(viz_data);
    }
  
    ngOnInit(): void {
      //this.createSvg();
      ////d3.csv('log_prediction_stats.csv').then(data => this.drawBars(data));
      //this.drawBars(this.data);
    }
  
    createSvg(): void {
      console.log("here")
      this.svg = d3.select("#my_dataviz")
      .append("svg")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
    }
  
    drawBars(data: any): void {
      
      // List of subgroups; i.e. the header of the csv data:
      // Prepare the array with the keys for stacking.
      const dataColumns = Object.keys(data[0]);
      const subgroups = dataColumns.slice(1)
  
      // List of groups; i.e. value of the first
      // column - group - shown on the X axis.
      const groups = data.map((d: any) => d.Date);
  
      // Create the X-axis band scale.
      const x = d3.scaleBand()
      .domain(groups)
      .range([0, this.width])
      .padding(0.2);
  
      // Draw the X-axis on the DOM.
      this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x).tickSizeOuter(0));
      
      // Create the Y-axis band scale.
      const y = d3.scaleLinear()
      .domain([0, 60])
      .range([this.height, 0]);
  
      // Draw the Y-axis on the DOM.
      this.svg.append("g")
      .call(d3.axisLeft(y));
  
      // color palette = one color per subgroup
      const color = d3.scaleOrdinal()
      .domain(subgroups)
      .range(['#377eb8','#e41a1c']);
  
      // Stack the data per subgroup.
      const stackedData = d3.stack()
      .keys(subgroups)
      (data);
  
      // Create a tooltip.
      const tooltip = d3.select("#my_dataviz")
      .append("figure")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "5px")
      .style("padding", "10px")
  
      // Mouse function that change the tooltip when the user hovers/moves/leaves a cell.
      const mouseover = function(this: any, event: any, d: { data: { [x: string]: any; }; }) {
        /********** Hack! Otherwise, the following line would not work:
        const subgroupName = d3.select(this.parentNode).datum().key; */
        const subgroupNameObj: any = d3.select(this.parentNode).datum();
        const subgroupName = subgroupNameObj.key;
        /************ End of Hack! ************/
        const subgroupValue = d.data[subgroupName];
        tooltip.html("subgroup: " + subgroupName + "<br>" + "Value: " + subgroupValue)
              .style("opacity", 1)        
      }
      const mousemove = function(event: any, d: any) {
        tooltip.style("transform", "translateY(-55%)")  
              .style("left", (event.x)/2+"px")
              .style("top", (event.y)/2-30+"px")
      }
      const mouseleave = function(event: any, d: any) {
        tooltip.style("opacity", 0)
      }
  
      // Create and fill the stacked bars.
      this.svg.append("g")
      .selectAll("g")
      .data(stackedData)
      .join("g")
      .attr("fill", (d: any) => color(d.key))
      .selectAll("rect")    
      .data((d: any) => d)
      .join("rect")
      .attr("x", (d: any) => x(d.data.Date))
      .attr("y", (d: any) => y(d[1]))
      .attr("height", (d: any) => y(d[0]) - y(d[1]))
      .attr("width", x.bandwidth())
      .attr("stroke", "grey")
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave);
    }
  }