Installing UWIN v4.2 (AT&T Unix for Windows)

1. Launch Internet Explorer
2. Goto URL: http://academy.delmar.edu/Courses/ITSC1405/  (your class home page)
3. Select the "Downloads" link.  (on the right-side)
4. User-ID: delmarco  Password: camino
5. Select directory: UWin_(AT&T_Unix-for-Windows)

6. Rt-click and "Save target as:" two files from this location:
   6.1. UWin-base.2007-11-05.win32.i386.exe (7.1MB)
   6.2. ksh.ico  (* This icon file can be saved directly to C:\WINDOWS *).
----
Close Internet Explorer.
----
7. Dbl-click the "UWin-base.2007-11-05.win32.i386.exe" program icon to start the install.
   7.1 Change the Answer to "C:\root" 
   		for the first prompt: 'Select UWIN Root directory'.
       --(the default answer is: C:\Program Files\UWIN)
   7.2 Change the Answer to "C:\root\home" 
   		for the second prompt: 'Select Users directory'.
       --(the default answer is: C:\users)
   7.3 You may get a final UWIN installation message:
       "UWIN 4.0 installation complete -- 2 warnings ignored." -this is OK.
   7.4 If you get a install error message -- 'x errors, installation failed'
   		just reinstall the UWin software, this is a file security issue.
----
Close the UWIN installation window.
----
8. Check you UWIN installation:
   8.1 Check for the directory:  C:\root
   8.2 Check for the directory:  C:\root\home
   8.3 Check if "home directories" for all accounts on your host computer
       have been created in      C:\root\home\
----
UWIN Installation and Configuration finished!.
----
9.  An extra step to make the UWIN (ksh logon) shortcut easier to find:
    Rt-click the UWIN (ksh logon) shortcut icon on the desktop.
    Select the button "Change Icon" from the Shortcut tab.
    Point/Browse to C:\WINDOWS\ksh.ico (where you downloaded the ksh.ico file)
    Click "OK" and "OK" again to save this property change.
    (NOTE: ksh = Korn shell)

    Dbl-click the "UWIN/ksh shortcut" on your desktop to run AT&T Unix for Windows.


