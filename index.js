module.exports = function Paraflow(maxFlow, items, func, finished) {
   var flow = 0;
   var results = [];
   function next() {
      if (items.length > 0 && flow < maxFlow) {
         flow++;
         func(items.shift(), done);
         if (flow < maxFlow) {
            next();
         }
      }
   }

   function done(result) {
      flow--;
      results.push(result);
      if (items.length == 0) {
         return finished && finished(results);
      }
      next();
   }

   next();

   return {
      maxFlow: function(inMaxFlow) {
         maxFlow = inMaxFlow;
         next();
      }
   }
}
