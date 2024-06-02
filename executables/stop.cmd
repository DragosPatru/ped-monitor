@echo off
:: Check if the PID file exists
if not exist %CD%\daemon_pid.txt (
    echo No PID file found. Daemon might not be running.
    exit /b 1
)

:: Read the PID from the file
set /p PID=<%CD%\daemon_pid.txt

:: Kill the process with the PID
taskkill /F /PID %PID%

:: Delete the PID file
del %CD%\daemon_pid.txt

echo Daemon with PID %PID% stopped.
