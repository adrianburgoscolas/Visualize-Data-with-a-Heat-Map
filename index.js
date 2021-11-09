document.addEventListener('DOMContentLoaded',()=>{
    //AJAX
    const xhr = new XMLHttpRequest();
    xhr.open('GET','https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json')
    xhr.send();
    xhr.onload = ()=>{

        const json = JSON.parse(xhr.responseText);
        const dataset = [...json.monthlyVariance]
        //Chart
        const w = 800;
        const h = 500;
        const padding = 70;

        const colorScale = d3.scaleLinear()
                        .domain([d3.min(dataset,(d)=>8.66+d.variance),d3.max(dataset,(d)=>8.66+d.variance)])
                        .range([90,0]);

        const tempScale = d3.scaleLinear()
                        .domain([d3.min(dataset,(d)=>8.66+d.variance),d3.max(dataset,(d)=>8.66+d.variance)])
                        .range([padding,w-padding]);

        const legendScale = d3.scaleLinear()
                        .domain([1,dataset.length])
                        .range([padding,w-padding]);

        const legendColorScale = d3.scaleLinear()
                        .domain([1,dataset.length])
                        .range([90,0])

        const xScale = d3.scaleLinear()
                        .domain([d3.min(dataset,(d)=>d.year),d3.max(dataset,(d)=>d.year)])
                        .range([padding,w-padding]);

        const yScale = d3.scaleLinear()
                        .domain([0,11])
                        .range([h-padding,padding]);

        const chart = d3.select('main')
                        .select('#chart')
                        .append('svg')
                        .attr('width',w)
                        .attr('height',h);

        const legend = d3.select('#chart-legend')
                        .append('svg')
                        .attr('id','legend')
                        .attr('height',35)
                        .attr('width',800);

        //tootip
        const tooltip = d3.select('#tooltip')
        
        legend.selectAll('rect')
            .data(dataset)
            .enter()
            .append('rect')
            .attr('fill',(d,i)=>{return `hsl(${legendColorScale(i)},80%,48%)`})
            .attr('x',(d,i)=>legendScale(i))
            .attr('y',0)
            .attr('width',1)
            .attr('height',16)
                       
        chart.selectAll('rect')
            .data(dataset)
            .enter()
            .append('rect')
            .attr('class','cell')
            .attr('fill',(d)=>{ 
                return `hsl(${colorScale(8.66+d.variance)},80%,48%)`
            })
            .attr('data-month',(d)=>d.month-1)
            .attr('data-year',(d)=>d.year)
            .attr('data-temp',(d)=>8.66+d.variance)
            .attr('width',3)
            .attr('height',33)
            .attr('x',(d)=>xScale(d.year))
            .attr('y',(d)=>{return yScale(d.month)})
            .on('mouseover',(d)=>{
                // console.log()
                tooltip.style('visibility','visible')
                tooltip.style("top", (d.pageY-15)+"px").style("left",(d.pageX+10)+"px");
                tooltip.attr('data-year',d.target.__data__.year)
                tooltip.text(month[d.target.__data__.month]+' '+d.target.__data__.year+' '+(8.66+d.target.__data__.variance+'℃'))
            })
            .on('mouseout',(d)=>{
                tooltip.style('visibility','hidden')
            })
        
        const xAxis = d3.axisBottom(xScale).tickFormat(d3.format('Y'));
                        chart.append('g')
                        .attr('id','x-axis')
                        .attr('transform',`translate(0,${h-padding})`)
                        .call(xAxis);

        const month = ["January","February","March","April","May","June","July", "August","September","October","November","December"];
        const yAxis = d3.axisLeft(yScale).tickFormat((d,i)=>month[i]);
                        chart.append('g')
                        .attr('id','y-axis')
                        .attr('transform',`translate(${padding},0)`)
                        .call(yAxis)

        const xTempAxis = d3.axisBottom(tempScale);
                            legend.append('g')
                            .attr('transform','translate(0,16)')
                            .call(xTempAxis)

        
            


        }

    
});