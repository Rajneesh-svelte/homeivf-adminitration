'use client';
import {
  approveRequest,
  getChangeDoctorList,
  rejectRequest,
  getChangeDoctorDates,
  getChangeDoctorSlots,
} from '@/services/doctorlist';
import { useAuthStore } from '@/store/authStore';
import { ArrowRight, Check, CircleX, CrossIcon, FileText, Stethoscope } from 'lucide-react';
import { useEffect, useState } from 'react';
import patientpartner from '@/../public/avatars/patientpartner.png';
import Image from 'next/image';
import doctorchange from '@/../public/avatars/doctorchange.png';

const DoctorChange = () => {
  const { auth } = useAuthStore();
  const [requestList, setRequestedList] = useState<any>({ count: 0, results: [] });
  const [approveModal, setApproveModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);

  const [selectedRequest, setSelectedRequest] = useState({
    requestId: '',
    requestedDoctor: '',
    requestedDoctorId: '',
  });
  const [approveData, setApproveData] = useState({
    appointment_date: '',
    start_time: '',
    end_time: '',
  });

  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [availableSlots, setAvailableSlots] = useState<any[]>([]);

  useEffect(() => {
    const fetchDates = async () => {
      if (selectedRequest.requestId && approveModal && auth?.access) {
        try {
          const res = await getChangeDoctorDates(auth.access, selectedRequest.requestId);
          if (res?.success) {
            setAvailableDates(res.data.dates);
          }
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchDates();
  }, [selectedRequest.requestId, approveModal, auth?.access]);

  useEffect(() => {
    const fetchSlots = async () => {
      if (
        selectedRequest.requestId &&
        approveData.appointment_date &&
        approveModal &&
        auth?.access
      ) {
        try {
          const res = await getChangeDoctorSlots(
            auth.access,
            selectedRequest.requestId,
            approveData.appointment_date
          );
          if (res?.success) {
            setAvailableSlots(res.data.slots);
          } else {
            setAvailableSlots([]);
          }
        } catch (err) {
          console.log(err);
          setAvailableSlots([]);
        }
      } else {
        setAvailableSlots([]);
      }
    };
    fetchSlots();
  }, [selectedRequest.requestId, approveData.appointment_date, approveModal, auth?.access]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setApproveData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleApprove = async () => {
    if (auth?.access) {
      const data = {
        request_id: selectedRequest?.requestId,
        appointment_date: approveData.appointment_date,
        start_time: approveData.start_time,
        end_time: approveData.end_time,
      };
      try {
        await approveRequest(auth?.access, data);
        setApproveModal(false);
        window.location.reload();
      } catch (err) {
        console.log('Approved not requested');
      }
    }
  };

  const handleReject = async () => {
    if (auth?.access) {
      const data = {
        request_id: selectedRequest?.requestId,
      };
      try {
        await rejectRequest(auth?.access, data);
        setRejectModal(false);
        window.location.reload();
      } catch (err) {
        console.log('Approved not requested');
      }
    }
  };

  useEffect(() => {
    const fetchChangeDoctorList = async () => {
      if (auth?.access) {
        try {
          const res = await getChangeDoctorList(auth.access);
          setRequestedList(res);
        } catch (err) {
          console.error('Failed to fetch counselors');
        }
      }
    };
    fetchChangeDoctorList();
  }, [auth?.access]);

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex flex-col justify-between border-b border-border bg-background/50 px-7 py-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-5">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center text-primary-600">
            {/* <Stethoscope size={24} /> */}
            <Image src={doctorchange} alt="doctochange-icon" height={160} width={160} />
          </div>
          <div>
            <h1 className="text-[22px] font-bold tracking-tight text-foreground">
              Doctor Change Requests
            </h1>

            <p className="mt-1 text-sm font-medium text-foreground/60">
              Review and manage patient doctor change requests.
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-2.5 shadow-sm sm:mt-0">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-foreground/50">
              Total Requests
            </span>
            <span className="mt-0.5 text-xl font-black leading-none text-foreground">
              {requestList.count}
            </span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-300 border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="w-[14%] px-8 py-5 text-left text-[11px] font-semibold uppercase tracking-wider text-foreground/60">
                Patient
              </th>

              <th className="w-[14%] px-6 py-5 text-left text-[11px] font-semibold uppercase tracking-wider text-foreground/60">
                Requested On
              </th>

              <th className="w-[10%] px-6 py-5 text-left text-[11px] font-semibold uppercase tracking-wider text-foreground/60">
                UHID
              </th>

              <th className="w-[22%] px-6 py-5 text-left text-[11px] font-semibold uppercase tracking-wider text-foreground/60">
                Doctor Change
              </th>

              <th className="w-[22%] px-6 py-5 text-left text-[11px] font-semibold uppercase tracking-wider text-foreground/60">
                Reason
              </th>

              <th className="w-[9%] px-6 py-5 text-left text-[11px] font-semibold uppercase tracking-wider text-foreground/60">
                Status
              </th>

              <th className="w-[9%] px-6 py-5 text-center text-[11px] font-semibold uppercase tracking-wider text-foreground/60">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {requestList.count > 0 ? (
              requestList.results.map((item: any) => (
                <tr
                  key={item.request_id}
                  className="group transition-colors hover:bg-primary-50 dark:bg-primary-900/20 dark:hover:bg-primary-900/20 border-b border-border"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center bg-linear-to-t from-primary-400 to-card justify-center overflow-hidden rounded-full shadow-sm ring-2 ring-card">
                        <Image
                          alt="patient"
                          src={patientpartner}
                          width={48}
                          height={48}
                          className="h-11 w-11 object-contain p-0.5"
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-foreground">
                          {item.patient_name}
                        </p>
                        <p className="mt-1 max-w-25 truncate text-xs text-foreground/50">
                          ID: {item.patient_id}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-foreground">
                        {item.created_at
                          ? new Date(item.created_at).toLocaleDateString('en-GB', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })
                          : 'N/A'}
                      </span>
                      <span className="mt-1 text-xs font-medium text-foreground/60">
                        {item.created_at
                          ? new Date(item.created_at).toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                          : ''}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-6">
                    <span className="inline-flex whitespace-nowrap rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-bold tracking-wide text-foreground/90 shadow-xs">
                      {item.patient_uhid}
                    </span>
                  </td>

                  <td className="px-6 py-6">
                    <div className="flex items-center gap-2">
                      <div className="min-w-25 bg-[#f4d7f34d] dark:bg-pink-900/20 rounded-xl border border-[#f8d3f6] dark:border-pink-800/30 p-2.5 shadow-xs">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-pink-400/60">
                          Current
                        </p>
                        <p
                          className="mt-1 whitespace-nowrap text-xs font-bold text-pink-400 truncate"
                          title={item.current_doctor}
                        >
                          {item.current_doctor}
                        </p>
                      </div>

                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/40 shadow-sm ring-2 ring-card">
                        <ArrowRight size={12} strokeWidth={3} className="text-primary-600" />
                      </div>

                      <div className="min-w-25 rounded-xl border border-primary-200 dark:border-primary-800/50 bg-primary-50 dark:bg-primary-900/20 p-2.5 shadow-xs">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-primary-500">
                          Requested
                        </p>
                        <p
                          className="mt-1 whitespace-nowrap text-xs font-bold text-primary-800 dark:text-primary-300 truncate"
                          title={item.requested_doctor}
                        >
                          {item.requested_doctor}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-6">
                    <p title={item.reason} className="max-w-50 text-sm leading-5 text-foreground/80">
                      {item.reason}
                    </p>
                  </td>

                  <td className="px-6 py-6">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold shadow-xs border ${
                        item.status?.toLowerCase() === 'approved'
                          ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20'
                          : item.status?.toLowerCase() === 'rejected'
                          ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-500/20'
                          : 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/20'
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          item.status?.toLowerCase() === 'approved'
                            ? 'bg-emerald-500'
                            : item.status?.toLowerCase() === 'rejected'
                            ? 'bg-rose-500'
                            : 'bg-amber-500'
                        }`}
                      />
                      {item.status}
                    </span>
                  </td>

                  <td className="px-5 py-5">
                    {item.status?.toLowerCase() === 'pending' ? (
                      <div className="flex flex-col items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedRequest({
                              requestId: item.request_id,
                              requestedDoctor: item.requested_doctor,
                              requestedDoctorId: item?.requested_doctor_id,
                            });
                            setApproveData({ appointment_date: '', start_time: '', end_time: '' });
                            setApproveModal(true);
                          }}
                          className="flex w-24 items-center justify-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 transition hover:bg-emerald-100 dark:hover:bg-emerald-500/20 hover:text-emerald-800 dark:hover:text-emerald-300 hover:shadow-sm"
                        >
                          <Check size={14} strokeWidth={2.5} />
                          Approve
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setSelectedRequest({
                              requestId: item.request_id,
                              requestedDoctor: item.requested_doctor,
                              requestedDoctorId: item?.requested_doctor_id,
                            });
                            setRejectModal(true);
                          }}
                          className="flex w-24 items-center justify-center gap-1.5 rounded-lg border border-rose-200 bg-rose-50 dark:bg-rose-500/10 px-3 py-2 text-xs font-bold text-rose-600 dark:text-rose-400 transition hover:bg-rose-100 dark:hover:bg-rose-500/20 hover:text-rose-700 dark:hover:text-rose-300 hover:shadow-sm"
                        >
                          <CircleX size={14} strokeWidth={2.5} />
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="inline-flex items-center rounded-lg bg-background px-3 py-1.5 text-xs font-bold text-foreground/60 border border-border">
                        No action
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-24 text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-border bg-background">
                    <FileText size={32} strokeWidth={1.5} className="text-foreground/50" />
                  </div>

                  <h3 className="mt-5 text-base font-bold text-foreground">No requests pending</h3>

                  <p className="mx-auto mt-1 max-w-sm text-sm text-foreground/60">
                    You&apos;re all caught up! New doctor change requests from patients will appear
                    here.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {approveModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
            <div className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-card shadow-2xl">
              <div className="flex shrink-0 items-center justify-between border-b border-border px-6 py-5">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 dark:bg-primary-900/20">
                      <Stethoscope className="h-5 w-5 text-primary-600" />
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold text-foreground">
                        Approve Doctor Change
                      </h2>

                      <p className="mt-0.5 text-sm text-foreground/60">
                        Select an available slot and confirm the appointment.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setApproveModal(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground/50 transition hover:bg-background hover:text-foreground/80"
                >
                  <CrossIcon size={18} />
                </button>
              </div>

              <div className="grid min-h-0 flex-1 grid-cols-1 overflow-hidden lg:grid-cols-[0.9fr_1.1fr]">
                <div className="overflow-y-auto border-b border-border p-6 lg:border-b-0 lg:border-r">
                  <div className="space-y-6">
                    <div className="rounded-2xl border border-primary-100 dark:border-primary-800 bg-linear-to-br from-primary-50 to-card p-5 shadow-sm">
                      <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-primary-500">
                        Requested Doctor
                      </p>

                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-card shadow-sm ring-2 ring-primary-100">
                          <Stethoscope className="h-6 w-6 text-primary-500" />
                        </div>

                        <div>
                          <p className="text-lg font-black text-foreground">
                            {selectedRequest?.requestedDoctor}
                          </p>

                          <p className="text-xs font-medium text-foreground/60">
                            Doctor requested by Counsellor
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground/90">
                        Appointment Date
                      </label>

                      <select
                        name="appointment_date"
                        value={approveData.appointment_date}
                        onChange={handleChange}
                        className="h-11 w-full rounded-xl border border-border bg-card px-4 text-sm text-foreground/90 outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
                      >
                        <option value="">Select an available date</option>
                        {availableDates.map((date) => (
                          <option key={date} value={date}>
                            {date}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <label className="block text-sm font-medium text-foreground/90">
                          Appointment Time
                        </label>

                        {approveData.start_time && approveData.end_time && (
                          <span className="text-xs font-medium text-emerald-600">
                            Slot selected
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="mb-1.5 text-xs text-foreground/60">Start Time</p>

                          <input
                            type="time"
                            name="start_time"
                            value={approveData.start_time}
                            onKeyDown={(e) => e.preventDefault()}
                            onPaste={(e) => e.preventDefault()}
                            onDrop={(e) => e.preventDefault()}
                            readOnly
                            onChange={handleChange}
                            className="h-11 w-full rounded-xl border border-border bg-card px-4 text-sm text-foreground/90 outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
                          />
                        </div>

                        <div>
                          <p className="mb-1.5 text-xs text-foreground/60">End Time</p>

                          <input
                            type="time"
                            name="end_time"
                            value={approveData.end_time}
                            onKeyDown={(e) => e.preventDefault()}
                            onPaste={(e) => e.preventDefault()}
                            onDrop={(e) => e.preventDefault()}
                            readOnly
                            onChange={handleChange}
                            className="h-11 w-full rounded-xl border border-border bg-card px-4 text-sm text-foreground/90 outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl border border-border bg-background p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-card shadow-sm">
                          <Check className="h-4 w-4 text-emerald-500" />
                        </div>

                        <div>
                          <p className="text-xs font-medium text-foreground/60">Selected Appointment</p>

                          <p className="mt-0.5 text-sm font-semibold text-foreground">
                            {approveData.start_time && approveData.end_time
                              ? `${approveData.start_time} - ${approveData.end_time}`
                              : 'No slot selected'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col bg-background">
                  <div className="flex-1 overflow-y-auto p-6">
                    {availableSlots?.length ? (
                      <div className="grid min-h-56 h-56 grid-cols-2 gap-3 xl:grid-cols-3">
                        {availableSlots.map((item) => {
                          const isAvailable = item.status === 'Available';

                          const isSelected =
                            approveData.start_time === item.start_time &&
                            approveData.end_time === item.end_time;

                          return (
                            <button
                              key={`${item.start_time}-${item.end_time}`}
                              type="button"
                              disabled={!isAvailable}
                              onClick={() => {
                                if (!isAvailable) return;

                                handleChange({
                                  target: {
                                    name: 'start_time',
                                    value: item.start_time,
                                  },
                                } as React.ChangeEvent<HTMLInputElement>);

                                handleChange({
                                  target: {
                                    name: 'end_time',
                                    value: item.end_time,
                                  },
                                } as React.ChangeEvent<HTMLInputElement>);
                              }}
                              className={`group rounded-xl border p-4 text-left transition-all ${
                                isSelected
                                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 ring-2 ring-primary-500/20'
                                  : isAvailable
                                  ? 'border-border bg-card hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-md'
                                  : 'cursor-not-allowed border-border bg-background opacity-60'
                              }`}
                            >
                              <div className="mb-4 flex items-center justify-between">
                                <span
                                  className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
                                    isSelected
                                      ? 'bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-400'
                                      : isAvailable
                                      ? 'bg-emerald-50 text-emerald-700'
                                      : 'bg-red-50 text-red-600'
                                  }`}
                                >
                                  {isSelected ? '  Selected' : item.status}
                                </span>
                              </div>

                              <p
                                className={`text-base font-bold ${
                                  isSelected ? 'text-primary-700 dark:text-primary-400' : 'text-foreground'
                                }`}
                              >
                                {item.start_time}
                              </p>

                              <p className="mt-1 text-xs text-foreground/60">to {item.end_time}</p>

                              {/* {isSelected && (
                                <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-primary-600">
                                  <Check className="h-3.5 w-3.5" />
                                  Selected
                                </div>
                              )} */}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="flex items-center h-full justify-center">
                        <div className="text-center">
                          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-card shadow-sm">
                            <Stethoscope className="h-5 w-5 text-foreground/50" />
                          </div>

                          <p className="text-sm font-semibold text-foreground/90">No slots available</p>

                          <p className="mt-1 text-xs text-foreground/60">
                            There are no available slots for the selected date.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex shrink-0 items-center justify-between gap-3 border-t border-border bg-card px-6 py-4">
                <p className="hidden text-xs text-foreground/60 sm:block">
                  Select an available slot before approving.
                </p>

                <div className="ml-auto flex gap-3">
                  <button
                    type="button"
                    onClick={() => setApproveModal(false)}
                    className="rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground/80 transition hover:bg-background"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handleApprove}
                    disabled={!approveData.start_time || !approveData.end_time}
                    className="flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Check size={16} />
                    Confirm Approval
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {rejectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
            <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-card p-6 shadow-2xl">
              <div className="absolute left-0 top-0 h-1 w-full bg-rose-500" />
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-rose-200/50 dark:border-rose-800/50 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400">
                  <CircleX size={24} strokeWidth={2} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Reject Request</h2>
                  <p className="text-sm font-medium text-foreground/60">Confirm your action</p>
                </div>
              </div>

              <p className="mt-2 rounded-xl border border-border bg-background p-4 text-sm leading-relaxed text-foreground/80">
                Are you sure you want to <span className="font-bold text-foreground">reject</span>{' '}
                this doctor change request? The patient will be notified of this decision.
              </p>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setRejectModal(false)}
                  className="rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-bold text-foreground/80 transition-colors hover:bg-background hover:text-foreground"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleReject}
                  className="rounded-xl bg-rose-500 px-5 py-2.5 text-sm font-bold text-white shadow-sm shadow-rose-200 transition-colors hover:bg-rose-600"
                >
                  Confirm Reject
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorChange;
