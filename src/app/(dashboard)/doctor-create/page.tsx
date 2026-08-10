import DoctorFormWrapper from '@/components/DoctorFormWrapper';

const page = () => {
  return (
    <div className=" animate-in fade-in duration-500">
      <div className="flex-row sm:items-center justify-between gap-2 mb-4">
        <h2 className="text-2xl font-bold font-heading text-gray-900 dark:text-white">
          Create Docotor
        </h2>
      </div>
      <DoctorFormWrapper />
    </div>
  );
};

export default page;
