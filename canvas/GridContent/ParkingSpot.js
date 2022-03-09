class ParkingsSpot
{
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
        this.background = "img/parkingspot.png";;
        this.content = null;
        this.countdown = 0;
        this.timer = 60;
        this.showTruck = false;
    }

    Update()
    {
        this.timer--;
        if (this.timer < 1)
        {
            this.timer = 60;
            if(this.countdown > 0)
            {
                this.countdown--;
                if (this.countdown == 0)
                {
                    this.showTruck = true;
                }
            }
        }
    }
    AddTruck(truck)
    {
        this.countdown = truck.intervall;
        this.content = truck;
    }
}