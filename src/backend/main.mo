import List "mo:core/List";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";

actor {
  type Time = {
    hour : Nat8; // 0 - 23
    minute : Nat8; // 0 - 59
  };

  type MedicineOrder = {
    id : Nat;
    patientName : Text;
    mobileNumber : Text;
    prescriptionFileUrl : ?Text;
    deliveryDate : Text;
    deliveryTime : Time;
    deliveryTimingPreference : Text;
    fullAddress : Text;
  };

  type PathologyBooking = {
    id : Nat;
    patientName : Text;
    mobileNumber : Text;
    selectedTests : [Text];
    date : Text;
    time : Time;
    sampleCollectionType : Text;
  };

  type UltrasoundBooking = {
    id : Nat;
    patientName : Text;
    mobileNumber : Text;
    selectedService : Text;
    date : Text;
    time : Time;
  };

  type DoctorAppointment = {
    id : Nat;
    doctorName : Text;
    patientName : Text;
    mobileNumber : Text;
    appointmentDate : Text;
    appointmentTime : Time;
    reasonForVisit : Text;
  };

  module MedicineOrder {
    public func compareById(a : MedicineOrder, b : MedicineOrder) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  module PathologyBooking {
    public func compareById(a : PathologyBooking, b : PathologyBooking) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  module UltrasoundBooking {
    public func compareById(a : UltrasoundBooking, b : UltrasoundBooking) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  module DoctorAppointment {
    public func compareById(a : DoctorAppointment, b : DoctorAppointment) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  let medicineOrders = List.empty<MedicineOrder>();
  let pathologyBookings = List.empty<PathologyBooking>();
  let ultrasoundBookings = List.empty<UltrasoundBooking>();
  let doctorAppointments = List.empty<DoctorAppointment>();

  var nextMedicineOrderId = 1;
  var nextPathologyBookingId = 1;
  var nextUltrasoundBookingId = 1;
  var nextDoctorAppointmentId = 1;

  public shared ({ caller }) func submitMedicineOrder(
    patientName : Text,
    mobileNumber : Text,
    prescriptionFileUrl : ?Text,
    deliveryDate : Text,
    deliveryTime : Time,
    deliveryTimingPreference : Text,
    fullAddress : Text,
  ) : async Nat {
    let order : MedicineOrder = {
      id = nextMedicineOrderId;
      patientName;
      mobileNumber;
      prescriptionFileUrl;
      deliveryDate;
      deliveryTime;
      deliveryTimingPreference;
      fullAddress;
    };
    medicineOrders.add(order);
    nextMedicineOrderId += 1;
    order.id;
  };

  public shared ({ caller }) func submitPathologyBooking(
    patientName : Text,
    mobileNumber : Text,
    selectedTests : [Text],
    date : Text,
    time : Time,
    sampleCollectionType : Text,
  ) : async Nat {
    if (selectedTests.size() == 0) { Runtime.trap("At least one test must be selected.") };
    let booking : PathologyBooking = {
      id = nextPathologyBookingId;
      patientName;
      mobileNumber;
      selectedTests;
      date;
      time;
      sampleCollectionType;
    };
    pathologyBookings.add(booking);
    nextPathologyBookingId += 1;
    booking.id;
  };

  public shared ({ caller }) func submitUltrasoundBooking(
    patientName : Text,
    mobileNumber : Text,
    selectedService : Text,
    date : Text,
    time : Time,
  ) : async Nat {
    let booking : UltrasoundBooking = {
      id = nextUltrasoundBookingId;
      patientName;
      mobileNumber;
      selectedService;
      date;
      time;
    };
    ultrasoundBookings.add(booking);
    nextUltrasoundBookingId += 1;
    booking.id;
  };

  public shared ({ caller }) func submitDoctorAppointment(
    doctorName : Text,
    patientName : Text,
    mobileNumber : Text,
    appointmentDate : Text,
    appointmentTime : Time,
    reasonForVisit : Text,
  ) : async Nat {
    let appointment : DoctorAppointment = {
      id = nextDoctorAppointmentId;
      doctorName;
      patientName;
      mobileNumber;
      appointmentDate;
      appointmentTime;
      reasonForVisit;
    };
    doctorAppointments.add(appointment);
    nextDoctorAppointmentId += 1;
    appointment.id;
  };

  public query ({ caller }) func getMedicineOrders() : async [MedicineOrder] {
    medicineOrders.toArray().sort(MedicineOrder.compareById);
  };

  public query ({ caller }) func getPathologyBookings() : async [PathologyBooking] {
    pathologyBookings.toArray().sort(PathologyBooking.compareById);
  };

  public query ({ caller }) func getUltrasoundBookings() : async [UltrasoundBooking] {
    ultrasoundBookings.toArray().sort(UltrasoundBooking.compareById);
  };

  public query ({ caller }) func getDoctorAppointments() : async [DoctorAppointment] {
    doctorAppointments.toArray().sort(DoctorAppointment.compareById);
  };
};
