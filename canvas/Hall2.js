class HallTwo extends HallOne {
    constructor(canvasHolder,ctx)
    {
        super();
        this.canvasHolder = canvasHolder;
        this.ctx = ctx;
        this.name = "Hall two";
        this.parkingspots = Array(0);
        this.grid = Array.from(Array(13), () => new Array(6));
        this.cellSize = 90;
        this.AddParkingSpots();
        this.AddPackageDropper();
    } 
}