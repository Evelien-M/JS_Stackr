class HallOne {
    constructor(canvasHolder,ctx)
    {
        this.canvasHolder = canvasHolder;
        this.ctx = ctx;
        this.name = "Hall one";
        this.parkingspots = Array(0);
        this.grid = Array.from(Array(15), () => new Array(8));
        this.cellSize = 90;
        this.AddParkingSpots();
        this.AddPackageDropper();
    }

    Update()
    {
        this.packageDropper.Next();
        this.UpdateGrid();
        this.parkingspots.forEach(element => {
            if (element != undefined)
            {
                element.Update();
            }
        });
    }
    Draw()
    {
        this.DrawGrid();
        this.DrawPackage();
        this.DrawParkingSpot();
    }

    DrawGrid()
    {
        this.ctx.fillStyle = "#FFF";
        this.ctx.fillRect(0, 0, this.canvasHolder.width, this.canvasHolder.height);
        for(let x = 0; x < this.grid.length; x++) 
        {
            for(let y = 0; y < this.grid[x].length; y++) 
            {
                this.ctx.beginPath();   
        
                this.ctx.strokeStyle = 'green'; 
                this.ctx.strokeRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);

                if (this.grid[x][y] != undefined)
                {
                    let bg = new Image(); // Creating image objects
                    bg.src = this.grid[x][y].background;
                    this.ctx.drawImage(bg,x * this.cellSize, y * this.cellSize);
                }
            }
        }
    }

    DrawPackage()
    {
        for(let x = 0; x < this.grid.length; x++) 
        {
            for(let y = 0; y < this.grid[x].length; y++) 
            {
                if (this.grid[x][y] != undefined && this.grid[x][y].content != null)
                {
                    let packageContent = this.grid[x][y].content;
                    if(packageContent.grid != undefined)
                    {
                        for(let x1 = 0; x1 < packageContent.grid.length; x1++) 
                        {
                            for(let y1 = 0; y1 < packageContent.grid[x1].length; y1++) 
                            {
                                if(packageContent.grid[x1][y1])
                                {
                                    this.ctx.beginPath();
                                    this.ctx.strokeStyle = "green";
                                    this.ctx.fillStyle = packageContent.color;
                                    this.ctx.fillRect(x * this.cellSize + this.grid[x][y].contentPositionX + (x1 * 15), y * this.cellSize + this.grid[x][y].contentPositionY + (y1 * 15), 15, 15);
                                    this.ctx.rect(x * this.cellSize + this.grid[x][y].contentPositionX + (x1 * 15), y * this.cellSize + this.grid[x][y].contentPositionY + (y1 * 15), 15, 15);
                                    this.ctx.stroke();
                                }
                            }
                        }
                    }
                }
            }
        }
    } 

    DrawParkingSpot()
    {
        this.parkingspots.forEach(element => {
            if (element != undefined)
            {
                this.ctx.fillStyle = "#000000";
                this.ctx.fillText(element.countdown, element.x * this.cellSize + 30, element.y * this.cellSize);
                if(element.showTruck)
                {
                    element.content.Draw(element.x,element.y,this.cellSize);
                }
            }
        });
    }

    UpdateGrid()
    {
 
        let skipgrid = Array.from(Array(15), () => new Array(8));
        for(let x = 0; x < this.grid.length; x++) 
        {
            for(let y = 0; y < this.grid[x].length; y++) 
            {
                let assembly = this.grid[x][y];
                if (assembly != undefined && !skipgrid[x][y])
                {
                    if (assembly.content != null)
                    {
                        assembly.contentPositionX += this.Difference(assembly.contentPositionX,assembly.contentEndPositionX);
                        assembly.contentPositionY += this.Difference(assembly.contentPositionY,assembly.contentEndPositionY);
                        if (assembly.next != null)
                        {
                            if (assembly.next.content == null && assembly.next.moveable)
                            {
                                if(assembly.contentPositionX == assembly.contentEndPositionX &&
                                    assembly.contentPositionY == assembly.contentEndPositionY)
                                {
                                    if(assembly.previous != undefined && assembly.previous.moveable)
                                    {
                                        assembly.contentPositionX = assembly.previous.contentStartPositionX;
                                        assembly.contentPositionY = assembly.previous.contentStartPositionY;
                                    }
                                    else
                                    {
                                        assembly.contentPositionX = assembly.contentStartPositionX;
                                        assembly.contentPositionY = assembly.contentStartPositionY;
                                    }
                                    assembly.next.content = assembly.content;
                                    assembly.content = null;
                                    if (assembly.next != undefined)
                                        skipgrid[this.grid[x][y].next.X][this.grid[x][y].next.Y] = true;
                                }        
                            }
                        }
                    }
                }
            }
        }
        
    }
    IsEven(n) {
        return n % 2 == 0;
     }

     Difference(start,end)
     {
        if(start - end < 0)
            return 1;

        if (start - end > 0)
            return -1;

        return 0;
     }

    AddParkingSpots()
    {
        for(let x = 0; x < this.grid.length; x++) 
        {
            for(let y = 0; y < 2; y++) 
            {
                if(this.IsEven(x))
                {
                    this.grid[x][y] = new ParkingsSpot(x,y);
                    if (y == 1)
                        this.parkingspots.push(this.grid[x][1]);
                }
            }
        }
    }

    AddPackageDropper()
    {
        this.grid[this.grid.length - 1][this.grid[0].length - 1] = new PackageDropper(this.grid.length - 1,this.grid[0].length - 1);
        this.packageDropper = this.grid[this.grid.length - 1][this.grid[0].length - 1];
    }



    AddTruck(truck)
    {
        console.log(this.parkingspots);
        for(let i = 0; i < this.parkingspots.length; i++)
        {
            if(this.parkingspots[i].content == null)
            {
                this.parkingspots[i].AddTruck(truck);
                return true;
            }
        }

        return false;
    }
}