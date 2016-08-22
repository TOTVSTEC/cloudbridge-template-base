#include "TOTVS.CH"

Class <%= appname %> From CloudBridgeApp
	Data StartTime

	Method New() Constructor
	Method OnStart()
	Method OnLoadFinished(url)
	
EndClass

Method New() Class <%= appname %>
	SELF:StartTime:= Seconds()
Return

Method OnStart() Class <%= appname %>
	SELF:WebView:navigate(SELF:RootPath + "index.html")
Return

Method OnLoadFinished(url) Class <%= appname %>
	Local script
	Local loadTime
	
	//Loads the js webchannel interface
	script := "window.channel = new TOTVS.TWebChannel(" + AllTrim(Str(SELF:WSPort)) + ");"
	SELF:ExecuteJavaScript(script)
	

	//If the load time is less than 3 seconds, await to hide the splash
	loadTime:= Max((Seconds() - SELF:StartTime), 0)

	if (loadTime < 3)
		Sleep((3 - loadTime) * 1000)
	Endif
	
	//Remove Splash Screen
	script := "var splash = document.getElementsByClassName('splash');"
	script += "if (splash.length > 0) {"
	script += "  splash[0].parentNode.removeChild(splash[0]);"
	script += "}"

	SELF:ExecuteJavaScript(script)
	/*
	script := "window.onerror = function(message, source, lineno, colno, error) {"
	script += "  $('body').append(message);
	script += "};"

	SELF:ExecuteJavaScript(script)
	*/
Return


User Function <%= appname %>()
Return