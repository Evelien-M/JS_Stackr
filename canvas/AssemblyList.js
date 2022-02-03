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

    }


    CreateAsseblyList()
    {
        this.list = Array(12);
        this.list[0] = new StraightNS();
        this.list[1] = new StraightSN();
        this.list[2] = new StraightEW();
        this.list[3] = new StraightWE();
        this.list[4] = new CornerEN();
        this.list[5] = new CornerES();
        this.list[6] = new CornerNE();
        this.list[7] = new CornerNW();
        this.list[8] = new CornerSE();
        this.list[9] = new CornerSW();
        this.list[10] = new CornerWN();
        this.list[11] = new CornerWS();
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
        if(e.clientY < this.canvasHolder.height && e.clientY > this.canvasHolder.height - 90)
        {
            for(let i = 0; i < this.list.length; i++)
            {
                if(e.offsetX > i * 90 && e.offsetX < (i * 90) + 90)
                {
                    this.DraggableObject = this.list[i];
                }
            }
        }
    }
    MouseUp(e)
    {
        this.DraggableObject = null;
    }

    MouseMove(e)
    {
        if(this.DraggableObject != null)
        {
            this.DraggableObject.posX = e.offsetX - 45;
            this.DraggableObject.posY = e.offsetY - 45;
        }
    }
}