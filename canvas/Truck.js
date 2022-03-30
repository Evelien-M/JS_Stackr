class Truck 
{
    constructor(ctx,width,length,intervall,type,actionradius,weather)
    {
        this.ctx = ctx;
        this.width = width;
        this.length = length;
        this.intervall = intervall;
        this.type = type;
        this.actionradius = actionradius;
        this.weather = weather;

        this.cellSize = 15;
        this.grid = Array.from(Array(parseInt(this.width)), () => new Array(parseInt(this.length)));
        this.maxAmountPackage = Math.floor((this.width * this.length) / 4);
        this.maxSealLength = this.length * this.cellSize;
        this.currentSealLength = 0;
        this.loaded = false;
        this.departed = false;
        this.yPosition = -200;
        this.color = this.GetColor(this.type);
        this.nearbyCities = new CityRadius(actionradius,this.weather);
        this.showRadius = false;
    }

    Update()
    {
        // truck is arriving
        if(this.yPosition < 0 && !this.loaded)
        {
            this.yPosition++;
        }
        if(this.maxAmountPackage == 0 && !this.loaded)
        {
            this.currentSealLength++
            if(this.currentSealLength == this.maxSealLength)
            {
                this.loaded = true;
            }
        }
        if(this.loaded && !this.departed)
        {
            this.yPosition--;
            if(this.yPosition == -300)
            {
                this.departed = true;
            }
        }
    }
    Draw(cellSize)
    {
        this.ctx.fillStyle = "#333333";
        this.ctx.fillRect(this.posX * cellSize, this.yPosition, this.width * this.cellSize, 30);
        this.ctx.fillStyle = "#CCCCCC";
        this.ctx.fillRect(this.posX * cellSize, this.yPosition + 30, this.width * this.cellSize, this.length * 15);
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.posX * cellSize + this.width * this.cellSize - 15, this.yPosition, this.cellSize, 30);
        this.ctx.fillRect(this.posX * cellSize, this.yPosition, 15, 30);
        
        this.ctx.font = "30px Arial";
        this.ctx.fillStyle = "#FFFFFF";
        this.ctx.beginPath();  
        this.ctx.fillText(this.maxAmountPackage, this.posX * cellSize + 30, this.yPosition + 30);

        this.DrawGrid(cellSize);
        this.DrawPackage(cellSize);
        this.DrawSeal(cellSize);
        this.DrawActionRadius(cellSize);

    }

    DrawGrid(cellSize)
    {
        for(let x = 0; x < this.grid.length; x++) 
        {
            for(let y = 0; y < this.grid[x].length; y++) 
            {
                this.ctx.beginPath();   
                this.ctx.strokeStyle = 'green'; 
                this.ctx.strokeRect((this.posX * cellSize) + x * this.cellSize, y * this.cellSize + 30 + this.yPosition, this.cellSize, this.cellSize + this.yPosition);
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
                    this.ctx.fillRect((this.posX * cellSize) + x * this.cellSize, y * this.cellSize + 30 + this.yPosition, this.cellSize, this.cellSize);
                }
            }
        }
    }

    DrawSeal(cellSize)
    {
        this.ctx.beginPath();   
        this.ctx.fillStyle = this.color; 
        this.ctx.fillRect(this.posX * cellSize, this.yPosition + 30, this.width * this.cellSize,  this.currentSealLength);
    }

    DrawActionRadius(cellSize)
    {
        if(this.showRadius)
        {   
            this.ctx.beginPath();   
            this.ctx.fillStyle = '#CCCCCC'; 
            this.ctx.fillRect(this.posX * cellSize, cellSize * 2 + 15, cellSize * 2, 500);
        
            let data = this.nearbyCities.data;
            if(data != undefined)
            {
                for(let y = 0; y < data["geonames"].length; y++)
                {
                    this.ctx.fillStyle = '#000000';
                    ctx.font = "22px Arial";
                    this.ctx.fillText(data["geonames"][y]["name"], this.posX * cellSize, (cellSize * 2) + 30 + (y * 20));
                }
            }
        }
    }

    MouseMove(e)
    {
        console.log(e);
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

    GetColor(type)
    {
        switch(type)
        {
            case "cold":
                return "#0000FF";
            case "fragile":
                return "#FF0000"
            case "common":
                return "#FF00FF";
            case "pallets":
                return "#F5AA53";
            case "fast":
                return "#FFFF00";
        }
        return "#FFFFFF";
    }
}