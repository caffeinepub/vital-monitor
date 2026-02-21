import List "mo:core/List";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Runtime "mo:core/Runtime";

actor {
  type BloodPressure = {
    systolic : Nat;
    diastolic : Nat;
  };

  type HealthMetric = {
    timestamp : Time.Time;
    heartRate : Nat;
    bloodPressure : BloodPressure;
    hypertensionRisk : Bool;
  };

  type MovementAnomaly = {
    timestamp : Time.Time;
    description : Text;
  };

  type AlarmEvent = {
    timestamp : Time.Time;
    message : Text;
  };

  let healthMetrics = List.empty<HealthMetric>();
  let movementAnomalies = List.empty<MovementAnomaly>();
  let alarmEvents = List.empty<AlarmEvent>();

  public shared ({ caller }) func addHealthMetric(heartRate : Nat, systolic : Nat, diastolic : Nat, hypertensionRisk : Bool) : async () {
    if (heartRate == 0 or systolic == 0 or diastolic == 0) {
      Runtime.trap("Invalid health metric data");
    };

    let metric : HealthMetric = {
      timestamp = Time.now();
      heartRate;
      bloodPressure = { systolic; diastolic };
      hypertensionRisk;
    };

    healthMetrics.add(metric);
  };

  public shared ({ caller }) func reportMovementAnomaly(description : Text) : async () {
    if (description.size() == 0) {
      Runtime.trap("Description cannot be empty");
    };

    let anomaly : MovementAnomaly = {
      timestamp = Time.now();
      description;
    };

    movementAnomalies.add(anomaly);
  };

  public shared ({ caller }) func triggerAlarm(message : Text) : async () {
    if (message.size() == 0) {
      Runtime.trap("Alarm message cannot be empty");
    };

    let alarm : AlarmEvent = {
      timestamp = Time.now();
      message;
    };

    alarmEvents.add(alarm);
  };

  public query ({ caller }) func getHealthMetrics(startTime : Int, endTime : Int) : async [HealthMetric] {
    if (endTime <= startTime) {
      Runtime.trap("End time must be after start time");
    };

    healthMetrics.filter(
      func(metric) {
        metric.timestamp >= startTime and metric.timestamp <= endTime
      }
    ).toArray();
  };

  public query ({ caller }) func getMovementAnomalies(startTime : Int, endTime : Int) : async [MovementAnomaly] {
    if (endTime <= startTime) {
      Runtime.trap("End time must be after start time");
    };

    movementAnomalies.filter(
      func(anomaly) {
        anomaly.timestamp >= startTime and anomaly.timestamp <= endTime
      }
    ).toArray();
  };

  public query ({ caller }) func getAlarmEvents(startTime : Int, endTime : Int) : async [AlarmEvent] {
    if (endTime <= startTime) {
      Runtime.trap("End time must be after start time");
    };

    alarmEvents.filter(
      func(event) {
        event.timestamp >= startTime and event.timestamp <= endTime
      }
    ).toArray();
  };
};
