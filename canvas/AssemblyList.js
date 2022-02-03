class AssemblyList
{
    constructor(canvasHolder,ctx)
    {
        this.canvasHolder = canvasHolder;
        this.ctx = ctx;
        this.CreateAsseblyList();
    }

    Update()
    {

    }
    Draw()
    {
        this.ctx.beginPath();   
        
        this.ctx.fillStyle = "#5D5D5D"; 
        this.ctx.fillRect(0, 720, this.canvasHolder.width, 90);

        this.DrawAssemblyList();
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
}