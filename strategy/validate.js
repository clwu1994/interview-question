var strategies = {
  isNonEmpty(value, errorMsg) {
    if (value === '') {
      return errorMsg;
    }
  },
  minLength(value, length, errorMsg) {
    if (value.length < length) {
      return errorMsg;
    }
  },
  isMobile(value, errorMsg) {
    if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
      return errorMsg;
    }
  },
  isRegexpMatch(value, regex, errorMsg) {
    if (!regex.test(value)) {
      return errorMsg;
    }
  },
};

export class Validator {
  constructor() {
    this.cache = [];
  }
  add(value, rules) {
    var self = this;
    for (var i = 0, rule; (rule = rules[i++]); ) {
      (function(rule) {
        var strategyArr = rule.strategy.split(':');
        var errorMsg = rule.errorMsg;
        self.cache.push(function() {
          var strategy = strategyArr.shift();
          strategyArr.unshift(value);
          strategyArr.push(errorMsg);
          return strategies[strategy].apply(self, strategyArr);
        });
      })(rule);
    }
  }
  start() {
    for (var i = 0, fun; (fun = this.cache[i++]); ) {
      var errorMsg = fun();
      if (errorMsg) return errorMsg;
    }
  }
}
