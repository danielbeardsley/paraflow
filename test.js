var paraflow      = require('./index.js'),
    assert        = require('assert');
    recorder      = require('./recorder.js');

describe("paraflow", function() {
   it("should run the deafult number of functions in parallel", function() {
      var r = new recorder();
      var i1 = 'item1', i2 = 'item2';
      var p = paraflow(1, [i1, i2], r.func);
      assert.deepEqual(r.events, ['started item1', 'started item2']);
   });
});

