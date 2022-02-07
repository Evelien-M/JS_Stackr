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
    }

    Update()
    {

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

    }

    DrawParkingSpot()
    {
        this.ctx.beginPath();   
        
        this.ctx.fillStyle = "#BBB"; 
        this.ctx.fillRect(0, 0, this.canvasHolder.width, this.canvasHolder.height / 4);
    }
}