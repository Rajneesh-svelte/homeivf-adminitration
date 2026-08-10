const FormSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <h3 className="text-sm font-semibold text-gray-700 ">{title}</h3>
    <div className="flex flex-col gap-4">{children}</div>
  </div>
);

export default FormSection;
