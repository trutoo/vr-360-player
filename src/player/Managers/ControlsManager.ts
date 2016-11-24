import Player, { ILifeCycle } from '../Player';
import Mode from '../Mode';
import PanoramaMode from '../PanoramaMode';
import StereoscopicMode from '../StereoscopicMode';

export default class ControlsManager implements ILifeCycle {

  /* Nodes */
  private _controls: HTMLElement;
  private _crosshair: HTMLElement;
  private _sensorToggle: HTMLElement;
  private _modeToggler: HTMLElement;
  private _eyeToggler: HTMLElement;

  constructor(private _player: Player) {
    // Bind event listeners
    this.onSensorToggle = this.onSensorToggle.bind(this);
    this.onModeToggle = this.onModeToggle.bind(this);
    this.onEyeToggle = this.onEyeToggle.bind(this);
  }

  onCreate() {
    this._controls = document.getElementById('controls');
    this._crosshair = document.getElementById('crosshair');
    this._sensorToggle = document.getElementById('sensor-toggler');
    this._modeToggler = document.getElementById('mode-toggler');
    this._eyeToggler = document.getElementById('eye-toggler');

    this._sensorToggle.addEventListener('click', this.onSensorToggle);
    this._modeToggler.addEventListener('click', this.onModeToggle);
    this._eyeToggler.addEventListener('click', this.onEyeToggle);
  }

  onResume() {
  }

  onResize() {
  }

  onPause() {
  }

  onDestroy() {
    this._sensorToggle.removeEventListener('click', this.onSensorToggle);
    this._modeToggler.removeEventListener('click', this.onModeToggle);
    this._eyeToggler.removeEventListener('click', this.onEyeToggle);

    this._controls = null;
    this._crosshair = null;
    this._sensorToggle = null;
    this._modeToggler = null;
    this._eyeToggler = null;
  }

  //------------------------------------------------------------------------------------
  // METHODS
  //------------------------------------------------------------------------------------

  public showControls() {
    this._controls.classList.add('shown');
  }

  public hideControls() {
    this._controls.classList.remove('shown');
  }

  public showSensorToggle() {
    this._sensorToggle.style.display = 'inline-block';
  }

  public setSensorToggleState(active: boolean) {
    if (active) {
      this._sensorToggle.classList.remove('icon_orientation_sensor');
      this._sensorToggle.classList.add('icon_orientation_drag');
    } else {
      this._sensorToggle.classList.remove('icon_orientation_drag');
      this._sensorToggle.classList.add('icon_orientation_sensor');
    }
  }

  public onSensorToggle(event: MouseEvent) {
    const active = this._player.mode.toggleSensor();
    this.setSensorToggleState(active);
  }

  public setModeToggleState(mode: Mode) {
    if (mode instanceof PanoramaMode) {
      this._crosshair.style.display = 'none';
      this._eyeToggler.style.display = 'none';
      this._modeToggler.classList.remove('icon_panorama');
      this._modeToggler.classList.add('icon_vr');
    } else {
      this._crosshair.style.display = 'block';
      this._eyeToggler.style.display = 'inline-block';
      this._modeToggler.classList.remove('icon_vr');
      this._modeToggler.classList.add('icon_panorama');
    }
  }

  public onModeToggle(event: MouseEvent) {
    const mode = this._player.toggleMode();
    this.setModeToggleState(mode);
  }

  public setEyeToggleState(eye: 'left' | 'right') {
    if (eye === 'left') {
      this._crosshair.style.left = (document.documentElement.clientWidth / 4) + 'px';
      this._eyeToggler.classList.remove('icon_eye_right');
      this._eyeToggler.classList.add('icon_eye_left');
    } else {
      this._crosshair.style.left = (document.documentElement.clientWidth / 4 * 3) + 'px';
      this._eyeToggler.classList.remove('icon_eye_left');
      this._eyeToggler.classList.add('icon_eye_right');
    }
  }

  public onEyeToggle(event: MouseEvent) {
    const eye = (<StereoscopicMode>this._player.mode).toggleEye();
    this.setEyeToggleState(eye);
  }
}