import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { 
  ServiceCenter, 
  ServiceCenterId, 
  Counter, 
  Token, 
  IoTDevice, 
  AIRecommendation, 
  CongestionAlert, 
  SMSNotification, 
  HeatmapZone,
  CounterStatus,
  TokenStatus
} from '../types';
import { 
  INITIAL_SERVICE_CENTERS, 
  INITIAL_IOT_DEVICES, 
  INITIAL_AI_RECOMMENDATION, 
  INITIAL_ALERTS, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_HEATMAP_ZONES 
} from '../data/mockData';
import {
  DEPARTMENT_PREFIXES,
  DEPARTMENT_NAMES,
  INITIAL_DEPARTMENT_COUNTERS,
  INITIAL_DEPARTMENT_QUEUES,
  INITIAL_USER_TOKENS
} from '../data/departmentData';

// Simple web audio chime generator for "Now Serving"
function playChime() {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;
    
    // First tone (E5 ~ 659Hz)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(659.25, now);
    gain1.gain.setValueAtTime(0.08, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.35);

    // Second tone (A5 ~ 880Hz)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(880, now + 0.15);
    gain2.gain.setValueAtTime(0.1, now + 0.15);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.15);
    osc2.stop(now + 0.6);
  } catch {
    // AudioContext might be blocked until user gesture, ignore silently
  }
}

interface SimulationState {
  footfall: number;
  queueLength: number;
  inflowRate: number;
  outflowRate: number;
  avgServiceMinutes: number;
  waitingOccupancy: number;
  isSimulating: boolean;
  simulationStep: number;
}

export interface QueueContextType {
  selectedCenterId: ServiceCenterId;
  setSelectedCenterId: (id: ServiceCenterId) => void;
  currentCenter: ServiceCenter;
  serviceCenters: ServiceCenter[];
  
  // Department-specific states
  departmentCounters: Record<ServiceCenterId, Counter[]>;
  departmentQueues: Record<ServiceCenterId, string[]>;
  counters: Counter[]; // Active department counters
  queueList: string[]; // Active department waiting queue
  currentlyServingTokens: { counterId: number; tokenNumber: string }[];
  
  // Multiple user tokens
  userTokens: Token[];
  userToken: Token | null; // Selected/active user token (backward compatibility)
  selectedUserTokenId: string | null;
  setSelectedUserTokenId: (tokenId: string) => void;
  getUserTokenForCenter: (centerId: ServiceCenterId) => Token | undefined;
  
  // Devices, AI, Alerts, Notifications
  iotDevices: IoTDevice[];
  aiRecommendations: AIRecommendation[];
  alerts: CongestionAlert[];
  notifications: SMSNotification[];
  heatmapZones: HeatmapZone[];
  simulation: SimulationState;
  predictedFootfallNext30m: number;
  predictedWaitMinutes: number;
  predictionConfidence: number;
  
  // Actions
  generateToken: (serviceId: string, name: string, phone: string, preferredTime?: string, readyDocIds?: string[]) => Token;
  toggleUserTokenDocument: (docId: string, tokenId?: string) => void;
  cancelTokenById: (tokenId: string) => void;
  cancelUserToken: () => void;
  refreshTokenById: (tokenId: string) => void;
  refreshUserToken: () => void;
  
  // Counter Operations (department aware)
  openCounter: (counterId: number, centerId?: ServiceCenterId) => void;
  closeCounter: (counterId: number, centerId?: ServiceCenterId) => void;
  pauseCounter: (counterId: number, centerId?: ServiceCenterId) => void;
  callNextToken: (counterId: number, centerId?: ServiceCenterId) => void;
  assignServiceToCounter: (counterId: number, serviceId: string, serviceName: string, centerId?: ServiceCenterId) => void;
  
