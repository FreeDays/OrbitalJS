/*
  /`˙˙´´˙```˘˘``´´`˙˙´´˙```˘˘``´´`˙˙´´˙```˘˘``´´`˙˙´´˙```˘˘``´´`˙˙´´˙``\
 |_____________________________OrbitalJS_______________________________|
 |____________________________[v0.27.11.4]_____________________________|
 |_____________________________________________________________________|

 
 OrbitalJS is a free open-source JavaScript library. OrbitalJS's milestone is to make JavaScript easier for newbies and for developers. 
 
 OrbitalJS is under Creative Commons Attribution 4.0 International license. For more info, please visit [https://creativecommons.org/licenses/by/4.0/legalcode]
 
 	|//////   \\\\\\|
	|/////   \\\\\|
	|////   \\\\|
	|///   \\\|
	|//   \\|
	|/   \|
	|/   \|
	|//  \\|
	|///  \\\|
	|////  \\\\|
	|/////  \\\\\
	|//////  \\\\\|
 	|//////   \\\\\\|
	|/////   \\\\\|
	|////   \\\\|
	|///   \\\|
	|//   \\|
	|/   \|
	|/   \|
	|//  \\|
	|///  \\\|
	|////  \\\\|
	|/////  \\\\\|
	|//////  \\\\\\|
 	|//////  \\\\\\|
	|/////  \\\\\|
	|////  \\\\|
	|///  \\\|
	|//  \\|
	|/   \|
	|/   \|
	|//   \\|
	|///   \\\|
	|////   \\\\|
	|/////   \\\\\
	|//////   \\\\\|
 	|//////  \\\\\\|
	|/////  \\\\\|
	|////  \\\\|
	|///  \\\|
	|//  \\|
	|/  \|
	|/   \|
	|//   \\|
	|///   \\\|
	|////   \\\\|
	|/////   \\\\\|
	|//////   \\\\\\|
	
 
*/

var cookie = {
	create: function(name, value, expiration, path) {
		try {
			var isUndefined = (name === undefined || value === undefined || expiration === undefined) ? true : false;
			var isPath = (path === undefined) ? false : true;
			if (isUndefined && isPath) {
				document.cookie = name + "=" + value + ";" + expiration + ";" + path;
			}
			else if (isUndefined && isPath === false) {
				document.cookie = name + "=" + value + ";" + expiration + ";path=/";
			}
			else {
				throw "Error[#4721]: Cookie values aren't defined correctly.";
			}
		}
		catch (error) {
			console.log("%c" + error, "color: #FF0000;");
		}
	},
	
	value: function(name) {
		try {
			name = name + "=";
			var decodedCookie = decodeURIComponent(document.cookie);
			var a = decodedCookie.split(';');
			for(var i = 0; i < a.length; i++) {
				var c = a[i];
				while (c.charAt(0) == ' ') {
					c = c.substring(1);
				}
				if (c.indexOf(name) == 0) {
					return c.substring(name.length, c.length);
				}
			}
			return "";		
		}
		catch (error) {
			console.log("%c" + error, "color: #FF0000;");
		}	
	}
};

function e(name) {
	var element_type = name.substr(0,1);
	var class_sign = ".";
	var id_sign = "#";
	try {
		if (element_type === class_sign) {
			var class_name = name.replace(".","");
			return document.getElementsByClassName(class_name);
		}
		else if (element_type === id_sign) {
			var element_id = name.replace("#","");
			var element = document.getElementById(element_id);
			if (typeof element !== "undefined" || element !== null) {
				return element;
			}
			else {
				throw "Error[#2540]: Element with class or id {" + name + "} does not exist.";
			}
		}
		else {
			throw "Error[#2540]: Element with class or id {" + name + "} does not exist.";
		}
	}
	catch (error) {
		console.log("%c" + error, "color: #FF0000;");
	}
}

