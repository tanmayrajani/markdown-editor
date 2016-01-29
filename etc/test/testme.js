describe('Testing myData factory', function() {
	beforeEach(module('myApp'));
	var myData, store,window;
	beforeEach(inject(function(_myData_,$window) {
		myData = _myData_;
		window = $window;
		store = {};
		var localStorage = window.localStorage;
		spyOn(localStorage, 'getItem').and.callFake(function (key) {
			return store[key];
		});
		spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
			return store[key] = value + '';
		});
		spyOn(localStorage, 'clear').and.callFake(function () {
			store = {};
		});
	}));

	it('feature desc', function() {
		localStorage['stuff'] = 'hello';
		expect(myData.message()).toEqual('hello');
	});
});

describe('EditorCtrl', function () {
	var $controllerConstructor, scope, mockmyData, windowx;

	beforeEach(module('myApp'));

	beforeEach(inject(function ($controller, $rootScope) {
		$controllerConstructor = $controller;
		scope = $rootScope.$new();
		mockmyData = sinon.stub({});
		windowx = window;
	}))

	it('should test ctrl', function () {
		var ctrl = $controllerConstructor('EditorCtrl',{'$scope':scope,'$window':windowx,myData:mockmyData});
		expect(scope.data).toBe(mockmyData);
	})

})