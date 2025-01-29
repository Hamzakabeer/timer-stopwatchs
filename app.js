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
            let timeInSeconds = 0; // Default 0 minutes
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
            
            buttonContainer.style.marginTop = "10px";
            buttonContainer.appendChild(userInputButton);
            buttonContainer.appendChild(resetButton);
            
            document.querySelector(".timer-container").appendChild(startButton);
            document.querySelector(".timer-container").appendChild(buttonContainer);
        
            function updateDisplay() {
                let minutes = Math.floor(timeInSeconds / 60);
                let seconds = timeInSeconds % 60;
                timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            }
        
            function toggleTimer() {
                if (isRunning) {
                    clearInterval(timerInterval);
                    timerInterval = null;
                    startButton.textContent = "▶"; // Play Icon
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
                    startButton.textContent = "⏸"; // Pause Icon
                }
                isRunning = !isRunning;
            }
        
            function addTime(seconds) {
                timeInSeconds += seconds;
                updateDisplay();
            }
        
            function setTime() {
                let userInput = prompt("Enter time in minutes:");
                let newTime = parseInt(userInput, 10) * 60;
                if (!isNaN(newTime) && newTime >= 0) {
                    timeInSeconds = newTime;
                    updateDisplay();
                    clearInterval(timerInterval);
                    timerInterval = null;
                    isRunning = false;
                    startButton.textContent = "▶";
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
        
            startButton.addEventListener("click", toggleTimer);
            buttons[0].addEventListener("click", () => addTime(30));
            buttons[1].addEventListener("click", () => addTime(60));
            buttons[2].addEventListener("click", () => addTime(300));
            userInputButton.addEventListener("click", setTime);
            resetButton.addEventListener("click", resetTimer);
            
            updateDisplay();
        });
        



        