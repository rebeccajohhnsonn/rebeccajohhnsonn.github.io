// Navigation Script
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', function() {
    navMenu.classList.toggle('active');
});

function showApp(appName) {
    // Hide all app sections
    const allSections = document.querySelectorAll('.app-section');
    allSections.forEach(section => section.classList.remove('active'));
    
    // Show selected app
    document.getElementById(appName + '-app').classList.add('active');
    
    // Close mobile menu
    navMenu.classList.remove('active');
}

// Temp Converter Functions
function updateFormula() {
    const conversionType = document.getElementById("conversion-type").value;
    const formulaElement = document.getElementById("formula");
    if (conversionType === 'ftoc') {
        formulaElement.textContent = "Formula: (F - 32) × 5/9 = C";
    } else { 
        formulaElement.textContent = "Formula: (C x 9/5) + 32 = F";
    }
}

function assessTemperature(temp, scale) {
    const tempElement = document.getElementById("temp-assessment");
    let assessment = "";
    let color = "";
    
    if (scale === "celsius") {
        if (temp <= 0) {
            assessment = "Very Cold";
            color = "#3498db"; // Blue
        } else if (temp < 10) {
            assessment = "Cold";
            color = "#7fb3d5"; // Light blue
        } else if (temp < 20) {
            assessment = "Cool";
            color = "#a9cce3"; // Very light blue
        } else if (temp < 30) {
            assessment = "Moderate";
            color = "#2ecc71"; // Green
        } else if (temp < 40) {
            assessment = "Warm";
            color = "#f39c12"; // Orange
        } else {
            assessment = "Hot";
            color = "#e74c3c"; // Red
        }

    } else if (scale === "fahrenheit") {
        if (temp <= 32) {
        assessment = "Very Cold";
        color = "#3498db"; // Blue
         } else if (temp <= 49) {
        assessment = "Cold";
        color = "#7fb3d5"; // Light blue
         } else if (temp <= 67) {
        assessment = "Cool";
        color = "#a9cce3"; // Very light blue
         } else if (temp <= 85) {
        assessment = "Moderate";
        color = "#2ecc71"; // Green
        } else if (temp <= 103) {
        assessment = "Warm";
        color = "#f39c12"; // Orange
         } else {
        assessment = "Hot";
        color = "#e74c3c"; // Red
         }
     }
    
    tempElement.textContent = `Temperature Assessment: ${assessment}`;
    tempElement.style.color = color;
    tempElement.style.fontWeight = "bold";

}
function convertTemperature() {
    const conversionType = document.getElementById("conversion-type").value;
    const resultElement = document.getElementById("conversion-result");
    const temperatureInput = document.getElementById("temperature").value;
    const temperatureValue = parseFloat(temperatureInput);

    if (isNaN(temperatureValue)) {
        resultElement.textContent = "Invalid input. Please enter a number.";
        document.getElementById("temp-assessment").textContent = "";
        return;
    }
    
    let result;
    if (conversionType === "ftoc") {
        // Fahrenheit to Celsius: C = (F - 32) * 5/9
        result = (temperatureValue - 32) * 5 / 9;
        resultElement.textContent = `${temperatureValue}°F = ${result.toFixed(2)}°C`;
        // Assess temperature based on the result (celsius)
        assessTemperature(result,"celsius");

    } else {
        // Celsius to Fahrenheit: F = (C * 9/5) + 32
        result = (temperatureValue * 9 / 5) + 32;
        resultElement.textContent = `${temperatureValue}°C = ${result.toFixed(2)}°F`;
        // Assess temperature based on the result (fahrenheit)
        assessTemperature(result,"fahrenheit");
    }
}

function clearConverter() {
    // please write the body of the function as specified above
    document.getElementById("temperature").value = "";
    document.getElementById("conversion-result").textContent = "";
    document.getElementById("temp-assessment").textContent = "";
    document.getElementById("formula").textContent = "";
}

