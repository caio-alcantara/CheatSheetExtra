/* eslint-disable prefer-arrow-callback */
var sails = require('sails');

before(function (done) {
  this.timeout(100000);

  sails.lift(
    {
      hooks: { grunt: false, csrf: false },
      log: { level: 'warn' },
      models: { migrate: 'drop' },
    },
    function (err) {
      if (err) {
        return done(err);
      }

      return done();
    }
  );
});

after(function (done) {
  sails.lower(done);
});
