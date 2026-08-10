export interface DoctorSlotProps {
  selectedDoctorId: string;
  onEditAction?: (roster: Roster) => void;
  onDeleteAction?: (rosterId: string) => void;
}

export interface DoctorInfo {
  doctor_name: string;
  doctor_image: string;
  consultation_fee: number;
  counselor_name: string;
  counselor_image: string | null;
  counselor_email: string;
}

export interface Slot {
  start_time: string;
  end_time: string;
  status: string;
}

export interface Roster {
  id: string;
  shifts: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  slot_durations: number;
  assign_doctor: string;
  doctor_info: DoctorInfo[];
  roster_list: Slot[];
}