// Magic 8 Ball Functions
const answers = [
    "It is certain",
    "It is decidedly so",
    "Without a doubt",
    "Yes definitely",
    "You may rely on it",
    "As I see it, yes",
    "Most likely",
    "Outlook good",
    "Yes",
    "Signs point to yes",
    "Reply hazy, try again",
    "Ask again later",
    "Better not tell you now",
    "Cannot predict now",
    "Concentrate and ask again",
    "Don't count on it",
    "My reply is no",
    "My sources say no",
    "Outlook not so good",
    "Very doubtful"
];

let historyItems = [];

function getRandomAnswer() {
    const randomIndex = Math.floor(Math.random() * answers.length);
    return answers[randomIndex];
}

function shakeBall() {
    const question = document.getElementById('question').value.trim();
    const ball = document.getElementById('ball');
    const answerElement = document.getElementById('answer');
    const questionDisplay = document.getElementById('question-display');
    const questionInput = document.getElementById('question');
    
    if (question === '') {
        alert('Please ask a question first!');
        return;
    }

    answerElement.textContent = '8';
    
    ball.style.transform = 'translateX(-5px)';
    setTimeout(() => { ball.style.transform = 'translateX(5px)'; }, 100);
    setTimeout(() => { ball.style.transform = 'translateX(-5px)'; }, 200);
    setTimeout(() => { ball.style.transform = 'translateX(5px)'; }, 300);
    setTimeout(() => { ball.style.transform = 'translateX(0)'; }, 400);
    
    setTimeout(() => {
        const randomAnswer = getRandomAnswer();
        answerElement.textContent = randomAnswer;
        questionDisplay.textContent = `"${question}"`;
        questionDisplay.style.opacity = 1;
        addToHistory(question);
    }, 500);
    
    questionInput.value = '';
}

function resetBall() {
    document.getElementById('answer').textContent = '8';
    document.getElementById('question-display').textContent = '';
    document.getElementById('question-display').style.opacity = 0;
    document.getElementById('question').value = '';
}

function addToHistory(question) {
    historyItems.unshift(question);
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    const questionHistory = document.getElementById('question-history');
    questionHistory.innerHTML = '';
    
    historyItems.forEach((question, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'history-item';
        listItem.textContent = question;
        questionHistory.appendChild(listItem);
    });
}

function clearHistory() {
    historyItems = [];
    updateHistoryDisplay();
}
// Task List Modified Functions
let tasks = [];
let taskDueDates = [];

const randomTasks = [
  "Take a short walk",
  "Drink a glass of water",
  "Stretch for 5 minutes",
  "Practice deep breathing for 2 minutes",
  "Stand up and move around for 5 minutes",
  "Do a quick meditation session",
  "Write in a gratitude journal",
  "Have a healthy snack",
  "Rest your eyes for 2 minutes",
  "Fix your posture",
  "Do a quick workout",
  "Call a friend or family member",
  "Take a short nap",
  "Listen to calming music",
  "Drink a cup of tea",
  "Practice mindfulness for 5 minutes",
  "Step outside for fresh air",
  "Do a quick stretching routine"
];

const taskInput = document.getElementById('task-input');
const dateInput = document.getElementById('date-input');
const timeInput = document.getElementById('time-input');
const taskList = document.getElementById('task-list');

function validateDate(dateStr) {
  if (dateStr.indexOf('/') !== dateStr.lastIndexOf('/') || dateStr.indexOf('/') === -1) {
    return false;
  }

  const parts = dateStr.split('/');
  if (parts.length !== 2) {
    return false;
  }

  const month = parts[0];
  const day = parts[1];

  if (month.length !== 2 || day.length !== 2) {
    return false;
  }

  for (let i = 0; i < month.length; i++) {
    if (month.charCodeAt(i) < 48 || month.charCodeAt(i) > 57 ||
        day.charCodeAt(i) < 48 || day.charCodeAt(i) > 57) {
      return false;
    }
  }

  const monthNum = parseInt(month, 10);
  const dayNum = parseInt(day, 10);

  if (monthNum < 1 || monthNum > 12) {
    return false;
  }

  const daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (dayNum < 1 || dayNum > daysInMonth[monthNum]) {
    return false;
  }

  return true;
}

