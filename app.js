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
                        let userInput = prompt("Enter time (HH, MM, SS, HH:MM, MM:SS, or HH:MM:SS Agr English kachi hai tu ma samghta hn agr second ma likhna hai tu 1,2 ya 40 do or minute ma tu 30:59 asa semicolum laga gi bich ma):");
                        if (!userInput) {
                            alert("Bhai mugha ku khali chora mara sa dushmani hai kia");
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
                            alert("Invalid input! Please enter time in HH, MM, SS, HH:MM, MM:SS, or HH:MM:SS format.");
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
                
                    timeDisplay.addEventListener("blur", function () {
                        let newTime = parseTimeInput(timeDisplay.textContent);
                        if (newTime !== null) {
                            timeInSeconds = newTime;
                            updateDisplay();
                        } else {
                            alert("Invalid input! Please enter time in HH, MM, SS, HH:MM, MM:SS, or HH:MM:SS format.");
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
                