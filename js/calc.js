var key = document.querySelectorAll('.calk-key');
var currOperand = document.querySelector('.calc-input-container__calc-input');
var prevOperand = document.querySelector('.calc-line__calc-string');
var operator = null;
var calcTemp = null;
var calcFlag = false;

var recordableCharsArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
var operatorsArray = ["-", "+", "/", "*", "+/-", "="];


	
for (var i = 0; i < key.length; i++) 
{
	key[i].addEventListener("click", function() 
	{
		console.log("key - " + this.value);
		getMathExpression(this.value);
	}); 
};

function getMathExpression(key)
{
	if (recordableCharsArray.indexOf(key) !== -1)
	{
		if (calcFlag == true)
		{
			calcFlag = newCalculation();
		};
		writeKey(key);
	}
	else
	{
		if (calcFlag == true)
		{
			calcFlag = continueCalculating();
		};
		switch (key)
		{
			case "AC":
				clearInput(key);
				break;
			case "+/-":
				changeMathSign();
				break;
			case "%":
				calculatePercentage();
				break;
			case "-":
				if (currOperand.value == "" && prevOperand.value == "")
				{
					writeKey(key);
					break;
				};
			case "+":
			case "/":
			case "*":
				operator = key;
				submitValue();
				break;
			case "=":
				culculate();
				break;
		};
	};
};

function writeKey(key)
{
	switch (key)
	{
		case ".":
			if (currOperand.value == "")
			{
				currOperand.value = "0";
			};
			if (currOperand.value.indexOf(".") == -1)
			{
				currOperand.value = currOperand.value + key;
			};
			break;
		case "0":
			if (currOperand.value !== "0" && key == "0")
			{
				currOperand.value = currOperand.value + key;
			};
			break;
		default:
			if (currOperand.value == "0")
			{
				currOperand.value = "";
			};
			currOperand.value = currOperand.value + key;
			break;
	};
};

function clearInput(key)
{
	if (key == "AC" && currOperand.value == "")
	{
		prevOperand.value = ""; 
		operator = "";
	};
	currOperand.value = "";
};

function submitValue()
{
	if (currOperand.value !== "")
	{
		prevOperand.value = currOperand.value;
		clearInput();
	};
};

function changeMathSign()
{
	currOperand.value = currOperand.value * (-1);
};

function newCalculation()
{
	prevOperand.value = "";
	currOperand.value = "";
	calcTemp = "";
	return false;
};

function continueCalculating()
{
	prevOperand.value = currOperand.value;
	currOperand.value = "";
	calcTemp = "";
	return false;
};

function writeCalculationStr()
{
	prevOperand.value = prevOperand.value + " " + operator + " " + calcTemp + " = ";
	calcFlag = true; 
};

function calculatePercentage()
{
	(prevOperand.value !== "") ? currOperand.value = ((+prevOperand.value) / 100) * (+currOperand.value) : currOperand.value = "0";
};

function culculate()
{
	if (currOperand.value !== "" && operator !== "" && prevOperand.value !== "")
	{
		calcTemp = currOperand.value;
		switch(operator)
		{
			case "+":
				currOperand.value = +prevOperand.value + (+currOperand.value);
				break;
			case "-":
				currOperand.value = +prevOperand.value - (+currOperand.value);
				break;
			case "/":
				currOperand.value = +prevOperand.value / (+currOperand.value);
				break;
			case "*":
				currOperand.value = +prevOperand.value * (+currOperand.value);
				break;
		};
		writeCalculationStr();
	};
};