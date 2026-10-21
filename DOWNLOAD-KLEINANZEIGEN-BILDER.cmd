@echo off
setlocal EnableExtensions DisableDelayedExpansion
cd /d "%~dp0"
if not exist "index.html" (
  echo ERROR: Put this CMD file in the main website folder next to index.html.
  echo Extract the website ZIP before running it.
  pause
  exit /b 1
)
where curl.exe >nul 2>nul
if errorlevel 1 (
  echo ERROR: curl.exe is required. It is normally included in Windows 10 and 11.
  pause
  exit /b 1
)
where powershell.exe >nul 2>nul
if errorlevel 1 (
  echo ERROR: Windows PowerShell is required to validate downloaded image files.
  pause
  exit /b 1
)
if not exist "assets\kleinanzeigen" mkdir "assets\kleinanzeigen"
echo ============================================================
echo OTHMAN - DOWNLOAD REAL PROJECT PHOTOS
echo Downloading 41 original image files directly from Kleinanzeigen.
echo Photos will go into: assets\kleinanzeigen
echo Website pages already use these local file paths.
echo ============================================================
set /a success=0
set /a failures=0
set /a already=0
call :download "kueche-01.jpg" "https://img.kleinanzeigen.de/api/v1/prod-ads/images/10/10b8a278-bf9a-4329-af76-8dabf20e3a96?rule=$_59.AUTO"
call :download "kueche-02.jpg" "https://img.kleinanzeigen.de/api/v1/prod-ads/images/37/37fa5ca3-b771-40eb-9843-354b93f4d92e?rule=$_59.AUTO"
call :download "kueche-03.jpg" "https://img.kleinanzeigen.de/api/v1/prod-ads/images/d3/d3e1be43-5494-42ba-b612-8f4d98bf4457?rule=$_59.AUTO"
call :download "kueche-04.jpg" "https://img.kleinanzeigen.de/api/v1/prod-ads/images/05/0586b07d-4f6c-4a82-80de-b2f7d16238ef?rule=$_59.AUTO"
call :download "kueche-05.jpg" "https://img.kleinanzeigen.de/api/v1/prod-ads/images/3a/3a173ab4-3e49-4f22-b57f-ae64749c2f04?rule=$_59.AUTO"
call :download "kueche-06.jpg" "https://img.kleinanzeigen.de/api/v1/prod-ads/images/0d/0d1b43c3-2169-4450-8fb9-846531e25b5e?rule=$_59.AUTO"
call :download "kueche-07.jpg" "https://img.kleinanzeigen.de/api/v1/prod-ads/images/5e/5e632563-cb1a-496a-97b5-d7496883e89f?rule=$_59.AUTO"
call :download "kueche-08.jpg" "https://img.kleinanzeigen.de/api/v1/prod-ads/images/de/deff9c88-38c8-4756-8388-1591b542ad6d?rule=$_59.AUTO"
call :download "kueche-09.jpg" "https://img.kleinanzeigen.de/api/v1/prod-ads/images/01/01c16fa0-2034-4cac-9851-ecc13c2ddde1?rule=$_59.AUTO"
call :download "kueche-10.jpg" "https://img.kleinanzeigen.de/api/v1/prod-ads/images/43/430fe0ea-b7df-4b3b-a8ad-027851feb56a?rule=$_59.AUTO"
call :download "kueche-11.jpg" "https://img.kleinanzeigen.de/api/v1/prod-ads/images/db/db4cfec2-6b31-4212-8cc1-4b76020f81dd?rule=$_59.AUTO"
call :download "kueche-12.jpg" "https://img.kleinanzeigen.de/api/v1/prod-ads/images/3b/3bdca0cf-387a-4085-a499-6cd99d757212?rule=$_59.AUTO"
call :download "kueche-13.jpg" "https://img.kleinanzeigen.de/api/v1/prod-ads/images/d2/d2f59805-df0e-4526-865b-2347cb171663?rule=$_59.AUTO"
call :download "kueche-14.jpg" "https://img.kleinanzeigen.de/api/v1/prod-ads/images/8e/8efc46ba-ea2d-41ff-a23e-025851a5bf8b?rule=$_59.AUTO"
call :download "kueche-15.jpg" "https://img.kleinanzeigen.de/api/v1/prod-ads/images/03/0317b648-db1d-4ecf-870d-6e8986916258?rule=$_59.AUTO"
call :download "kueche-16.jpg" "https://img.kleinanzeigen.de/api/v1/prod-ads/images/c7/c7aab638-892e-456c-bb22-49634c2e54a7?rule=$_59.AUTO"
call :download "kueche-17.jpg" "https://img.kleinanzeigen.de/api/v1/prod-ads/images/0a/0aac5fcd-28b1-4310-8b9e-b1c48aa09a57?rule=$_59.AUTO"
call :download "kueche-18.jpg" "https://img.kleinanzeigen.de/api/v1/prod-ads/images/50/5061bccc-4070-409e-9339-3b58af45f9ca?rule=$_59.AUTO"
call :download "kueche-19.jpg" "https://img.kleinanzeigen.de/api/v1/prod-ads/images/39/394df3e4-109b-41e1-ad18-49eac6d52b05?rule=$_59.AUTO"
call :download "kueche-20.jpg" "https://img.kleinanzeigen.de/api/v1/prod-ads/images/8c/8c15575e-4a2f-463e-8aae-c4a6d1bdfed1?rule=$_59.AUTO"
call :download "moebel-01.jpg" "https://img.kleinanzeigen.de/api/v1/prod-ads/images/f7/f780d39a-d823-4b2c-83a4-e6671472b7a3?rule=$_59.AUTO"
call :download "moebel-02.jpg" "https://img.kleinanzeigen.de/api/v1/prod-ads/images/9a/9a188ea0-6f41-4215-ac9b-8c9a3363d067?rule=$_59.AUTO"
call :download "moebel-03.jpg" "https://img.kleinanzeigen.de/api/v1/prod-ads/images/ce/cec3c127-f97a-48f4-82e8-c6c1aa8f13c1?rule=$_59.AUTO"
call :download "moebel-04.jpg" "https://img.kleinanzeigen.de/api/v1/prod-ads/images/98/9835a1d5-60c1-41f5-a952-10750d0d1478?rule=$_59.AUTO"
call :download "moebel-05.jpg" "https://img.kleinanzeigen.de/api/v1/prod-ads/images/c1/c167f0a6-f067-4e56-85e9-c95d4ebade0b?rule=$_59.AUTO"
call :download "moebel-06.jpg" "https://img.kleinanzeigen.de/api/v1/prod-ads/images/4c/4cc8869e-0eff-48cf-9b7a-45a12c520014?rule=$_59.AUTO"
call :download "moebel-07.jpg" "https://img.kleinanzeigen.de/api/v1/prod-ads/images/cd/cdc6f734-14bb-4801-bc29-63afbe27d852?rule=$_59.AUTO"
call :download "moebel-08.jpg" "https://img.kleinanzeigen.de/api/v1/prod-ads/images/54/541ff4c6-06b3-429b-80ed-081a29422d06?rule=$_59.AUTO"
call :download "moebel-09.jpg" "https://img.kleinanzeigen.de/api/v1/prod-ads/images/5e/5e34cea3-41bd-4808-86fd-5f774a357ce5?rule=$_59.AUTO"
call :download "moebel-10.jpg" "https://img.kleinanzeigen.de/api/v1/prod-ads/images/66/669b69ff-0b27-414d-90ed-e7cf75bde9f3?rule=$_59.AUTO"
call :download "moebel-11.jpg" "https://img.kleinanzeigen.de/api/v1/prod-ads/images/69/69441c47-3b95-47e7-b8cc-8c35a5a64498?rule=$_59.AUTO"
call :download "moebel-12.jpg" "https://img.kleinanzeigen.de/api/v1/prod-ads/images/53/53d1528e-4c63-4997-8a45-a49b6079ac20?rule=$_59.AUTO"
call :download "moebel-13.jpg" "https://img.kleinanzeigen.de/api/v1/prod-ads/images/d6/d69eca6a-9e84-4d54-ac99-c11f68f3de65?rule=$_59.AUTO"
call :download "moebel-14.jpg" "https://img.kleinanzeigen.de/api/v1/prod-ads/images/20/2093c888-e978-4c7b-b9bc-854da69ac74e?rule=$_59.AUTO"
call :download "moebel-15.jpg" "https://img.kleinanzeigen.de/api/v1/prod-ads/images/00/003577bb-ec49-4b82-8f42-9f88e1279082?rule=$_59.AUTO"
call :download "moebel-16.jpg" "https://img.kleinanzeigen.de/api/v1/prod-ads/images/6a/6acf42c9-fea1-4830-af56-42931c8eed8e?rule=$_59.AUTO"
call :download "moebel-17.jpg" "https://img.kleinanzeigen.de/api/v1/prod-ads/images/49/494332ed-7cc5-4e24-ad3c-c35efdcad255?rule=$_59.AUTO"
call :download "moebel-18.jpg" "https://img.kleinanzeigen.de/api/v1/prod-ads/images/dd/dd71cd80-f3b8-4889-9abd-24a1c033aba0?rule=$_59.AUTO"
call :download "moebel-19.jpg" "https://img.kleinanzeigen.de/api/v1/prod-ads/images/29/298b2b62-3b43-4f61-b3f7-8781acfe8099?rule=$_59.AUTO"
call :download "moebel-20.jpg" "https://img.kleinanzeigen.de/api/v1/prod-ads/images/bf/bf53b849-01be-4bb7-9170-fba6a5cfde76?rule=$_59.AUTO"
call :download "planung-01.jpg" "https://img.kleinanzeigen.de/api/v1/prod-ads/images/55/55256483-ece2-4882-a16e-e3b475adde4a?rule=$_59.AUTO"

