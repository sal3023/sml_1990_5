
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const editImageWithAI = async (
  base64Image: string,
  mimeType: string,
  prompt: string
): Promise<string> => {
  const ai = getAIClient();
  const imagePart = {
    inlineData: {
      data: base64Image.split(',')[1],
      mimeType: mimeType,
    },
  };
  const textPart = { text: prompt };

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [imagePart, textPart] },
    });

    let imageUrl = '';
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          imageUrl = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }
    }

    if (!imageUrl) throw new Error("No image data returned from AI");
    return imageUrl;
  } catch (error) {
    console.error("Image editing error:", error);
    throw error;
  }
};

export const chatWithTutor = async (message: string) => {
  const ai = getAIClient();
  // Using gemini-3-pro-preview for maximum reasoning capability
  const chat = ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction: `أنت "كوداي" (CodeAI)، المستشار التقني وكبير المهندسين في أكاديمية CodeAI.
      مهامك:
      1. تقديم شروحات برمجية احترافية وعميقة باللغة العربية.
      2. عند كتابة كود، استخدم تنسيق Markdown مع تحديد اللغة (مثل \`\`\`python).
      3. لا تكتفِ بالإجابة، بل اشرح "لماذا" تم اختيار هذا الحل.
      4. استخدم الرموز التعبيرية (Emojis) بشكل مهني لتنظيم الإجابة.
      5. إذا سألك طالب عن مفهوم معقد، ابدأ بتبسيطه ثم تعمق تدريجياً.
      6. شجع الطالب على التفكير النقدي وطرح الأسئلة.`
    },
  });

  try {
    const result = await chat.sendMessage({ message });
    return result.text;
  } catch (error) {
    console.error("Chat error:", error);
    throw error;
  }
};