function validateTime(timeStr) {
  if (timeStr.indexOf(':') !== timeStr.lastIndexOf(':') || timeStr.indexOf(':') === -1) {
    return false;
  }

  const parts = timeStr.split(':');
  if (parts.length !== 2) {
    return false;
  }

  const hours = parts[0];
  const minutes = parts[1];

  if (hours.length !== 2 || minutes.length !== 2) {
    return false;
  }

  for (let i = 0; i < hours.length; i++) {
    if (hours.charCodeAt(i) < 48 || hours.charCodeAt(i) > 57 ||
      minutes.charCodeAt(i) < 48 || minutes.charCodeAt(i) > 57) {
      return false;
    }
  }

  const hourNum = parseInt(hours, 10);
  const minuteNum = parseInt(minutes, 10);

  if (hourNum < 0 || hourNum > 23 || minuteNum < 0 || minuteNum > 59) {
    return false;
  }

  return true;
}

function calculatePriority(dateStr, timeStr) {
  const year = new Date().getFullYear();

  const [month, day] = dateStr.split('/').map(Number);
  const [hours, minutes] = timeStr.split(':').map(Number);

  const dueDate = new Date(year, month - 1, day, hours, minutes);

  return dueDate.getTime();
}

function addTask() {
  const taskText = taskInput.value.trim();
  const dateStr = dateInput.value.trim();
  const timeStr = timeInput.value.trim();
  
  if (taskText === '') {
    alert('Please enter a task first!');
    return;
  }
  
  if (!validateDate(dateStr)) {
    alert('Please enter a valid date in MM/DD format!');
    return;
  }
  
  if (!validateTime(timeStr)) {
    alert('Please enter a valid time in 24-hour format (HH:MM)!');
    return;
  }
  
  const priority = calculatePriority(dateStr, timeStr);
  console.log(priority);
  
  const task = [taskText, priority];
  
  tasks.push(task);
  
  taskDueDates.push([dateStr, timeStr]);
  
  sortTasksByPriority();
  
  updateTaskDisplay();
  
  clearInput();
}

function addRandomTask() {
  const randomIndex = Math.floor(Math.random() * randomTasks.length);
  const randomTask = randomTasks[randomIndex];
  
  taskInput.value = randomTask;
  
  dateInput.focus();
}

function sortTasksByPriority() {
  let indices = Array.from(Array(tasks.length).keys());
  
  indices.sort(function(a, b) {
    const dateA = taskDueDates[a][0];
    const timeA = taskDueDates[a][1];
    const dateB = taskDueDates[b][0];
    const timeB = taskDueDates[b][1];
    
    const [monthA, dayA] = dateA.split('/').map(Number);
    const [monthB, dayB] = dateB.split('/').map(Number);
    
    if (monthA !== monthB) {
      return monthA - monthB;
    }
    
    if (dayA !== dayB) {
      return dayA - dayB;
    }
    
    const [hoursA, minutesA] = timeA.split(':').map(Number);
    const [hoursB, minutesB] = timeB.split(':').map(Number);
    
    if (hoursA !== hoursB) {
      return hoursA - hoursB;
    }
    
    return minutesA - minutesB;
  });
  
  const newTasks = [];
  const newTaskDueDates = [];
  
  for (let i = 0; i < indices.length; i++) {
    newTasks.push(tasks[indices[i]]);
    newTaskDueDates.push(taskDueDates[indices[i]]);
  }
  
  tasks = newTasks;
  taskDueDates = newTaskDueDates;
}

function handleKeyPress(event) {
  if (event.key === 'Enter') {
    addTask();
  }
}

taskInput.onkeydown = handleKeyPress;

function clearInput() {
  taskInput.value = '';
  dateInput.value = '';
  timeInput.value = '';
  taskInput.focus();
}