echo.
echo ============================================================
echo Downloaded: %success%   Already present: %already%   Failed: %failures%
echo.
if %failures% GTR 0 (
  echo Some pictures could not be downloaded. Check your connection.
  echo You may run this same CMD again: already downloaded pictures are skipped.
  echo If images are blocked by Kleinanzeigen, request photos from the owner.
) else (
  echo All local image files are ready.
  echo You can now upload the whole website folder to your hosting.
)
echo ============================================================
pause
if %failures% GTR 0 (exit /b 1) else (exit /b 0)

:download
set "local=assets\kleinanzeigen\%~1"
if exist "%local%" (
  for %%Z in ("%local%") do if %%~zZ GTR 1024 (
    echo [SKIP] %~1
    set /a already+=1
    exit /b 0
  )
)
echo [GET] %~1
if exist "%local%.part" del /q "%local%.part" >nul 2>nul
curl.exe --fail --location --silent --show-error --retry 3 --retry-delay 2 --connect-timeout 15 --max-time 50 --user-agent "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0 Safari/537.36" --header "Accept: image/jpeg,image/png,image/webp,image/*;q=0.8" --header "Referer: https://www.kleinanzeigen.de/" --output "%local%.part" "%~2"
if errorlevel 1 goto :download_failed
powershell.exe -NoProfile -Command "$p='%local%.part'; $b=[IO.File]::ReadAllBytes($p); $ok=($b.Length -ge 1024) -and ((($b[0] -eq 255) -and ($b[1] -eq 216)) -or (($b[0] -eq 137) -and ($b[1] -eq 80) -and ($b[2] -eq 78) -and ($b[3] -eq 71)) -or (([Text.Encoding]::ASCII.GetString($b,0,4) -eq 'RIFF') -and ([Text.Encoding]::ASCII.GetString($b,8,4) -eq 'WEBP'))); if (-not $ok) { exit 1 }" >nul 2>nul
if errorlevel 1 goto :download_failed
move /y "%local%.part" "%local%" >nul
if errorlevel 1 goto :download_failed
set /a success+=1
echo [OK] %~1
exit /b 0

:download_failed
if exist "%local%.part" del /q "%local%.part" >nul 2>nul
echo [FAILED] %~1
set /a failures+=1
exit /b 1
