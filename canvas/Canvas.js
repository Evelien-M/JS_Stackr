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
        this.weatherData = undefined;
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
