class AssemblyLine
{
    constructor()
    {
        this.content = null;
        this.next = null;
        this.previous = null;
        this.moveable = true;
        this.grid = Array.from(Array(6), () => new Array(6));
    }

    Draw(ctx,cellSize)
    {
        let bg = new Image(); // Creating image objects
        bg.src = this.background;
        ctx.drawImage(bg,this.X * cellSize, this.Y * cellSize);
    }
    SetPosition(x,y)
    {
        this.X = x;
        this.Y = y;
    }
}