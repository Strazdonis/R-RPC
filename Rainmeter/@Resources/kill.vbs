Dim oShell
Set oShell = WScript.CreateObject ("WScript.Shell")
oShell.Run "TaskKill /IM r-rpc.exe",0 , True