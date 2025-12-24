export interface DosageCalculator {
  image: string;
  imageWidth: number;
  imageHeight: number;
  peptideAmount?: boolean;
  item?: string;
  volumes: string[];
  otherVolumes?: string[];
}
