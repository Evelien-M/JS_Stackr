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
        this.loadingPackage = null;
        this.loadingYPosition = 30;
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
            this.DrawLoadingPackage(ctx,cellSize);
        }
    }

    Update()
    {
        if(this.loadingPackage != null)
        {
            this.loadingYPosition--;
        }
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

        if(this.content != null)
        {
            if(this.content.departed)
            {
                this.showTruck = false;
                this.content = null;
            }
        }
    }
    DrawLoadingPackage(ctx,cellSize)
    {
        if(this.loadingPackage != null)
        {
            for(let x1 = 0; x1 < this.loadingPackage.grid.length; x1++) 
            {
                for(let y1 = 0; y1 < this.loadingPackage.grid[x1].length; y1++) 
                {
                    if(this.loadingPackage.grid[x1][y1])
                    {
                        ctx.beginPath();
                        ctx.strokeStyle = "green";
                        ctx.fillStyle = this.loadingPackage.color;
                        ctx.fillRect(this.x * cellSize + (x1 * 15) + 30, this.y * cellSize + (y1 * 15) + this.loadingYPosition, 15, 15);
                        ctx.rect(this.x * cellSize + (x1 * 15) + 30, this.y * cellSize + (y1 * 15) + this.loadingYPosition, 15, 15);
                        ctx.stroke();
                    }
                }
            }
        }
    }
    AddTruck(truck)
    {
        this.countdown = truck.intervall;
        this.content = truck;
        truck.SetPosition(this.x,this.y);
    }

    LoadUpTruck(package1)
    {
        if (this.loadingPackage == null)
        {
            if(this.showTruck && this.content != null)
            {
                // truck has arrived
                if(this.content.yPosition == 0)
                {
                    this.loadingPackage = package1;
                }
            }
        }
        else
        {
            if(this.loadingYPosition <= -30)
            {
                this.loadingPackage = null;
                this.loadingYPosition = 30;
                return this.content.AddPackage(package1);
            }
        }

        return false;
    }
}