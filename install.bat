@echo off
echo Uninstalling serivce...
node service.js uninstall

echo Waiting for the uninstall to finish...
rem Wait for the previous command to finish
if %errorlevel% neq 0 (
	echo Uninstall failed. Exiting.
	exit /b %errorlevel%
)

echo Installing service...
node service.js install

echo Installation complete.
pause