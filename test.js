var paraflow      = require('./index.js'),
    assert        = require('assert');
    recorder      = require('./recorder.js');

describe("paraflow", function() {
   it("should run the defult number of functions in parallel", function() {
      var r = new recorder();
      var i1 = '1', i2 = '2';
      var p = paraflow(1, [i1, i2], r.func);
      assert.deepEqual(r.events, ['started 1']);
      r.done(i1);
      assert.deepEqual(r.events, ['started 1', 'finished 1', 'started 2']);
   });
});

