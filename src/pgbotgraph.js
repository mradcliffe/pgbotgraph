/**
 * @file
 * pgbotgraph.js
 */
(function($, d3) {
    "use strict";

    var months = {Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06', Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'};
    var vis, g, xScale, yScale, xAxis, yAxis, linegen;
    var runs = [[], [], []];

    var testruns = $('body').html().match(/Last Run.*\s.*\s.*\s.*/gm);
    var testrun_count = testruns.length;

    testruns.forEach(function(item) {

        var nums, passes, fails, exceptions, date, datekey, len;

        date = item.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d\d?).*(\d{4})/);
        nums = item.match(/<b>\d+/g);
        len = runs[0].length;

        if (date !== null) {
            datekey = date[3] + '-' + months[date[1]] + '-' + date[2];
        }

        if (nums !== null) {
            passes = nums[0].match(/\d+/);
            fails = nums[1].match(/\d+/);
            exceptions = nums[2].match(/\d+/);
            runs[0].push({x: testrun_count - len, y: passes[0]});
            runs[1].push({x: testrun_count - len, y: fails[0]});
            runs[2].push({x: testrun_count - len, y: exceptions[0]});
        }
    });

    $('h3').html().match(/(Passes|Fails|Exceptions): (\d+)/gm).forEach(function(item) {

        var map = {Passes: 0, Fails: 1, Exceptions: 2};
        var type = item.match(/[A-Za-z]+/);
        var num = item.match(/\d+/);
        var i = map[type];

        runs[i].push({x: runs[i].length + 2, y: num[0]});
    });

    runs[0].sort(function(a, b) {
        return a.x - b.x;
    });
    runs[1].sort(function(a, b) {
        return a.x - b.x;
    });
    runs[2].sort(function(a, b) {
        return a.x - b.x;
    });

    $('body').append('<div id="graph"></div>');

    vis = d3.select('#graph')
              .append('svg')
              .attr('width', 1024)
              .attr('height', 768);

    xScale = d3.scale.linear().range([50, 970]).domain([0, runs[0].length]);
    yScale = d3.scale.linear().range([748, 20]).domain([0, 200]);

    xAxis = d3.svg.axis()
                .scale(xScale);
    yAxis = d3.svg.axis()
                .scale(yScale)
                .orient('left');

    vis.append('svg:g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0, 748)')
        .call(xAxis);

    vis.append('svg:g')
        .attr('class', 'y axis')
        .attr('transform', 'translate(50, 0)')
        .call(yAxis);

    linegen = d3.svg.line()
        .x(function(d) { return xScale(d.x); })
        .y(function(d) { return yScale(d.y); })
        .interpolate('basis');

/*    vis.append('svg:path')
        .attr('d', linegen(runs[0]))
        .attr('stroke', 'green')
        .attr('stroke-width', 4)
        .attr('fill', 'none'); */
    vis.append('svg:path')
        .attr('d', linegen(runs[1]))
        .attr('stroke', 'red')
        .attr('stroke-width', 2)
        .attr('fill', 'none');
    vis.append('svg:path')
        .attr('d', linegen(runs[2]))
        .attr('stroke', 'orange')
        .attr('stroke-width', 2)
        .attr('fill', 'none');

})(jQuery, d3);
