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
      const api_url = 'http://dashboard-lad-poc.apps.xnkpeyx0.canadacentral.aroapp.io/predicted_values/fromDate/' + start + '/toDate/' + end;
      d3.json(api_url).then(data => this.process_log_data(data));
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
      const api_data = data['_embedded']['data']      
      let dates_list = this.getDaysArray(new Date(this.start), new Date(this.end));

      interface log_values {
        normal: string;
        anomalous: string;
      }
      
      var dates_dictionary: { [id: string] : log_values; } = {};
    
      for (var date of dates_list) {
        dates_dictionary[date] = { normal: "0", anomalous: "0"};
      }

      interface comment_values {
        userId : string;
        movieId : string;
        comment : string;
        status : string;
        commentDate : string;
      }

      var comments = [] as any;

      for (var log of api_data) {
      
        let date = log['commentDate'];

        let userId = log['userId'];
        let movieId = log['movieId'];
        let comment = log['comment'];
        let status = log['status'];
        let commentDate = log['commentDate']

        if (log['status'] == "normal") {
          dates_dictionary[date].normal = String(Number(dates_dictionary[date].normal) + 1);
        }
        else if (log['status'] == "anomolous") {
          dates_dictionary[date].anomalous = String(Number(dates_dictionary[date].anomalous) + 1);
        }
        
        comments.push({logId: String(log['id']), userId: String(userId), movieId: String(movieId), comment: String(comment), status: String(status), commentDate: String(commentDate) });
      }
      
      // let viz_data: { Date: string, Normal: string, Anomalous: string, commentData:{userId: string, movieId: string, comment: string, status: string, commentDate: string}}[]
      let viz_data: { Date: string, Normal: string, Anomolous: string, commentData:{userId: string, movieId: string, comment: string, status: string, commentDate: string}}[]
      viz_data = []
      
      for (let key in dates_dictionary) {
        let value = dates_dictionary[key];
        // let data_for_one_day = {"Date": key, "Normal": value.normal, "Anomalous": value.anomalous, "commentData":[] as any};
        let data_for_one_day = {"Date": key, "Normal": value.normal, "Anomolous": value.anomalous, "commentData":[] as any};

        for (let i=0; i<comments.length ; i++){
          let cvalue = comments[i];
          if (cvalue.commentDate == key){
            data_for_one_day.commentData.push({"logId": cvalue.logId, "userId": cvalue.userId, "movieId": cvalue.movieId , "comment": cvalue.comment, "status": cvalue.status, "commentDate": cvalue.commentDate}); 
          }   
        }
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
      const subgroups = dataColumns.slice(1,3);

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
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "5px")
      .style("padding", "10px")
      .style("margin-block-start", "5em")

      // Mouse function that change the tooltip when the user hovers/moves/leaves a cell.
      const mouseover = function(this: any, event: any, d: { data: { [x: string]: any; }; }) {
        /********** Hack! Otherwise, the following line would not work:
        const subgroupName = d3.select(this.parentNode).datum().key; */
        const subgroupNameObj: any = d3.select(this.parentNode).datum();
        const subgroupName = subgroupNameObj.key;
        /************ End of Hack! ************/
        const subgroupValue = d.data[subgroupName];
        const commentsData = d.data.commentData;

        let commentStr = "";
        let order=1;
        let color = (subgroupName.toLowerCase() == "normal")?"#80b1d3":"#fb8072";
        for (let i=1; i<=commentsData.length; i++){
          if (commentsData[i-1].status == subgroupName.toLowerCase()){
            commentStr += String(order) + ". Log ID: " + commentsData[i-1].logId + " User ID: " + commentsData[i-1].userId + " Movie ID: " + commentsData[i-1].movieId + " Comment: " + commentsData[i-1].comment + "<br>";
            order++;
          }
        }
        
        tooltip.html("subgroup: " + (subgroupName.toLowerCase() == 'anomolous'?"Anomalous":"Normal") + "<br>" + "Value: " + subgroupValue + "<br>" + commentStr).style("opacity", 1).style("background-color", color)

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