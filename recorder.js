module.exports = function ParallelRecorder() {
   var events = this.events = [];
   var doneCallbacks = {};

   this.func = function(item, done) {
      events.push("started " + item);
      doneCallbacks[item] = done;
   }

   this.done = function(item, result) {
      if (doneCallbacks[item]) {
         events.push("finished " + item);
         doneCallbacks[item](result);
      }
   }
}
