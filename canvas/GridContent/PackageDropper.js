class PackageDropper
{
    constructor(x,y)
    {
        this.background = "img/packagedropper.png";;
        this.content = null;
        this.next = null;
        this.X = x;
        this.Y = y;
        this.cooldown = 600;
    }

    Next()
    {
        this.cooldown--;
        if (this.cooldown == 0)
        {
            this.cooldown = 600;
            if(this.next != null)
            {
                if (this.next.content == null)
                {
                    this.next.content = new Package1(this.X - 1,this.Y);
                }
            }
        }
    }
}