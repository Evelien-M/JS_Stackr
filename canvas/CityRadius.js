class CityRadius
{
    constructor(actionradius,weather)
    {
        let lat = weather.data["coord"]["lat"];
        let long = weather.data["coord"]["lon"];
        this.GetNearbyCities(lat,long,actionradius);
    }

    async GetNearbyCities(lat,long,radius)
    {
        await fetch('http://api.geonames.org/findNearbyPlaceNameJSON?lat='+ lat +'&lng='+ long +'&radius=' + radius + '&username=AB132453')
        .then(data => data.json())
        .then(data => {
            this.data = data;
        })
    }
}