class AssemblyLine
{
    constructor()
    {
        this.content = null;
        this.contentPositionX = 40;
        this.contentPositionY = 40;
        this.next = null;
        this.previous = null;
        this.moveable = true;
    }

    SetPosition(x,y)
    {
        this.X = x;
        this.Y = y;
    }
}