Little script to list global non intrinsic js variables to help keep your scripts clean. 

Based on an idea by Remy Sharp http://remysharp.com/2007/11/01/detect-global-variables/ about creating an iframe and then comparing contents to main window to easily exclude intrinsic window objects.

Usage:

Tested just in Chrome at present.

Add script:
<script src="leaky.js"></script>

Set options (all are optional):

var leakyOptions={
filterEntries: true,
allowedObjs: ['leaky','leakyOptions','event','goodGlobal'],
allowedRegex: ['another[0-9]'],
};

Print out those pesky global variables:
console.dir(leaky.getGlobals(leakyOptions));
