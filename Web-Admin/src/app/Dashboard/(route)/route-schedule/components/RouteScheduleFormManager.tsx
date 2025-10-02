import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BulkRouteScheduleRequest, RouteScheduleRequest, RouteScheduleResponse } from '../types/routeScheduleTypes';
import { RouteResponse } from '../../routes/types/routeTypes';
import { RoutesApi } from '../../routes/services/api/routeApi';

interface RouteScheduleFormManagerProps {
  onSave: (data: BulkRouteScheduleRequest) => Promise<void>;
  editingSchedules?: RouteScheduleResponse[];
  mode?: 'create' | 'edit';
}

interface DaySchedule {
  day: string;
  label: string;
  startTime: string;
  endTime: string;
  selected: boolean;
}

const RouteScheduleFormManager: React.FC<RouteScheduleFormManagerProps> = ({
  onSave,
  editingSchedules = [],
  mode = 'create'
}) => {
  const [selectedRouteId, setSelectedRouteId] = useState<number>(0);
  const [useGlobalSchedule, setUseGlobalSchedule] = useState(true);
  const [globalStartTime, setGlobalStartTime] = useState('08:00');
  const [globalEndTime, setGlobalEndTime] = useState('18:00');
  const [daySchedules, setDaySchedules] = useState<DaySchedule[]>([
    { day: 'MONDAY', label: 'Lunes', startTime: '08:00', endTime: '18:00', selected: false },
    { day: 'TUESDAY', label: 'Martes', startTime: '08:00', endTime: '18:00', selected: false },
    { day: 'WEDNESDAY', label: 'Miércoles', startTime: '08:00', endTime: '18:00', selected: false },
    { day: 'THURSDAY', label: 'Jueves', startTime: '08:00', endTime: '18:00', selected: false },
    { day: 'FRIDAY', label: 'Viernes', startTime: '08:00', endTime: '18:00', selected: false },
    { day: 'SATURDAY', label: 'Sábado', startTime: '08:00', endTime: '18:00', selected: false },
    { day: 'SUNDAY', label: 'Domingo', startTime: '08:00', endTime: '18:00', selected: false }
  ]);
  const [routes, setRoutes] = useState<RouteResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRoutes, setIsLoadingRoutes] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    const loadRoutes = async () => {
      try {
        const response = await RoutesApi.getAllRoutes();
        if (response.success && response.data) {
          setRoutes(response.data);
        }
      } catch (error) {
        console.error('Error loading routes:', error);
      } finally {
        setIsLoadingRoutes(false);
      }
    };

    loadRoutes();
  }, []);

  useEffect(() => {
    if (editingSchedules && mode === 'edit' && editingSchedules.length > 0) {
      const firstSchedule = editingSchedules[0];
      setSelectedRouteId(firstSchedule.routeId);

      // Marcar días seleccionados y sus horarios
      const updatedDaySchedules = daySchedules.map(daySchedule => {
        const matchingSchedule = editingSchedules.find(s => s.dayOfWeek.toUpperCase() === daySchedule.day);
        if (matchingSchedule) {
          return {
            ...daySchedule,
            selected: true,
            startTime: matchingSchedule.startTime.substring(0, 5),
            endTime: matchingSchedule.endTime.substring(0, 5)
          };
        }
        return daySchedule;
      });

      setDaySchedules(updatedDaySchedules);

      // Verificar si todos los días tienen el mismo horario
      const selectedSchedules = editingSchedules;
      if (selectedSchedules.length > 1) {
        const firstStartTime = selectedSchedules[0].startTime;
        const firstEndTime = selectedSchedules[0].endTime;
        const allSame = selectedSchedules.every(s =>
          s.startTime === firstStartTime && s.endTime === firstEndTime
        );

        if (allSame) {
          setUseGlobalSchedule(true);
          setGlobalStartTime(firstStartTime.substring(0, 5));
          setGlobalEndTime(firstEndTime.substring(0, 5));
        } else {
          setUseGlobalSchedule(false);
        }
      }
    }
  }, [editingSchedules, mode]);

  const handleDayToggle = (dayIndex: number) => {
    const updatedSchedules = [...daySchedules];
    updatedSchedules[dayIndex].selected = !updatedSchedules[dayIndex].selected;
    setDaySchedules(updatedSchedules);
  };

  const handleDayTimeChange = (dayIndex: number, field: 'startTime' | 'endTime', value: string) => {
    const updatedSchedules = [...daySchedules];
    updatedSchedules[dayIndex][field] = value;
    setDaySchedules(updatedSchedules);
  };

  const handleSave = async () => {
    const newErrors: string[] = [];

    if (!selectedRouteId) {
      newErrors.push('Debe seleccionar una ruta');
    }

    const selectedDays = daySchedules.filter(d => d.selected);
    if (selectedDays.length === 0) {
      newErrors.push('Debe seleccionar al menos un día de la semana');
    }

    // Validar horarios
    if (useGlobalSchedule) {
      if (!globalStartTime) {
        newErrors.push('Debe seleccionar la hora de inicio');
      }
      if (!globalEndTime) {
        newErrors.push('Debe seleccionar la hora de fin');
      }
    } else {
      selectedDays.forEach(day => {
        if (!day.startTime) {
          newErrors.push(`Debe seleccionar la hora de inicio para ${day.label}`);
        }
        if (!day.endTime) {
          newErrors.push(`Debe seleccionar la hora de fin para ${day.label}`);
        }
      });
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors([]);
    try {
      const schedules: RouteScheduleRequest[] = [];

      if (useGlobalSchedule) {
        // Crear un horario para cada día seleccionado con el horario global
        selectedDays.forEach(day => {
          schedules.push({
            routeId: selectedRouteId,
            dayOfWeek: day.day,
            startTime: globalStartTime + ':00',
            endTime: globalEndTime + ':00'
          });
        });
      } else {
        // Crear un horario para cada día con su horario individual
        selectedDays.forEach(day => {
          schedules.push({
            routeId: selectedRouteId,
            dayOfWeek: day.day,
            startTime: day.startTime + ':00',
            endTime: day.endTime + ':00'
          });
        });
      }

      await onSave({ schedules });
    } catch (error) {
      console.error('Error saving schedules:', error);
      setErrors(['Error al guardar los horarios']);
    } finally {
      setIsLoading(false);
    }
  };

  const daysOfWeek = [
    { value: 'MONDAY', label: 'Lunes' },
    { value: 'TUESDAY', label: 'Martes' },
    { value: 'WEDNESDAY', label: 'Miércoles' },
    { value: 'THURSDAY', label: 'Jueves' },
    { value: 'FRIDAY', label: 'Viernes' },
    { value: 'SATURDAY', label: 'Sábado' },
    { value: 'SUNDAY', label: 'Domingo' }
  ];

  return (
    <div className="w-full p-4 bg-zinc-900 text-white rounded-lg overflow-y-auto">
      <div className="space-y-6">
        {/* Route Selection */}
        <div className="w-full">
          <Label className="text-zinc-400">Ruta *</Label>
          <Select
            value={selectedRouteId.toString()}
            onValueChange={(value) => setSelectedRouteId(parseInt(value))}
            disabled={isLoadingRoutes}
          >
            <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
              <SelectValue placeholder="Selecciona una ruta" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-700">
              {routes.map((route) => (
                <SelectItem key={route.id} value={route.id!.toString()}>
                  {route.numberRoute} - {route.description || "Sin descripción"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Schedule Type Selection */}
        <div>
          <Label className="text-zinc-400">Tipo de Horario</Label>
          <div className="flex gap-4 mt-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="scheduleType"
                checked={useGlobalSchedule}
                onChange={() => setUseGlobalSchedule(true)}
                className="mr-2"
              />
              <span className="text-sm text-zinc-300">Horario global para todos los días</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="scheduleType"
                checked={!useGlobalSchedule}
                onChange={() => setUseGlobalSchedule(false)}
                className="mr-2"
              />
              <span className="text-sm text-zinc-300">Horario individual por día</span>
            </label>
          </div>
        </div>

        {/* Day Selection */}
        <div>
          <Label className="text-zinc-400">Días de la Semana *</Label>
          <div className="grid grid-cols-2 gap-3 mt-3">
            {daySchedules.map((daySchedule, index) => (
              <label
                key={daySchedule.day}
                className={`
                  flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all duration-200
                  ${daySchedule.selected
                    ? "bg-emerald-600/20 border-emerald-500 text-emerald-100"
                    : "bg-zinc-800 border-zinc-600 text-zinc-300 hover:bg-zinc-700 hover:border-zinc-500"
                  }
                `}
              >
                <input
                  type="checkbox"
                  checked={daySchedule.selected}
                  onChange={() => handleDayToggle(index)}
                  className="sr-only"
                />
                <div
                  className={`
                  w-5 h-5 rounded border-2 mr-3 flex items-center justify-center transition-all duration-200
                  ${daySchedule.selected
                      ? "bg-emerald-500 border-emerald-500"
                      : "border-zinc-400"
                    }
                `}
                >
                  {daySchedule.selected && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                <span className="text-sm font-medium">{daySchedule.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Time Selection */}
        {useGlobalSchedule ? (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-zinc-400">Hora de Inicio Global *</Label>
              <Input
                type="time"
                value={globalStartTime}
                onChange={(e) => setGlobalStartTime(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
            <div>
              <Label className="text-zinc-400">Hora de Fin Global *</Label>
              <Input
                type="time"
                value={globalEndTime}
                onChange={(e) => setGlobalEndTime(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <Label className="text-zinc-400">Horarios Individuales *</Label>
            {daySchedules.filter(d => d.selected).map((daySchedule, index) => (
              <div key={daySchedule.day} className="grid grid-cols-3 gap-4 items-center p-3 bg-zinc-800 rounded-lg">
                <span className="text-sm font-medium text-zinc-300">{daySchedule.label}</span>
                <Input
                  type="time"
                  value={daySchedule.startTime}
                  onChange={(e) => handleDayTimeChange(
                    daySchedules.findIndex(d => d.day === daySchedule.day),
                    'startTime',
                    e.target.value
                  )}
                  className="bg-zinc-700 border-zinc-600 text-white"
                  placeholder="Inicio"
                />
                <Input
                  type="time"
                  value={daySchedule.endTime}
                  onChange={(e) => handleDayTimeChange(
                    daySchedules.findIndex(d => d.day === daySchedule.day),
                    'endTime',
                    e.target.value
                  )}
                  className="bg-zinc-700 border-zinc-600 text-white"
                  placeholder="Fin"
                />
              </div>
            ))}
          </div>
        )}

        {/* Errors */}
        {errors.length > 0 && (
          <div className="bg-red-900/30 border border-red-500 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <svg
                className="w-5 h-5 text-red-400 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <h3 className="text-sm font-semibold text-red-200">
                Por favor complete los siguientes campos:
              </h3>
            </div>
            <ul className="space-y-2">
              {errors.map((error, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-red-400 mr-2 mt-1">•</span>
                  <span className="text-sm text-red-200">{error}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 border-zinc-700 text-white hover:bg-zinc-800 hover:text-gray-100"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            {isLoading
              ? "Guardando..."
              : mode === "create"
                ? "Crear Horario"
                : "Actualizar Horario"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RouteScheduleFormManager;