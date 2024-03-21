export interface Options {
  title: string;
  subtitle: string;
  label: string;
  quantity: number;
  discount: string;
  amount?: number;
}

export interface Data {
  campaign: string;
  title: string;
  description: string;
  options: Options[];
}
