var paraflow      = require('./index.js'),
    assert        = require('assert');
    recorder      = require('./recorder.js');

describe("paraflow", function() {
   it("should run items in serial when asked", function() {
      var r = new recorder();
      var p = paraflow(1, [1, 2], r.func);
      assert.deepEqual(r.events, ['started 1']);
      r.done(1);
      assert.deepEqual(r.events, ['started 1', 'finished 1', 'started 2']);
   });

   it("should run X items in parallel when asked", function() {
      var r = new recorder();
      var p = paraflow(2, [1, 2], r.func);
      assert.deepEqual(r.events, ['started 1', 'started 2']);
      r.done(1);
      r.done(2);
      assert.deepEqual(r.events, [
         'started 1', 'started 2',
         'finished 1', 'finished 2']);
   });

   it("should run X items in parallel and allow changing maxFlow", function() {
      var r = new recorder();
      var p = paraflow(1, [1, 2, 3], r.func);
      assert.deepEqual(r.events, ['started 1']);
      p.flow(2);
      assert.deepEqual(r.events, ['started 1', 'started 2']);
      p.flow(0);
      r.done(1);
      r.done(2);
      assert.deepEqual(r.events, [
         'started 1',  'started 2',
         'finished 1', 'finished 2']);
      p.flow(1);
      assert.equal(r.events.length, 5);
      assert.equal(r.events[4], 'started 3');
   });
});