function updateTaskDisplay() {
  taskList.innerHTML = '';
  
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const taskText = task[0]; 
    const dateStr = taskDueDates[i][0]; 
    const timeStr = taskDueDates[i][1]; 
    
    const listItem = document.createElement('li');
    listItem.className = 'task-item';
    
    const taskDetails = document.createElement('div');
    taskDetails.className = 'task-details';
    
    const now = new Date();
    const currentYear = now.getFullYear();
    
    const [month, day] = dateStr.split('/').map(Number);
    const [hours, minutes] = timeStr.split(':').map(Number);
    
    const dueDate = new Date(currentYear, month - 1, day, hours, minutes);
    
    const diffMs = dueDate - now;
    const diffHours = diffMs / (1000 * 60 * 60);
    
    let priorityClass = 1; 
    if (diffHours < 0) {
      priorityClass = 1; 
    } else if (diffHours < 4) {
      priorityClass = 1; 
    } else if (diffHours < 24) {
      priorityClass = 2; 
    } else if (diffHours < 48) {
      priorityClass = 3; 
    } else if (diffHours < 72) {
      priorityClass = 4; 
    } else {
      priorityClass = 5;
    }
    
    const taskTextContainer = document.createElement('span');
    taskTextContainer.className = 'task-text';
    
    const priorityDot = document.createElement('span');
    priorityDot.className = `priority-indicator priority-${priorityClass}`;
    
    const taskTextElement = document.createTextNode(taskText);
    
    const dueDateText = document.createElement('span');
    dueDateText.className = 'due-date-text';
    dueDateText.textContent = `Due: ${dateStr} at ${timeStr}`;
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-button';
    deleteButton.setAttribute('onclick', `deleteTask(${i})`);
    
    taskTextContainer.appendChild(priorityDot);
    taskTextContainer.appendChild(taskTextElement);
    
    taskDetails.appendChild(taskTextContainer);
    taskDetails.appendChild(dueDateText);
    
    listItem.appendChild(taskDetails);
    listItem.appendChild(deleteButton);
    
    taskList.appendChild(listItem);
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  taskDueDates.splice(index, 1);
  
  updateTaskDisplay();
}

function clearTasks() {
  tasks = [];
  taskDueDates = [];
  
  updateTaskDisplay();
}

window.onload = function() {
  updateTaskDisplay();
};

// Countdown Timer Functions
let timerDisplay;
let motivationDisplay;
let secondsInput;
let startBtn;
let resetBtn;
let statusDisplay;
let countdown;
let timeLeft;
let phraseIndex = 0;

const motivationalPhrases = [
    "Every second counts!",
    "You're making progress!",
    "Keep going, you're doing great!",
    "Stay focused, stay strong!",
    "You've got this!",
    "One step at a time!",
    "Believe in yourself!",
    "Success is just ahead!",
    "Don't give up now!",
    "The best is yet to come!",
    "Each moment brings you closer to your goal!",
    "Small steps lead to big results!",
    "Your determination is inspiring!",
    "Progress happens one second at a time!",
    "Keep that momentum going!"
];

window.addEventListener('load', function() {
    timerDisplay = document.getElementById('timer');
    motivationDisplay = document.getElementById('motivation');
    secondsInput = document.getElementById('seconds');
    startBtn = document.getElementById('startBtn');
    resetBtn = document.getElementById('resetBtn');
    statusDisplay = document.getElementById('status');
});

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function updateTimerDisplay() {
    timerDisplay.textContent = formatTime(timeLeft);
}

