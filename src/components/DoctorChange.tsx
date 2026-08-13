'use client';
import { approveRequest, getChangeDoctorList, rejectRequest } from '@/services/doctorlist';
import { useAuthStore } from '@/store/authStore';
import { ArrowRight, Check, CircleX, CrossIcon, FileText, Stethoscope } from 'lucide-react';
import { useEffect, useState } from 'react';
import patientpartner from '@/../public/avatars/patientpartner.png';
import Image from 'next/image';
import { useDoctorSlot } from '@/hooks/useDoctorSlot';

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
    start_time: ' ',
    end_time: '',
  });

  const { slot } = useDoctorSlot({
    selectedDate: approveData?.appointment_date,
    selectedDoctorId: selectedRequest?.requestedDoctorId,
  });
  console.log('slot', slot);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        const res = await approveRequest(auth?.access, data);
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
        const res = await rejectRequest(auth?.access, data);
        console.log('res approved', res);
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
    <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 px-7 py-6">
        <div className="flex items-center gap-5">
          <div>
            <h1 className="text-[22px] font-semibold tracking-tight text-slate-900">
              Doctor Change Requests
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Review and manage patient doctor change requests.
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 px-5 py-3">
          <p className="text-xs font-medium text-slate-500">Total Requests</p>

          <p className="mt-1 text-xl font-semibold text-slate-900">{requestList.count}</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-300 border-collapse">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="w-[26%] px-8 py-5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Patient
              </th>

              <th className="w-[13%] px-6 py-5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                UHID
              </th>

              <th className="w-[25%] px-6 py-5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Doctor Change
              </th>

              <th className="w-[17%] px-6 py-5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Reason
              </th>

              <th className="w-[10%] px-6 py-5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Status
              </th>

              <th className="w-[9%] px-6 py-5 text-center text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {requestList.count > 0 ? (
              requestList.results.map((item: any) => (
                <tr
                  key={item.request_id}
                  className="group transition-colors hover:bg-primary-200/30"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="flex h-15 w-15 shrink-0 items-center bg-linear-to-t  from-primary-400 to-white  justify-center overflow-hidden rounded-full">
                        <Image
                          alt="patient"
                          src={patientpartner}
                          width={50}
                          height={50}
                          className="h-15 w-15 object-contain"
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-900">
                          {item.patient_name}
                        </p>

                        <p className="mt-1 max-w-[240px] truncate text-xs text-slate-400">
                          ID: {item.patient_id}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-6">
                    <span className="inline-flex whitespace-nowrap rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
                      {item.patient_uhid}
                    </span>
                  </td>

                  <td className="px-6 py-6">
                    <div className="flex items-center gap-4">
                      <div className="min-w-[125px]">
                        <p className="text-[11px] font-medium text-slate-400">Current Doctor</p>

                        <p className="mt-1.5 whitespace-nowrap text-sm font-semibold text-slate-800">
                          {item.current_doctor}
                        </p>
                      </div>

                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50">
                        <ArrowRight size={15} strokeWidth={2} className="text-blue-500" />
                      </div>

                      <div className="min-w-[125px]">
                        <p className="text-[11px] font-medium text-slate-400">Requested Doctor</p>

                        <p className="mt-1.5 whitespace-nowrap text-sm font-semibold text-teal-600">
                          {item.requested_doctor}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-6">
                    <p
                      title={item.reason}
                      className="max-w-[230px] text-sm leading-5 text-slate-600"
                    >
                      {item.reason}
                    </p>
                  </td>

                  <td className="px-6 py-6">
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${
                        item.status?.toLowerCase() === 'approved'
                          ? 'bg-emerald-50 text-emerald-700'
                          : item.status?.toLowerCase() === 'rejected'
                          ? 'bg-red-50 text-red-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          item.status?.toLowerCase() === 'approved'
                            ? 'bg-emerald-500'
                            : item.status?.toLowerCase() === 'rejected'
                            ? 'bg-red-500'
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
                            setApproveModal(true);
                          }}
                          className="flex w-25 items-center justify-center gap-1.5 rounded-lg bg-emerald-100 px-3 py-2.5 text-xs font-semibold text-teal-700 hover:bg-emerald-200"
                        >
                          <Check size={14} />
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
                          className="flex w-25 items-center justify-center gap-1.5 rounded-lg bg-rose-100 px-3 py-2.5 text-xs font-semibold text-rose-600 hover:bg-rose-200"
                        >
                          <CircleX size={14} />
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="inline-flex items-center rounded-lg bg-primary-100 px-3 py-1.5 text-xs font-medium text-primary-500">
                        No action
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-20 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                    <FileText size={25} className="text-slate-400" />
                  </div>

                  <p className="mt-4 text-sm font-semibold text-slate-700">
                    No doctor change requests
                  </p>

                  <p className="mt-1 text-xs text-slate-400">New requests will appear here.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {approveModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
            <div className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
              <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-6 py-5">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50">
                      <Stethoscope className="h-5 w-5 text-primary-600" />
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold text-slate-900">
                        Approve Doctor Change
                      </h2>

                      <p className="mt-0.5 text-sm text-slate-500">
                        Select an available slot and confirm the appointment.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setApproveModal(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                >
                  <CrossIcon size={18} />
                </button>
              </div>

              <div className="grid min-h-0 flex-1 grid-cols-1 overflow-hidden lg:grid-cols-[0.9fr_1.1fr]">
                <div className="overflow-y-auto border-b border-slate-200 p-6 lg:border-b-0 lg:border-r">
                  <div className="space-y-6">
                    <div className="rounded-2xl border border-primary-100 bg-primary-50 p-5">
                      <p className="text-xs font-semibold uppercase tracking-wider text-primary-500">
                        Requested Doctor
                      </p>

                      <div className="mt-3 flex items-center justify-between">
                        <div>
                          <p className="text-lg font-bold text-primary-800">
                            {selectedRequest?.requestedDoctor}
                          </p>

                          <p className="mt-1 text-xs text-primary-600">
                            Doctor requested for this appointment
                          </p>
                        </div>

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                          <Stethoscope className="h-5 w-5 text-primary-500" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        Appointment Date
                      </label>

                      <input
                        type="date"
                        name="appointment_date"
                        value={approveData.appointment_date}
                        onChange={handleChange}
                        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
                      />
                    </div>

                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <label className="block text-sm font-medium text-slate-700">
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
                          <p className="mb-1.5 text-xs text-slate-500">Start Time</p>

                          <input
                            type="time"
                            name="start_time"
                            value={approveData.start_time}
                            onChange={handleChange}
                            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
                          />
                        </div>

                        <div>
                          <p className="mb-1.5 text-xs text-slate-500">End Time</p>

                          <input
                            type="time"
                            name="end_time"
                            value={approveData.end_time}
                            onChange={handleChange}
                            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-sm">
                          <Check className="h-4 w-4 text-emerald-500" />
                        </div>

                        <div>
                          <p className="text-xs font-medium text-slate-500">Selected Appointment</p>

                          <p className="mt-0.5 text-sm font-semibold text-slate-800">
                            {approveData.start_time && approveData.end_time
                              ? `${approveData.start_time} - ${approveData.end_time}`
                              : 'No slot selected'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex  flex-col bg-slate-50">
                  <div className=" flex-1 overflow-y-auto p-6">
                    {slot?.roster_list?.length ? (
                      <div className="grid min-h-56 h-56 grid-cols-2 gap-3 xl:grid-cols-3">
                        {slot.roster_list.map((item) => {
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
                                  ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-500/20'
                                  : isAvailable
                                  ? 'border-slate-200 bg-white hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-md'
                                  : 'cursor-not-allowed border-slate-200 bg-slate-100 opacity-60'
                              }`}
                            >
                              <div className="mb-4 flex items-center justify-between">
                                <span
                                  className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
                                    isSelected
                                      ? 'bg-primary-100 text-primary-700'
                                      : isAvailable
                                      ? 'bg-emerald-50 text-emerald-700'
                                      : 'bg-red-50 text-red-600'
                                  }`}
                                >
                                  {isSelected ? 'Selected' : item.status}
                                </span>
                              </div>

                              <p
                                className={`text-base font-bold ${
                                  isSelected ? 'text-primary-700' : 'text-slate-800'
                                }`}
                              >
                                {item.start_time}
                              </p>

                              <p className="mt-1 text-xs text-slate-500">to {item.end_time}</p>

                              {isSelected && (
                                <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-primary-600">
                                  <Check className="h-3.5 w-3.5" />
                                  Selected
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="flex items-center h-full justify-center">
                        <div className="text-center">
                          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">
                            <Stethoscope className="h-5 w-5 text-slate-400" />
                          </div>

                          <p className="text-sm font-semibold text-slate-700">No slots available</p>

                          <p className="mt-1 text-xs text-slate-500">
                            There are no available slots for the selected date.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex shrink-0 items-center justify-between gap-3 border-t border-slate-200 bg-white px-6 py-4">
                <p className="hidden text-xs text-slate-500 sm:block">
                  Select an available slot before approving.
                </p>

                <div className="ml-auto flex gap-3">
                  <button
                    type="button"
                    onClick={() => setApproveModal(false)}
                    className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
              <h2 className="text-lg font-semibold text-slate-900">Reject Doctor Change</h2>

              <p className="mt-2 text-sm text-slate-500">
                Are you sure you want to reject this doctor change request?
              </p>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setRejectModal(false)}
                  className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleReject}
                  className="rounded-xl bg-rose-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-rose-600"
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