  // AI & Alerts
  applyRecommendation: (recommendationId: string) => void;
  dismissRecommendation: (recommendationId: string) => void;
  resolveAlert: (alertId: string) => void;
  markNotificationsAsRead: () => void;
  addSMSNotification: (message: string, type?: SMSNotification['type']) => void;
  
  // Simulation Controls
  isSimulating: boolean;
  toggleSimulation: () => void;
  toggleAutoSimulation: () => void;
  increaseFootfall: () => void;
  increaseQueue: () => void;
  openAvailableCounter: () => void;
  triggerRushSpike: () => void;
  resetSimulation: () => void;
  resetToDefaultScenario: () => void;
  setSimulation: (updates: Partial<SimulationState> | SimulationState | ((prev: SimulationState) => SimulationState)) => void;
  setManualSimulation: (updates: Partial<SimulationState>) => void;
}

const QueueContext = createContext<QueueContextType | undefined>(undefined);

export const QueueProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to RTO so user immediately sees RTO queue & token as in user request
  const [selectedCenterId, setSelectedCenterId] = useState<ServiceCenterId>('rto');
  const [serviceCenters, setServiceCenters] = useState<ServiceCenter[]>(INITIAL_SERVICE_CENTERS);
  
  // Independent department counters & queues
  const [departmentCounters, setDepartmentCounters] = useState<Record<ServiceCenterId, Counter[]>>(INITIAL_DEPARTMENT_COUNTERS);
  const [departmentQueues, setDepartmentQueues] = useState<Record<ServiceCenterId, string[]>>(INITIAL_DEPARTMENT_QUEUES);
  
  // Department-specific token sequence numbers (RTO starts at 2 since RTO-001 is booked initially, others start at 1)
  const [departmentTokenSeq, setDepartmentTokenSeq] = useState<Record<ServiceCenterId, number>>({
    rto: 2,
    aadhaar: 1,
    bank: 1,
    municipal: 1,
    hospital: 1,
    railway: 1,
  });

  // Multiple user tokens held simultaneously
  const [userTokens, setUserTokens] = useState<Token[]>(INITIAL_USER_TOKENS);
  const [selectedUserTokenId, setSelectedUserTokenId] = useState<string | null>(
    INITIAL_USER_TOKENS[0]?.id || null
  );

  const [iotDevices, setIotDevices] = useState<IoTDevice[]>(INITIAL_IOT_DEVICES);
  const [aiRecommendations, setAiRecommendations] = useState<AIRecommendation[]>([INITIAL_AI_RECOMMENDATION]);
  const [alerts, setAlerts] = useState<CongestionAlert[]>(INITIAL_ALERTS);
  const [notifications, setNotifications] = useState<SMSNotification[]>(INITIAL_NOTIFICATIONS);
  const [heatmapZones, setHeatmapZones] = useState<HeatmapZone[]>(INITIAL_HEATMAP_ZONES);

  // Simulation parameters
  const [simulation, setSimulation] = useState<SimulationState>({
    footfall: 186,
    queueLength: 34,
    inflowRate: 21,
    outflowRate: 14,
    avgServiceMinutes: 6,
    waitingOccupancy: 72,
    isSimulating: false,
    simulationStep: 0,
  });

  const currentCenter = useMemo(() => {
    return serviceCenters.find(c => c.id === selectedCenterId) || serviceCenters[0];
  }, [serviceCenters, selectedCenterId]);

  // Current department counters
  const counters = useMemo(() => {
    return departmentCounters[selectedCenterId] || INITIAL_DEPARTMENT_COUNTERS[selectedCenterId] || [];
  }, [departmentCounters, selectedCenterId]);

  // Current department queue
  const queueList = useMemo(() => {
    return departmentQueues[selectedCenterId] || [];
  }, [departmentQueues, selectedCenterId]);

  // Active counters count for current center
  const activeCountersCount = useMemo(() => {
    return counters.filter(c => c.status === 'Serving' || c.status === 'High Load').length;
  }, [counters]);

  // UserToken: currently selected or first active token
  const userToken = useMemo(() => {
    if (selectedUserTokenId) {
      const found = userTokens.find(t => t.id === selectedUserTokenId);
      if (found) return found;
    }
    const active = userTokens.find(t => t.status !== 'CANCELLED' && t.status !== 'COMPLETED');
    return active || userTokens[0] || null;
  }, [userTokens, selectedUserTokenId]);

  // Helper to get token for a specific center
  const getUserTokenForCenter = useCallback((centerId: ServiceCenterId) => {
    return userTokens.find(t => t.centerId === centerId && t.status !== 'CANCELLED');
  }, [userTokens]);

  // Prediction calculations based on math model
  const predictedWaitMinutes = useMemo(() => {
    const active = Math.max(1, activeCountersCount);
    const queueLen = queueList.length || simulation.queueLength;
    const rawWait = Math.round((queueLen * (currentCenter.services[0]?.avgServiceMinutes || 6)) / active);
    return Math.max(2, rawWait);
  }, [queueList.length, simulation.queueLength, currentCenter, activeCountersCount]);

  const predictedFootfallNext30m = useMemo(() => {
    const netFlow = simulation.inflowRate - simulation.outflowRate;
    return Math.round(simulation.footfall + Math.max(10, netFlow * 3.2));
  }, [simulation.footfall, simulation.inflowRate, simulation.outflowRate]);

  const predictionConfidence = useMemo(() => {
    const netFlow = Math.abs(simulation.inflowRate - simulation.outflowRate);
    return Math.min(94, Math.max(76, 92 - Math.floor(netFlow / 3)));
  }, [simulation.inflowRate, simulation.outflowRate]);

  // Notification helper
  const addSMSNotification = useCallback((message: string, type: SMSNotification['type'] = 'congestion') => {
    const newNotif: SMSNotification = {
      id: `notif-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      phoneNumber: userToken?.customerPhone || '+1 (555) 349-2810',
      message,
      type,
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  }, [userToken]);

  // Open counter
  const openCounter = useCallback((counterId: number, centerId?: ServiceCenterId) => {
    const targetCenterId = centerId || selectedCenterId;
    const deptName = DEPARTMENT_NAMES[targetCenterId] || targetCenterId;

    setDepartmentCounters(prev => {
      const list = prev[targetCenterId] || [];
      const updated = list.map(c => {
        if (c.id === counterId) {
          const prefix = DEPARTMENT_PREFIXES[targetCenterId] || 'Q';
          return {
            ...c,
            status: 'Serving' as CounterStatus,
            currentTokenNumber: c.currentTokenNumber || `${prefix}-01${counterId}`,
            isOccupiedByIoT: true,
            utilizationRate: Math.max(65, c.utilizationRate)
          };
        }
        return c;
      });
      return { ...prev, [targetCenterId]: updated };
    });

    addSMSNotification(`[${deptName}] Counter ${counterId} has been opened and activated.`, 'congestion');
  }, [selectedCenterId, addSMSNotification]);

  // Close counter
  const closeCounter = useCallback((counterId: number, centerId?: ServiceCenterId) => {
    const targetCenterId = centerId || selectedCenterId;
    setDepartmentCounters(prev => {
      const list = prev[targetCenterId] || [];
      const updated = list.map(c => {
        if (c.id === counterId) {
          return {
            ...c,
            status: 'Closed' as CounterStatus,
            currentTokenNumber: undefined,
            isOccupiedByIoT: false,
            utilizationRate: 0
          };
        }
        return c;
      });
      return { ...prev, [targetCenterId]: updated };
    });
  }, [selectedCenterId]);

  // Pause counter
  const pauseCounter = useCallback((counterId: number, centerId?: ServiceCenterId) => {
    const targetCenterId = centerId || selectedCenterId;
    setDepartmentCounters(prev => {
      const list = prev[targetCenterId] || [];
      const updated = list.map(c => {
        if (c.id === counterId) {
          const nextStatus: CounterStatus = c.status === 'Paused' ? 'Serving' : 'Paused';
          return { ...c, status: nextStatus };
        }
        return c;
      });
      return { ...prev, [targetCenterId]: updated };
    });
  }, [selectedCenterId]);

  // Call next token: Advances THAT department's queue ONLY and updates matching user token!
  const callNextToken = useCallback((counterId: number, centerId?: ServiceCenterId) => {
    const targetCenterId = centerId || selectedCenterId;
    const deptName = DEPARTMENT_NAMES[targetCenterId] || targetCenterId;
    const prefix = DEPARTMENT_PREFIXES[targetCenterId] || 'Q';
    
    playChime();

    let calledTokenNumber = '';

    // 1. Advance the specific department's queue
    setDepartmentQueues(prev => {
      const queue = prev[targetCenterId] || [];
      if (queue.length > 0) {
        calledTokenNumber = queue[0];
        return {
          ...prev,
          [targetCenterId]: queue.slice(1)
        };
      }
      // If queue is empty, generate next sequential number
      const fallbackNum = Math.floor(Math.random() * 20) + 20;
      calledTokenNumber = `${prefix}-${String(fallbackNum).padStart(3, '0')}`;
      return prev;
    });

    // 2. Update the counter for that department
    setDepartmentCounters(prev => {
      const list = prev[targetCenterId] || [];
      const updated = list.map(c => {
        if (c.id === counterId) {
          return {
            ...c,
            status: 'Serving' as CounterStatus,
            currentTokenNumber: calledTokenNumber,
            customerName: 'Citizen / Applicant',
            elapsedSeconds: 0,
            servedTodayCount: c.servedTodayCount + 1,
            isOccupiedByIoT: true,
          };
        }
        return c;
      });
      return { ...prev, [targetCenterId]: updated };
    });

    // 3. Update customer token status for THIS DEPARTMENT ONLY!
    setUserTokens(prevTokens => {
      return prevTokens.map(tok => {
        // Tokens for other departments are NEVER affected!
        if (tok.centerId !== targetCenterId) {
          return tok;
        }

        // Exact match with called token
        if (tok.tokenNumber === calledTokenNumber) {
          addSMSNotification(
            `[${deptName}] Token ${calledTokenNumber} is now being served at Counter ${counterId}! Please proceed to the counter immediately.`,
            'serving'
          );
          return {
            ...tok,
            status: 'SERVING' as TokenStatus,
            peopleAhead: 0,
            estimatedWaitMinutes: 0,
            assignedCounterId: counterId,
            assignedCounterName: `Counter ${counterId}`
          };
        } 
        // Token is in the same department waiting line
        else if (tok.status === 'WAITING' || tok.status === 'APPROACHING') {
          const newPeopleAhead = Math.max(0, tok.peopleAhead - 1);
          const isApproaching = newPeopleAhead <= 2 && newPeopleAhead > 0;
          const prevStatus = tok.status;

          if (isApproaching && prevStatus !== 'APPROACHING') {
            addSMSNotification(
              `[${deptName}] Your turn is approaching! Token ${tok.tokenNumber} has only ${newPeopleAhead} people ahead. Please get ready near Counter ${counterId}.`,
              'approaching'
            );
          }

          return {
            ...tok,
            peopleAhead: newPeopleAhead,
            estimatedWaitMinutes: Math.max(2, tok.estimatedWaitMinutes - 3),
            status: (newPeopleAhead === 0 ? 'APPROACHING' : isApproaching ? 'APPROACHING' : 'WAITING') as TokenStatus
          };
        }

        return tok;
      });
    });
  }, [selectedCenterId, addSMSNotification]);

  // Assign service to counter
  const assignServiceToCounter = useCallback((counterId: number, serviceId: string, serviceName: string, centerId?: ServiceCenterId) => {
    const targetCenterId = centerId || selectedCenterId;
    setDepartmentCounters(prev => {
      const list = prev[targetCenterId] || [];
      const updated = list.map(c => {
        if (c.id === counterId) {
          return {
            ...c,
            assignedServiceId: serviceId,
            assignedServiceName: serviceName
          };
        }
        return c;
      });
      return { ...prev, [targetCenterId]: updated };
    });
  }, [selectedCenterId]);

  // Apply AI recommendation
  const applyRecommendation = useCallback((recommendationId: string) => {
    setAiRecommendations(prev => prev.map(rec => {
      if (rec.id === recommendationId) {
        return { ...rec, applied: true };
      }
      return rec;
    }));

    const rec = aiRecommendations.find(r => r.id === recommendationId);
    if (rec) {
      if (rec.targetAction === 'open') {
        openCounter(rec.targetCounterId);
      }

      setAlerts(prev => prev.map(a => {
        if (a.id === 'ALT-101') {
          return { ...a, resolved: true };
        }
        return a;
      }));

      addSMSNotification(
        `AI Optimization Applied: ${rec.recommendedAction}. ${rec.expectedEffect}`,
        'congestion'
      );
    }
  }, [aiRecommendations, openCounter, addSMSNotification]);

  // Dismiss recommendation
  const dismissRecommendation = useCallback((recommendationId: string) => {
    setAiRecommendations(prev => prev.filter(r => r.id !== recommendationId));
  }, []);

  // Resolve alert
  const resolveAlert = useCallback((alertId: string) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, resolved: true } : a));
  }, []);

  // Mark all notifications read
  const markNotificationsAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  // Department-wise Token Generation (Customer can book multiple tokens simultaneously!)
  const generateToken = useCallback((
    serviceId: string, 
    name: string, 
    phone: string, 
    preferredTime?: string, 
    readyDocIds?: string[]
  ): Token => {
    const center = serviceCenters.find(c => c.id === selectedCenterId) || serviceCenters[0];
    const service = center.services.find(s => s.id === serviceId) || center.services[0];
    const prefix = DEPARTMENT_PREFIXES[selectedCenterId] || 'Q';
    const deptName = DEPARTMENT_NAMES[selectedCenterId] || center.name;

    // Department-specific sequence number (e.g. RTO-001, AD-001, CB-001)
    const seq = departmentTokenSeq[selectedCenterId] || 1;
    const tokenNumber = `${prefix}-${String(seq).padStart(3, '0')}`;

    // Advance sequence for this department
    setDepartmentTokenSeq(prev => ({
      ...prev,
      [selectedCenterId]: seq + 1
    }));

    const currentDeptQueue = departmentQueues[selectedCenterId] || [];
    const deptCounters = departmentCounters[selectedCenterId] || [];
    const activeDesks = Math.max(1, deptCounters.filter(c => c.status === 'Serving').length);

    const peopleAhead = Math.max(1, currentDeptQueue.length);
    const waitMins = Math.round((peopleAhead * (service.avgServiceMinutes || 6)) / activeDesks);

    const now = new Date();
    const serviceTimeDate = new Date(now.getTime() + waitMins * 60000);
    const estimatedServiceTime = serviceTimeDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newToken: Token = {
      id: `tok-${selectedCenterId}-${Date.now()}`,
      tokenNumber,
      centerId: selectedCenterId,
      centerName: deptName,
      serviceId: service.id,
      serviceName: service.name,
      customerName: name || 'Alex Mercer',
      customerPhone: phone || '+1 (555) 349-2810',
      preferredTime: preferredTime || 'Immediate',
      status: 'WAITING',
      queuePosition: peopleAhead + 1,
      peopleAhead,
      estimatedWaitMinutes: waitMins,
      estimatedServiceTime,
      createdAt: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      assignedCounterId: 1,
      assignedCounterName: 'Counter 1',
      requiredDocuments: service.requiredDocuments,
      readyDocumentIds: readyDocIds || []
    };

    // 1. Add ONLY to this department's waiting queue
    setDepartmentQueues(prev => ({
      ...prev,
      [selectedCenterId]: [...(prev[selectedCenterId] || []), tokenNumber]
    }));

    // 2. Add to user's held tokens WITHOUT overwriting or replacing other departments!
    setUserTokens(prev => {
      // Remove any previously cancelled token for the SAME department to keep clean, but keep all active tokens
      const filtered = prev.filter(t => !(t.centerId === selectedCenterId && t.status === 'CANCELLED'));
      return [...filtered, newToken];
    });

    setSelectedUserTokenId(newToken.id);

    // 3. Clear, department-specific SMS notification
    addSMSNotification(
      `[${deptName}] Token ${tokenNumber} confirmed for ${service.name}. Queue Pos: #${newToken.queuePosition}, Est. wait: ~${waitMins}m.`,
      'creation'
    );

    return newToken;
  }, [selectedCenterId, serviceCenters, departmentTokenSeq, departmentQueues, departmentCounters, addSMSNotification]);

  // Toggle document ready status on a specific token
  const toggleUserTokenDocument = useCallback((docId: string, tokenId?: string) => {
    setUserTokens(prev => {
      return prev.map(t => {
        const matches = tokenId ? t.id === tokenId : (selectedUserTokenId ? t.id === selectedUserTokenId : true);
        if (!matches) return t;

        const currentReady = t.readyDocumentIds || [];
        const updatedReady = currentReady.includes(docId)
          ? currentReady.filter(id => id !== docId)
          : [...currentReady, docId];

        return {
          ...t,
          readyDocumentIds: updatedReady
        };
      });
    });
  }, [selectedUserTokenId]);

  // Cancel an individual token by ID
  const cancelTokenById = useCallback((tokenId: string) => {
    setUserTokens(prev => {
      return prev.map(t => {
        if (t.id === tokenId) {
          addSMSNotification(`[${t.centerName || t.centerId}] Token ${t.tokenNumber} has been cancelled.`, 'cancellation');
          return { ...t, status: 'CANCELLED' as TokenStatus };
        }
        return t;
      });
    });
  }, [addSMSNotification]);

  // Cancel currently selected user token
  const cancelUserToken = useCallback(() => {
    if (selectedUserTokenId) {
      cancelTokenById(selectedUserTokenId);
    } else if (userTokens.length > 0) {
      cancelTokenById(userTokens[0].id);
    }
  }, [selectedUserTokenId, userTokens, cancelTokenById]);

  // Refresh an individual token by ID
  const refreshTokenById = useCallback((tokenId: string) => {
    setUserTokens(prev => {
      return prev.map(t => {
        if (t.id === tokenId && t.status !== 'COMPLETED' && t.status !== 'CANCELLED') {
          const newPeopleAhead = Math.max(0, t.peopleAhead - 1);
          const wait = Math.max(3, Math.round(newPeopleAhead * 3));
          return {
            ...t,
            peopleAhead: newPeopleAhead,
            estimatedWaitMinutes: wait,
            status: newPeopleAhead === 0 ? 'SERVING' : newPeopleAhead <= 2 ? 'APPROACHING' : 'WAITING'
          };
        }
        return t;
      });
    });
  }, []);

  // Refresh currently selected user token
  const refreshUserToken = useCallback(() => {
    if (selectedUserTokenId) {
      refreshTokenById(selectedUserTokenId);
    } else if (userTokens.length > 0) {
      refreshTokenById(userTokens[0].id);
    }
  }, [selectedUserTokenId, userTokens, refreshTokenById]);

  // Manual simulation state setter
  const setManualSimulation = useCallback((updates: Partial<SimulationState>) => {
    setSimulation(prev => ({ ...prev, ...updates }));
  }, []);

  // Reset to default scenario
  const resetToDefaultScenario = useCallback(() => {
    setSimulation({
      footfall: 186,
      queueLength: 34,
      inflowRate: 21,
      outflowRate: 14,
      avgServiceMinutes: 6,
      waitingOccupancy: 72,
      isSimulating: false,
      simulationStep: 0,
    });
    setDepartmentCounters(INITIAL_DEPARTMENT_COUNTERS);
    setDepartmentQueues(INITIAL_DEPARTMENT_QUEUES);
    setUserTokens(INITIAL_USER_TOKENS);
    setSelectedUserTokenId(INITIAL_USER_TOKENS[0]?.id || null);
    setAiRecommendations([INITIAL_AI_RECOMMENDATION]);
    setAlerts(INITIAL_ALERTS);
    setSelectedCenterId('rto');
  }, []);

  // Currently serving tokens for currently selected center
  const currentlyServingTokens = useMemo(() => {
    return counters
      .filter(c => c.status === 'Serving' && c.currentTokenNumber)
      .map(c => ({ counterId: c.id, tokenNumber: c.currentTokenNumber! }));
  }, [counters]);

  return (
    <QueueContext.Provider
      value={{
        selectedCenterId,
        setSelectedCenterId,
        currentCenter,
        serviceCenters,
        departmentCounters,
        departmentQueues,
        counters,
        queueList,
        currentlyServingTokens,
        userTokens,
        userToken,
        selectedUserTokenId,
        setSelectedUserTokenId,
        getUserTokenForCenter,
        iotDevices,
        aiRecommendations,
        alerts,
        notifications,
        heatmapZones,
        simulation,
        predictedFootfallNext30m,
        predictedWaitMinutes,
        predictionConfidence,
        generateToken,
        toggleUserTokenDocument,
        cancelTokenById,
        cancelUserToken,
        refreshTokenById,
        refreshUserToken,
        openCounter,
        closeCounter,
        pauseCounter,
        callNextToken,
        assignServiceToCounter,
        applyRecommendation,
        dismissRecommendation,
        resolveAlert,
        markNotificationsAsRead,
        addSMSNotification,
        toggleAutoSimulation: () => setSimulation(p => ({ ...p, isSimulating: !p.isSimulating })),
        toggleSimulation: () => setSimulation(p => ({ ...p, isSimulating: !p.isSimulating })),
        isSimulating: simulation.isSimulating,
        increaseFootfall: () => setSimulation(p => ({ ...p, footfall: p.footfall + 20 })),
        increaseQueue: () => {
          const prefix = DEPARTMENT_PREFIXES[selectedCenterId] || 'Q';
          const tok = `${prefix}-${Math.floor(Math.random() * 50) + 100}`;
          setDepartmentQueues(prev => ({
            ...prev,
            [selectedCenterId]: [...(prev[selectedCenterId] || []), tok]
          }));
        },
        openAvailableCounter: () => {
          const idle = counters.find(c => c.status !== 'Serving');
          if (idle) openCounter(idle.id);
        },
        triggerRushSpike: () => {
          setSimulation(prev => ({
            ...prev,
            queueLength: prev.queueLength + 15,
            waitingOccupancy: Math.min(95, prev.waitingOccupancy + 15),
          }));
        },
        resetSimulation: resetToDefaultScenario,
        resetToDefaultScenario,
        setSimulation: (updates) => {
          if (typeof updates === 'function') {
            setSimulation(updates);
          } else {
            setSimulation(prev => ({ ...prev, ...updates }));
          }
        },
        setManualSimulation,
      }}
    >
      {children}
    </QueueContext.Provider>
  );
};

export function useQueue() {
  const context = useContext(QueueContext);
  if (!context) {
    throw new Error('useQueue must be used within a QueueProvider');
  }
  return context;
}
