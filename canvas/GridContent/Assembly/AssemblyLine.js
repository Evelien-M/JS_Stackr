class AssemblyLine
{
    constructor()
    {
        this.content = null;

        this.next = null;
        this.moveable = true;
    }

    SetPosition(x,y)
    {
        this.X = x;
        this.Y = y;
    }
}