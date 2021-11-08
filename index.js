document.addEventListener('DOMContentLoaded',()=>{
    //AJAX
    const xhr = new XMLHttpRequest();
    xhr.open('GET','https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json')
    xhr.send();
    xhr.onload = ()=>{

        const json = JSON.parse(xhr.responseText);
        const dataset = [...json.monthlyVariance]
        // console.log(json)
        // console.log(dataset);
        //Chart
        const w = 800;
        const h = 500;
        const padding = 70;

        const colorScale = d3.scaleLinear()
                        .domain([d3.min(dataset,(d)=>8.66+d.variance),d3.max(dataset,(d)=>8.66+d.variance)])
                        .range([0,10])

        const chart = d3.select('main')
                        .select('div')
                        .append('svg')
                        .attr('width',w)
                        .attr('height',h)
                       
        chart.selectAll('rect')
            .data(dataset)
            .enter()
            .append('rect')
            .attr('class','cell')
            .attr('fill',(d)=>colorScale(8.66+d.variance))
            .attr('data-month',(d)=>d.month)
            .attr('data-year',(d)=>d.year)
            .attr('data-temp',(d)=>8.66+d.variance)

        const xAxis = d3.select('svg')
                        .append('g')
                        .attr('id','x-axis')

        const yAxis = d3.select('svg')
                        .append('g')
                        .attr('id','y-axis')

        }

    
});