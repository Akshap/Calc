var key = document.querySelectorAll('.calk-key');
var calcInput = document.querySelector('.calc-input-container__calc-input');
var prevValue = document.querySelector('.calc-line__calc-string');

var recordableCharsArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
var operatorsArray = ["-", "+", "/", "*", "+/-", "=", "%"];

var doMath = new doMath();

for (var i = 0; i < key.length; i++) 
{
	key[i].addEventListener("click", function() 
	{
		console.log("key - " + this.value);
		doMath.receiveKey(this.value);
	}); 
};

/*
*/
function doMath()
{
	var firstOperand = "";
	var lastOperand = "";
	var mathOperator = "";
	var mathResult = "";
	var mathKey = "";
	
	this.receiveKey = function(key)
	{
		mathKey = key;
		if (recordableCharsArray.indexOf(mathKey) !== -1)
		{
			collectKey();
		}
		else
		{
			doOperation();
		};
		writeKeyInCalcFields();
		console.log("First operand - " + firstOperand + "\n" + "Last operand - " + lastOperand + "\n" + "Operator - " + mathOperator + "\n" + "Result - " + mathResult);
	};

	function collectKey()
	{
		switch (mathKey)
		{
			case ".":
				collectPoint();
			break;
			case "0":
				collectZero();
			break;
			default:
				collectNumeric();
			break;
		};
	};
	
	function doOperation()
	{
		switch (mathKey)
		{
			case "AC":
				clearInput();
				break;
			case "+/-":
				changeMathSign();
				break;
			case "%":
				calculatePercentage();
				break;
			case "-":
				if (firstOperand == "" && lastOperand == "")
				{
					collectNumeric();
					break;
				};
			case "+":
			case "/":
			case "*":
				rememberOperator();
				break;
			case "=":
				culculate();
				break;
		};
	};
	
	function collectNumeric()
	{
		if (lastOperand == "0")
		{
			lastOperand = "";
		};
		lastOperand = lastOperand + mathKey;
	};
	
	function collectPoint()
	{
		if (lastOperand == "")
		{
			lastOperand = "0";
		};
		if (lastOperand.indexOf(".") == -1)
		{
			lastOperand = lastOperand + mathKey;
		};
	};
	
	function collectZero()
	{
		if (lastOperand !== "0" && mathKey == "0")
		{
			lastOperand = lastOperand + mathKey;
		};
	};
	
	function writeKeyInCalcFields()
	{
		calcInput.value = lastOperand;
		prevValue.value = firstOperand + " " + mathOperator;
	};
	
	function clearInput()
	{
		if (mathKey == "AC" && lastOperand == "")
		{
			firstOperand = ""; 
			mathOperator = "";
			mathResult = "";
		};
		lastOperand = "";
	}; 
	
	function changeMathSign()
	{
		lastOperand = lastOperand * (-1);
		writeKeyInCalcFields();
	};
	
	function calculatePercentage()
	{
		(firstOperand !== "") ? lastOperand = ((+firstOperand) / 100) * (+lastOperand) : lastOperand = "0";
	};
	
	function rememberOperator()
	{
			mathOperator = mathKey;
			submitValue();
	};
	
	function submitValue()
	{
		if (lastOperand !== "")
		{
			firstOperand = lastOperand;
			clearInput();
			writeKeyInCalcFields();
		};
	};
	
	function culculate()
	{
		if (firstOperand !== "" && mathOperator !== "" && lastOperand !== "")
		{
			switch(mathOperator)
			{
				case "+":
					getSum();
					break;
				case "-":
					getDifference();
					break;
				case "/":
					getProduct();
					break;
				case "*":
					getQuotient();
					break;
			};
			writeMathExpression();
		};
	};

	function getSum()
	{
		mathResult = (+firstOperand) + (+lastOperand);
	};
	
	function getDifference()
	{
		mathResult = (+firstOperand) - (+lastOperand);
	};
	
	function getProduct()
	{
		mathResult = (+firstOperand) * (+lastOperand);
	};
	
	function getQuotient()
	{
		mathResult = (+firstOperand) / (+lastOperand);
	};
	
	function writeMathExpression()
	{
		prevValue.value = firstOperand + " " + mathOperator + " " + lastOperand + " =";
		calcInput.value = mathResult;
	};
	
};

