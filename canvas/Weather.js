class Weather
{
    constructor(canvasholder,ctx)
    {
        this.canvasholder = canvasholder;
        this.ctx = ctx;
    }

    async UpdateWeather(town)
    {
        await fetch('https://api.openweathermap.org/data/2.5/weather?q='+ town +'&units=metric&appid=e309f5cb26ed1faf47cad093d4cce563')
        .then(data => data.json())
        .then(data => {
            this.data = data;
            console.log(data);
        })
    }

    Draw()
    {
        if(this.data != undefined)
        {
            this.ctx.font = "30px Arial";
            this.ctx.fillStyle = "#FFFFFF";
            if (this.data["cod"] != 200)
            {
                this.ctx.fillText(this.data["message"], this.canvasholder.width - 200, this.canvasholder.height - 50);
            }
            else
            {
                this.ctx.fillText(this.data["main"]["temp"] + " C", this.canvasholder.width - 200, this.canvasholder.height - 50);
                this.ctx.font = "20px Arial";
                this.ctx.fillText(this.data["weather"][0]["main"], this.canvasholder.width - 200, this.canvasholder.height - 20);
                let bg = new Image(); // Creating image objects
                let iconcode = this.data["weather"][0]["icon"];
                bg.src = "http://openweathermap.org/img/w/" + iconcode + ".png";
                this.ctx.drawImage(bg,this.canvasholder.width - 60, this.canvasholder.height - 80);
            }
        }
    }

}