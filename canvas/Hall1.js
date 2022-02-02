class HallOne {
    constructor(canvasHolder,ctx)
    {
        this.canvasHolder = canvasHolder;
        this.ctx = ctx;

        this.parkingspots = Array(8);
        this.grid = Array.from(Array(15), () => new Array(8));
        this.cellSize = 90;
        this.AddParkingSpots();
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
        for(let x = 0; x < this.grid.length; x++) 
        {
            for(let y = 0; y < this.grid[x].length; y++) 
            {
                this.ctx.beginPath();   
        
                this.ctx.strokeStyle = 'green'; 
                this.ctx.strokeRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);

                if (this.grid[x][y] != undefined)
                {
                    this.ctx.fillStyle = this.grid[x][y].background; 
                    this.ctx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
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

    DrawParkingSpot()
    {
        this.ctx.beginPath();   
        
        this.ctx.fillStyle = "#BBB"; 
        this.ctx.fillRect(0, 0, this.canvasHolder.width, this.canvasHolder.height / 4);
    }
}