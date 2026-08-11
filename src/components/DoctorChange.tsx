'use client';
import { approveRequest, getChangeDoctorList, rejectRequest } from '@/services/doctorlist';
import { useAuthStore } from '@/store/authStore';
import {
  ArrowRight,
  Check,
  CircleX,
  CrossIcon,
  FileText,
  PersonStanding,
  Presentation,
  Stethoscope,
  User,
} from 'lucide-react';
import { useEffect, useState } from 'react';

const DoctorChange = () => {
  const { auth } = useAuthStore();
  const [requestList, setRequestedList] = useState([]);
  const [approveModal, setApproveModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState({
    requestId: '',
    requestedDoctor: '',
  });
  const [approveData, setApproveData] = useState({
    appointment_date: '',
    start_time: ' ',
    end_time: '',
  });

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
      console.log(data);
      try {
        const res = await approveRequest(auth?.access, data);
        console.log('res approved', res);
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
      console.log(data);
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
        <table className="w-full min-w-[1200px] border-collapse">
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
                <tr key={item.request_id} className="group transition-colors hover:bg-slate-50/50">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 text-lg font-semibold text-white shadow-sm">
                        {item.patient_name?.charAt(0)?.toUpperCase()}
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
                      {item?.request_id}
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
                            });
                            setApproveModal(true);
                          }}
                          className="flex w-[100px] items-center justify-center gap-1.5 rounded-lg bg-emerald-100 px-3 py-2.5 text-xs font-semibold text-teal-700 hover:bg-emerald-200"
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
                            });
                            setRejectModal(true);
                          }}
                          className="flex w-[100px] items-center justify-center gap-1.5 rounded-lg bg-rose-100 px-3 py-2.5 text-xs font-semibold text-rose-600 hover:bg-rose-200"
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
              /* ================= EMPTY STATE ================= */
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
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-sm">
            <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
              {/* Header */}
              <div className="border-b border-slate-200 px-6 py-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">Approve Doctor Change</h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Confirm the appointment details before approving.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setApproveModal(false)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                  >
                    <CrossIcon size={18} />
                  </button>
                </div>
              </div>

              <div className="space-y-5 px-6 py-6">
                <div className="mb-5 flex items-center justify-between rounded-2xl border border-primary-200 bg-primary-50 px-5 py-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                      Requested Doctor
                    </p>

                    <p className="mt-1 text-base font-bold text-primary-700">
                      {selectedRequest?.requestedDoctor}
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                    <Stethoscope className="text-lg text-primary-400" />
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
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-[#0F5DA9] focus:ring-4 focus:ring-[#0F5DA9]/10"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Start Time
                    </label>

                    <input
                      type="time"
                      name="start_time"
                      value={approveData.start_time}
                      onChange={handleChange}
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-[#0F5DA9] focus:ring-4 focus:ring-[#0F5DA9]/10"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      End Time
                    </label>

                    <input
                      type="time"
                      name="end_time"
                      value={approveData.end_time}
                      onChange={handleChange}
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-[#0F5DA9] focus:ring-4 focus:ring-[#0F5DA9]/10"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
                <button
                  type="button"
                  onClick={() => setApproveModal(false)}
                  className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleApprove}
                  className="flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-600"
                >
                  <Check size={16} />
                  Confirm Approval
                </button>
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
