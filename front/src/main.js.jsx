import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const context = new (window.AudioContext || window.webkitAudioContext)();
const source = context.createBufferSource();
const distortion = context.createWaveShaper();
const gainNode = context.createGain();
const biquadFilter = context.createBiquadFilter();
source.connect(gainNode);
gainNode.connect(biquadFilter);
biquadFilter.connect(distortion);
distortion.connect(context.destination);

class Audio extends Component {
  constructor(props) {
    super(props);
    this.getAudioBuffer = this.getAudioBuffer.bind(this)
    this.changeVolume = this.changeVolume.bind(this)
    this.changeFilter = this.changeFilter.bind(this)
    this.createCurve = this.createCurve.bind(this)
    this.changeDistortion = this.changeDistortion.bind(this)
    this.playSound = this.playSound.bind(this)
    this.startSound = this.startSound.bind(this)
    this.stopSound = this.stopSound.bind(this)
  }

  getAudioBuffer(url, fn) {
    const req = new XMLHttpRequest();
    req.responseType = 'arraybuffer';
    req.onreadystatechange = (() => {
      if (req.readyState === 4) {
        if (req.status === 0 || req.status === 200) {
          context.decodeAudioData(req.response, function(buffer) {
            fn(buffer);
          });
        }
      }
    })
    req.open('GET', url, true);
    req.send('');
  }

  changeVolume(e) {
    const volume = e.target.value / 100
    gainNode.gain.value = volume
  }

  changeFilter(e) {
    const id = parseInt(e.target.id)
    switch (id) {
      case 1:
        biquadFilter.type = 'lowpass'
        return
      case 2:
        biquadFilter.type = 'highpass'
        return
      case 3:
        biquadFilter.type = 'bandpass'
        return
    }
  }

  createCurve(distortion) {
    const NUM_SUMPLES = 4096;
    if ((distortion > 0) && (distortion < 1)) {
        let curves = new Float32Array(NUM_SUMPLES);
        const k = (2 * distortion) / (1 - distortion);
        for (let i = 0; i < NUM_SUMPLES; i++) {
            // LINEAR INTERPOLATION: x := (c - a) * (z - y) / (b - a) + y
            // a = 0, b = 2048, z = 1, y = -1, c = i
            const x = (((i - 0) * (1 - (-1))) / (NUM_SUMPLES - 0)) + (-1);
            curves[i] = ((1 + k) * x) / (1 + k * Math.abs(x));
        }
        return curves;
    } else {
        return null;  // Clean sound (default value)
    }
  }

  changeDistortion(e) {
    const type = e.target.id
    switch (type) {
      case "CLEAN":
        distortion.curve = this.createCurve(0.0);
        return
      case "CRUNCH":
        distortion.curve = this.createCurve(0.5);
        return
      case "OVERDRIVE":
        distortion.curve = this.createCurve(0.7);
        return
      case "DISTORTION":
        distortion.curve = this.createCurve(0.8);
        return
      case "FUZZ":
        distortion.curve = this.createCurve(0.9);
        return
    }
  }

  playSound(buffer) {
    source.buffer = buffer;
    source.start(0);
  }

  startSound() {
    this.getAudioBuffer('audio/sample.mp3', ((buffer) => {
      this.playSound(buffer);
    }))
  }

  stopSound() {
    source.stop(0)
  }

  render() {
    return (
      <div>
        <div className="container">
          <h1>Equalizer</h1>
        </div>
        <div className="container">
          <div className="text-center row">
            <button type="button" className="btn btn-primary btn-lg active" onClick={this.startSound}>Start</button>
            <button type="button" className="btn btn-danger btn-lg active" onClick={this.stopSound}>Stop</button>
          </div>
          <br />
          <div className="row">
            <div className="col-md-4">
              <h3>Volume</h3>
              <input type="range" onChange={this.changeVolume} />
            </div>
            <ul className="nav nav-stacked col-md-4">
              <h3>Filter</h3>
              {[1, 2, 3].map((i) => {
                return <li key={i} id={i} className="btn btn-info btn-sm active" onClick={this.changeFilter}>Filter{i}</li>
              })}
            </ul>
            <ul className="nav nav-stacked col-md-4">
              <h3>Distortion</h3>
              {["CLEAN", "CRUNCH", "OVERDRIVE", "DISTORTION", "FUZZ"].map((type, i) => {
                return <li key={i} id={type} className="btn btn-warning btn-sm active" onClick={this.changeDistortion}>{type}</li>
              })}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Audio />,
  document.getElementById('js-audio')
);