function textColor(element, colorValue) {
	element = e(element);
	var is_hexadecimal = (colorValue.substr(0,1) === "#" && colorValue.length === 7) ? true : false;
	var is_rgb = (colorValue.substr(0,3) === "rgb" && colorValue.substr(0,4) !== "rgba" && colorValue.length > 10) ? true : false;
	var is_rgba = (colorValue.substr(0,4) === "rgba" && colorValue.length > 13) ? true : false;
	var is_hsl = (colorValue.substr(0,3) === "hsl" && colorValue.length > 12) ? true : false;
	var is_hwb = (colorValue.substr(0,3) === "hwb" && colorValue.length > 12) ? true : false;
	var is_cmyk = (colorValue.substr(0,4) === "cmyk" && colorValue.length > 17) ? true : false;
	var is_ncol = (colorValue.substr(0.1) === "R" || colorValue.substr(0,1) === "Y", colorValue.substr(0.1) === "G" || colorValue.substr(0,1) === "C",
	colorValue.substr(0.1) === "B" || colorValue.substr(0,1) === "M" && colorValue.length > 5) ? true : false;
	var defined_values = ["red", "purple", "magenta", "cyan", "black", "blue", "aqua", "pink", "green", "lime", "grey", "orange", "yellow", "brown", "golden", "silver", "bronze",
	"lightred", "lightpurple", "lightblack", "lightblue", "lightpink", "lightgreen", "lightgrey", "lightorange", "lightyellow", "lightbrown",
	"darkred", "darkpurple", "darkblue", "darkpink", "darkgreen", "darkgrey", "darkorange", "darkyellow", "darkbrown"];
	try {
		if (is_ncol) {
			var scripts = document.getElementsByTagName("script");
			var is_loaded = false;
			for (var i = 0; i < scripts.length; i++) {
				if (scripts[i].src.includes("w3.js")) {
					is_loaded = true;
				}
				else {
					is_loaded = false;
					throw "Error[#5248]: You must include w3.js to use NCol values.";
				}
			}		
		}
		if (is_hexadecimal || is_rgb || is_rgba || is_hsl || is_hwb || is_cmyk || is_ncol && is_loaded === true) {
			var i = element.length;
			while (i--) {
				element[i].style.color = colorValue;
			}
		}
		else {
			throw "Error[#4785]: Unknown color value type {" + colorValue + "}";
		}
	}
	catch (error) {
		console.log("%c" + error, "color: #FF0000;");
	}
}

function html(element, string) {
	try {
		element = e(element);
		if (typeof string !== "undefined" && string !== undefined) {
			var i = element.length;
			while (i--) {
				element[i].innerHTML = string;
			}
		}
		else {
			var i = element.length;
			while (i--) {
				return element[i].innerHTML;
			}		
		}
	}
	catch (error) {
		console.log("%c" + error, "color: #FF0000;");
	}
}

function plus(arg1, arg2) {
	try {
		if (arg1 !== null && arg2 !== null) {
			return arg1 + arg2;
		}
		else {
			throw "Error[#7845]: Function values in plus function are not defined.";
		}
	}
	catch (error) {
		console.log("%c" + error, "color: #FF0000;");
	}
}

function minus(arg1, arg2) {
	try {
		if (arg1 !== null && arg2 !== null) {
			return arg1 - arg2;
		}
		else {
			throw "Error[#7845]: Function values in minus function are not defined.";
		}
	}
	catch (error) {
		console.log("%c" + error, "color: #FF0000;");
	}	
}

function subtract(arg1, arg2) {
	try {
		if (arg1 !== null && arg2 !== null) {
			return arg1 * arg2;
		}
		else {
			throw "Error[#7845]: Function values in subtract function are not defined.";
		}
	}
	catch (error) {
		console.log("%c" + error, "color: #FF0000;");
	}		
}

function divide(arg1, arg2) {
	try {
		if (arg1 !== null && arg2 !== null) {
			return arg1 / arg2;
		}
		else {
			throw "Error[#7845]: Function values in divide function are not defined.";
		}
	}
	catch (error) {
		console.log("%c" + error, "color: #FF0000;");
	}	
}

