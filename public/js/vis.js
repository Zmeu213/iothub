function returnData(data){
    return data;
}

function api_select(dev, callback ) {
    var result;
    var api = "https://iothub-hackerman.c9users.io/api/get_data/device="+dev+"/from=06.25.2016/to=06.26.2016";
    $.getJSON(api)
    .done(function( data ) {
        // console.log(JSON.stringify(data));
        result = data;
        callback(returnData(result));
    })
};

function make_items(dev, callback ) {
    var items = [];
    api_select(dev,function (q) {
    for (var i = 0; i < q.length; i++) {
        var item = {};
        item["x"] = q[i].time;
        // console.log(q[i].time);
        item["y"] = parseFloat(q[i].data);
    	items.push(item) 
    }
    callback(returnData(items))
  })
}

// var items = [];
// make_items(function(q){
//     items = q;
//     console.log(q)
    
//     var container = document.getElementsByClassName('visualization');

//     var dataset = new vis.DataSet(items);
//     console.log(dataset);
//     for (var i = 0; i<4; i++){
//         var graph2d = new vis.Graph2d(container[i], dataset);    
//     }
    

// })
    // console.log(container)
    // for (var i = 0; i < 4; i++){
        
    //     make_items(5+i, function(q){
    //         // var cont = container[i]
    //         console.log(i)
    //         var container = document.getElementsByClassName('visualization');
    //         var dataset = new vis.DataSet(q);
    //         var graph2d = new vis.Graph2d(cont, dataset);
    //     })
    // }

//--
function asyncLoop(iterations, func, callback) {
    var index = 0;
    var done = false;
    var loop = {
        next: function() {
            if (done) {
                return;
            }

            if (index < iterations) {
                index++;
                func(loop);

            } else {
                done = true;
                callback();
            }
        },

        iteration: function() {
            return index - 1;
        },

        break: function() {
            done = true;
            callback();
        }
    };
    loop.next();
    return loop;
}

asyncLoop(4, function(loop) {
    make_items(5+loop.iteration(), function(q){
        var container = document.getElementsByClassName('visualization');
        console.log(container)
        var cont = container[loop.iteration()]
        
        // var container = document.getElementsByClassName('visualization');
        var dataset = new vis.DataSet(q);
        var graph2d = new vis.Graph2d(cont, dataset);
        loop.next();
    })},
    function(){console.log('cycle ended')}
);