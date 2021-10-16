----------------
UWIN release 4.0
----------------

UWIN is licensed under the open source Common Public License CPL 1.0,
http://www.opensource.org/licenses/cpl.

UWIN is split into several self extracting archive executables that
must be downloaded separately.

UWIN runs best on Windows XP/NT/2000 with NTFS, but will run in
degraded mode with the FAT file system, and further degradation with
Windows ME/98/95.  See below for more details.

UWIN requires at least 35 Megabytes of disk space.  On Windows
XP/NT/2000 you should be logged in as Administrator or as a user with
Administrators group privileges when you install the packages.  It's
also preferable to install on NTFS when possible, since it supports a
more complete set of file system attributes.

The installation creates a UWIN program group.  An incomplete set of
online documentation is provided. Most utilties provide their own
documentation by invoking the utility with the --man option.

The file uwin-base.YYYY-MM-DD.win32.i386.exe is a self extracting
archive containing the basic UWIN distribution.  It contains over 250
UNIX utilities plus telnet and rlogin daemons for NT so that you can
telnet or rlogin to a UNIX shell from another machine.  To install the
base package, just download and run this program following the
directions it provides.  You can select the directory on which you wish
to to install the package, and this directory will become the UNIX root
directory /.  Each mounted drive letter will be mounted as a directory
whose name is the drive letter under this directory.

The file uwin-dev.YYYY-MM-DD.win32.i386.exe is a self extracting
archive containing the development tools such as lex, yacc, cc, make,
and the AT&T nmake program.  It also contains header files and
libraries needed for compiling software with UWIN.  It currently relies
on the Microsoft C/C++ compiler but it should work with versions 4.X,
5.X, and 6.X.  The GNU complier and development tools are also
available for download from
http://www.xraylith.wisc.edu/~khan/software/gnu-win32/egcs-uwin.html.

Please send comments or bug reports to uwin@research.att.com.  There is
no guarantee that bugs will be fixed or that your mail will be
answered, but it will be read.  We appreciate feedback.

In addition there are two mailing groups named uwin-users,
uwin-developers, and uwin-annouce that you can subscribe to.

================Current Limitations========================

Even with Windows NT and NTFS this release of the software has the
following limitations:

1.  Upper and lower case filenames are not distinct by default.
    You need to mount parts of parts the file system that you
    want to be case sensitive without the ignore case (ic) option.
    Performance degrades on case sensitive portions of the file system.
    You can use
        mount -t lofs -o rw dir dir
    to cause all files under dir to be treated as case sensitive.
    The CaseSensitive=1 under the Resources registry key of UWIN
    will make the default be case sensitive on the next reboot.

2.  Several special characters cannot be use as part of file names.
    For example, :<>*| are not valid file name characters.

3.  A number of the /dev devices, such as /dev/mem and
    /dev/kmem are not supported.

4.  By default files are treated as binary files so that
    carriage returns in files can cause a problem.
    The open flags O_TEXT and O_BINARY can be used to force
    text or binary behavior respectively.  However, text
    files do not keep seek pointer consistent with the number
    of bytes read, and the number of bytes read from a text
    file might be less that the size returned by stat.
    The command nocrnl can be used as a filter to
    remove carriage returns or can be used to remove
    carriage returns in place.

5.  Even though the mailx program is provided, it cannot
    be used to send and receive mail since it is not
    connected to a transport.  It can be used to read
    though a mail file.    However, you can use the sendmail
    server from another host by putting
        set smtp=<hostname>
        set sendmail="smtp://"
    in the /etc/mailx.rc file.


When running on FAT file systems, the following additional limitations
apply and these are not likely to be corrected in a future release:

1.  You cannot set an owner or group or permissions for user and group.

2.  You cannot delete files that are in use.

Another limitation of the current UWIN release is that the cc command
requires the Microsoft C/C++  4.X,  5.X, or 6.X compilers or the
Microsoft development kit compiler to be present.  An alternative is to
use the GNU development kit which is available for UWIN.  We hope that
UWIN  can be made to work with other compilers.  The source code for
the cc command is provided for this purpose.  A number of changes have
already been made to work with the Borland compiler.

