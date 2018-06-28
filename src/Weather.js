import React from "react";
import "./css/weather-icons.css"

class WeatherApp extends React.Component {
    constructor(props){
        super(props);
        this.componentDidMount=this.componentDidMount.bind(this);
        this.getLocationr=this.getLocation.bind(this);
        this.getWeather=this.getWeather.bind(this);
        this.state={
            lat: '',
            lon: '',
            unit:'F',
            wData:'',
            status: 'Enable Location to use the weather widget.'
        };
    }

    componentDidMount() {
        this.getLocation();
    }

    getWeather(){
        this.setState({status: 'Fetching Weather Data'});
        fetch(process.env.REACT_APP_WEATHER_URL +"?lat=" + this.state.lat + "&lon=" + this.state.lon + "&APPID=" + process.env.REACT_APP_WEATHER_API).then(function(res){
            return res.json();
        }).then(function (data) {
            if(data.cod === 200){
                this.setState({wData:data})
            }
            else{
                this.setState({status: ''});
                console.log(data.message);
            }
        }.bind(this)).catch((error)=>{
            console.log(error);
            this.setState({status: ''});
        });
    }

    getLocation() {
        const location = window.navigator && window.navigator.geolocation;

        let alternativeLocation=()=>{
            this.setState({status: 'Using IP based location'});
            fetch('https://ipapi.co/json/',{
                method:'GET',
            }).then(function(data){
                return data.json();
            }).then(function(result){
                this.setState({
                    lat: result.latitude,
                    lon: result.longitude
                });
                this.getWeather();
            }.bind(this));
        };

        if (location){
            location.getCurrentPosition(readPosition.bind(this),handleError.bind(this))
        }
        else {
            alternativeLocation();
        }

        function readPosition(position) {
            this.setState({
                lat: position.coords.latitude,
                lon: position.coords.longitude
            });
            this.getWeather();
        }

        function handleError(error) {
            alternativeLocation();
        }
    }

    render() {
        if(this.state.wData === ''){
            return(
                <div>
                    <br/>
                    {this.state.status}
                </div>
            );
        }
        else {
            if(this.state.wData.weather[0].icon.search(['d']) !== -1){
                return (
                    <div className="weatherWidgetWrap">
                        <div class="weatherWidget">
                            <i className={'wi wi-owm-day-'+ this.state.wData.weather[0].id}> {Math.round(((this.state.wData.main.temp) * 9 / 5) - 459.67)}° {this.state.unit}
                                <p id="weatherdesc">{this.state.wData.weather[0].description}</p>
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
                            <p id="weatherdesc">{this.state.wData.weather[0].description}</p>
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