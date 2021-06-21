// button.addEventListener("click",Submit);
function Submit(){
	const ApiKey="bceac68d9c29812ea33b91dbeeb4799d";
	const form=document.querySelector("form");
	const button = document.querySelector("button");
	var CityName = document.querySelector("input").value;
	if(RepeatCheck(CityName)){
		const URL = "https://api.openweathermap.org/data/2.5/weather?q="+ CityName +"&appid=bceac68d9c29812ea33b91dbeeb4799d&units=metric";
		fetch(URL)
		.then(response => response.json())
		.then(data => 
			{	console.log(data)
				const {cod,coord,main,sys,visibility,weather,wind,name} = data;
				if(cod<300){
					var ul = document.createElement("UL");
					ul.setAttribute("id","cities");
					document.querySelector(".container").appendChild(ul);
					var cities = document.querySelectorAll("#cities")[document.querySelectorAll("#cities").length -1];
					var li = document.createElement("li");
					ElementAddition(cities,"Country: "+sys.country)
					ElementAddition(cities,"City: "+name);
					ElementAddition(cities,"Longitude: "+coord.lon);
					ElementAddition(cities,"Latitude: "+coord.lat);
					ElementAddition(cities,"Visibility: "+visibility+" m");
					ElementAddition(cities,"Weather: "+weather[0].description);
					ElementAddition(cities,"Temprature: "+main.temp+" °C");
					var img = document.createElement("img");
					img.src = weather[0].icon;
					ElementAddition(cities,"Wind speed: "+wind.speed + " Km/hr")
					// var li = document.appendChild(img);
					// cities.appendChild(li);
					document.querySelector(":root").style.setProperty("--pad","20px")
				}else{
					const {message} = data
					alert(message)
				}
		})
		.catch(err => {
			console.log("Failure");
			});
	}
}

function ElementAddition(c,string){
	var li = document.createElement("li");
	li.appendChild(document.createTextNode(string));
	c.appendChild(li);
}

function RepeatCheck(input){
	var input = input.toLowerCase();
	if(document.querySelectorAll("#cities").length ==0)
		{
			return true;
		}
	for (var i = 0; i < document.querySelectorAll("#cities").length ; i++) {
		var str= document.querySelectorAll("#cities")[i].children[1].firstChild.data.toLowerCase();
		if(str.replace("city: ","") == input){
			console.log("Already exists");
			return false;
		}
	}
	return true;
}