@echo off
echo ===================================================
echo Eco-Simbios Gelistirme Sunucusu Baslatiliyor...
echo ===================================================
echo.

:: Node.js yolunu sistem yoluna gecici olarak ekle
set "PATH=%PATH%;C:\Program Files\nodejs\"

:: Guncel dizinde npm komutunu calistir
cd frontend && call npm run dev

if %ERRORLEVEL% neq 0 (
    echo.
    echo [HATA] Sunucu baslatilamadi. npm komutu bulunamamis olabilir.
    echo Lutfen bilgisayari yeniden baslatmayi deneyin.
    pause
)
