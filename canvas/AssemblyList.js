class AssemblyList
{
    constructor(canvasHolder,ctx)
    {
        this.canvasHolder = canvasHolder;
        this.ctx = ctx;
        this.CreateAsseblyList();

        canvasHolder.onmousemove = (e) => this.MouseMove(e);
        canvasHolder.onmousedown = (e) => this.MouseDown(e);
        canvasHolder.onmouseup = (e) => this.MouseUp(e); 

        this.DraggableObject = null;
        this.DraggableObjectContent = null;

        
    }

    Update(grid)
    {
        this.grid = grid;

        
    }
    Draw()
    {
        this.ctx.beginPath();   
        
        this.ctx.fillStyle = "#5D5D5D"; 
        this.ctx.fillRect(0, 720, this.canvasHolder.width, 90);

        this.DrawAssemblyList();

        if(this.DraggableObject != null)
        {
            let bg = new Image(); // Creating image objects
            bg.src = this.DraggableObject.background;
            this.ctx.drawImage(bg,this.DraggableObject.posX,this.DraggableObject.posY);
        }
        if(this.DraggableObjectContent != null)
        {
            let bg = new Image(); // Creating image objects
            bg.src = this.DraggableObjectContent.background;
            this.ctx.drawImage(bg,this.DraggableObjectContent.posX,this.DraggableObjectContent.posY);
        }

    }


    CreateAsseblyList()
    {
        this.list = Array(4);
        this.list[0] = new StraightNS();
        this.list[1] = new StraightSN();
        this.list[2] = new StraightEW();
        this.list[3] = new StraightWE();
    }

    DrawAssemblyList()
    {
        for(let i = 0; i < this.list.length; i++)
        {
            if (this.list[i] != undefined)
            {
                let bg = new Image(); // Creating image objects
                bg.src = this.list[i].background;
                this.ctx.drawImage(bg,i * 90,this.canvasHolder.height - 90);
            }
        }
    }

    MouseDown(e)
    {
        // checks if mouse is in the assembly 
        if(e.clientY < this.canvasHolder.height && e.clientY > this.canvasHolder.height - 90)
        {
            for(let i = 0; i < this.list.length; i++)
            {
                if(e.offsetX > i * 90 && e.offsetX < (i * 90) + 90)
                {
                    this.DraggableObject = this.GetNewAssembly(i);
                    this.DraggableObject.posX = e.offsetX - 45;
                    this.DraggableObject.posY = e.offsetY - 45;
                }
            }
        }
        // checks if mouse is in the grid
        if (e.clientY > 0 && e.clientY < this.canvasHolder.height - 90)
        {
           let x = Math.round((e.offsetX - 45) / 90);
           let y = Math.round((e.offsetY - 45) / 90);
           if(this.grid[x][y] != undefined)
           {
               if(this.grid[x][y].moveable)
               {
                   if(this.grid[x][y].content != null)
                   {
                        this.DraggableObjectContent = this.grid[x][y].content;
                        this.grid[x][y].content = null;
                   }
                   else
                   {
                       this.DraggableObject = this.grid[x][y];
                       this.DraggableObject.posX = e.offsetX - 45;
                       this.DraggableObject.posY = e.offsetY - 45;
                       this.grid[x][y] = undefined;
                   }
                   
               }
           }
        }
    }
    MouseUp(e)
    { 
        if (e.offsetX > 0 && e.offsetX < this.grid.length * 90 &&
            e.offsetY > 0 && e.offsetY < this.grid[0].length * 90)
        {    
            let x = Math.round((e.offsetX - 45) / 90);
            let y = Math.round((e.offsetY - 45) / 90);
            if(this.grid[x][y] == undefined)
            { 
                if (this.DraggableObject != null)
                {
                    this.grid[x][y] = this.DraggableObject;
                    this.DraggableObject.SetPosition(x,y);
                    this.CreateLinkedList();
                    this.DraggableObject.posX = e.offsetX - 45;
                    this.DraggableObject.posY = e.offsetY - 45;
                    this.DraggableObject = null;
                }
            }
            else if (this.DraggableObjectContent != null)
            {
                this.grid[x][y].content = this.DraggableObjectContent;
                this.DraggableObjectContent = null; 
            }
            
        }
        
        if(this.DraggableObject != null)
        {
            this.DraggableObject.posX = 0;
            this.DraggableObject.posY = 0;
            this.DraggableObject = null;
        }
        if (this.DraggableObjectContent != null)
        {
            this.DraggableObjectContent.posX = 0;
            this.DraggableObjectContent.posY = 0;
            this.DraggableObjectContent = null; 
        }
    }

    MouseMove(e)
    {
        if(this.DraggableObject != null)
        {
            this.DraggableObject.posX = e.offsetX - 45;
            this.DraggableObject.posY = e.offsetY - 45;
        }
        if (this.DraggableObjectContent != null)
        {
            this.DraggableObjectContent.posX = e.offsetX - 15;
            this.DraggableObjectContent.posY = e.offsetY - 15;
        }
    }

    GetNewAssembly(i)
    {
        switch(i)
        {
            case 0:
                return new StraightNS();
            case 1:
                return new StraightSN();
            case 2:
                return new StraightEW();
            case 3:
                return new StraightWE();
        }
        return null;
    }
    CreateLinkedList()
    {
        // reset package dropper
        this.grid[this.grid.length - 1][this.grid[0].length - 1].next = this.grid[this.grid.length - 2][this.grid[0].length - 1];
        if (this.grid[this.grid.length - 2][this.grid[0].length - 1] != undefined)
        {
            this.grid[this.grid.length - 2][this.grid[0].length - 1].previous = this.grid[this.grid.length - 1][this.grid[0].length - 1];
        }

        for(let x = 0; x < this.grid.length; x++) 
        {
            for(let y = 0; y < this.grid[x].length; y++) 
            {
                let assemblyLine = this.grid[x][y];
                if(assemblyLine != undefined && assemblyLine.moveable)
                {
                    assemblyLine.next = null;
                    if(assemblyLine.s == 1) // direction south
                    {
                        if(y+1 != this.grid[0].length && this.grid[x][y+1] != undefined)
                        {
                            assemblyLine.next = this.grid[x][y+1];
                            this.grid[x][y+1].previous = assemblyLine;
                        }
                        
                        continue;
                    }
                    if(assemblyLine.n == 1) // direction north
                    {
                        if(y-1 > 0 && this.grid[x][y-1] != null)
                        {
                            assemblyLine.next = this.grid[x][y-1];
                            this.grid[x][y-1].previous = assemblyLine;
                        }
  
                        continue;
                    }
                    if (assemblyLine.w == 1) // direction west
                    {
                        if(x-1 > 0 && this.grid[x-1][y] != undefined)
                        {
                            assemblyLine.next = this.grid[x-1][y];
                            this.grid[x-1][y].previous = assemblyLine;
                        }
                        
                        continue;
                    }
                    if (assemblyLine.e == 1) // direction east
                    {
                        if(x+1 != this.grid.length && this.grid[x+1][y] != undefined)
                        {
                            assemblyLine.next = this.grid[x+1][y];
                            this.grid[x+1][y].previous = assemblyLine;
                        }
                    
                        continue;
                    }
                }
            }
        }      
    }
}