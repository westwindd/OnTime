// src/models/TimeSlot.ts

export class TimeSlot {
    public startTime: Date;
    public endTime: Date;
  
    constructor(startTime: Date, endTime: Date) {
      this.startTime = startTime;
      this.endTime = endTime;
    }
  
    public getDurationInMinutes(): number {
      const durationMs = this.endTime.getTime() - this.startTime.getTime();
      return durationMs / (1000 * 60);
    }
  
    public overlapsWith(other: TimeSlot): boolean {
      return this.startTime < other.endTime && this.endTime > other.startTime;
    }
  }
  