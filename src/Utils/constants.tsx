export const requiredInfo = {
  title: { title: "Title", options: ["Mr", "Miss", "Mrs."] },
  status: {
    title: "Marital Status",
    options: ["Single", "Married"],
  },
  gender: {
    title: "Gender",
    options: ["Male", "Female"],
  },
};

export const studentInformation = {
  surname: {
    title: "Surname",
    type: "text",
    placeholder: "Type your surname here",
    required: true,
  },
  firstname: {
    title: "First Name",
    type: "text",
    placeholder: "Type your first name here",
    required: true,
  },
  othernames: {
    title: "Other Names",
    type: "text",
    placeholder: "Type your other names here",
    required: true,
  },
  email: {
    title: "Email",
    type: "email",
    placeholder: "Type your email here",
    required: true,
  },
  phone: {
    title: "Phone",
    type: "text",
    placeholder: "Type your mobile number here",
    required: true,
  },
  address: {
    title: "Address",
    type: "text",
    placeholder: "Type your address here",
    required: true,
  },
  nationality: {
    title: "Nationality",
    type: "text",
    placeholder: "Type your nationality here",
    required: true,
  },
  dob: {
    title: "Date of Birth",
    type: "date",
    placeholder: "dob",
    required: true,
  },
  placeOfBirth: {
    title: "Place of Birth",
    type: "text",
    placeholder: "Type your place of birth here",
    required: true,
  },
  religion: {
    title: "Religion",
    type: "text",
    placeholder: "Type your religion here",
    required: false,
  },
  emergencyContact: {
    title: "Emergency Contact Number",
    type: "phone",
    placeholder: "Type your contact number here",
    required: true,
  },
  emergencyContactName: {
    title: "Emergency Contact Name",
    type: "text",
    placeholder: "Type emergency contact name",
    required: true,
  },
  emergencyContactRelationship: {
    title: "Emergency Contact Relationship",
    type: "text",
    placeholder: "Type relationship eg. Mother, Father",
    required: true,
  },
  emergencyContactContact: {
    title: "Emergency Contact Name",
    type: "phone",
    placeholder: "Type contac",
    required: true,
  },
};

export const examsType = [
  "WASSCE",
  "SSCE",
  "O'LEVEL",
  "A'LEVEL",
  "ABCE",
  "POST DIPLOMA",
];


export const subjects = [
  "English",
  "Mathematics",
  "Kiswahili",
  "Biology",
  "Chemistry",
  "Physics",
]

export const gradeOptions = ["A1", "B2", "B3", "C4", "C5", "C6", "D7", "E8", "F9"];

// Utils/constants.ts
export const validationRules:any = {
  examinationTitle: /^[a-zA-Z\s]+$/,
  monthYear: /^(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4}$/,
  indexNumber: /^\d+$/,
  subject: /^[a-zA-Z\s]+$/,
};