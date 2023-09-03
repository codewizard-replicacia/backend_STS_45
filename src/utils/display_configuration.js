export const busViewConfig = {
Details: [
    {
      key: "BusId",
      value: "Id",
      type: "text",
      editable: false,
      required: true
    },
    {
      key: "BusNumber",
      value: "Bus Number",
      type: "text",
      editable: false,
      required: true
    },
  ],
Type: [
    {
      key: "BusRoute",
      value: "Route Name",
      type: "lookup",
      editable: true,
      required: true
    },
  ],
}
export const routeViewConfig = {
Details: [
    {
      key: "RouteId",
      value: "Id",
      type: "text",
      editable: false,
      required: true
    },
    {
      key: "StartsAt",
      value: "Starts At",
      type: "text",
      editable: false,
      required: true
    },
    {
      key: "EndsAt",
      value: "Ends At",
      type: "text",
      editable: false,
      required: true
    },
    {
      key: "RouteName",
      value: "Route Name",
      type: "text",
      editable: false,
      required: true
    },
    {
      key: "TotalDistanceCovered",
      value: "Total Distance Covered",
      type: "text",
      editable: false,
      required: true
    },
    {
      key: "NumberOfStops",
      value: "Number Of Stops",
      type: "text",
      editable: false,
      required: true
    },
  ],
Type: [
  ],
}
export const driverViewConfig = {
Details: [
    {
      key: "DriverName",
      value: "Driver Name",
      type: "text",
      editable: false,
      required: true
    },
    {
      key: "DrivingLicenseNumber",
      value: "Driving License Number",
      type: "text",
      editable: false,
      required: true
    },
    {
      key: "ExperienceInYears",
      value: "Experience In Years",
      type: "text",
      editable: false,
      required: true
    },
    {
      key: "VerificationStatus",
      value: "Verification Status",
      type: "boolean",
      editable: false,
      required: true
    },
    {
      key: "ShiftTime",
      value: "Shift Time",
      type: "text",
      editable: false,
      required: true
    },
    {
      key: "LicenseExpiresAt",
      value: "License Expires At",
      type: "date",
      editable: false,
      required: true
    },
  ],
Type: [
    {
      key: "DriverBus",
      value: "Bus Company",
      type: "lookup",
      editable: true,
      required: true
    },
  ],
}