function sqrt(arg1, arg2) {
	try {
		if (arg1 !== null && arg2 !== null) {
			return Math.sqrt(arg1,arg2);
		}
		else {
			throw "Error[#7845]: Function values in sqrt function are not defined.";
		}
	}
	catch (error) {
		console.log("%c" + error, "color: #FF0000;");
	}		
}

function pow(arg1, arg2) {
	try {
		if (arg1 !== null && arg2 !== null) {
			return Math.pow(arg1,arg2);
		}
		else {
			throw "Error[#7845]: Function values in pow function are not defined.";
		}
	}
	catch (error) {
		console.log("%c" + error, "color: #FF0000;");
	}		
}

function random(min, max) {
	try {
		if (min !== null && max !== null) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
		else {
			throw "Error[#7845]: Function values in random function are not defined.";
		}
	}
	catch (error) {
		console.log("%c" + error, "color: #FF0000;");
	}		
}

function fadeIn(element, timing_function) {
	element = e(element);
	var is_miliseconds = (timing_function.substr(timing_function.length - 2, timing_function.length) === "ms") ? true : false;
	var is_seconds = (timing_function.substr(timing_function.length - 1, timing_function.length) === "s") ? true : false;
	try {
		if (typeof element === "undefined" && element === null) {
			throw "Error[#2540]: Element with class or id {" + name + "} does not exist.";
		}
		else if (timing_function === "fast" || timing_function === "slow") {
			var i = element.length;
			var timing_string = (timing_function === "fast") ? "700ms" : "2s";
			while (i--) {
				element[i].style.opacity = "1";
				element[i].style.transition = "opacity " + timing_string;
			}
		}
		else if (is_miliseconds || is_seconds) {
			var i = e(element).length;
			while (i--) {
				e(element).style.opacity = "1";
				e(element).style.transition = "opacity " + timing_function;		
			}
		}
		else {
			throw "Error[#4789]: Unknown timing expression {" + timing_function + "}";
		}
	}
	catch (error) {
		console.log("%c" + error, "color: #FF0000;");
	}	
}

function fadeOut(element, timing_function) {
	element = e(element);
	var is_miliseconds = (timing_function.substr(timing_function.length - 2, timing_function.length) === "ms") ? true : false;
	var is_seconds = (timing_function.substr(timing_function.length - 1, timing_function.length) === "s") ? true : false;
	try {
		if (typeof element === "undefined" && element === null) {
			throw "Error[#2540]: Element with class or id {" + name + "} does not exist.";
		}
		else if (timing_function === "fast" || timing_function === "slow") {
			var i = element.length;
			var timing_string = (timing_function === "fast") ? "700ms" : "2s";
			while (i--) {
				element[i].style.opacity = "0";
				element[i].style.transition = "opacity " + timing_string;
			}
		}
		else if (is_miliseconds || is_seconds) {
			var i = e(element).length;
			while (i--) {
				e(element).style.opacity = "0";
				e(element).style.transition = "opacity " + timing_function;		
			}
		}
		else {
			throw "Error[#4789]: Unknown timing expression {" + timing_function + "}";
		}
	}
	catch (error) {
		console.log("%c" + error, "color: #FF0000;");
	}		
}

