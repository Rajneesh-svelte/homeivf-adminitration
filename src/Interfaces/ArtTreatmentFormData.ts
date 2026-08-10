export interface ArtTreatmentFormData {
  name: string;
  department_name: string;
  main_image: File | null;
  banner_image: File | null;
  colour_code: string;
  order: string | number;
  on_dashboard: boolean | string;
  faq: string;
  title: string;
  subtitle: string;
}
