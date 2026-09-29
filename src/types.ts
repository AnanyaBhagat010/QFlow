export type ServiceCenterId = 'rto' | 'aadhaar' | 'bank' | 'municipal' | 'hospital' | 'railway';

export type ServiceStatus = 'normal' | 'moderate' | 'critical';

export interface DocumentRequirement {
  id: string;
  name: string;
  category: 'Identity Proof' | 'Address Proof' | 'Date of Birth Proof' | 'Medical / Fitness' | 'Financial & Tax' | 'Application Form' | 'Photographs / Biometrics' | 'Vehicle Documents';
  isMandatory: boolean;
  notes?: string;
  photocopyCount?: number;
  acceptedExamples?: string[];
}

export interface ServiceCenter {
  id: ServiceCenterId;
  name: string;
  type: string;
  address: string;
  isOpen: boolean;
  operatingHours: string;
  currentQueueLength: number;
  availableCounters: number;
  totalCounters: number;
  approxWaitTimeMinutes: number;
  crowdLevel: 'Low' | 'Moderate' | 'High' | 'Critical';
  status: ServiceStatus;
  services: ServiceCategory[];
}

export interface ServiceCategory {
  id: string;
  name: string;
  codePrefix: string;
  avgServiceMinutes: number;
  description: string;
  department?: string;
  officialFee?: string;
  processingTime?: string;
  requiredDocuments: DocumentRequirement[];
  instructions?: string[];
}

export type TokenStatus = 'WAITING' | 'APPROACHING' | 'SERVING' | 'COMPLETED' | 'CANCELLED';

export interface Token {
  id: string;
  tokenNumber: string; // e.g. "RTO-001"
  centerId: ServiceCenterId;
  centerName?: string;
  serviceId: string;
  serviceName: string;
  customerName: string;
  customerPhone: string;
  preferredTime?: string;
  status: TokenStatus;
  queuePosition: number;
  peopleAhead: number;
  estimatedWaitMinutes: number;
  estimatedServiceTime: string;
  createdAt: string;
  assignedCounterId?: number;
  assignedCounterName?: string;
  calledAt?: string;
  requiredDocuments?: DocumentRequirement[];
  readyDocumentIds?: string[];
}

export type CounterStatus = 'Serving' | 'Idle' | 'High Load' | 'Paused' | 'Closed';

export interface Counter {
  id: number;
  name: string; // e.g. "Counter 1"
  assignedServiceId: string;
  assignedServiceName: string;
  status: CounterStatus;
  currentTokenNumber?: string;
  customerName?: string;
  elapsedSeconds: number;
  utilizationRate: number; // percentage, e.g. 92%
  servedTodayCount: number;
  isOccupiedByIoT: boolean;
}

export type IoTDeviceType = 
  | 'entrance_counter' 
  | 'waiting_occupancy' 
  | 'queue_lidar' 
  | 'counter_sensor' 
  | 'footfall_inflow' 
  | 'exit_sensor';

export type DeviceStatus = 'ONLINE' | 'WARNING' | 'OFFLINE';

export interface IoTDevice {
  id: string;
  name: string;
  type: IoTDeviceType;
  location: string;
  status: DeviceStatus;
  currentReading: string;
  numericValue: number;
  unit: string;
  batteryPercentage: number;
  signalStrength: number; // 0-100%
  lastUpdate: string;
  isSimulated: boolean;
}

export interface AIRecommendation {
  id: string;
  title: string;
  serviceName: string;
  description: string;
  reason: string;
  activeCounters: number;
  recommendedAction: string;
  targetCounterId: number;
  targetAction: 'open' | 'reassign' | 'pause';
  expectedEffect: string;
  estimatedWaitReductionMinutes: number;
  applied: boolean;
  timestamp: string;
  priority: 'low' | 'medium' | 'high';
}

export interface CongestionAlert {
  id: string;
  time: string;
  location: string;
  severity: 'Critical' | 'Warning' | 'Moderate' | 'Normal';
  message: string;
  cause: string;
  recommendedAction: string;
  resolved: boolean;
}

export interface SMSNotification {
  id: string;
  timestamp: string;
  phoneNumber: string;
  message: string;
  type: 'creation' | 'approaching' | 'serving' | 'congestion' | 'cancellation';
  read: boolean;
}

export interface HeatmapZone {
  id: string;
  name: string;
  densityLevel: 'Low' | 'Moderate' | 'High' | 'Critical';
  occupancyPercentage: number;
  peopleCount: number;
  capacity: number;
  statusColor: string;
}

export interface AnalyticsDataPoint {
  time: string;
  footfall: number;
  inflow: number;
  outflow: number;
  queueLength: number;
  avgWaitMinutes: number;
  counterUtilization: number;
}
