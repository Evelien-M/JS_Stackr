function Canvas()
{
    this.canvasHolder = document.getElementById("canvas");
    this.ctx = canvasHolder.getContext("2d");
    this.hallone = new HallOne(this.canvasHolder,this.ctx);
    this.halltwo = new HallTwo(this.canvasHolder,this.ctx);
    this.start = this.hallone;
    this.canvasHolder.width = 1350;
    this.canvasHolder.height = 810;
    this.assamblyList = new AssemblyList(this.canvasHolder,this.ctx);

    this.weather = new Weather(this.canvasHolder,this.ctx);
    this.town = "Amsterdam";
    this.town2 = "Amsterdam";
    this.weather.UpdateWeather(town);

    Update();

    
}


function Update()
{
    this.GetData();
    this.start.Update();
    this.start.Draw();
    this.assamblyList.Update(this.start.grid);
    this.assamblyList.Draw();
    this.weather.Draw();
    this.DrawHallName();
    this.ctx.restore();

    requestAnimationFrame(Update);
}

function DrawHallName()
{
    if(this.ctx != undefined && this.canvasHolder != undefined)
    {
        this.ctx.fillText(this.start.name, 400, this.canvasHolder.height - 50);
    }
}

function GetData()
{
    if(this.town != this.town2)
    {
        this.town2 = this.town;
        this.weather.UpdateWeather(town);
    }
}

function ButtonSetTown()
{
    this.town = document.getElementById("town").value;
    
}
function ButtonSwitchHall()
{
    if(this.start.name === "Hall one")
    {
        this.start = this.halltwo;
    }
    else
    {
        this.start = this.hallone;
    }
}

function ButtonForm()
{
    let length = document.getElementById("inputLength").value;
    if(length < 4 || length > 10)
    {
        alert("De lengte heeft een onjuiste waarde");
        return;
    }
    let width = document.getElementById("inputWidth").value;
    if(width < 4 || width > 6)
    {
        alert("De breedte heeft een onjuiste waarde");
        return;
    }
    let interval = document.getElementById("intervall").value;
    if(interval <= 0 || interval > 200)
    {
        alert("Interval heeft een onjuiste waarde")
        return;
    }
    let weather = this.weather.data;
    if (weather == undefined || weather.cod != 200)
    {
        alert("Er is iets fouts gegaan met de weatherdata")
        return;
    }
    let type = document.getElementById("type").value;
    if (type == "cold" && weather["main"]["temp"] >= 35)
    {
        alert("Het is te warm om koud transport te laten rijden");
        return;
    }
    if (type == "fragile" && weather["weather"][0]["main"] == "Rain" || 
    type == "fragile" && weather["weather"][0]["main"] == "Shower rain" || 
    type == "fragile" && weather["weather"][0]["main"] == "Snow")
    {
        alert("Het is te slecht weer om breekbaar transport te laten rijden");
        return;
    }
    let actionradius = document.getElementById("actionradius").value;
    if(actionradius <= 0 || actionradius > 100)
    {
        alert("actionradius heeft een onjuiste waarde")
        return;
    }
    let truck = new Truck(this.ctx,width,length,interval,type,actionradius,this.weather);
    if(!this.start.AddTruck(truck))
    {
        alert("Er is niet genoeg ruimte");
        return;
    }
}