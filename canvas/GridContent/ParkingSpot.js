class ParkingsSpot
{
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
        this.background = "img/parkingspot.png";;
        this.content = null;
        this.countdown = 0;
        this.timer = 60;
        this.showTruck = false;
        this.isParkingSpot = true;
    }

    Draw(ctx,cellSize)
    {
        let bg = new Image(); // Creating image objects
        bg.src = this.background;
        ctx.drawImage(bg,this.x * cellSize, this.y * cellSize);

        ctx.fillStyle = "#000000";
        ctx.fillText(this.countdown, this.x * cellSize + 30, this.y * cellSize);
        if(this.showTruck)
        {
            this.content.Draw(cellSize);
        }
    }

    Update()
    {
        this.timer--;
        if (this.timer < 1)
        {
            this.timer = 60;
            if(this.countdown > 0)
            {
                this.countdown--;
                if (this.countdown == 0)
                {
                    this.showTruck = true;
                }
            }
        }
        if(this.showTruck)
        {
            this.content.Update();
        }
    }
    AddTruck(truck)
    {
        this.countdown = truck.intervall;
        this.content = truck;
        truck.SetPosition(this.x,this.y);
    }
}