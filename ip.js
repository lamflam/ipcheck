
module.exports = exports = {

	validateRange: function(low, high) {

		if (!this.validate(low) || !this.validate(high)) 
			return false;

		return this.toInt(low) <= this.toInt(high);
	},

	validate: function(ip) {

		if (typeof(ip) != "string") return false;

		var subs  = ip.split('.');
		var i     = 0;

		if (subs.length != 4) return false;

		for (i = 0; i < 4; i++) {
			if (subs[i] < 0 || subs[i] > 255) return false;
		}
		return true;
	},

	toInt: function(ip) {

		if (!this.validate(ip)) return 0;
		
		var s  = ip.split('.');

                // The << operator works with signed integers but we
                // need to make sure the ip is always treated as an unsigned
                // (positive) integer. The >>> operator is the only operator in
                // js that works on unsigned ints, so use it at the end to make
                // sure that we return an unsigned int.
		return (s[0]<<24 | s[1]<<16 | s[2]<<8 | s[3])>>>0;
	}
}
