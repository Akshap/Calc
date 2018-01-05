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

/* 1. Реализовать повторение операции при повторном "=".
*  2. Реализовать вычисление при повторном операторе. 
*  3. Разрулить минус в первой позиции.
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
		mathIterationCompletion();
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
		if (isNumeric(lastOperand))
		{
			lastOperand = lastOperand * (-1);
		}
		else
		{
			lastOperand = 0;
		};
	};
	
	function calculatePercentage()
	{
		(firstOperand !== "") ? lastOperand = ((+firstOperand) / 100) * (+lastOperand) : lastOperand = "0";
	};
	
	function rememberOperator() //Почистить ЛОГИКУ.
	{
		if (mathKey == "-" && firstOperand == "" && lastOperand == "")
		{
			collectNumeric();
		}
		else
		{
			if (firstOperand !== "" || lastOperand !== "")
			{
				mathOperator = mathKey;
			};
			if (lastOperand !== "")
			{
				submitValue();
			};
		};
	};
	
	function submitValue()
	{
		if (lastOperand !== "")
		{
			firstOperand = lastOperand;
			clearInput();
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
				case "*":
					getProduct();
					break;
				case "/":
					getQuotient();
					break;
			};
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
	
	function mathIterationCompletion()
	{
		if (isNumeric(mathResult))
		{
			writeCompletedMathExpression();
		}
		else 
		{
			writeMathOperatirs();
		};
	};
	
	function writeCompletedMathExpression()
	{
		prevValue.value = firstOperand + " " + mathOperator + " " + lastOperand + " =";
		calcInput.value = mathResult;
		
		lastOperand = mathResult;
		mathResult = "";
	};
	
	function writeMathOperatirs()
	{
		calcInput.value = lastOperand;
		prevValue.value = firstOperand + " " + mathOperator;
	};
		
	function isNumeric(n) 
	{
		return !isNaN(parseFloat(n)) && isFinite(n);
	};	
};

