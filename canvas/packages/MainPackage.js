class MainPackage
{
    constructor()
    {
        this.grid = Array.from(Array(4), () => new Array(4));
        this.grid[0][0] = false;
        this.grid[0][1] = false;
        this.grid[0][2] = false;
        this.grid[1][0] = false;
        this.grid[1][1] = false;
        this.grid[1][2] = false;
        this.grid[2][0] = false;
        this.grid[2][1] = false;
        this.grid[2][2] = false;
    }
}