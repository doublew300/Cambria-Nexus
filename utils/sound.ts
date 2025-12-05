// Simple synthesized sound effects using Web Audio API
// No assets required!

class SoundManager {
    private ctx: AudioContext | null = null;
    private enabled: boolean = true;

    constructor() {
        if (typeof window !== 'undefined') {
            // Initialize on first user interaction to comply with browser policies
            window.addEventListener('click', () => this.init(), { once: true });
        }
    }

    private init() {
        if (!this.ctx && typeof window !== 'undefined') {
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            if (AudioContextClass) {
                this.ctx = new AudioContextClass();
            }
        }
    }

    public toggle(enabled: boolean) {
        this.enabled = enabled;
    }

    private createOscillator(type: OscillatorType, freq: number, duration: number, vol: number = 0.1) {
        if (!this.ctx || !this.enabled) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        gain.gain.setValueAtTime(vol, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);
    }

    public playClick() {
        // High pitched short blip
        this.createOscillator('sine', 800, 0.05, 0.05);
    }

    public playHover() {
        // Very quiet low tick
        this.createOscillator('triangle', 200, 0.02, 0.01);
    }

    public playSuccess() {
        // Nice ascending major triad
        if (!this.ctx || !this.enabled) return;
        const now = this.ctx.currentTime;

        [440, 554, 659].forEach((freq, i) => {
            const osc = this.ctx!.createOscillator();
            const gain = this.ctx!.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + i * 0.1);

            gain.gain.setValueAtTime(0.05, now + i * 0.1);
            gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.3);

            osc.connect(gain);
            gain.connect(this.ctx!.destination);

            osc.start(now + i * 0.1);
            osc.stop(now + i * 0.1 + 0.3);
        });
    }

    public playError() {
        // Low buzzing error
        this.createOscillator('sawtooth', 150, 0.2, 0.05);
    }

    public playTab() {
        // Quick "whoosh" / high tech slide
        if (!this.ctx || !this.enabled) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.frequency.setValueAtTime(600, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.1);

        gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.1);
    }

    public playType() {
        // Mechanical key click
        this.createOscillator('square', 400, 0.03, 0.02);
    }

    public playConfirm() {
        // Stronger success sound
        if (!this.ctx || !this.enabled) return;
        const now = this.ctx.currentTime;
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => { // C Major 7
            const osc = this.ctx!.createOscillator();
            const gain = this.ctx!.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now + i * 0.05);
            gain.gain.setValueAtTime(0.05, now + i * 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.4);
            osc.connect(gain);
            gain.connect(this.ctx!.destination);
            osc.start(now + i * 0.05);
            osc.stop(now + i * 0.05 + 0.4);
        });
    }
}

export const soundManager = new SoundManager();
