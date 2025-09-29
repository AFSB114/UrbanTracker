export interface RouteSchedule {
  id: number;
  routeId: number;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RouteScheduleRequest {
  routeId: number;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
}

export interface RouteScheduleResponse {
  id: number;
  routeId: number;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BulkRouteScheduleRequest {
  schedules: RouteScheduleRequest[];
}