function stringBlast(string) {
	try {
		if (string !== null && typeof string !== "undefined") {
			var prepare_string = string.toUpperCase();
			var keys = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
			"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","1","2","3","4","5","6","7","8","9","0","?",":","-","!","/","´","ˇ","%","°","*"];

			var values = { A: keys[random(0,70)], B: keys[random(0,70)], C: keys[random(0,70)], D: keys[random(0,70)], E: keys[random(0,70)], F: keys[random(0,70)], G: keys[random(0,70)], H: keys[random(0,70)], 
			I: keys[random(0,70)], J: keys[random(0,70)], K: keys[random(0,70)], L: keys[random(0,70)], M: keys[random(0,70)], N: keys[random(0,70)], O: keys[random(0,70)], P: keys[random(0,70)], Q: keys[random(0,70)], 
			R: keys[random(0,70)], S: keys[random(0,70)], T: keys[random(0,70)], U: keys[random(0,70)], V: keys[random(0,70)], W: keys[random(0,70)], X: keys[random(0,70)], Y: keys[random(0,70)], Z: keys[random(0,70)],
			one: keys[random(0,70)], two: keys[random(0,70)], three: keys[random(0,70)], four: keys[random(0,70)], five: keys[random(0,70)], six: keys[random(0,70)], seven: keys[random(0,70)], eight: keys[random(0,70)], 
			nine: keys[random(0,70)], zero: keys[random(0,70)], colon: keys[random(0,70)], dash: keys[random(0,70)], excl: keys[random(0,70)], slash: keys[random(0,70)], 
			updash: keys[random(0,70)], upper_arrow: keys[random(0,70)], percentage: keys[random(0,70)], degrees: keys[random(0,70)]}
	
			var pattern = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","1","2","3","4","5","6","7","8","9","0",":","-","!","/","´","ˇ","%","°"];
			var serials = [values.A, values.B, values.C, values.D, values.E, values.F, values.G, values.H, values.I, values.J, values.K, values.L, values.M, values.N, values.O, values.P, values.Q, values.R, values.S,
			values.T, values.U, values.V, values.W, values.X, values.Y, values.Z, values.one, values.two, values.three, values.four, values.five, values.six, values.seven, values.eight, values.nine, values.zero, 
			values.colon, values.dash, values.excl, values.slash, values.updash, values.upper_arrow, values.percentage, values.degrees];
			var results = [];
			for (var i = 0; i < pattern.length; i++) {
				var regexp = new RegExp(pattern[i], "g");
				results.push(prepare_string.replace(regexp, serials[i]));	
			}
			var filter = results.join().replace(/[ABCDEFGHIJKLMNOPQRSTUVWXYZ,. ]/g, "");
			return filter;
		}
		else {
			throw "Error[#4231]: The string length is too short or string doesn't exist.";
		}
	}
	catch (error) {
		console.log("%c" + error, "color: #FF0000;");
	}
}

function r_str(lng) {
  var list = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  var nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  var randomNumber = Math.floor(Math.random() * nums.length) + 0;
  var randomLetter = Math.floor(Math.random() * list.length) + 0;
  return list[randomLetter] + nums[randomNumber];
}

function generateClass(length) {
  if (typeof length === "undefined") {  
    throw "Class Generation Error[x800]: Undefined length of string to generate.";
  }
    
  else {   
    var array = [];
    for (var i = 0; i < length / 2; i++) {   
      array[i] = r_str();
    } 
    var pattern = array.toString(); 
    var string = pattern.replace(/,/g, ""); 
    return string;
  }
}

function url_type(url) {
	try {
		var is_http = (url.includes("http://") === true) ? true : false;
		var is_https = (url.includes("https://") === true) ? true : false;
		var is_ftp = (url.includes("ftp://") === true) ? true : false;
		var is_www = (url.includes("www.") === true) ? true : false;
		var is_file = (url.includes("file:///") === true) ? true : false;
		
		if (is_http) {
			return "http";
		}
		else if (is_https) {
			return "https";
		}
		else if (is_ftp) {
			return "ftp";
		}
		else if (is_www) {
			return "www";
		}
		else if (is_file) {
			return "file";
		}
		else {
			throw "Error[#4834]: Undefined type of Protocol in given URL {" + url + "}";
		}
	}
	catch (error) {
		console.log("%c" + error, "color: #FF0000;");
	}
}

