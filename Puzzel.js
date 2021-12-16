var Piece;
var notify;
var timer;
var spaceY;
var spaceX;
var count = 0;

window.onload = function () {

	var puzzleArea = document.getElementById('puzzlearea');
	Piece = puzzleArea.getElementsByTagName('div');

	for (var i = 0; i < Piece.length; i++)

	{

		Piece[i].className = 'puzzlepiece';

		Piece[i].style.left = (i % 4 * 100) + 'px';

		Piece[i].style.top = (parseInt(i / 4) * 100) + 'px';

		Piece[i].style.backgroundPosition = '-' + Piece[i].style.left + ' ' + '-' + Piece[i].style.top;


		Piece[i].onmouseover = function () {

			if (checkMove(parseInt(this.innerHTML))) {
				this.style.border = "6px solid red";

				this.style.color = "red";
			}
		};


		Piece[i].onmouseout = function ()

		{

			this.style.border = "5px solid black";

			this.style.color = "#000000";

			this.style.textDecoration = "none";

		};

		Piece[i].onclick = function ()

		{
			if (checkMove(parseInt(this.innerHTML)))

			{
				++count;
				document.getElementById('counter').innerHTML = count;

				swap(this.innerHTML - 1);


				if (finish())

				{



					win();



				}

				return;

			}


			alert('ERROR : Cannot Move Tile ! \n Tile Must Be Next To A Blank Space .')

		};

	}

	var shuffle = document.getElementById('shufflebutton');

	spaceX = '300px';
	spaceY = '300px';

	shuffle.onclick = function ()

	{

		for (var i = 0; i < 300; i++)

		{

			count = 0;
			document.getElementById('counter').innerHTML = count;

			var rand = parseInt(Math.random() * 100) % 4;

			if (rand == 0)

			{

				var temp = up(spaceX, spaceY);

				if (temp != -1)

				{

					swap(temp);

				}

			}

			if (rand == 1)

			{

				var temp = down(spaceX, spaceY);

				if (temp != -1)

				{

					swap(temp);

				}

			}



			if (rand == 2)

			{

				var temp = left(spaceX, spaceY);

				if (temp != -1)

				{

					swap(temp);

				}

			}


			if (rand == 3)

			{

				var temp = right(spaceX, spaceY);

				if (temp != -1)

				{

					swap(temp);

				}

			}

		}

	};

};

function checkMove(position)

{

	if (left(spaceX, spaceY) == (position - 1))

	{

		return true;

	}



	if (down(spaceX, spaceY) == (position - 1))

	{

		return true;

	}



	if (up(spaceX, spaceY) == (position - 1))

	{

		return true;

	}



	if (right(spaceX, spaceY) == (position - 1))

	{

		return true;

	}

}

function Notify()

{

	notify--;

	if (notify == 0)

	{

		var body = document.getElementsByTagName('body');

		body[0].style.backgroundImage = "none";


		alert('Congratulations ! \n Number Of Moves = ' + count);

		count = 0;
		document.getElementById('counter').innerHTML = count;

		var para = document.getElementsByClassName('explanation');
		para[0].style.visibility = "visible";

		return;

	} else(notify % 2)

	{

		var body = document.getElementsByTagName('body');

		body[0].style.backgroundImage = "url('winner.jpg')";

	}

	timer = setTimeout(Notify, 50);
}

function win()

{

	var body = document.getElementsByTagName('body');


	body[0].style.backgroundImage = "url('winner.jpg')";

	notify = 10;

	timer = setTimeout(Notify, 50);

	var para = document.getElementsByClassName('explanation');
	para[0].style.visibility = "hidden";

}

function finish()

{

	var flag = true;

	for (var i = 0; i < Piece.length; i++) {

		var top = parseInt(Piece[i].style.top);

		var left = parseInt(Piece[i].style.left);


		if (left != (i % 4 * 100) || top != parseInt(i / 4) * 100)

		{

			flag = false;

			break;

		}

	}

	return flag;

}

function left(x, y)

{

	var cordX = parseInt(x);

	var cordY = parseInt(y);



	if (cordX > 0)

	{

		for (var i = 0; i < Piece.length; i++)

		{

			if (parseInt(Piece[i].style.left) + 100 == cordX && parseInt(Piece[i].style.top) == cordY)

			{

				return i;

			}

		}

	} else

	{

		return -1;

	}

}

function right(x, y) {

	var cordX = parseInt(x);

	var cordY = parseInt(y);

	if (cordX < 300)

	{

		for (var i = 0; i < Piece.length; i++) {

			if (parseInt(Piece[i].style.left) - 100 == cordX && parseInt(Piece[i].style.top) == cordY)

			{

				return i;

			}

		}

	} else

	{

		return -1;

	}

}

function up(x, y) {

	var cordX = parseInt(x);

	var cordY = parseInt(y);

	if (cordY > 0)

	{

		for (var i = 0; i < Piece.length; i++)

		{

			if (parseInt(Piece[i].style.top) + 100 == cordY && parseInt(Piece[i].style.left) == cordX)

			{

				return i;

			}

		}

	} else

	{

		return -1;

	}

}

function down(x, y)

{

	var cordX = parseInt(x);

	var cordY = parseInt(y);

	if (cordY < 300)

	{

		for (var i = 0; i < Piece.length; i++)

		{

			if (parseInt(Piece[i].style.top) - 100 == cordY && parseInt(Piece[i].style.left) == cordX)

			{

				return i;

			}

		}

	} else

	{

		return -1;

	}

}

function swap(position) {

	var temp = Piece[position].style.top;

	Piece[position].style.top = spaceY;

	spaceY = temp;

	temp = Piece[position].style.left;

	Piece[position].style.left = spaceX;

	spaceX = temp;

}