@echo off
:: Define the window title for the Java application
set WINDOW_TITLE=PedMonitor

set INSTALL_DIR=%USERPROFILE%\pedmonitor_app\ped_monitor
:: Set JAVA_HOME environment variable using relative path to the current directory
::set JAVA_HOME=%CD%\jre
set JAVA_HOME=%INSTALL_DIR%\jre
set PATH=%JAVA_HOME%\bin;%PATH%

:: Define the path to your JAR file relative to the current directory
set JAR_PATH=%INSTALL_DIR%\app.jar

:: Run the JAR file in the background and capture the PID
start "PedMonitorApp" java -jar %JAR_PATH% > %INSTALL_DIR%\output.log 2>&1
for /F "tokens=2 delims==; " %%i in ('wmic process where "caption='java.exe'" get processid /format:value') do set PID=%%i

:: Save the PID to a file
echo %PID% > %INSTALL_DIR%\daemon_pid.txt

:: Wait for N seconds (e.g., 10 seconds) before opening the browser
timeout /t 12 /nobreak >nul

:: Open the default web browser and navigate to http://localhost:8080
start http://localhost:8080

echo Daemon started with PID %PID%