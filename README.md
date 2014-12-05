## Paraflow

Run an asynchronous function on (x) number of items in parallel while allowing
(x) to change at any time.

    var paraflow = require('paraflow');

    var jobs = [...];
    var p = paraflow(3, jobs, workFunction, function callback(err, results){});

    // later bump the number of parallel functions allowed.
    p.maxFlow(1)