function startCountdown() {
    const seconds = parseInt(secondsInput.value);

    if (isNaN(seconds) || seconds <= 0) {
        statusDisplay.textContent = "Please enter a valid number of seconds";
        return;
    }
    
    startBtn.disabled = true;
    secondsInput.disabled = true;
    statusDisplay.textContent = "Countdown in progress...";
    
    timeLeft = seconds;
    updateTimerDisplay();
    
    countdown = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft % 5 === 0 || timeLeft === seconds - 1) {
            phraseIndex = (phraseIndex + 1) % motivationalPhrases.length;
            motivationDisplay.textContent = motivationalPhrases[phraseIndex];
        }
        
        if (timeLeft <= 0) {
            clearInterval(countdown);
            timerDisplay.textContent = "00:00";
            motivationDisplay.textContent = "🎉 Congratulations! You've completed the countdown!";
            startBtn.disabled = false;
            secondsInput.disabled = false;
            statusDisplay.textContent = "Countdown complete!";
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(countdown);
    timerDisplay.textContent = "00:00";
    motivationDisplay.textContent = "Enter seconds and start the timer for motivation!";
    startBtn.disabled = false;
    secondsInput.disabled = false;
    statusDisplay.textContent = "";
    secondsInput.value = "30";
}

// NATO Converter Functions
const natoLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", 
                        "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
                        "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

const natoWords = ["Alfa", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot", "Golf", "Hotel",
                    "India", "Juliett", "Kilo", "Lima", "Mike", "November", "Oscar", "Papa",
                    "Quebec", "Romeo", "Sierra", "Tango", "Uniform", "Victor", "Whiskey", "X-ray",
                    "Yankee", "Zulu", "One", "Two", "Three", "Four", "Five", "Six", 
                    "Seven", "Eight", "Nine", "Zero"];

function chToNato(ch) {
    const upperCh = ch.toUpperCase();
    const index = natoLetters.indexOf(upperCh);
    if (index !== -1) {
        return natoWords[index];
    }
    return ch;
}

function wordToNato(word) {
    const characters = word.split("");
    const natoCharacters = characters.map(ch => chToNato(ch));
    return natoCharacters.join(" ");
}

function sentenceToNato(sentence) {
    const words = sentence.split(" ");
    const natoWords = words.map(word => wordToNato(word));
    return natoWords.join(" ");
}

function verbalize() {
    const inputString = document.getElementById("inputString").value;
    const natoResult = sentenceToNato(inputString);
    document.getElementById("natoResult").textContent = natoResult;
}

function clearNATOInputs() {
    document.getElementById("inputString").value = "";
    document.getElementById("natoResult").textContent = "";
}

// Calculator Functions
let memory = 0;
let currentInput = "0";
let currentOperator = null;
let leftOperand = null;
let waitingForRightOperand = false;
let lastOperation = "";
let calculationDone = false;

const display = document.getElementById('display');
const history = document.getElementById('history');

display.value = "0";

function appendToDisplay(value) {
    if (calculationDone && !isNaN(value)) {
        clearDisplay();
        calculationDone = false;
    } else if (calculationDone) {
        calculationDone = false;
    }
    
    if (waitingForRightOperand) {
        display.value = value;
        waitingForRightOperand = false;
    } else {
        if (display.value === "0" && value !== ".") {
            display.value = value;
        } else {
            display.value += value;
        }
    }
    
    currentInput = display.value;
}

function clearDisplay() {
    display.value = "0";
    currentInput = "0";
}

function clearAll() {
    clearDisplay();
    history.textContent = "";
    leftOperand = null;
    currentOperator = null;
    waitingForRightOperand = false;
    lastOperation = "";
}

function clearMemory() {
    memory = 0;
}

function recallMemory() {
    display.value = memory;
    currentInput = display.value;
}

function addToMemory() {
    try {
        memory += parseFloat(eval(display.value));
    } catch (e) {
        display.value = "Error";
    }
}

function subtractFromMemory() {
    try {
        memory -= parseFloat(eval(display.value));
    } catch (e) {
        display.value = "Error";
    }
}

function deleteLast() {
    if (display.value.length > 1) {
        display.value = display.value.slice(0, -1);
    } else {
        display.value = "0";
    }
    currentInput = display.value;
}

