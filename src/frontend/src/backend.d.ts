import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface MovementAnomaly {
    description: string;
    timestamp: Time;
}
export interface HealthMetric {
    bloodPressure: BloodPressure;
    heartRate: bigint;
    timestamp: Time;
    hypertensionRisk: boolean;
}
export type Time = bigint;
export interface BloodPressure {
    systolic: bigint;
    diastolic: bigint;
}
export interface AlarmEvent {
    message: string;
    timestamp: Time;
}
export interface backendInterface {
    addHealthMetric(heartRate: bigint, systolic: bigint, diastolic: bigint, hypertensionRisk: boolean): Promise<void>;
    getAlarmEvents(startTime: bigint, endTime: bigint): Promise<Array<AlarmEvent>>;
    getHealthMetrics(startTime: bigint, endTime: bigint): Promise<Array<HealthMetric>>;
    getMovementAnomalies(startTime: bigint, endTime: bigint): Promise<Array<MovementAnomaly>>;
    reportMovementAnomaly(description: string): Promise<void>;
    triggerAlarm(message: string): Promise<void>;
}
