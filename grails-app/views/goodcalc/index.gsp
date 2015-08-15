<!DOCTYPE html>
<html ng-app="calculator">
	<head>
	<asset:javascript src="app.js"/>
	<asset:stylesheet href="styles.css"/>
	<asset:link rel="shortcut icon" href="favicalc.ico" type="image/x-icon"/>
	<title> GoodCalc </title>
	<meta name="viewport" >
	<meta charset="utf-8">
	</head>
	<body ng-controller="calcCtrl">
		<div class="container-fluid wrapper">
			<header><img id="headerImg" src="../images/calculator.png"></header>
			<span></span>
				<div class="row content">
					<div class="col-lg-5">
						<div id = "calc">
							<block answer = "">{{digit}}</block>
							<block sum = "">{{livePreview}}</block>
						 	<block><button name="nDiv" class="btn blue" ng-click="addOperand('/')">÷</button></block>
						    <block><button name="n9" class="btn" ng-click="addDigit(9)">9</button></block>
						    <block><button name="n8" class="btn" ng-click="addDigit(8)">8</button></block>
						    <block><button name="n7" class="btn" ng-click="addDigit(7)">7</button></block>
						    <block><button name="nMult" class="btn blue" ng-click="addOperand('x')">x</button></block>
						    <block><button name="n6" class="btn" ng-click="addDigit(6)">6</button></block>
						    <block><button name="n5" class="btn" ng-click="addDigit(5)">5</button></block>
						    <block><button name="n4" class="btn" ng-click="addDigit(4)">4</button></block>				    
						    <block><button name="nMin" class="btn blue" ng-click="addOperand('-')">-</button></block>
						    <block><button name="n3" class="btn" ng-click="addDigit(3)">3</button></block>
						    <block><button name="n2" class="btn" ng-click="addDigit(2)">2</button></block>
						    <block><button name="n1" class="btn" ng-click="addDigit(1)">1</button></block>
						    <block v2=""><button name="nPlus" class="btn blue" ng-click="addOperand('+')">+</button></block>				    
						 	<block><button name="nSign" class="btn" ng-click="sign()">±</button></block>
							<block><button name="nMult" class="btn" ng-click="square()">√</button></block>
							<block><button name="n0" class="btn" ng-click="addDigit(0)">0</button></block> 
							<block h2=""><button name="nE" class="btn equals" ng-click="equals()">=</button></block>
						    <block><button name="nClr" class="btn clear" ng-click="clear()">C</button></block>	
						</div>		
					</div>
				<div class="col-lg-5">
					<ul class="nav nav-pills nav-stacked">
						<li ng-repeat="sum in sums"> <div>{{sum.fullSum}} <button class="btnRem" ng-click="remove(sum.id)">x</button></div></li>
					</ul>
				</div>
				<div class="col-lg-2">
					<button name="ndel" class="btn" ng-click="deleteSave()">Delete</button>
				</div>
			</div>
			<footer>sean.rendall@gmail.com</footer>	
		</div>
	</body>
</html>
