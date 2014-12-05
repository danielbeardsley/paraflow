## Paraflow
[![Build Status](https://travis-ci.org/danielbeardsley/paraflow.svg)](https://travis-ci.org/danielbeardsley/paraflow)

Run an asynchronous function on (x) number of items in parallel while allowing
(x) to change at any time.

    var paraflow = require('paraflow');

    var jobs = [...];
    var p = paraflow(3, jobs, workFunction, function finished(err, results){});

    // later bump the number of parallel functions allowed.
    p.maxFlow(1)

Includes a simpler wrapper if you have an array of functions to call instead of
items. Each function is passed a done(result) callback as the only parameter. When
all the done(result) functions are called, the finished callback is called.

    var paraflow = require('paraflow');

    var jobs = [function(){}, function(){}]
    var p = paraflow(3, jobs, function finished(err, results){});
