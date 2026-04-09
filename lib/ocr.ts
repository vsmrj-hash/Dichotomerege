import { createWorker } from 'tesseract.js';

export const extractTextFromImage = async (imageBuffer: Buffer): Promise<string> => {
  const worker = await createWorker('eng');

  try {
    const {
      data: { text }
    } = await worker.recognize(imageBuffer);

    return text.trim();
  } finally {
    await worker.terminate();
  }
};
