//////////////////////////////////////////
	/*Calculator app by Sean Rendall*/
//////////////////////////////////////////
//= require BigInt_BigRat.min
//= require jquery
//= require bootstrap
//= require angular/angular
//= require angular-animate/angular-animate
//= require_tree views
//= require_self
console.log("angrailsfest load complete.");

//Create the angular app.
var calculator = angular.module('calculator', ['ngAnimate']);

//Create the controller with the required dependancy injections.
calculator.controller('calcCtrl', ['$scope', '$http', '$location', '$interval', function($scope, $http, $location, $interval) {
  $scope.digit = 0;
  $scope.operandStack = [];
  $scope.userTyping = false;
  $scope.livePreview = 0;
  $scope.sums = {};
  
//Add digit is used to type numbers in. The userTyping variable is used to determine if the user is adding more digits or typing a new number.
  $scope.addDigit = function(num){
	  if (!$scope.userTyping) {
			$scope.digit = num;
			$scope.userTyping = true;
	  }
	  else {
		   $scope.digit = $scope.digit + "" + num;
	}
	$scope.preview();
  }
  
  $scope.addDot = function(){
	  n = $scope.digit.toString();
	  if(n.indexOf(".") == -1){
		  $scope.digit = $scope.digit + ".";
	  }
  }

//Enter is used to add new items to the stack when a new operand or digit is entered.
	$scope.enter = function(){
		$scope.userTyping = false;
		$scope.operandStack.push($scope.digit);
	}

//Add operand determines where to place the operand based on what is on the stack already. For example, if the stack has a length of zero then the digit value should be added to the stack firt.
	$scope.addOperand = function(op){
		switch($scope.operandStack.length){
			case 0:
				$scope.enter();
				$scope.operandStack.push(op);
				break;
			case 1:
				$scope.operandStack.push(op);
				break;
			case 2:
				$scope.operandStack[1] = op;
				break;
			default: break;
		}
		$scope.preview();
	}

//Equals determines the answer and saves it so it can be seen in Previous Sums and removes the current sum from the stack.
	$scope.equals = function(){
		if($scope.operandStack.length >= 2){
			$scope.enter();
			var x = bigRat($scope.operandStack.pop());
			var op = $scope.operandStack.pop();
			var y = bigRat($scope.operandStack.pop());
			var answer = $scope.operate(op, x, y);
			$scope.digit = bigRat(answer).toDecimal(14);
			console.log($scope.operate(op, x, y));
			if(op === "-" || op === "/"){$scope.saveSum(y, x, $scope.digit, op); }
			else {$scope.saveSum(y, x, $scope.digit, op);}
		}
		$scope.userTyping = false;
		$scope.preview();
	}

//The operate method is where the sum is calculated. A simple switch is used to determine which operator is being used and the answer returned.
	$scope.operate = function(operand, x, y){
		switch(operand){
			case "x":
				return bigRat(x).multiply(y);
				break;
			case "-":
				return bigRat(y).subtract(x);
				break;
			case "/":
				return bigRat(y).divide(x);
				break;
			case "+":
				return bigRat(x).add(y);
				break;
			default: break;
		}
	}

//Updates the currently typed number to its square root.
	$scope.square = function(x){
		return Math.sqrt(x);
	}

//Sign is where the currently typed value can be changed from positive to negative and vice-versa. 
	$scope.sign = function(){
		if($scope.operandStack.length === 0 || $scope.operandStack.length === 2){ $scope.digit *= -1; }
		else if($scope.operandStack.length === 1){
			$scope.digit *= -1;
			$scope.operandStack[0] *= -1;
			}
			else if($scope.operandStack.length === 3){
			$scope.digit *= -1;
			$scope.operandStack[2] *= -1;
			}

	}

//Preview formats the stack so it can be displayed in Previous Sums.
	$scope.preview = function(){
		switch($scope.operandStack.length){
			case 0:
				$scope.livePreview = $scope.digit;
				break;
			case 2:
				$scope.livePreview = $scope.operandStack[0] + " " + $scope.operandStack[1] + " " + $scope.digit;
				break;
			default: break;
		}
	}

//This function formats a sum to be saved into sums.json and then calls that function.
  $scope.saveSum = function(x, y, z, op){
	$scope.sum = { fullSum: x + " " + op + " " + y + " = " + z };
	$scope.saveSums();
  }

//The formatted sum is then sent using $http.post to the REST api? I'm not entirely sure what is happening with the data here.
  $scope.saveSums = function(){
	  $http.post('sum/create', $scope.sum).success(function(data, status, headers, config) {
	  $scope.retrieveSums();
	     }).error(function(data, status, headers, config) {
	    	 console.log('SAVE ERROR');
	    });
  }

//This function retrieves sums from the web server.
  $scope.retrieveSums = function(){
		  $http.get('sum/list').success(function(data, status, headers, config) {
			  if($scope.sums.length != data.length){
				  $scope.sums = data;
			  }
		   }).error(function(data, status, headers, config) {
		    	 console.log('LOAD ERROR');
		    });
  	}
  
  $scope.deleteSave = function(){
	    $http.delete('sum/deleteall');
	    $scope.retrieveSums();
  }
  
  $scope.remove = function(index) {
	  $http.delete('sum/delete/' + index);
	  $scope.retrieveSums();
  }
  
//Call when controller is created.
  $interval($scope.retrieveSums, 1000);

//Clears the stack, and the currently typed numbers.
	$scope.clear = function(){
		$scope.digit = 0;
		$scope.operandStack.splice(0, $scope.operandStack.length);
		$scope.userTyping = false;
		$scope.preview();
	}
}]);
