export default class Timer {
  private timeRemaining: number = 0;
  private intervalId: NodeJS.Timeout | null = null;
  private updateCallback: ((time: number) => void) | null = null;
  private endCallback: (() => void) | null = null;

  getTime(): number {
    return this.timeRemaining;
  }

  startTimer(time: number): void {
    this.timeRemaining = time;

    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.intervalId = setInterval(() => {
      this.timeRemaining--;

      if (this.updateCallback) {
        this.updateCallback(this.timeRemaining);
      }

      if (this.timeRemaining <= 0) {
        if (this.endCallback) {
          this.endCallback();
        }
        if (this.intervalId) {
          clearInterval(this.intervalId);
        }
      }
    }, 1000);
  }

  isTimerActive(): boolean {
    return this.intervalId !== null;
  }

  onUpdate(callback: (time: number) => void): void {
    this.updateCallback = callback;
  }

  onEnd(callback: () => void): void {
    this.endCallback = callback;
  }

  stopTimer(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  clearListeners(): void {
    this.updateCallback = null;
    this.endCallback = null;
  }
}
