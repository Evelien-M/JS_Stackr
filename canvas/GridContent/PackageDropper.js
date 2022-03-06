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
        this.contentPositionX = 45;
        this.contentPositionY = 30;
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
                    let rng = Math.floor(Math.random() * 6);
                    this.next.content = this.GetPackage(rng);
                }
            }
        }
    }

    GetPackage(index)
    {
        switch(index)
        {
            case 0:
                return new Package1();
            case 1:
                return new Package2();
            case 2:
                return new Package3();
            case 3:
                return new Package4();
            case 4:
                return new Package5();
            case 5:
                return new Package6();
            case 6:
                return new Package7();
        }
    }
}