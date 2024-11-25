import moment from "moment";
import { useEffect } from "react";
import "moment/dist/locale/ar-dz";
moment.locale("ar_dz");


const Clock = () => {
  

    function displayTime() {
      let hr = document.getElementById('hour');
      let min = document.getElementById('min');
      let sec = document.getElementById('sec');

      let date = new Date();
      let hour = date.getHours()
      let minute = date.getMinutes()
      let second = date.getSeconds()
      let hourRotate = hour * 30 + minute/2
      let minuteRotate = minute * 6
      let secondRotate = second * 6
      hr.style.transform = `rotate(${hourRotate}deg)`;
      min.style.transform = `rotate(${minuteRotate}deg)`;
      sec.style.transform = `rotate(${secondRotate}deg)`;
    }
    let digitalClock = moment().format('LTS')
    useEffect(() => {
      let interval = setInterval(() => {
        displayTime()
      }, 1000)
      return () => {
        clearInterval(interval)
      }
    }, []);
  return (
    <div className="clock-div" style={{display: "flex", justifyContent: "space-around",alignItems: "center", marginTop: "50px"}}>
        <div>
          <h1>الساعة الآن</h1>
          <h2 id="prayerTime">{digitalClock}</h2>
        </div>
        <div className="clock-box">
          <div className="clock">
              <div id="hour" className="hand" style={{"--clr":"#a37d1f","--h":"40px","--w": "4px"}}><i></i></div>
              <div id="min" className="hand" style={{"--clr":"#FFC107","--h":"55px","--w": "3px"}}><i></i></div>
              <div id="sec" className="hand" style={{"--clr": "#b8860b","--h":"65px","--w": "3px"}}><i></i></div>
              <span style={{"--i": "1"}}><b>1</b></span>
              <span style={{"--i": "2"}}><b>2</b></span>
              <span style={{"--i": "3"}}><b>3</b></span>
              <span style={{"--i": "4"}}><b>4</b></span>
              <span style={{"--i": "5"}}><b>5</b></span>
              <span style={{"--i": "6"}}><b>6</b></span>
              <span style={{"--i": "7"}}><b>7</b></span>
              <span style={{"--i": "8"}}><b>8</b></span>
              <span style={{"--i": "9"}}><b>9</b></span>
              <span style={{"--i": "10"}}><b>10</b></span>
              <span style={{"--i": "11"}}><b>11</b></span>
              <span style={{"--i": "12"}}><b>12</b></span>
          </div>
        </div>
      </div>
  );
}

export default Clock;
