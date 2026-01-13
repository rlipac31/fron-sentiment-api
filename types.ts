interface SentimentResult {
  texto: string;
  prevision: 'POSITIVO'  | 'NEGATIVO';
  probabilidad: number;
}