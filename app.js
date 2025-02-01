// Stop Watch: Dont touch my code 

let timer;
        let isRunning = false;
        let elapsedTime = 0;
        function startStop() {
            const startStopBtn = document.getElementById('startStopBtn');
            if (isRunning) {
                clearInterval(timer);
                startStopBtn.textContent = '▶';
            } else {
                let startTime = Date.now() - elapsedTime;
                timer = setInterval(() => {
                    elapsedTime = Date.now() - startTime;
                    document.getElementById('display').textContent = (elapsedTime / 1000).toFixed(2);
                }, 10);
                startStopBtn.textContent = '❚❚'; 
            }
            isRunning = !isRunning;
        }
        function reset() {
            clearInterval(timer);
            elapsedTime = 0;
            isRunning = false;
            document.getElementById('display').textContent = "0.00";
            document.getElementById('startStopBtn').textContent = '▶'; 
        }

        // Timer Function 
                
   
                document.addEventListener("DOMContentLoaded", function () {
                    let timeInSeconds = 0;
                    let timerInterval;
                    let isRunning = false;
                    const timeDisplay = document.querySelector(".time-display");
                    const startButton = document.querySelector(".start-button");
                    const buttons = document.querySelectorAll(".btn");
                    const resetButton = document.createElement("button");
                    const userInputButton = document.createElement("button");
                    const buttonContainer = document.createElement("div");
                
                    resetButton.textContent = "Reset";
                    resetButton.classList.add("btn");
                    userInputButton.textContent = "Set Time";
                    userInputButton.classList.add("btn");
                
                    buttonContainer.classList.add("button-container");
                    buttonContainer.appendChild(userInputButton);
                    buttonContainer.appendChild(resetButton);
                
                    document.querySelector(".timer-container").appendChild(startButton);
                    document.querySelector(".timer-container").appendChild(buttonContainer);
                
                    timeDisplay.contentEditable = true;
                    timeDisplay.style.cursor = "text";
                
                    function formatTime(time) {
                        let hours = Math.floor(time / 3600);
                        let minutes = Math.floor((time % 3600) / 60);
                        let seconds = time % 60;
                
                        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
                    }
                
                    function updateDisplay() {
                        timeDisplay.textContent = formatTime(timeInSeconds);
                    }
                
                    function toggleTimer() {
                        if (isRunning) {
                            clearInterval(timerInterval);
                            timerInterval = null;
                            startButton.textContent = "▶";
                        } else {
                            timerInterval = setInterval(() => {
                                if (timeInSeconds > 0) {
                                    timeInSeconds--;
                                    updateDisplay();
                                } else {
                                    clearInterval(timerInterval);
                                    timerInterval = null;
                                    isRunning = false;
                                    startButton.textContent = "▶";
                                }
                            }, 1000);
                            startButton.textContent = '❚❚';
                        }
                        isRunning = !isRunning;
                    }
                
                    function addTime(seconds) {
                        timeInSeconds += seconds;
                        updateDisplay();
                    }
                
                    function parseTimeInput(userInput) {
                        if (!userInput) return null;
                
                        userInput = userInput.trim();
                        let timeParts = userInput.split(":").map(num => parseInt(num, 10) || 0);
                
                        let hours = 0, minutes = 0, seconds = 0;
                        if (timeParts.length === 1) {
                            seconds = timeParts[0];
                        } else if (timeParts.length === 2) {
                            minutes = timeParts[0];
                            seconds = timeParts[1];
                        } else if (timeParts.length === 3) {
                            hours = timeParts[0];
                            minutes = timeParts[1];
                            seconds = timeParts[2];
                        } else {
                            return null;
                        }
                
                        if (hours < 0 || minutes < 0 || minutes >= 60 || seconds < 0 || seconds >= 60) {
                            return null;
                        }
                
                        return hours * 3600 + minutes * 60 + seconds;
                    }
                
                    function setTime() {
                        let userInput = prompt("Enter time in HH:MM:SS format:");
                        if (!userInput) {
                            alert("Please enter a valid time.");
                            return;
                        }
                        let newTime = parseTimeInput(userInput);
                
                        if (newTime !== null) {
                            timeInSeconds = newTime;
                            updateDisplay();
                            clearInterval(timerInterval);
                            timerInterval = null;
                            isRunning = false;
                            startButton.textContent = "▶";
                        } else {
                            alert("Invalid input! Please enter time in HH:MM:SS format.");
                        }
                    }
                
                    function resetTimer() {
                        timeInSeconds = 0;
                        updateDisplay();
                        clearInterval(timerInterval);
                        timerInterval = null;
                        isRunning = false;
                        startButton.textContent = "▶";
                    }
                
                    // Function to enforce HH:MM:SS format
                    function enforceTimeFormat() {
                        let text = timeDisplay.textContent;
                        let newText = "";
                
                        // Remove any non-numeric characters
                        text = text.replace(/[^0-9]/g, '');
                
                        // Ensure only 6 digits are allowed (HHMMSS)
                        if (text.length > 6) {
                            text = text.slice(0, 6);
                        }
                
                        // Add colons in the correct positions
                        for (let i = 0; i < text.length; i++) {
                            if (i === 2 || i === 4) {
                                newText += ":";
                            }
                            newText += text[i];
                        }
                
                        // Update the display with formatted text
                        timeDisplay.textContent = newText;
                    }
                
                    // Function to handle cursor position and editing
                    function handleEditing(event) {
                        let cursorPosition = getCursorPosition(timeDisplay);
                        enforceTimeFormat();
                
                        // Restore cursor position after formatting
                        setCursorPosition(timeDisplay, cursorPosition);
                    }
                
                    // Helper function to get cursor position
                    function getCursorPosition(element) {
                        let selection = window.getSelection();
                        let range = selection.getRangeAt(0);
                        let preCaretRange = range.cloneRange();
                        preCaretRange.selectNodeContents(element);
                        preCaretRange.setEnd(range.endContainer, range.endOffset);
                        return preCaretRange.toString().length;
                    }
                
                    // Helper function to set cursor position
                    function setCursorPosition(element, position) {
                        let range = document.createRange();
                        let selection = window.getSelection();
                        range.setStart(element.childNodes[0], position);
                        range.collapse(true);
                        selection.removeAllRanges();
                        selection.addRange(range);
                    }
                
                    // Event listener for input
                    timeDisplay.addEventListener("input", handleEditing);
                
                    // Event listener for blur (when user finishes editing)
                    timeDisplay.addEventListener("blur", function () {
                        let newTime = parseTimeInput(timeDisplay.textContent);
                        if (newTime !== null) {
                            timeInSeconds = newTime;
                            updateDisplay();
                        } else {
                            alert("Invalid input! Please enter time in HH:MM:SS format.");
                            updateDisplay();
                        }
                    });
                
                    startButton.addEventListener("click", toggleTimer);
                    buttons[0].addEventListener("click", () => addTime(30));
                    buttons[1].addEventListener("click", () => addTime(60));
                    buttons[2].addEventListener("click", () => addTime(300));
                    userInputButton.addEventListener("click", setTime);
                    resetButton.addEventListener("click", resetTimer);
                
                    updateDisplay();
                });