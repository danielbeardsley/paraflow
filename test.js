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
      var p = paraflow(1, [1, 2, 3, 4], r.func);
      assert.deepEqual(r.events, ['started 1']);
      // allow 2 to start
      p.maxFlow(2);
      assert.deepEqual(r.events, ['started 1', 'started 2']);
      // prevent any from starting
      p.maxFlow(0);
      r.done(1);
      r.done(2);
      // assert no more have started
      assert.deepEqual(r.events, [
         'started 1',  'started 2',
         'finished 1', 'finished 2']);
      // allow one more to start
      p.maxFlow(1);
      assert.equal(r.events.length, 5);
      assert.equal(r.events[4], 'started 3');
   });

   it("should call the done function when all items are processed", function() {
      var r = new recorder();
      var p = paraflow(1, [1], r.func, function() {
         r.events.push("DONE");
      });
      assert.deepEqual(r.events, ['started 1']);
      r.done(1);
      assert.deepEqual(r.events, ['started 1', 'finished 1', 'DONE']);
   });

   it("should call the done function when all items are processed, but not before", function() {
      var r = new recorder();
      var done = false;
      var p = paraflow(2, [1, 2], r.func, function() {
         done = true
      });
      assert(!done);
      r.done(1);
      assert(!done);
      r.done(2);
      assert(done);
   });

   describe("map operion", function() {
      it("should perform basically on a single item", function() {
         var r = new recorder();
         var results;
         var p = paraflow(1, [1], r.func, function(output) {
            results = output
         });
         r.done(1, 'X');
         assert.deepEqual(results, ['X']);
      });

      it("should return the results in the input order, not finish order", function() {
         var r = new recorder();
         var results;
         var p = paraflow(3, [1, 2, 3], r.func, function(output) {
            results = output;
         });
         r.done(2, 'two');
         r.done(3, 'three');
         r.done(1, 'one');
         assert.deepEqual(results, ['one', 'two', 'three']);
      });
   });

   describe("functions()", function() {
      it("should perform the operation on a set of functions", function() {
         function ret1(done) { done(null, 1) }
         function ret2(done) { done(null, 2) }
         var done;
         paraflow.functions(1, [ret2, ret1], function(results) {
            assert.deepEqual(results, [2,1]);
            done = true;
         });
         assert.equal(done, true);
      });
   });
});

