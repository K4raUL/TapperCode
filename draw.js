function checkInput(ob) {
	var invalidChars = /[^0-9]/gi
	if(invalidChars.test(ob.value)) {
		ob.value = ob.value.replace(invalidChars,"");
	}
}

function onResizeEvent() {
	bodyElement = document.getElementsByTagName("BODY")[0];
	newWidth = bodyElement.offsetWidth;
	if(newWidth != width) {
		width = newWidth;
		drawField();
	}
}

function onMouseUpEvent(event) {
    var x = event.pageX - c.getBoundingClientRect().left;
    var y = event.pageY - c.getBoundingClientRect().top;
    
    var col = Math.floor(y/c.height*h);
    var row = Math.floor(x/c.width*w) ;
	
	field[row][col] ^= 1;
	coloring (row, col);
}

function coloring(row, col) 
{
	var a = Math.round(c.width/w) - 2;
    var ctx=c.getContext("2d");
	
	if (field[row][col] == 1) ctx.fillStyle = "#000000";
	if (field[row][col] == 0) ctx.fillStyle = "#F0F0F0";
	
    ctx.fillRect(Math.round(row*c.height/h)+1, Math.round(col*c.width/w)+1, a, a);
}

function drawField()
{
	c.width = 0.7*document.body.offsetWidth;
	var a = Math.round(c.width/w);
	c.width = w*a;
	c.height = h*a;
	
	var ctx=c.getContext("2d");
	ctx.beginPath();
	
	for (var i = 0; i <= w+1; i += 1) {
        ctx.moveTo(i*a, 0);
        ctx.lineTo(i*a, c.height);
	}
	for (var i = 0; i <= h+1; i += 1) {
        ctx.moveTo(0, i*a);
        ctx.lineTo(c.width, i*a);
	}
	
	for (var i = 0; i < w; i++) {
		for (var j = 0; j < h; j++) {
			coloring (i, j);
		}
	}
	
	ctx.strokeStyle="darkgrey";
	ctx.stroke();
}

function up()
{
	var str = document.getElementById("lineEdit0").value;
	str = div(str, h.toString());
	str = dec2bin(str);
	
	while (str.length < 1802) {
		str = "0" + str;
	}
	
	for (var i = 0; i < w; i++) {
		for (var j = h-1; j >= 0; j--) {
			field[i][j] = str.charAt(h*w - h + j - i*h);
			coloring(i, j);
		}
	}
}

function down()
{
	var str = "";
	for (var i = 0; i < w; i++) {
		for (var j = h-1; j >= 0; j--) {
			str = field[i][j] + str;
		}
	}

	str = bin2dec(str);
	str = mp(str, h.toString());
	document.getElementById("lineEdit0").value = str;	
}
