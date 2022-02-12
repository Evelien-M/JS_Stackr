class HallOne {
    constructor(canvasHolder,ctx)
    {
        this.canvasHolder = canvasHolder;
        this.ctx = ctx;

        this.parkingspots = Array(8);
        this.grid = Array.from(Array(15), () => new Array(8));
        this.cellSize = 90;
        this.AddParkingSpots();
        this.AddPackageDropper();
        this.updatetimer = 60;
    }

    Update()
    {
        this.packageDropper.Next();
        this.UpdateGrid();
    }
    Draw()
    {
        this.DrawParkingSpot();
        this.DrawGrid();
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
                    if (this.grid[x][y].content != null)
                    {
                        let bg2 = new Image(); // Creating image objects
                        bg2.src = this.grid[x][y].content.background;
                        this.ctx.drawImage(bg2,x * this.cellSize + this.grid[x][y].contentPositionX, y * this.cellSize + this.grid[x][y].contentPositionY);
                    }
                }
            }
        }
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
                                    assembly.contentPositionX = 40;
                                    assembly.contentPositionY = 40;
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
                    this.grid[x][y] = new ParkingsSpot();
                }
            }
        }
    }

    AddPackageDropper()
    {
        this.grid[this.grid.length - 1][this.grid[0].length - 1] = new PackageDropper(this.grid.length - 1,this.grid[0].length - 1);
        this.packageDropper = this.grid[this.grid.length - 1][this.grid[0].length - 1];
    }

    DrawParkingSpot()
    {
        this.ctx.beginPath();   
        
        this.ctx.fillStyle = "#BBB"; 
        this.ctx.fillRect(0, 0, this.canvasHolder.width, this.canvasHolder.height / 4);
    }
}