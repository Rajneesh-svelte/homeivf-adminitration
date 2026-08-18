'use client';
import React, { useState, useEffect } from 'react';
import { FormFieldConfig } from '@/Interfaces/FormField';

interface DynamicFormProps {
  title: string;
  fields: FormFieldConfig[];
  onSubmit: (data: unknown) => void | Promise<void>;
  onChange?: (field: string, value: any) => void;
  submitButtonText?: string;
  initialData?: unknown;
}

const EMPTY_DATA = {};

const DynamicForm: React.FC<DynamicFormProps> = ({
  title,
  fields,
  onSubmit,
  onChange,
  submitButtonText = 'Submit',
  initialData = EMPTY_DATA,
}) => {
  const [formData, setFormData] = useState<any>(initialData || EMPTY_DATA);

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData(initialData);
    } else {
      setFormData({});
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      const file = (e.target as HTMLInputElement).files?.[0] || null;

      setFormData((prev: any) => ({
        ...prev,
        [name]: file,
      }));

      onChange?.(name, file);
      return;
    }

    if (e.target instanceof HTMLSelectElement && e.target.multiple) {
      const values = Array.from(e.target.selectedOptions, (option) => option.value);

      setFormData((prev: any) => ({
        ...prev,
        [name]: values,
      }));

      onChange?.(name, values);
      return;
    }

    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));

    onChange?.(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const labelStyle = `mb-2 block text-sm font-semibold`;

  return (
    <form className="" onSubmit={handleSubmit}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold font-heading text-foreground dark:from-blue-400 dark:to-indigo-400">
          {title}
        </h3>
      </div>
      <div className="flex flex-col gap-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 shrink-0">
          {fields.map((field) => (
            <div key={field.name}>
              <label htmlFor={field.name} className={labelStyle}>
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </label>
              {field.type === 'select' ? (
                field.multiple ? (
                  <div className="flex flex-wrap gap-2 p-3 border rounded-xl border-border bg-background/50">
                    {field.options?.map((opt) => {
                      const val = String(opt.value);
                      const isSelected = (formData[field.name] || []).includes(val);
                      return (
                        <button
                          type="button"
                          key={val}
                          onClick={() => {
                            setFormData((prev: any) => {
                              const current = prev[field.name] || [];
                              return {
                                ...prev,
                                [field.name]: current.includes(val)
                                  ? current.filter((id: string) => id !== val)
                                  : [...current, val],
                              };
                            });
                          }}
                          className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border
                            ${
                              isSelected
                                ? 'bg-primary-500 text-white border-primary-500 shadow-md shadow-blue-500/20'
                                : 'bg-card text-gray-700 border-border hover:border-primary-300 hover:bg-primary-50    dark:hover:bg-gray-700'
                            }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                    {(!field.options || field.options.length === 0) && (
                      <span className="text-sm text-gray-400">No options available</span>
                    )}
                  </div>
                ) : (
                  <div className="relative">
                    {field.icon && (
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                        <field.icon className="w-5 h-5 text-gray-500" />
                      </div>
                    )}
                    <select
                      id={field.name}
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleChange}
                      className={`inputBaseStyle ${field.icon ? 'pl-12' : 'pl-4'}`}
                      required={field.required}
                    >
                      <option value="" disabled>
                        Select...
                      </option>
                      {field.options?.map((opt) => (
                        <option key={String(opt.value)} value={String(opt.value)}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )
              ) : field.type === 'button' ? (
                <button
                  type="button"
                  onClick={field.onClick}
                  className="flex h-12 w-full items-center justify-center rounded-xl bg-blue-100 hover:bg-blue-200 text-sm font-semibold text-blue-700 transition-all duration-300 dark:bg-blue-900/50 dark:hover:bg-blue-900/80 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                >
                  {field.icon && <field.icon className="mr-2 w-5 h-5" />}
                  {field.label}
                </button>
              ) : (
                <div className="relative">
                  {field.icon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <field.icon className="opacity-60 w-5 h-5" />
                    </div>
                  )}
                  <input
                    id={field.name}
                    type={field.type}
                    name={field.name}
                    value={field.type === 'file' ? undefined : formData[field.name] || ''}
                    onChange={handleChange}
                    placeholder={field.placeholder || field.label}
                    className={`inputBaseStyle ${field.icon ? 'pl-12' : 'pl-4'}`}
                    required={field.required}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="space-y-2 shrink-0 mt-2">
          <button
            type="submit"
            className="flex h-12 w-full items-center justify-center rounded-xl bg-primary-500 hover:bg-primary-300 text-base font-semibold text-white shadow-md transition-all duration-300 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitButtonText}
          </button>
        </div>
      </div>
    </form>
  );
};

export default DynamicForm;
