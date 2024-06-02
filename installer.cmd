@echo off

:: Set variables
set "DOWNLOAD_URL=https://bit.ly/pedmonitor"
set DOWNLOAD_FILE=%USERPROFILE%\pedmonitor_app\app.zip
set INSTALL_DIR=%USERPROFILE%\pedmonitor_app
set SHORTCUT_NAME=PedMonitor
set "START_CMD_PATH=%INSTALL_DIR%\ped_monitor\start.cmd"
set "ICON_PATH=%INSTALL_DIR%\ped_monitor\simplypositive.ico"

:: Delete existing installation directory if it exists
if exist "%INSTALL_DIR%" (
    echo Deleting old versions...
    rmdir /s /q "%INSTALL_DIR%"
)

:: Create directory for installation
if not exist "%INSTALL_DIR%" (
    mkdir "%INSTALL_DIR%"
)

:: Download the file
echo Downloading application...
::powershell -Command "Invoke-WebRequest '%DOWNLOAD_URL%' -OutFile '%DOWNLOAD_FILE%'"
call curl -L -o "%DOWNLOAD_FILE%" "%DOWNLOAD_URL%"

timeout /t 2 /nobreak >nul

:: Check if the download was successful
if not exist "%DOWNLOAD_FILE%" (
    echo Error: Download failed.
	echo Installation incomplete. Please retry or contact the admin.
	timeout /t 10 /nobreak >nul
	
) else (
	echo Download completed.

	:: Extract the application
	echo Preparing workspace...
	powershell -Command "Expand-Archive -Path '%DOWNLOAD_FILE%' -DestinationPath '%INSTALL_DIR%'"

	:: Check if the extraction was successful
	if errorlevel 1 (
		echo Error: Extraction failed.
		exit 1
	)

	:: Create a shortcut for start.cmd
	echo Creating shortcut ...
	:: Determine the desktop directory path
	for /f "usebackq tokens=*" %%d in (`powershell -Command "[Environment]::GetFolderPath('Desktop')"`) do set "DESKTOP_PATH=%%d"
	set "SHORTCUT_PATH=%DESKTOP_PATH%\%SHORTCUT_NAME%.lnk"

	powershell -Command "$WScriptShell = New-Object -ComObject WScript.Shell; $Shortcut = $WScriptShell.CreateShortcut('%SHORTCUT_PATH%'); $Shortcut.TargetPath = '%START_CMD_PATH%';$Shortcut.IconLocation = '%ICON_PATH%'; $Shortcut.Save()"
	
	echo Installation complete. Shortcut to start the application has been created on the desktop.
	timeout /t 10 /nobreak >nul
)