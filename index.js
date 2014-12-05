module.exports = function Paraflow(flow, items, func) {
   function next() {
      if (items.length > 0) {
         func(items.shift(), next);
      }
   }

   next();
}