function is_served_securely() {
	try {
		var scripts = document.getElementsByTagName("script");
		var secure_url = 0;
		var unsecure_url = 0;
		for (var i = 0; i < scripts.length ; i++) {
			if (url_type(scripts[i].src) === "https") {
				secure_url += 1;
			}		
			else {
				unsecure_url += 1;
			}
		}
		if (unsecure_url > 0 && secure_url > 0) {
			console.log("%c Some scripts are not loaded securely.", "color: #FFFFFF; background-color: #f6a745; font-family: Verdana;");
		}
		else if (unsecure_url === 0 && secure_url > 0) {
			console.log("%c All scripts loaded securely.", "color: #FFFFFF; background-color: #a0db8e; font-family: Verdana;");
		}
		else if (secure_url === 0 && unsecure_url > 0) {
			console.log("%c Scripts are not loaded securely.", "color: #FFFFFF; background-color: #ff4444; font-family: Verdana;");
		}
		else {
			throw "Error[#8874]: Error in URL checking {" + url + "}";
		}
	}
	catch (error) {
		console.log("%c" + error, "color: #FF0000;");
	}
}

function Countdown(goal, output) {
	try {
		var end = new Date(goal).getTime();
		var current_time = new Date().getTime();
		
		if (end < current_time) {
			throw "Error[#4715]: Sorry, but you cannot countdown back to history :(. Good old days are gone.";
		}
		
		var difference = end - current_time;
		
		var years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));
		var months = Math.floor(difference / (1000 * 60 * 60 * 24 * 365 / 12));
		var days = Math.floor(difference % (1000 * 60 * 60 * 24 * 365) / (1000 * 60 * 60 * 24));
		var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((difference % (1000 * 60)) / 1000);
		var miliseconds = Math.floor(difference % (1000 * 60));

		if (output === "String" || output === "string") {
			return days + " Days, " + hours + " Hours, " + minutes + " Minutes, " + seconds + " Seconds.";
		}
		else if (output === "fullString" || output === "FullString" || output === "fullstring") {
			return years + " Years, " + months + " Months, " + days + " Days, " + hours + " Hours, " + minutes + " Minutes, " + seconds + " Seconds, " + miliseconds + " Miliseconds.";
		}
		else if (output === "mdy" || output === "MDY") {
			return months + "/" + days + "/" + years + " " + hours + ":" + minutes + ":" + seconds;
		}
		else if (output === "ymd" || output === "YMD") {
			return years + "/" + months + "/" + days + " " + hours + ":" + minutes + ":" + seconds;
		}
		else if (output === "dmy" || output === "DMY") {
			return days + "/" + months + "/" + years + " " + hours + ":" + minutes + ":" + seconds;
		}
		else if (output === "Raw" || output === "raw") {
			return difference;
		}
		else if (output === undefined && goal !== undefined) {
			var dateValues = {
				years: years,
				months: months,
				days: days,
				hours: hours,
				minutes: minutes,
				seconds: seconds
			};
			
			return dateValues;
		}
		else if (goal === undefined) {
			throw "Error[#8415]: You must specify your goal date.";
		}
		else {
			throw "Error[#8745]: Undefined output type {" + output + "}.";
		}
	}
	catch (error) {
		console.log("%c" + error, "color: #FF0000;");
	}
}

function interval(func, time) {
	try {
		time_isNumber = (typeof time === "number") ? true : false;
		time_isString = (typeof time === "string") ? true : false;
		if (time_isString && time.includes("s") && time.substr(time.length - 1, time.length) === "s") {
			var excludedString = time.replace("s", "");
			var convertedNum = parseInt(excludedString);
			time = convertedNum * 1000;
		}
		else if (time_isNumber && time > 0) {
			time = time;
		}
		else {
			throw "Error[#1715]: Undefined data type of time {" + typeof time + "}.";
		}
		if (typeof func === "function" && func !== undefined && time !== undefined) {
			
			setInterval(func, time);
		}
	}
	catch (error) {
		console.log("%c" + error, "color: #FF0000;");
	}
}
