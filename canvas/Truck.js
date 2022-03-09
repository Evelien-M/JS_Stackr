class Truck 
{
    constructor(ctx,width,length,intervall,type,actionradius)
    {
        this.ctx = ctx;
        this.width = width;
        this.length = length;
        this.intervall = intervall;
        this.type = type;
        this.actionradius = actionradius;
        this.cellSize = 15;
        this.grid = Array.from(Array(parseInt(this.width)), () => new Array(parseInt(this.length)));
    }

    Draw(posX,posY, cellSize)
    {
        this.ctx.fillStyle = "#FF0000";
        this.ctx.fillRect(posX * cellSize, posY, this.width * this.cellSize, 30);
        this.ctx.fillStyle = "#0000FF";
        this.ctx.fillRect(posX * cellSize, posY + 30, this.width * this.cellSize, this.length * 15);
        this.ctx.fillStyle = "#000000";
        this.ctx.fillRect(posX * cellSize + this.width * this.cellSize - 15, posY, this.cellSize, 30);
        this.ctx.fillRect(posX * cellSize, posY, 15, 30);

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
                this.ctx.strokeRect(x * this.cellSize, y * this.cellSize + 30, this.cellSize, this.cellSize);
            }
        }
    }
}