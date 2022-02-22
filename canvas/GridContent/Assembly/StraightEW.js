class StraightEW extends AssemblyLine
{
    constructor()
    {
        super();
        this.background = "img/AssemblyLine3.png";
        this.s = 0;
        this.n = 0;
        this.w = 1;
        this.e = -1;
        this.contentEndPositionX = -15;
        this.contentEndPositionY = 40;
        this.contentStartPositionX = 65;
        this.contentStartPositionY = 40;
        this.contentPositionX = 65;
        this.contentPositionY = 40;
    }
}