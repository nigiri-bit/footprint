//== Initialize Page

//==== COVER
const menuCover = document.createElement("div");
menuCover.style.width = window.innerWidth + "px";
menuCover.style.height = window.innerHeight + "px";
menuCover.style.position = "fixed";
menuCover.style.top = "0px";
menuCover.style.left = "0px";
menuCover.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
menuCover.style.zIndex = "99999";
menuCover.style.display = "none";

document.body.appendChild(menuCover);

//==== Menu Box
const menuBox = document.createElement("div");
menuBox.style.width = "180px";
menuBox.style.height = "300px";
menuBox.style.backgroundColor = "#fefefe";
menuBox.style.borderRadius = "5px";
menuBox.style.border = "1px solid #e0e0e0";
menuBox.style.position = "fixed";
menuBox.style.zIndex = "100000";
menuBox.style.top = "20px";
menuBox.style.right = "40px";

document.body.appendChild(menuBox);

//==== Menu Box Container
const menuBoxContainer = document.createElement("div");
menuBoxContainer.style.width = "100%";
menuBoxContainer.style.height = "100%";

menuBox.appendChild(menuBoxContainer);

//==== Title
const titleText = document.createElement('p');
titleText.style.fontSize = "15px";
titleText.style.textAlign = "center";
titleText.style.marginTop = "10px";

titleText.textContent = "足跡ツール";

menuBoxContainer.appendChild(titleText);

//==== Buttons
const toLeftBtn = document.createElement("button");
toLeftBtn.style.width = "60px";
toLeftBtn.style.height = "30px";
toLeftBtn.style.border = "1px solid #e0e0e0";
toLeftBtn.style.borderRadius = "5px";
toLeftBtn.style.fontSize = "18px";
toLeftBtn.style.float = "left";
toLeftBtn.style.marginTop = "10px";

toLeftBtn.textContent = "■←";

toLeftBtn.addEventListener('click', () => {
	menuBox.style.right = "auto";
	menuBox.style.left = "40px";
});

menuBoxContainer.appendChild(toLeftBtn);

const toRightBtn = document.createElement("button");
toRightBtn.style.width = "60px";
toRightBtn.style.height = "30px";
toRightBtn.style.border = "1px solid #e0e0e0";
toRightBtn.style.borderRadius = "5px";
toRightBtn.style.fontSize = "18px";
toRightBtn.style.float = "right";
toRightBtn.style.marginTop = "10px";

toRightBtn.textContent = "→■";

toRightBtn.addEventListener('click', () => {
	menuBox.style.left = "auto";
	menuBox.style.right = "40px";
});

menuBoxContainer.appendChild(toRightBtn);



const startBtn = document.createElement("button");
startBtn.style.width = "180px";
startBtn.style.height = "60px";
startBtn.style.backgroundColor = "rgba(81, 184, 196, 0.4)";
startBtn.style.fontSize = "15px";
startBtn.style.color = "#000000";
startBtn.style.fontWeight = "600";
startBtn.style.marginTop = "10px";

startBtn.textContent = "スタート";

startBtn.addEventListener('click', () => {
	menuCover.style.display = "block";
	footprintStart();
});

menuBoxContainer.appendChild(startBtn);



const stopBtn = document.createElement("button");
stopBtn.style.width = "180px";
stopBtn.style.height = "60px";
stopBtn.style.backgroundColor = "rgba(238, 82, 79, 0.4)";
stopBtn.style.fontSize = "15px";
stopBtn.style.color = "#000000";
stopBtn.style.fontWeight = "600";

stopBtn.textContent = "ストップ";

stopBtn.addEventListener('click', () => {
	menuCover.style.display = "none";
	footprintStop();
});

menuBoxContainer.appendChild(stopBtn);



const endBtn = document.createElement("button");
endBtn.style.width = "180px";
endBtn.style.height = "60px";
endBtn.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
endBtn.style.fontSize = "15px";
endBtn.style.color = "#000000";
endBtn.style.fontWeight = "600";

endBtn.textContent = "終了";

endBtn.addEventListener('click', () => {
	location.reload();
});

menuBoxContainer.appendChild(endBtn);

//==== INFO
const footprintText = document.createElement('p');
footprintText.style.fontSize = "15px";
footprintText.style.textAlign = "center";
footprintText.style.marginTop = "10px";

footprintText.textContent = "足跡を付けた数：0";

menuBoxContainer.appendChild(footprintText);




//== FUNCTIONS
var totalFootprint = 0;
const footClassName = "css-opde7s";
const nextClassName = "css-1d94zew";
const closeBtnClassName = "css-1ureyjg";
const minSec = 2;
const secWidth = 5;
var state = 0;




const sleep = (sec) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve();
		}, 1000*sec);
	});
};

const footprint = async () => {
	var footprints = document.getElementsByClassName(footClassName);
	var footprintNum = footprints.length;
console.log(footprints);
console.log(footprintNum);

	if (state == 0) {
		return;
	}
	footprints[totalFootprint].click();
	totalFootprint++;
	footprintText.textContent = "足跡を付けた数：" + totalFootprint;

	for (var i = totalFootprint; i < footprintNum; i++) {
		await sleep(minSec + Math.floor(Math.random() * secWidth) );

		if (state == 0) {
			return;
		}

		if (i == 1) {
			var nextbtn = document.getElementsByClassName(nextClassName)[0];
			nextbtn.click();
			totalFootprint++;
		} else {
			var nextbtn = document.getElementsByClassName(nextClassName)[1];
			nextbtn.click();
			totalFootprint++;
		}
		footprintText.textContent = "足跡を付けた数：" + totalFootprint;
	}

	await sleep(5);

	if (state == 0) {
		return;
	}

	var closebtn = document.getElementsByClassName(closeBtnClassName)[0];
	closebtn.click();
	
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (state == 0) {
				return;
			}
			resolve();
		}, 1000);
	});
}


const footprintStart = async () => {
	state = 1;
	while (state == 1) {
		await footprint();
		if (state == 0) {
			return;
		}
		window.scroll(0, document.body.clientHeight);
		await sleep(5);
	}
};


const footprintStop = () => {
	state = 0;
};

const footprintRestart = async () => {
	footprintStop();
	await sleep(micSec + secWidth);
	footprintStart(); 
};

/*
chrome.windows.onFocusChanged.addListener(() => {
	console.log("focus changed");
	footprintRestart();
});	
*/



