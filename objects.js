//------------OBJECT : BALL--------------
function BALL()
{
	this.radius=5;
	this.MAX_SPEED=3;	// Maximum speed
	this.MIN_SPEED=.2;
	this.x=Math.floor( WIDTH/2  + ( Math.random() * ( WIDTH/2  - P.x )) );
	this.y=Math.floor( HEIGHT/2 + ( Math.random() * ( HEIGHT/2 - P.y )) );
	this.dx=(( Math.random()*(this.MAX_SPEED-this.MIN_SPEED) + this.MIN_SPEED )*(Math.floor(Math.random()*2)*2-1));
	this.dy=(( Math.random()*(this.MAX_SPEED-this.MIN_SPEED) + this.MIN_SPEED )*(Math.floor(Math.random()*2)*2-1));
	this.move = function()
	{
		this.x+=this.dx;
		this.y+=this.dy;
	}
	this.turn=function()
	{
		this.dx=-this.dx;
		this.dy=-this.dy;
	}
	this.bounce = function()	//	bounce over the walls
	{
		if( this.x+this.dx < this.radius )
		{
			this.dx = -this.dx;
			this.x = this.radius
			this.draw();
		}
		else if( this.y+this.dy < this.radius )
		{
			this.dy = -this.dy;
			this.y = this.radius;
			this.draw();
		}
		else if( this.x+this.dx >  WIDTH-this.radius )
		{
			this.dx = -this.dx;
			this.x = WIDTH - this.radius;
			this.draw();
		}
		else if( this.y+this.dy > HEIGHT-this.radius )
		{
			this.dy = -this.dy;
			this.y = HEIGHT - this.radius;
			this.draw();
		}
	}
	this.draw = function()
	{
		var grad = game.createRadialGradient(this.x-this.radius,this.y-this.radius/2,0, this.x,this.y,this.radius);
		grad.addColorStop(0, 'white');
		grad.addColorStop(1, "#333355");
		game.fillStyle = grad;
		game.beginPath();
		game.arc(this.x, this.y, this.radius, 0, Math.PI*2, true); 
		game.closePath();
		game.fill();
	}
}
//--------OBJECT : BALL---------


//-----------------OBJECT : STATS------------
function STATS()
{
	this.tries=-1;
	this.score=0;
	this.score_max=10;	// Max. score in a hit
	this.high=0;	// Highscore
	temp = $.cookie("game");	// Cookie contains highscore
	if(temp)
		this.high=parseInt(temp);
	this.update = function(msg)
	{	
		document.getElementById("score").innerHTML="<b>Your score is  </b> : " + this.score;
		document.getElementById("count").innerHTML="<b>No. of balls</b> : " + n;
		document.getElementById("tries").innerHTML="<b>No. of tries</b> : " + this.tries;
		document.getElementById("high").innerHTML="<b>Highscore   </b> : " + this.high;
		document.getElementById("msg").innerHTML=msg;
	}
	this.Reset = function()
	{		
		n=0;
		this.tries+=1;
		this.score=0;
		this.score_max=10;
	}
	this.scoring = function()
	{
		n+=1;
		this.score+= Math.floor(Math.max(this.score_max,4))+1;
		this.score_max=10;
		if(this.score>this.high)
			this.high=this.score;
		this.update("");
	}
}
//---------OBJECT : STATS---------------------


//------------OBJECT : TARGET--------------
function TARGET()
{
	this.size = 20;
	this.new_target = function()
	{
		this.x = Math.floor((Math.random()*(WIDTH  - 25))+5);
		this.y = Math.floor((Math.random()*(HEIGHT - 25))+5);
		this.draw();
	}
	this.draw = function()
	{
		var grad = game.createLinearGradient(this.x,this.y,this.x+this.size,this.y+this.size);
		grad.addColorStop(0, '#B22222');
		grad.addColorStop(1, '#F88888');
		game.fillStyle = grad;
		game.fillRect(this.x,this.y,this.size,this.size);
	}
}
//--------OBJECT : TARGET---------