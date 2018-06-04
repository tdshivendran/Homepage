import React from "react";
import "./css/weather-icons.css"

class WeatherApp extends React.Component {
    constructor(props){
        super(props);
        this.componentDidMount=this.componentDidMount.bind(this);
        this.getLocationandWeather=this.getLocationandWeather.bind(this);
        this.state={
            unit:'F',
            wData:'',
            api:  "c1e67f8c28c7c647a8d30b68282aa936",
            page: "https://api.openweathermap.org/data/2.5/weather?"
        };
    }

    componentDidMount() {
        this.getLocationandWeather();
    }

    getLocationandWeather() {
        const location = window.navigator && window.navigator.geolocation;

        if (location){
            location.getCurrentPosition(function (position) {
                let latitude = position.coords.latitude;
                let longitude= position.coords.longitude;
                fetch(this.state.page+"lat=" + latitude + "&lon=" + longitude + "&APPID=" + this.state.api).then(function(res){
                    return res.json();
                }).then(function (data) {
                    this.setState({wData:data})
                }.bind(this));
            }.bind(this));
        }
    }

    render() {
        if(this.state.wData === ''){
            return(
                <div>

                </div>
            );
        }
        else {
            if(this.state.wData.weather[0].icon.search(['d']) !== -1){
                return (
                    <div className="weatherWidgetWrap">
                        <div class="weatherWidget">
                            <i className={'wi wi-owm-day-'+ this.state.wData.weather[0].id}> {Math.round(((this.state.wData.main.temp) * 9 / 5) - 459.67)}° {this.state.unit}
                                <p id="weatherdesc">Description: {this.state.wData.weather[0].description}</p>
                                <p>{this.state.wData.name}</p>
                            </i>
                        </div>
                    </div>
                );
            }
            else {
                return (
                    <div className="weatherWidgetWrap">
                        <div class="weatherWidget">
                            <i className={'wi wi-owm-night-'+ this.state.wData.weather[0].id}> {Math.round(((this.state.wData.main.temp) * 9 / 5) - 459.67)}°{this.state.unit}
                            <p id="weatherdesc">Description: {this.state.wData.weather[0].description}</p>
                                <p>{this.state.wData.name}</p>
                            </i>
                        </div>
                    </div>
                );
            }

        }
    }
}

export default WeatherApp;