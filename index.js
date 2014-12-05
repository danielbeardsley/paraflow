module.exports = function Paraflow(maxFlow, items, func, finished) {
   var flow = 0;
   var results = [];
   var index = 0;
   function next() {
      if (hasMore() && flow < maxFlow) {
         flow++;
         func(items[index], completorFor(index));
         index++

         if (flow < maxFlow) {
            next();
         }
      }
   }

   function done(result) {
      flow--;
      if (!hasMore()) {
         return finished && finished(results);
      }
      next();
   }

   function completorFor(index) {
      return function(err, result) {
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
