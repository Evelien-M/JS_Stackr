function Canvas()
{
    this.canvasHolder = document.getElementById("canvas");
    this.ctx = canvasHolder.getContext("2d");
    this.start = new HallOne(this.canvasHolder,this.ctx);
    this.canvasHolder.width = 1350;
    this.canvasHolder.height = 810;
    Update();
}


function Update()
{

    
    this.start.Update();
    this.start.Draw();
    this.ctx.restore();

    requestAnimationFrame(Update);
}