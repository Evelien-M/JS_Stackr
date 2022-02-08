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
                        this.ctx.drawImage(bg2,x * this.cellSize, y * this.cellSize);
                    }
                }
            }
        }
    }

    UpdateGrid()
    {
        this.updatetimer--;
        if(this.updatetimer == 0)
        {
            this.updatetimer = 60;
            for(let x = 0; x < this.grid.length; x++) 
            {
                for(let y = 0; y < this.grid[x].length; y++) 
                {
                    if (this.grid[x][y] != undefined)
                    {
                        if (this.grid[x][y].content != null)
                        {
                            if (this.grid[x][y].next != null)
                            {
                                if (this.grid[x][y].next.content == null && this.grid[x][y].next.moveable)
                                {
                                    this.grid[x][y].next.content = this.grid[x][y].content;
                                    this.grid[x][y].content = null;
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
        this.grid[this.grid.length - 1][this.grid[0].length - 1] = new PackageDropper();
        this.packageDropper = this.grid[this.grid.length - 1][this.grid[0].length - 1];
    }

    DrawParkingSpot()
    {
        this.ctx.beginPath();   
        
        this.ctx.fillStyle = "#BBB"; 
        this.ctx.fillRect(0, 0, this.canvasHolder.width, this.canvasHolder.height / 4);
    }
}