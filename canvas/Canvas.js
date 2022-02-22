function Canvas()
{
    this.canvasHolder = document.getElementById("canvas");
    this.ctx = canvasHolder.getContext("2d");
    this.start = new HallOne(this.canvasHolder,this.ctx);
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
    this.ctx.restore();

    requestAnimationFrame(Update);
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