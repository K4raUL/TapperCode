String.prototype.replaceAt=function(index, replacement) {
	return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}
	
function eq(a, b)
{
	while (a.charAt(0) == "0") {
		a = a.substr(1);
	}
	while (b.charAt(0) == "0") {
		b = b.substr(1);
	}					

	var alen = a.length;
	var blen = b.length;
	
	if (alen != blen) return false;
	
	for (var i = 0; i < alen; i++) {
		if (a.charAt(i) != b.charAt(i)) return false;
	}
	return true;
}

function lsr(a, b)
{
	while (a.charAt(0) == "0") {
		a = a.substr(1);
	}
	while (b.charAt(0) == "0") {
		b = b.substr(1);
	}		
	
	var alen = a.length;
	var blen = b.length;
	
	if (alen > blen) return false;
	if (alen < blen) return true;
	if (eq(a, b)) return false;
	
	for (var i = 0; i < alen; i++) {
		if ( Number(a.charAt(i)) < Number(b.charAt(i)) )  return true;
		if ( Number(a.charAt(i)) > Number(b.charAt(i)) )  return false;
	}
	return false;
}

function gtr(a, b)
{
	while (a.charAt(0) == "0") {
		a = a.substr(1);
	}
	while (b.charAt(0) == "0") {
		b = b.substr(1);
	}		

	var alen = a.length;
	var blen = b.length;				

	if (alen > blen) return true;
	if (alen < blen) return false;
	if (eq(a, b)) return false;
	
	for (var i = 0; i < alen; i++) {
		if ( Number(a.charAt(i)) > Number(b.charAt(i)) )  return true;
		if ( Number(a.charAt(i)) < Number(b.charAt(i)) )  return false;
	}
}
	
function add (a, b)
{
	var lenA = a.length;
	var lenB = b.length;
	
	var m = lenA;
	var M = lenA;
	
	if (lenA > lenB) {
		m = lenB;
		for (var i = 0; i < M-m; i++) {
			b = "0" + b;
		}
	}
	else if (lenA < lenB) {
		M = lenB;
		for (var i = 0; i < M-m; i++) {
			a = "0" + a;
		}					
	}
	
	var res = "";
	var idx = 0;
	
	for (var i = 0; i < M; i++) {
		res += " ";
		var num = Number(a.charAt(i)) + Number(b.charAt(i));
		
		var j;
		for (j = i; j >= 0; j--) {
			if ( num > 9 ) {
				num -= 10;
				res = res.replaceAt(j+idx, num.toString());
				if (j == 0) {
					res = "1" + res;
					idx += 1;
				}
				else	num = (Number(res.charAt(j+idx-1)) + 1);							
			}
			else {
				res = res.replaceAt(j+idx, num.toString());
				break;
			}
		}
	}
	return res;
}

function sub(a, b)
{
	
}

function mp(a, n) 
{
	if (n == "0") return "0";
	if (n == "1") return a;
	
	var res = a;
	for (var i = 1; i < +(n); i++) res = add(res, a); 
	return res;			
}

function pow(a, n)
{
	if (n == "0") return "1";
	if (n == "1") return a;
	
	var res = a;
	for (var i = 1; i < +(n); i++) res = mp(res, a); 
	return res;	
}

// integer division (a > b)!
function div(a, b)
{
	if (eq(a, b)) return 1;
	if (lsr(a, b)) return 0;
	
	var rem = "";
	var sub = "";
	var ans = "";
	var mpis = "";
	
	if (lsr(b, maxInt.toString())) {
	
		for (var i = 0; i < a.length; i++) {
			
			while ( lsr(rem+sub, b) ) {
				if (i == a.length) {
					ans += Math.floor(Number(rem+sub)/Number(b));
					return ans;
				}
				sub += a.charAt(i);
				if (sub.length > 1  && ans != "") ans += "0";
				i++;
			}

			if (rem == "0") rem = "";
			
			for (var j = 0; j <= 10; j++) {
				mpis = (j*Number(b)).toString();
				if (eq(mpis, rem+sub)) {
					ans += j.toString();
					break;
				}
				if (gtr(mpis, rem+sub)) {
					ans += (j-1).toString();
					mpis = ((j-1)*Number(b)).toString();
					break;
				}
			}
			
			rem = Number(rem+sub) - Number(mpis);
			rem = rem.toString();			
			sub = "";
			i--;
		}
		return ans;
	}
}

function dec2bin(x) 
{
	var ans = "";
	
	while (x != "1") {
		ans = Number(x.slice(-1))%2 + ans;
		x = div(x, "2");
	}

	ans = "1" + ans;
	return ans;	
}

function bin2dec(x)
{
	var L = x.length;
	var res = "0";
	var num2 = "1", pow2 = 0;
	
	for (var i = L-1; i > -1; i--) {
		if (x.charAt(i) == "1")	res = add(res, num2);
		num2 = mp(num2, "2");
	}	
	return res;
}

//function dec2bin(dec) { return (dec >>> 0).toString(2); }
