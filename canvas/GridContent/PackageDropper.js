class PackageDropper
{
    constructor()
    {
        this.background = "img/packagedropper.png";;
        this.content = null;
        this.next = null;
        this.s = 0;
        this.n = 0;
        this.w = 1;
        this.e = 0;
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
                    this.next.content = new Package1();
                }
            }
        }
    }
}