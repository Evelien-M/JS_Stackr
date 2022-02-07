class PackageDropper
{
    constructor()
    {
        this.background = "img/packagedropper.png";;
        this.content = null;
        this.next = null;
    }

    Next()
    {
        if(this.next != null)
        {
            if (this.next.content == null)
            {
                this.next.content = new Package1();
                console.log(this.next);
            }
        }
    }
}