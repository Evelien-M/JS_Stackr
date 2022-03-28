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
        this.maxAmountPackage = Math.floor((this.width * this.length) / 4);
        this.loaded = false;
    }

    Update()
    {
        if(this.maxAmountPackage == 0 && !this.loaded)
        {
            
        }
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

        this.ctx.font = "30px Arial";
        this.ctx.fillStyle = "#FFFFFF";
        ctx.fillText(this.maxAmountPackage, this.posX * cellSize + 30, this.posY * cellSize - 60);

        this.DrawGrid(cellSize);
        this.DrawPackage(cellSize);
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

    DrawPackage(cellSize)
    {
        for(let x = 0; x < this.grid.length; x++) 
        {
            for(let y = 0; y < this.grid[x].length; y++) 
            {
                if(this.grid[x][y] != undefined)
                {
                    this.ctx.beginPath();   
                    this.ctx.fillStyle = this.grid[x][y].color; 
                    this.ctx.fillRect((this.posX * cellSize) + x * this.cellSize, y * this.cellSize + 30, this.cellSize, this.cellSize);
                }
            }
        }
    }

    SetPosition(x,y)
    {
        this.posX = x;
        this.posY = y;
    }

    AddPackage(package2)
    {   
        if (this.maxAmountPackage == 0)
        {
            return false;
        }
        let x = Math.floor(Math.random() * this.grid.length - 2);
        let y = Math.floor(Math.random() * this.grid[0].length - 2);
        let countX = 0;

        for(let x2 = x; x2 < x + 4; x2++)
        {
            for(let y2 = y; y2 < y + 4; y2++)
            {
                if(x2 > -1 && x2 < this.grid.length && y2 > -1 && y2 < this.grid[x2].length)
                {
                }
                else
                {
                    return false;
                }
            }
        }

        for(let x2 = x; x2 < x + 4; x2++)
        {
            let countY = 0;
            for(let y2 = y; y2 < y + 4; y2++)
            {
                if(package2.grid[countX][countY])
                {
                    this.grid[x2][y2] = package2; 
                }
                
                countY++;
            }
            countX++;
        }

        this.maxAmountPackage--;
        return true;
    }
}