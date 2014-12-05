function Paraflow(maxFlow, items, func, finished) {
   var flow = 0;
   var results = [];
   var index = 0;
   var finishCount = 0;
   function next() {
      if (hasMore() && flow < maxFlow) {
         flow++;
         func(items[index], completorFor(index++));
         next();
      }
   }

   function done() {
      flow--;
      if (!hasMore() && finishCount == items.length) {
         return finished && finished(results);
      }
      next();
   }

   function completorFor(index) {
      return function(err, result) {
         finishCount++;
         results[index] = result;
         done();
      }
   }

   function hasMore() {
      return index < items.length;
   }

   next();

   return {
      maxFlow: function(inMaxFlow) {
         maxFlow = inMaxFlow;
         next();
      }
   }
}

Paraflow.functions = function(maxFlow, items, finished) {
   return Paraflow(maxFlow, items, function(item, done) {
      item(done);
   }, finished);
}
   
module.exports = Paraflow;
