
var IP = require('./ip');

describe("IP Validation", function() {

	it("should fail if given an invalid argument", function(next) {
		expect(IP.validate()).toBe(false);
		expect(IP.validate("")).toBe(false);
		next();
	});

	it("should fail if IP is not 4 octects", function(next) {
		expect(IP.validate("127")).toBe(false);
		expect(IP.validate("127.0.0.0.1")).toBe(false);
		expect(IP.validate("127.0.1")).toBe(false);
		next();
	});

	it("should fail if IP is not a valid range", function(next) {
		expect(IP.validate("355.0.0.1")).toBe(false);
		expect(IP.validate("-1.2.3.200")).toBe(false);
		expect(IP.validate("10.0.23.450")).toBe(false);
		next();
	});

	it("should pass if IP is a valid", function(next) {
		expect(IP.validate("10.0.0.1")).toBe(true);
		expect(IP.validate("127.2.3.200")).toBe(true);
		expect(IP.validate("192.168.12.156")).toBe(true);
		next();
	});	
});

describe("IP Range Validation", function() {

	it("should fail if given an invalid argument", function(next) {
		expect(IP.validateRange()).toBe(false);
		expect(IP.validateRange("")).toBe(false);
		expect(IP.validateRange("","")).toBe(false);
		next();
	});

	it("should fail if either IP is not 4 octects", function(next) {
		expect(IP.validateRange("127","200")).toBe(false);
		expect(IP.validateRange("127.0.0.1","127.0.0.0.1")).toBe(false);
		expect(IP.validateRange("127.0.1","127.0.0.1")).toBe(false);
		next();
	});

	it("should fail if the second IP is lower than the first", function(next) {
		expect(IP.validateRange("10.0.0.1","10.0.0.0")).toBe(false);
		expect(IP.validateRange("127.2.3.200","127.1.4.200")).toBe(false);
		expect(IP.validateRange("192.168.12.156","191.168.15.255")).toBe(false);
		next();
	});	

	it("should pass if IPs are a valid range", function(next) {
		expect(IP.validateRange("10.0.0.0","10.0.0.255")).toBe(true);
		expect(IP.validateRange("10.0.1.0","10.0.2.0")).toBe(true);
		expect(IP.validateRange("192.168.0.0","192.169.0.0")).toBe(true);
		expect(IP.validateRange("192.168.0.0","193.0.0.0")).toBe(true);
		next();
	});
});

describe("IP to Integer", function() {

	it("should return 0 on an invalid IP address", function(next) {
		expect(IP.toInt("1.1.1.1.1")).toEqual(0);
		expect(IP.toInt("10.0.0.256")).toEqual(0);
		next();
	});

	it("should convert a valid IP address to a number", function(next) {
		expect(IP.toInt("0.0.0.1")).toEqual(0x00000001);
		expect(IP.toInt("0.0.0.12")).toEqual(0x0000000C);
		expect(IP.toInt("0.0.1.0")).toEqual(0x00000100);
		expect(IP.toInt("0.1.0.0")).toEqual(0x00010000);
		expect(IP.toInt("1.0.0.0")).toEqual(0x01000000);
		expect(IP.toInt("128.0.0.0")).toEqual(0x80000000);
		next();
	});
});