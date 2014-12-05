## Paraflow

Run an asynchronous function on (x) number of items in parallel while allowing
(x) to change at any time.

    var paraflow = require('paraflow');

    var jobs = [...];
    var p = paraflow(3, jobs, workFunction);

    // later bump the number of parallel functions allowed.
    p.setFlow(1)