function evaluateExpression(expression) {
    if (!isNaN(parseFloat(expression)) && isFinite(expression)) {
        return parseFloat(expression);
    }
    
    const tokens = [];
    let currentNumber = '';
    
    for (let i = 0; i < expression.length; i++) {
        const char = expression[i];
        
        if (char === '+' || char === '-' || char === '*' || char === '/') {
            if (currentNumber) {
                tokens.push(parseFloat(currentNumber));
                currentNumber = '';
            }
            tokens.push(char);
        } else if (!isNaN(parseInt(char)) || char === '.') {
            currentNumber += char;
        }
    }
    
    if (currentNumber) {
        tokens.push(parseFloat(currentNumber));
    }
    
    for (let i = 1; i < tokens.length; i += 2) {
        if (tokens[i] === '*') {
            tokens[i-1] = tokens[i-1] * tokens[i+1];
            tokens.splice(i, 2);
            i -= 2;
        } else if (tokens[i] === '/') {
            tokens[i-1] = tokens[i-1] / tokens[i+1];
            tokens.splice(i, 2);
            i -= 2;
        }
    }
    
    let result = tokens[0];
    for (let i = 1; i < tokens.length; i += 2) {
        if (tokens[i] === '+') {
            result += tokens[i+1];
        } else if (tokens[i] === '-') {
            result -= tokens[i+1];
        }
    }
    
    return result;
}

function insertMathFunction(func) {
    if (func === 'Math.sqrt') {
    try {
        const value = evaluateExpression(display.value);
        display.value = Math.sqrt(value);
        calculationDone = true;
    } catch (e) {
        display.value = "Error";
    }

    } else if (func === 'Math.pow') {
        try {
        leftOperand = evaluateExpression(display.value);
        history.textContent = `${display.value}^`;
        currentOperator = "pow";
        waitingForRightOperand = true;
        calculationDone = false;
    } catch(e) {
        display.value = "Error";
    }
} else if (func === 'Math.abs') {
    history.textContent = `abs(${display.value})`;
    try {
        const value = evaluateExpression(display.value);
        display.value = Math.abs(value);
        calculationDone = true;
    } catch (e) {
        display.value = "Error";
    }
} else if (func === 'Math.asin' || func === 'Math.acos' || func === 'Math.atan') {
    const funcName = func.split('.')[1];
    history.textContent = `${funcName}(${display.value})`;
    try {
        const value = evaluateExpression(display.value);
        switch (funcName) {
            case 'asin':
                display.value = Math.asin(value);
                break;
            case 'acos':
                display.value = Math.acos(value);
                break;
            case 'atan':
                display.value = Math.atan(value);
                break;
        }
        calculationDone = true;
    } catch(e) {
        display.value = "Error";
    }
} else if (func === 'Math.log') {
    history.textContent = `log(${display.value})`;
    try {
        const value = evaluateExpression(display.value);
        display.value = Math.log10(value);
        calculationDone = true;
    } catch (e) {
        display.value = "Error";
    }
} else if (func === 'Math.exp') {
    history.textContent = `exp(${display.value})`;
    try {
        const value = evaluateExpression(display.value);
        display.value = Math.exp(value);
        calculationDone = true;
    } catch (e) {
        display.value = "Error";
    }
} else if (func === 'Math.round' || func ==='Math.ceil' || func === 'Math.floor') {
    const funcName = func.split('.')[1];
    history.textContent = `${funcName}(${display.value})`;
    try {
        const value = evaluateExpression(display.value);
        switch (funcName) {
            case 'round':
                display.value = Math.round(value);
                break;
            case 'ceil':
                display.value = Math.ceil(value);
                break;
                case 'floor':
                    display.value = Math.floor(value);
                    break;
        }
        calculationDone = true;
    } catch (e) {
        display.value = "Error";
    }
} else if (func === 'Math.sin' || func === 'Math.cos' || func === 'Math.tan') {
    const funcName = func.split('.')[1];
    history.textContent = `${funcName}(${display.value})`;
    try {
        const value = evaluateExpression(display.value);
        switch (funcName) {
            case 'sin':
                display.value = Math.sin(value);
                break;
            case 'cos':
                display.value = Math.cos(value);
                break;
            case 'tan':
                display.value = Math.tan(value);
                break;
        }
        calculationDone = true;
    } catch (e) {
        display.value = "Error";
    }
}

}
function insertMathConstant(constant) {
    switch (constant) {
        case 'Math.PI':
            display.value = Math.PI;
            break;
        case 'Math.E':
            display.value = Math.E;
            break;
        case 'Math.LN2':
            display.value = Math.LN2;
            break;
        case 'Math.LN10':
            display.value = Math.LN10;
            break;
        default:
            display.value = "Error";
            return;
    }
    currentInput = display.value;
    calculationDone = true;
}

