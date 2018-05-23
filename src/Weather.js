import React from "react";
import "./css/weather-icons.css"

class WeatherApp extends React.Component {
    constructor(props){
        super(props);
        this.componentDidMount=this.componentDidMount.bind(this);
        this.showPosition=this.showPosition.bind(this);
        this.state={
            chk: {"coord":{"lon":100.17,"lat":45.55},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"base":"stations","main":{"temp":294.65,"pressure":1017,"humidity":60,"temp_min":294.15,"temp_max":296.15},"visibility":16093,"wind":{"speed":1.5,"deg":140},"clouds":{"all":75},"dt":1527017700,"sys":{"type":1,"id":1534,"message":0.0039,"country":"US","sunrise":1526985472,"sunset":1527040178},"id":5044407,"name":"Saint Cloud","cod":200},
            // chk:'',
            iconid1:'',
            unit:'',
            temp1:'',
            name:''
        };
    }

    componentDidMount (){
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(this.showPosition);
        }
        let iconid = this.state.chk.weather.map(list => {return(list.id);});
        let temp = Math.round(((this.state.chk.main.temp) *9/5) - 459.67);
        this.setState({
            name: this.state.chk.name,
            unit: 'F'});
        this.setState({
            temp1: temp,
            iconid1: iconid
        })
    }

    showPosition(pos) {
        let lat = pos.coords.latitude;
        let lon = pos.coords.longitude;
        let api = "c1e67f8c28c7c647a8d30b68282aa936";
        let loc = "lat=" + lat + "&lon=" + lon + "&APPID=" + api ;
        let url = "https:api.openweathermap.org/data/2.5/weather?"+loc;
        console.log(url);
        fetch(url).then(function(res){
            return res.json();
        }).then(function (data) {
            this.setState(
                {chk:data}
            );
        }.bind(this));
        console.log(this.state.chk);
    }

    render() {

        return (
            <div className="weatherWidgetWrap">
                {/*<div class="weatherWidget">*/}
                    {/*<i className={'wi wi-owm-'+ this.state.iconid1}>*/}
                        {/*{this.state.temp1}° {this.state.unit}*/}
                        {/*<p>{this.state.name}</p>*/}
                    {/*</i>*/}
                {/*</div>*/}
            </div>
        );
    }
}

export default WeatherApp;