function alpha_func(x) {
    let val = Math.min(x, 1);

    console.log(val);

    return val;
}

function colour_from_score(val) {
    let abs = Math.abs(val);
    let alpha = alpha_func(abs);
    let colour = (val < 0 ? "255, 75, 75, " : "75, 255, 75, ") + alpha;
    return "background-color: rgba(" + colour + ")";
}


console.log(localStorage.getItem("responsedata"));
let info = JSON.parse(localStorage.getItem("responsedata"));
console.log(info);
let audio = JSON.parse(info.audio);
console.log(audio[0].filedata);

let pics = info.images;
let imageData = [];

pics.forEach((pic) => {
        let p = pic[0].emotions;
        // document.getElementById('photos').innerHTML += p + '<br>';
        imageData.push(p);
    }
);

plot(imageData);


audio[0].filedata.forEach(snt => {

    let card = document.createElement("div");
    card.className = "card";
    card.setAttribute("style", "margin-bottom: 15px;");

    let body = document.createElement("div");
    body.className = "card-body";

    let content = document.createElement("div");
    content.className = "tab-content";
    content.innerText = snt.sentence + "    " + (snt.score * snt.magnitude);
    body.setAttribute("style", colour_from_score(snt.score * snt.magnitude));

    body.append(content);
    card.append(body);
    document.getElementById('test').append(card);
    if (Math.abs(snt.score * snt.magnitude - info.slider) > 0.4) {
        let card2 = document.createElement("div");
        card2.className = "card";
        card2.innerHTML = card.innerHTML;
        document.getElementById('offtarget').append(card2);


    }

});


function transpose(a) {
    return Object.keys(a[0]).map(function (c) {
        return a.map(function (r) {
            return r[c];
        });
    });
}


function plot(input) {
    let na = Array.apply(null, {length: input.length}).map(Number.call, Number);
    let transposed = transpose(input);

    var data = [];
    var names = ['Joy', 'Sorrow', 'Anger', 'Surprise'];
    // transposed.forEach((val, i) => {
    //     data.push({
    //         x: val,
    //         y: na,
    //         name: names[i],
    //         type: 'scatter'
    //     })
    // });

    let posneg = [];

    input.forEach((val, i) => {
        posneg.push((val[0] + val[4]) - (val[2] + val[3]));
    });

    data.push({
        y: na,
        x: posneg,
        type: 'scatter'
    });

    console.log(data);

    var layout = {
        autosize: false,
        width: 500,
        height: 700,
        margin: {
            l: 5,
            r: 5,
            b: 5,
            t: 30,
            pad: 4
        },
        title: {
            text: 'Image Emotional Analysis',
            font: {
                family: 'Courier New, monospace',
                size: 24
            },
            xref: 'paper',
            x: 0.05,
        },

        xaxis: {
            autorange: true,
            showgrid: false,
            zeroline: true,
            zerolinewidth: 4,
            showline: false,
            autotick: true,
            ticks: '',
            showticklabels: false,
            title: {
                text: 'Negative           Positive',
                font: {
                    family: 'Courier New, monospace',
                    size: 18,
                    color: '#7f7f7f'
                }
            }
        },
        yaxis: {
            autorange: true,
            showgrid: false,
            zeroline: false,
            showline: false,
            autotick: true,
            ticks: '',
            showticklabels: false,
            title: {
                text: 'Progress of speech',
                font: {
                    family: 'Courier New, monospace',
                    size: 18,
                    color: '#7f7f7f'
                }
            }
        }


    };
    Plotly.newPlot('plot', data, layout);
}