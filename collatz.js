function calculateCollatz(){
    var paths = [];
    var steps = [];
    let input = validateInput(document.getElementById("userInput").value);
    let original = input;
    alert('You have entered '+ input + ".");

    step = 1
    while (input != 1){
    
        if (input % 2 == 0){
            input = input / 2
        } else{
            input = 3 * input + 1
        }
        paths.push(input);
        steps.push(step);
        step += 1;
    }

    document.getElementById('pathway').innerHTML = "Sequence for " + original+": "+JSON.stringify(paths) + ", for a total of " + steps.slice(-1) + " steps.";

    var frames = prepAnimationFrames(steps, paths);
    plot(frames, Math.max(...steps), Math.max(...paths));
}

function prepAnimationFrames(steps, paths) {
    var n = steps.slice(-1);
    var frames = [];
    for (var i = 0; i < n; i++) {
        frames[i] = { data: [{ x: [], y: [] }] };
        frames[i].data[0].x = steps.slice(0, i + 1);
        frames[i].data[0].y = paths.slice(0, i + 1);
    }
    return frames;
}

function validateInput(input){
 if (input < 1){
     return prompt("Please enter another value that is at least 2:");
 } else{
     return input
 }
}

function plot(frame, max_step, max_path){
    var config = {responsive: true}
    Plotly.newPlot('plot', [{
        x: frame[0].data[0].x,
        y: frame[0].data[0].y,
        fill: 'tozeroy',
        type: 'scatter',
        mode: 'lines',
        line: {color: 'green'}
      }], {
        height: 500,
        title: "Animated Plot",
        xaxis: {
            title: 'Step #',
            range: [1, max_step],
        },
        yaxis: {
          title: "Value at step #",
          range: [
            1,
            max_path
          ],
        },
        updatemenus: [{
          x: 0.1,
          y: 0,
          yanchor: "top",
          xanchor: "right",
          showactive: false,
          direction: "left",
          type: "buttons",
          pad: {"t": 87, "r": 10},
          buttons: [{
            method: "animate",
            args: [null, {
              fromcurrent: true,
              transition: {
                duration: 50,
              },
              frame: {
                duration: 100,
                redraw: false
              }
            }],
            label: "Play"
          }, {
            method: "animate",
            args: [
              [null],
              {
                mode: "immediate",
                transition: {
                  duration: 0
                },
                frame: {
                  duration: 0,
                  redraw: false
                }
              }
            ],
            label: "Pause"
          }]
        }]
      }, config).then(function() {
        Plotly.addFrames('plot', frame);
      });
}