function calculate() {
   try {
        if (currentOperator === "pow" && leftOperand !== null) {
            // Handle power operation
            const rightOperand = parseFloat(display.value);
            history.textContent = `${leftOperand}^${rightOperand}`;
            display.value = Math.pow(leftOperand, rightOperand);
            leftOperand = null;
            currentOperator = null;
        } else {
            // Handle normal operations
            history.textContent = display.value;
            display.value = evaluateExpression(display.value);
        }
        calculationDone = true;
    } catch (e) {
        display.value = "Error";
    }
}

// Contacts App Functions
let contactsData = {
    "contacts": [
        {
            "id": 1,
            "name": "John Doe",
            "email": "john@example.com",
            "phone": "555-123-4567",
            "type": "personal"
        },
        {
            "id": 2,
            "name": "Jane Smith",
            "email": "jane@company.com",
            "phone": "555-987-6543",
            "type": "work"
        },
        {
            "id": 3,
            "name": "Bob Johnson",
            "email": "bob@family.net",
            "phone": "555-555-5555",
            "type": "family"
        }
    ]
};

function displayContacts(contacts = contactsData.contacts) {
    const contactsList = document.getElementById('contacts-list');
    contactsList.innerHTML = '';
    
    if (contacts.length === 0) {
        contactsList.innerHTML = '<p>No contacts found.</p>';
        return;
    }
    
    contacts.forEach(contact => {
        const div = document.createElement('div');
        div.className = 'contact-card';
        div.innerHTML = `
            <h3>${contact.name}</h3>
            <p>Email: ${contact.email}</p>
            <p>Phone: ${contact.phone}</p>
            <p>Type: ${contact.type.charAt(0).toUpperCase() + contact.type.slice(1)}</p>
        `;
        contactsList.appendChild(div);
    });
}

function updateJSONDisplay() {
    const jsonContent = document.getElementById('json-content');
    jsonContent.textContent = JSON.stringify(contactsData, null, 4);
}

function searchContacts() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    
    if (!searchTerm) {
        displayContacts();
        return;
    }
    
    const filteredContacts = contactsData.contacts.filter(contact => {
        return contact.name.toLowerCase().includes(searchTerm) ||
                contact.email.toLowerCase().includes(searchTerm) ||
                contact.phone.includes(searchTerm) ||
                contact.type.toLowerCase().includes(searchTerm);
    });
    
    displayContacts(filteredContacts);
}

function addContact() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const type = document.getElementById('type').value;
    
    let newId;
    if (contactsData.contacts.length > 0) {
        const maxId = Math.max(...contactsData.contacts.map(function(c) { 
            return c.id; 
        }));
        newId = maxId + 1;
    } else {
        newId = 1;
    }
    
    const newContact = {
        id: newId,
        name,
        email,
        phone,
        type
    };
    
    contactsData.contacts.push(newContact);
    document.getElementById('contact-form').reset();
    displayContacts();
    updateJSONDisplay();
    alert('Contact added successfully!');
    switchTab('view');
    
    return false;
}

function resetSearch() {
    document.getElementById('search-input').value = '';
    displayContacts();
}

function switchTab(tabId) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        if (tab.textContent.toLowerCase().includes(tabId)) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        if (content.id === `${tabId}-contacts` || content.id === `${tabId}-contact` || content.id === `${tabId}-view`) {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });
    
    if (tabId === 'json') {
        updateJSONDisplay();
    }
}

// Initialize contacts on load
window.addEventListener('load', function() {
    displayContacts();
    updateJSONDisplay();
});