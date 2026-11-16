import type {
  PaymentStatus,
  Registration,
  RegistrationFilters,
  RegistrationsResponse,
  RegistrationStatus,
  RegistrationType,
  Summary,
} from "../types/registration";

type Row = [
  string, // name
  string, // car
  string, // plate
  RegistrationType,
  RegistrationStatus,
  number, // fee
  number, // paid
];

const rows: Row[] = [
  ["Juan Dela Cruz", "Toyota Supra MK4", "ABC 1234", "Competitor", "Confirmed", 2500, 1000],
  ["Maria Santos", "Honda Civic Type R", "DEF 5678", "Exhibitor", "Confirmed", 1500, 1500],
  ["Pedro Reyes", "Nissan Skyline GT-R", "GHI 9012", "Competitor", "CheckedIn", 2500, 2500],
  ["Ana Garcia", "Mazda MX-5 Miata", "JKL 3456", "VIP", "Confirmed", 5000, 5000],
  ["Jose Ramos", "Subaru WRX STI", "MNO 7890", "Exhibitor", "Pending", 1500, 0],
  ["Liza Mendoza", "Mitsubishi Lancer Evo", "PQR 1357", "Competitor", "Pending", 2500, 0],
  ["Mark Villanueva", "Porsche 911 Carrera", "STU 2468", "VIP", "CheckedIn", 5000, 5000],
  ["Grace Aquino", "Ford Mustang GT", "VWX 3579", "Exhibitor", "Cancelled", 1500, 0],
  ["Carlo Bautista", "Chevrolet Camaro ZL1", "YZA 4680", "Competitor", "Confirmed", 2500, 2500],
  ["Rosa Flores", "Toyota AE86 Trueno", "BCD 5791", "Exhibitor", "CheckedIn", 1500, 1500],
  ["Eric Navarro", "BMW M3 E46", "EFG 6802", "VIP", "Pending", 5000, 2000],
  ["Joy Castillo", "Mercedes-Benz C63 AMG", "HIJ 7913", "Competitor", "Cancelled", 2500, 0],
  ["Noel Domingo", "Honda S2000", "KLM 8024", "Exhibitor", "Confirmed", 1500, 750],
  ["Tina Salazar", "Nissan 370Z", "NOP 9135", "Competitor", "CheckedIn", 2500, 2500],
  ["Ben Torres", "Lamborghini Huracan", "QRS 1246", "VIP", "Confirmed", 5000, 5000],
  ["Cathy Lopez", "Mazda RX-7 FD", "TUV 2357", "Exhibitor", "Pending", 1500, 500],
  ["Allan Mercado", "Toyota GR86", "WXY 3468", "Competitor", "Confirmed", 2500, 1250],
  ["Dina Pascual", "Volkswagen Golf GTI", "ZAB 4579", "Exhibitor", "CheckedIn", 1500, 1500],
  ["Rey Soriano", "Subaru BRZ", "CDE 5680", "Competitor", "Pending", 2500, 0],
  ["Mia Gonzales", "Ferrari 488 GTB", "FGH 6791", "VIP", "CheckedIn", 5000, 5000],
  ["Vic Hernandez", "Suzuki Swift Sport", "IJK 7802", "Exhibitor", "Cancelled", 1500, 0],
  ["Nina Cruz", "Honda Integra Type R", "LMN 8913", "Competitor", "Confirmed", 2500, 2500],
  ["Leo Fernandez", "Hyundai Veloster N", "OPQ 9024", "Exhibitor", "Confirmed", 1500, 1500],
  ["Sara Dizon", "Audi R8", "RST 1135", "VIP", "Pending", 5000, 0],
  ["Tony Rivera", "Dodge Challenger", "UVW 2246", "Competitor", "CheckedIn", 2500, 2000],
];

const addresses = [
  "Rizal St., Sorsogon City",
  "Magsaysay Ave., Bulan",
  "Burgos St., Irosin",
  "Del Rosario St., Gubat",
  "Quezon Ave., Pilar",
];

function getPaymentStatus(fee: number, paid: number): PaymentStatus {
  if (paid <= 0) return "Unpaid";
  if (paid >= fee) return "Paid";
  return "Partial";
}

const registrations: Registration[] = rows.map(
  ([name, car, plate, type, status, fee, paid], i) => ({
    id: `sample-${i + 1}`,
    registrationNumber: `CS27-${String(i + 1).padStart(4, "0")}`,
    registrationDate: new Date(Date.UTC(2027, 1, i + 1, 8, 30)).toISOString(),
    participantName: name,
    contactNumber: `0917123${String(4501 + i)}`,
    email: `${name.toLowerCase().replace(/ /g, ".")}@example.com`,
    address: `${100 + i} ${addresses[i % addresses.length]}`,
    carMakeModel: car,
    plateNumber: plate,
    registrationType: type,
    status,
    registrationFee: fee,
    amountPaid: paid,
    paymentStatus: getPaymentStatus(fee, paid),
  }),
);


function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getRegistrations(
  filters: RegistrationFilters,
): Promise<RegistrationsResponse> {
  await wait(400);
  let list = registrations;

  const name = filters.participantName.trim().toLowerCase();
  if (name) {
    list = list.filter((r) => r.participantName.toLowerCase().includes(name));
  }
  if (filters.type) {
    list = list.filter((r) => r.registrationType === filters.type);
  }
  if (filters.status) {
    list = list.filter((r) => r.status === filters.status);
  }

  const totalCount = list.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / filters.pageSize));
  const start = (filters.page - 1) * filters.pageSize;

  return {
    items: list.slice(start, start + filters.pageSize),
    page: filters.page,
    pageSize: filters.pageSize,
    totalCount,
    totalPages,
  };
}

export async function getSummary(): Promise<Summary> {
  await wait(400);

  const totalFees = registrations.reduce((sum, r) => sum + r.registrationFee, 0);
  const totalPayments = registrations.reduce((sum, r) => sum + r.amountPaid, 0);
  const count = (status: RegistrationStatus) =>
    registrations.filter((r) => r.status === status).length;

  return {
    totalRegistrations: registrations.length,
    confirmed: count("Confirmed"),
    checkedIn: count("CheckedIn"),
    pending: count("Pending"),
    cancelled: count("Cancelled"),
    totalFees,
    totalPayments,
    uncollectedPayments: totalFees - totalPayments,
  };
}
