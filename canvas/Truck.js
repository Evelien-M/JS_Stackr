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

    Draw(cellSize)
    {
        this.ctx.fillStyle = "#333333";
        this.ctx.fillRect(this.posX * cellSize, this.posY, this.width * this.cellSize, 30);
        this.ctx.fillStyle = "#CCCCCC";
        this.ctx.fillRect(this.posX * cellSize, this.posY + 30, this.width * this.cellSize, this.length * 15);
        this.ctx.fillStyle = "#000000";
        this.ctx.fillRect(this.posX * cellSize + this.width * this.cellSize - 15, this.posY, this.cellSize, 30);
        this.ctx.fillRect(this.posX * cellSize, this.posY, 15, 30);

        this.DrawGrid(cellSize);
    }

    DrawGrid(cellSize)
    {
        for(let x = 0; x < this.grid.length; x++) 
        {
            for(let y = 0; y < this.grid[x].length; y++) 
            {
                this.ctx.beginPath();   
                this.ctx.strokeStyle = 'green'; 
                this.ctx.strokeRect((this.posX * cellSize) + x * this.cellSize, y * this.cellSize + 30, this.cellSize, this.cellSize);
            }
        }
    }

    SetPosition(x,y)
    {
        this.posX = x;
        this.posY = y;
    }
}